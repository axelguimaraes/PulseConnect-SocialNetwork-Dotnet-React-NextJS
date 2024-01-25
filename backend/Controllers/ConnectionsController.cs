using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Authorize]
    [Route("api/connections")]
    public class ConnectionsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ConnectionsController(APIDbContext context)
        {
            _context = context;
        }

        // POST: api/connections/add
        /// <summary>
        /// Adds a new connection between two users.
        /// </summary>
        /// 
        /// <param name="request">The connection details.</param>
        /// 
        /// <response code="201">The connection was successfully created.</response>
        /// <response code="400">Bad request, such as non-existent users or already existing connection.</response>
        /// <response code="500">An error occurred while adding the connection.</response>
        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostConnection([FromBody] Connection request)
        {
            try
            {
                // Check if the users exist
                var user1 = await _context.Users.FindAsync(request.UserId1);
                var user2 = await _context.Users.FindAsync(request.UserId2);

                // If one or both users do not exist, return a bad request
                if (user1 == null || user2 == null)
                {
                    return BadRequest("One or both users do not exist.");
                }

                // Check if the users are already connected
                var connectionExists = await _context.Connections.AnyAsync(c => (c.UserId1 == request.UserId1 && c.UserId2 == request.UserId2) || (c.UserId1 == request.UserId2 && c.UserId2 == request.UserId1));
                if (connectionExists)
                {
                    return BadRequest("Users are already connected.");
                }

                // Create a new connection
                var newConnection = new Connection
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId1 = request.UserId1,
                    UserId2 = request.UserId2,
                    Date = DateTime.UtcNow,
                    Status = ConnectionStatus.Pending
                };

                // Add the connection to the database
                _context.Connections.Add(newConnection);

                // Add the respective connection logs to the database
                var log1 = new ConnectionLog
                {
                    Id = Guid.NewGuid().ToString(),
                    ConnectionId = newConnection.Id,
                    ActionDate = newConnection.Date,
                    Description = newConnection.Status.ToString()
                };

                // Save DB changes
                await _context.SaveChangesAsync();

                // Return the new connection
                return CreatedAtAction("AddConnection", new { id = newConnection.Id }, newConnection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/connections/all
        /// <summary>
        /// Retrieves all connections.
        /// </summary>
        /// 
        /// <remarks>
        /// Fetches a list of all connections in the system. 
        /// Returns an empty response if no connections are found.
        /// </remarks>
        /// 
        /// <response code="200">Returns a list of all connections.</response>
        /// <response code="204">No connections were found (empty list).</response>
        /// <response code="404">Not found, when the connections data is null.</response>
        /// <response code="500">An error occurred while retrieving the connections.</response>
        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IQueryable<Connection>>> GetAllConnections()
        {
            try
            {
                var connections = await _context.Connections.ToListAsync();

                if (connections == null)
                {
                    return NotFound();
                }

                // Empty list
                if (connections.Count == 0) {
                    return NoContent();
                }

                return Ok(connections);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/connections/{id}
        /// <summary>
        /// Retrieves a specific connection by ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the connection.</param>
        /// 
        /// <response code="200">Returns the requested connection.</response>
        /// <response code="404">Connection with the specified ID not found.</response>
        /// <response code="500">An error occurred while retrieving the connection.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Connection>> GetConnection(String id)
        {
            try
            {
                // Check id is valid (null or empty)
                if (id.IsNullOrEmpty())
                {
                    return BadRequest("Invalid id.");
                }

                // Find the connection
                var connection = await _context.Connections.Where(c => c.UserId1 == id || c.UserId2 == id).ToListAsync();

                // If the connection does not exist, return a not found
                if (connection == null)
                {
                    return NotFound();
                }

                // Return the connection
                return Ok(connection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Connections/{id}
        /// <summary>
        /// Updates the status of a connection.
        /// </summary>
        /// 
        /// <param name="id">The ID of the connection to update.</param>
        /// <param name="updatedConnection">The updated connection data.</param>
        /// 
        /// <response code="200">Connection updated successfully.</response>
        /// <response code="400">Bad request, such as invalid update information or blocked status.</response>
        /// <response code="404">Connection with the specified ID not found.</response>
        /// <response code="500">An error occurred while updating the connection.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateConnectionStatus(string id, [FromBody] Connection updatedConnection)
        {
            try
            {
                // Check if the connection exists
                var existingConnection = await _context.Connections.FindAsync(id);

                // If the connection does not exist, return a not found
                if (existingConnection == null)
                {
                    return NotFound();
                }

                // Check if the connection is being updated with the same information
                if (existingConnection.UserId1 != updatedConnection.UserId1 || existingConnection.UserId2 != updatedConnection.UserId2)
                {
                    return BadRequest("Invalid update information.");
                }

                // Check if the connection is already blocked
                if (existingConnection.Status == ConnectionStatus.Blocked)
                {
                    return BadRequest("Connection status cannot be blocked.");
                }

                // Check if the connection is being updated to accepted but is not pending
                if (updatedConnection.Status == ConnectionStatus.Accepted && existingConnection.Status != ConnectionStatus.Pending)
                {
                    return BadRequest("Connection status must be pending to be accepted.");
                }

                // Update the connection
                existingConnection.Status = updatedConnection.Status;

                // Update the connection in the database
                _context.Entry(existingConnection).State = EntityState.Modified;

                // Add the respective connection logs to the database
                var log = new ConnectionLog
                {
                    Id = Guid.NewGuid().ToString(),
                    ConnectionId = existingConnection.Id,
                    ActionDate = DateTime.UtcNow,
                    Description = existingConnection.Status.ToString()
                };
                
                // Save DB changes
                _context.ConnectionLogs.Add(log);
                await _context.SaveChangesAsync();

                // Return the updated connection
                return Ok(existingConnection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Connections/{id}
        /// <summary>
        /// Deletes a connection.
        /// </summary>
        /// 
        /// <param name="id">The ID of the connection to delete.</param>
        /// <param name="deletionInfo">The deletion information.</param>
        /// 
        /// <response code="200">Connection deleted successfully.</response>
        /// <response code="400">Bad request, such as invalid deletion information.</response>
        /// <response code="404">Connection with the specified ID not found.</response>
        /// <response code="500">An error occurred while deleting the connection.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Connection>> DeleteConnection(string id, [FromBody] Connection deletionInfo)
        {
            try
            {
                // Check if the request is valid
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if the connection exists
                var existingConnection = await _context.Connections.FindAsync(id);

                // If the connection does not exist, return a not found
                if (existingConnection == null)
                {
                    return NotFound();
                }

                // Check if the connection is being deleted with the same information
                if (existingConnection.UserId1 != deletionInfo.UserId1 || existingConnection.UserId2 != deletionInfo.UserId2)
                {
                    return BadRequest("Invalid deletion information.");
                }

                // Delete the connection
                _context.Connections.Remove(existingConnection);

                // Save DB changes
                await _context.SaveChangesAsync();

                // Return the deleted connection
                return Ok(existingConnection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
