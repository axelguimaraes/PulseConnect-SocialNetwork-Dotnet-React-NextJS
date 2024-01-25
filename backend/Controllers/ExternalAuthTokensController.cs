using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route(("api/externalAuth"))]
    public class ExternalAuthTokensController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ExternalAuthTokensController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/externalAuth/5
        /// <summary>
        /// Retrieves an external authentication token by its identifier.
        /// </summary>
        /// 
        /// <remarks>
        /// This endpoint returns the external authentication token with the specified identifier.
        /// </remarks>
        /// 
        /// <param name="id">The identifier of the external authentication token.</param>
        /// 
        /// <returns>
        ///     <para>Returns a 200 OK response with the external authentication token if found.</para>
        ///     <para>Returns a 404 Not Found response if the external authentication token is not found.</para>
        /// </returns>
        /// 
        /// <response code="200">The external authentication token with the specified identifier.</response>
        /// <response code="404">Not Found. The external authentication token is not found.</response>
        [HttpGet("{Id}")]
        public async Task<ActionResult<ExternalAuthToken>> GetExternalAuthToken(String id)
        {
            try
            {
                // Check if id is valid
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Invalid id");
                }

                // Check if token exists
                var externalAuthToken = await _context.ExternalAuthToken.FindAsync(id);

                // If token not found, return 404
                if (externalAuthToken == null)
                {
                    return NotFound();
                }

                // Return token
                return Ok(externalAuthToken);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/externalAuth/thirdPartyAccount/5
        /// <summary>
        /// Retrieves the latest external authentication token associated with a specific third-party account.
        /// </summary>
        /// 
        /// <remarks>
        /// This endpoint returns the most recent external authentication token associated with the specified third-party account.
        /// </remarks>
        /// 
        /// <param name="id">The identifier of the third-party account.</param>
        /// 
        /// <returns>
        ///     <para>Returns a 200 OK response with the most recent external authentication token if found.</para>
        ///     <para>Returns a 404 Not Found response if the third-party account or associated token is not found.</para>
        /// </returns>
        /// 
        /// <response code="200">The most recent external authentication token associated with the specified third-party account.</response>
        /// <response code="404">Not Found. The third-party account or associated token is not found.</response>
        [HttpGet("thirdPartyAccount/{id}")]
        public async Task<ActionResult<ExternalAuthToken>> GetExternalAuthTokenByThirdPartyAccount(String id)
        {
            try
            {
                // Check if id is valid
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Invalid id");
                }

                // Check if token exists
                var externalAuthToken = await _context.ExternalAuthToken
                    .Where(token => token.ThirdPartyAccountId == id)
                    .LastOrDefaultAsync();

                // If token not found, return 404
                if (externalAuthToken == null)
                {
                    return NotFound();
                }

                // Return token
                return Ok(externalAuthToken);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/externalAuth
        /// <summary>
        /// Creates a new external authentication token.
        /// </summary>
        /// 
        /// <remarks>
        /// This endpoint allows the creation of a new external authentication token and associates it with a third-party account.
        /// The token details must be provided in the request body.
        /// 
        /// Sample request:
        /// 
        ///     POST /api/externalAuth
        ///     {
        ///         "ThirdPartyAccountId": "account123",
        ///         "ExpirationDate": "2024-12-31T23:59:59Z",
        ///         "AccessToken": "access_token_example_123456"
        ///     }
        ///     
        /// </remarks>
        /// 
        /// <param name="externalToken">The external authentication token details to be created. The 'Id' field is generated automatically.</param>
        /// 
        /// <returns>
        ///     <para>Returns a 201 Created response with the created external authentication token if successful, including the generated 'Id'.</para>
        ///     <para>Returns a 400 Bad Request response if the request is invalid (e.g., missing required fields).</para>
        ///     <para>Returns a 500 Internal Server Error response if an unexpected error occurs during the token creation process.</para>
        /// </returns>
        /// 
        /// <response code="201">The external authentication token was successfully created and returned, including the generated 'Id'.</response>
        /// <response code="400">The request is invalid (e.g., missing required fields).</response>
        /// <response code="500">Internal Server Error. An unexpected error occurred during the token creation process.</response>
        [HttpPost]
        public async Task<ActionResult<ExternalAuthToken>> PostExternalAuthToken(ExternalAuthToken externalToken)
        {
            try
            {
                // Check if ThirdPartyAccountId is valid
                var thirdPartyAccount = await _context.ThirdPartyAccounts.FindAsync(externalToken.ThirdPartyAccountId);
                
                // If ThirdPartyAccountId is invalid, return 400
                if (thirdPartyAccount == null)
                {
                    return BadRequest("Invalid ThirdPartyAccountId");
                }

                // Add token
                _context.ExternalAuthToken.Add(externalToken);

                // Save changes
                await _context.SaveChangesAsync();

                // Return token
                return CreatedAtAction("GetExternalAuthToken", new { id = externalToken.Id }, externalToken);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        // TWITTER AUTHENTICATION
        [AllowAnonymous]
        [HttpGet]
        [Route("auth/twitter")]
        public IActionResult StartTwitterAuthentication()
        {
            // Indica que queremos autenticar usando o Twitter.
            // Isso acionará o middleware de autenticação do Twitter configurado.
            var authenticationProperties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("http://localhost:3000/auth/sign-in"), // Especifique o endpoint de callback aqui
            };

            return Challenge(authenticationProperties, "Twitter");
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("auth/twitter/callback")]
        public async Task<IActionResult> TwitterCallback()
        {
            // Aqui você lida com o processo de autenticação após o redirecionamento do Twitter.
            // O contexto de autenticação contém as informações do usuário e o token.

            var authenticateResult = await HttpContext.AuthenticateAsync("Twitter");

            if (!authenticateResult.Succeeded)
                return BadRequest(); // Ou outra lógica de erro

            // Aqui você pode criar um token JWT personalizado, associá-lo ao usuário
            // e enviá-lo de volta ao cliente, se necessário.

            // ... sua lógica de autenticação ...

            return Ok(authenticateResult);
        }

    }
}
