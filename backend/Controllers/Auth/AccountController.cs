using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PulseConnect.Models;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Azure.Core;

namespace PulseConnect.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<Users> _signInManager;
        private readonly UserManager<Users> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(SignInManager<Users> signInManager, UserManager<Users> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Login Function
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>Token when is successfully logged</returns>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AuthLoginRequest request)
        {
            try
            {
                // Check model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Try to find the user by username
                var user = await _userManager.FindByEmailAsync(request.Email);

                // Check if user exists
                if (user == null)
                {
                    return BadRequest("User not found.");
                }

                // Check if password is valid
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                // Check if password is valid
                if (!result.Succeeded)
                {
                    return BadRequest("Invalid username or password.");
                }

                // Generate token
                var token = GenerateToken(user);

                // Return user info
                return Ok(new 
                {
                    id = user.Id,
                    email = user.Email,
                    password = user.PasswordHash,
                    userName = user.UserName,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    profileImageURL = user.ProfilePictureURL,
                    headerImageURL = user.HeaderImageURL,
                    bio = user.Bio,
                    city = user.City,
                    country = user.Country,
                    customURL = user.CustomURL,
                    createdAt = user.DateCreated,
                    connectionsTotal = user.ConnectionsCount,
                    AccessToken = token,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request.\n\n" + ex.Message);
            }
        }


        /// <summary>
        /// Register function using JWT for inject token in session when user create a account
        /// </summary>
        /// <param name="username"> Username from user</param>
        /// <param name="password"> Password from user</param>
        /// <returns>Token Generated for Users</returns>
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] AuthRegisterRequest request)
        {
            try
            {
                // Check model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if username or email already exists
                var existsByEmail = await _userManager.FindByEmailAsync(request.Email);
                if (existsByEmail != null)
                {
                    return BadRequest("Email already exists.");
                }

                // Check if username or email already exists
                var existsByUsername = await _userManager.FindByNameAsync(request.UserName);
                if (existsByUsername != null)
                {
                    return BadRequest("UserName already exists.");
                }

                // Check if password and confirm password match
                if (request.Password != request.ConfirmPassword)
                {
                    return BadRequest("Password don't match.");
                }

                // Create user object
                var user = new Users
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,

                    UserName = request.UserName,
                    Email = request.Email,
                };

                // Try to create the user
                var result = await _userManager.CreateAsync(user, request.Password);

                // Check if user was created
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status406NotAcceptable, "An error occurred while processing the request. Possible password don't match to requirements");
                }

                // Return username and token
                return Ok("User created successfully.");

            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }


        private string GenerateToken(Users user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", user.Id)
                // More claims if needed
            };

            var key = new SymmetricSecurityKey(GetKeyFromFile());
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            // Generate Token Descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token válido por 1 hora
                SigningCredentials = credentials
            };

            // Generate Token Handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // Generate Token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return Token
            return tokenHandler.WriteToken(token);
        }

        private byte[] GetKeyFromFile()
        {
            try
            {
                return Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            }
            catch (Exception)
            {

                return null;

            }
        }
    }

}
