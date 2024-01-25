using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route(("api/users"))]
    public class UsersController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserManager<Users> _userManager;

        public UsersController(APIDbContext usersContext, UserManager<Users> userManager)
        {
            _context = usersContext;
            _userManager = userManager;
        }


        // GET: api/users
        /// <summary>
        /// Gets all users.
        /// </summary>
        /// 
        /// <remarks>
        /// Retrieves a list of all users in the system.
        /// </remarks>
        /// 
        /// <response code="200">Returns the list of users.</response>
        /// <response code="204">No users were found.</response>
        /// <response code="500">An error occurred while retrieving the users.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                // Get all users
                var users = await _context.Users
                  .Select(user => UserInfo(user))
                  .ToListAsync();

                // If there are no users, return 204 No Content
                if (users.Count == 0)
                {
                    return NoContent();
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/users/filter/{searchString}
        /// <summary>
        /// Gets users by username search string.
        /// </summary>
        /// 
        /// <param name="searchString">The search string to filter users by username.</param>
        /// 
        /// <response code="200">Returns a list of users that match the search string.</response>
        [HttpGet("filter/{searchString}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersByUserName(string searchString)
        {
            var usersQuery = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                usersQuery = usersQuery.Where(user =>
                    EF.Functions.Like(user.UserName, $"%{searchString}%")
                );
            }

            var users = await usersQuery
                .Select(user => UserInfo(user))
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/users/{id}
        /// <summary>
        /// Gets a specific user by ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the user.</param>
        /// 
        /// <response code="200">Returns the requested user.</response>
        /// <response code="404">User with the specified ID was not found.</response>
        /// <response code="500">An error occurred while retrieving the user.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUser(String id)
        {
            try
            {
                // Check if id is null
                if (id.IsNullOrEmpty())
                {
                    return BadRequest("Id is null");
                }

                // Find user
                var user = await _context.Users.FindAsync(id);

                // Check if user was found
                if (user == null)
                {
                    return NotFound();
                }

                // Return user
                return Ok(UserInfo(user));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/users
        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// 
        /// <param name="request">The user data for creating a new user.</param>
        /// 
        /// <response code="200">User created successfully.</response>
        /// <response code="400">Bad request, invalid data.</response>
        /// <response code="500">An error occurred while creating the user.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostUser([FromBody] RequestAddUser request)
        {
            try
            {
                // Check body for null
                if (request == null)
                {
                    return BadRequest("Request body is null");
                }

                // Initialize new user
                var user = new Users
                {
                    UserName = request.Username,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,

                    DateCreated = DateTime.Now,
                    ProfilePictureURL = "",
                    Gender = request.Gender,
                    Country = request.Country,
                    MultiFactorEnable = false,
                    MultiFactorCode = "",
                };

                // Try to create the user
                var result = await _userManager.CreateAsync(user, request.Password);

                // Check if user was created
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                // Save changes to database
                await _context.SaveChangesAsync();

                // Return success message 
                var responseMessage = new
                {
                    message = "User created successfully",
                    user = UserInfo(user)
                };

                return Ok(responseMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/users/{id}
        /// <summary>
        /// Updates a user.
        /// </summary>
        /// 
        /// <param name="id">The ID of the user to update.</param>
        /// <param name="user">The updated user data.</param>
        /// 
        /// <response code="204">User updated successfully.</response>
        /// <response code="400">Bad request, invalid data.</response>
        /// <response code="404">User with the specified ID was not found.</response>
        /// <response code="500">An error occurred while updating the user.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutUser(String id, [FromBody] Users user)
        {

            try
            {
                // Check body for null
                if (user == null)
                {
                    return BadRequest("Request body is null");
                }

                // Check if id is null
                if (id.IsNullOrEmpty())
                {
                    return BadRequest("Id is null");
                }

                // Check exist user
                if (!UserExists(id))
                {
                    return NotFound();
                }

                // Check if existe user.Id
                if (user.Id == null)
                {
                    return BadRequest("User.Id is null");
                }

                // id must match user.Id
                if (id != user.Id)
                {
                    return BadRequest("Ids of users don't match");
                }

                // Update user _userManager
                var result = await _userManager.UpdateAsync(user);

                // Update user
                _context.Entry(user).State = EntityState.Modified;

                // Save changes to database
                await _context.SaveChangesAsync();

                // Check if user was updated
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                // Return
                return NoContent();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/users/{id}
        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// 
        /// <param name="id">The ID of the user to delete.</param>
        /// 
        /// <response code="200">User deleted successfully.</response>
        /// <response code="400">Bad request, invalid ID.</response>
        /// <response code="404">User with the specified ID was not found.</response>
        /// <response code="500">An error occurred while deleting the user.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUser(String id)
        {
            try
            {
                // Check if id is null
                if (id.IsNullOrEmpty())
                {
                    return BadRequest("Id is null");
                }

                // Check exist user
                if (!UserExists(id))
                {
                    return NotFound();
                }

                // Find user
                var user = await _context.Users.FindAsync(id);

                // Check if user was found
                if (user == null)
                {
                    return NotFound();
                }

                // Remove user
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        private static object UserInfo(Users user)
        {
            return new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email,
                user.Bio,
                user.DateCreated,
                user.ProfilePictureURL,
                user.Gender,
                user.Country,
            };
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

    }
}