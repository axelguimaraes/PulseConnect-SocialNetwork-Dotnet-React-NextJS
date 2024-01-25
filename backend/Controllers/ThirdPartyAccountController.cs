using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PulseConnect.Data;
using PulseConnect.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    public class ThirdPartyAccountController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ThirdPartyAccountController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/ThirdPartyAccount
        /// <summary>
        /// Gets a list of all third-party accounts.
        /// </summary>
        /// 
        /// <remarks>
        /// Retrieves a list of all the third-party accounts in the system.
        /// </remarks>
        /// 
        /// <response code="200">Returns the list of third-party accounts.</response>
        /// <response code="204">No third-party accounts were found.</response>
        /// <response code="500">An error occurred while retrieving the accounts.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ThirdPartyAccount>>> GetThirdPartyAccounts()
        {
            try
            {
                // Get all third-party accounts
                var accounts = await _context.ThirdPartyAccounts.ToListAsync();

                // If there are no accounts, return 204 No Content
                if (accounts.Count == 0)
                {
                    return NoContent();
                }

                // Return the list of accounts
                return Ok(accounts);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/ThirdPartyAccount/5
        /// <summary>
        /// Gets a specific third-party account by ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the third-party account.</param>
        /// 
        /// <remarks>
        /// Retrieves a single third-party account by its unique identifier.
        /// </remarks>
        /// 
        /// <response code="200">The third-party account with the specified ID.</response>
        /// <response code="404">No third-party account with the specified ID was found.</response>
        /// <response code="500">An error occurred while retrieving the account.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ThirdPartyAccount>> GetThirdPartyAccount(String id)
        {
            try
            {
                // Check id is valid GUID
                if (!Guid.TryParse(id, out Guid guid))
                {
                    return BadRequest("Invalid ID.");
                }

                // Find the account by ID
                var account = await _context.ThirdPartyAccounts.FindAsync(id);

                // If the account doesn't exist, return 404 Not Found
                if (account == null)
                {
                    return NotFound();
                }

                // Return the account
                return Ok(account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/ThirdPartyAccount/user/5
        /// <summary>
        /// Gets a list of all third-party accounts for a specific user.
        /// </summary>
        /// 
        /// <param name="userId">The user's ID for which to retrieve the third-party accounts.</param>
        /// 
        /// <remarks>
        /// Retrieves a list of all the third-party accounts associated with the specified user ID.
        /// </remarks>
        /// 
        /// <response code="200">Returns the list of third-party accounts for the specified user.</response>
        /// <response code="400">Invalid user ID.</response>
        /// <response code="404">No third-party accounts were found for the specified user ID.</response>
        /// <response code="500">An error occurred while retrieving the accounts.</response>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<ThirdPartyAccount>>> GetThirdPartyAccountsByUserId(String userId)
        {
            try
            {
                if(userId.IsNullOrEmpty())
                {
                    return BadRequest("Invalid id of user.");
                }

                var accounts = await _context.ThirdPartyAccounts
                    .Where(a => a.UserId == userId)
                    .ToListAsync();

                if (accounts == null || accounts.Count == 0)
                {
                    return NotFound("No third-party accounts were found for the specified user ID.");
                }

                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/ThirdPartyAccount
        /// <summary>
        /// Creates a new third-party account.
        /// </summary>
        /// 
        /// <param name="thirdPartyAccount">The third-party account to create.</param>
        /// 
        /// <remarks>
        /// Adds a new third-party account to the system.
        /// </remarks>
        /// 
        /// <response code="201">The newly created third-party account.</response>
        /// <response code="400">Invalid input, object is null, or user not found.</response>
        /// <response code="409">An account of this type already exists for the user.</response>
        /// <response code="500">An error occurred while creating the account.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ThirdPartyAccount>> CreateThirdPartyAccount(ThirdPartyAccount thirdPartyAccount)
        {
            try
            {
                // Check if the user exists
                var user = await _context.Users.FindAsync(thirdPartyAccount.UserId);

                // If the user doesn't exist, return 404 Not Found
                if (user == null)
                {
                    return BadRequest("User not found.");
                }

                // Check if user already has an account of this type
                var existingAccount = await _context.ThirdPartyAccounts
                    .FirstOrDefaultAsync(a => a.UserId == thirdPartyAccount.UserId && a.AccountType == thirdPartyAccount.AccountType);

                // If the user already has an account of this type, return 409 Conflict
                if (existingAccount != null)
                {
                    return Conflict("Exists same account type to user.");
                }

                // Add the account to the database
                _context.ThirdPartyAccounts.Add(thirdPartyAccount);
                await _context.SaveChangesAsync();

                // Return the account
                return CreatedAtAction(nameof(GetThirdPartyAccount), new { id = thirdPartyAccount.Id }, thirdPartyAccount);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/ThirdPartyAccount/5
        /// <summary>
        /// Deletes a third-party account by ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the third-party account to delete.</param>
        /// 
        /// <remarks>
        /// Removes a third-party account from the system.
        /// </remarks>
        /// 
        /// <response code="200">The third-party account was successfully deleted.</response>
        /// <response code="404">No third-party account with the specified ID was found.</response>
        /// <response code="500">An error occurred while deleting the account.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteThirdPartyAccount(String id)
        {
            try
            {
                // Find the account by ID
                var account = await _context.ThirdPartyAccounts.FindAsync(id);

                // If the account doesn't exist, return 404 Not Found
                if (account == null)
                {
                    return NotFound();
                }

                // Remove the account from the database
                _context.ThirdPartyAccounts.Remove(account);
                await _context.SaveChangesAsync();

                // Return 204 No Content
                return Ok(account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
