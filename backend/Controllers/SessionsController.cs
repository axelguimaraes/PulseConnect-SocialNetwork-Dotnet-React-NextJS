using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;
using PulseConnect.Services;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route(("api/[controller]"))]
    public class SessionsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public SessionsController(APIDbContext sessionContext)
        {
            _context = sessionContext;
        }

        // GET: api/Sessions
        /// <summary>
        /// Gets all user sessions.
        /// </summary>
        /// 
        /// <remarks>
        /// Retrieves a list of all the user sessions in the system.
        /// </remarks>
        /// 
        /// <response code="200">Returns the list of user sessions.</response>
        /// <response code="204">No user sessions were found.</response>
        /// <response code="500">An error occurred while retrieving the sessions.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
        {
            try
            {
                // Get all sessions
                var sessions = await _context.Sessions.ToListAsync();

                // If there are no sessions, return 204 No Content
                if (sessions.Count == 0)
                {
                    return NoContent();
                }

                // Return the list of sessions
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Sessions/5
        /// <summary>
        /// Gets a specific user session by ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the session.</param>
        /// 
        /// <remarks>
        /// Retrieves a single user session by its unique identifier.
        /// </remarks>
        /// 
        /// <response code="200">The user session with the specified ID.</response>
        /// <response code="404">No user session with the specified ID was found.</response>
        /// <response code="500">An error occurred while retrieving the session.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Session>> GetSession(string id)
        {
            try
            {
                // Get the session
                var session = await _context.Sessions.FindAsync(id);

                // If the session does not exist, return 404 Not Found
                if (session == null)
                {
                    return NotFound();
                }

                // Return the session
                return Ok(session);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Sessions/user/5
        /// <summary>
        /// Gets all user sessions for a specific user by their user ID.
        /// </summary>
        /// 
        /// <param name="userId">The user ID for which to retrieve the sessions.</param>
        /// 
        /// <remarks>
        /// Retrieves a list of all the user sessions associated with the specified user ID.
        /// </remarks>
        /// 
        /// <response code="200">Returns the list of user sessions for the specified user.</response>
        /// <response code="204">No user sessions were found for the specified user ID.</response>
        /// <response code="500">An error occurred while retrieving the sessions.</response>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<Session>>> GetSessionsByUserId(string userId)
        {
            try
            {
                // Get the sessions
                var sessions = await _context.Sessions
                    .Where(s => s.UserId == userId)
                    .ToListAsync();

                // If there are no sessions, return 204 No Content
                if (sessions.Count == 0)
                {
                    return NoContent();
                }

                // Return the list of sessions
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
