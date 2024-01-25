using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("connections/logs")]
    public class ConnectionLogsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ConnectionLogsController(APIDbContext context)
        {
            _context = context;
        }

        // GET /connections/log/{id}
        /// <summary>
        /// Gets a connection log by its ID.
        /// </summary>
        /// 
        /// <param name="id">The ID of the log.</param>
        /// 
        /// <remarks>
        /// Retrieves a single connection log based on its ID.
        /// </remarks>
        /// 
        /// <response code="200">Returns the requested log.</response>
        /// <response code="400">Bad request, invalid ID.</response>
        /// <response code="404">Log with the specified ID was not found.</response>
        /// <response code="500">An error occurred while retrieving the log.</response>
        [HttpGet("log/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetLogById(string id)
        {
            try
            {
                // Check if id is valid
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Invalid id");
                }

                // Get log
                var log = await _context.ConnectionLogs.FindAsync(id);
                if (log == null)
                {
                    return NotFound();
                }

                return Ok(log);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET /connections/logs?filter[connection]=id_connection
        /// <summary>
        /// Retrieves connection logs by connection ID.
        /// </summary>
        /// 
        /// <param name="filter">The connection ID to filter the logs.</param>
        /// 
        /// <response code="200">Returns a list of connection logs for the specified connection.</response>
        /// <response code="204">No connection logs were found.</response>
        /// <response code="400">Bad request, invalid filter.</response>
        /// <response code="404">No logs found for the given connection ID.</response>
        /// <response code="500">An error occurred while retrieving the logs.</response>
        [HttpGet]
        [ApiExplorerSettings(GroupName = "LogsByConnection")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetLogsByConnection([FromQuery] string filter)
        {
            try
            {
                // Check filter format
                if (!filter.Contains("="))
                {
                    return BadRequest("Invalid filter format");
                }

                // Check filter is valid
                if (string.IsNullOrEmpty(filter))
                {
                    return BadRequest("Invalid filter");
                }

                var logs = await _context.ConnectionLogs
                    .Where(log => log.ConnectionId == filter)
                    .ToListAsync();

                // If logs don't exists
                if (logs == null)
                {
                    return NotFound();
                }

                // If logs is empty
                if (logs.Count == 0)
                {
                    return NoContent();
                }

                return Ok(logs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET /connections/logs?filter[date]=yyyymmdd
        /// <summary>
        /// Retrieves connection logs by date.
        /// </summary>
        /// 
        /// <param name="filter">The date in 'yyyymmdd' format to filter the logs.</param>
        /// 
        /// <response code="200">Returns a list of connection logs for the specified date.</response>
        /// <response code="204">No connection logs were found.</response>
        /// <response code="400">Bad request, such as invalid date format.</response>
        /// <response code="500">An error occurred while retrieving the logs.</response>
        [HttpGet]
        [ApiExplorerSettings(GroupName = "LogsByDate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetLogsByDate([FromQuery] string filter)
        {
            try
            {
                // Check filter format
                if (!filter.Contains("="))
                {
                    return BadRequest("Invalid filter format");
                }

                // Check filter is valid
                if (string.IsNullOrEmpty(filter))
                {
                    return BadRequest("Invalid filter");
                }

                // Check date format
                if (!DateTime.TryParseExact(filter, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var parsedDate))
                {
                    return BadRequest("Invalid date format. Use yyyymmdd");
                }

                // Get logs
                var logs = await _context.ConnectionLogs
                    .Where(log => log.ActionDate.Date == parsedDate.Date)
                    .ToListAsync();

                // If logs is null
                if (logs == null)
                {
                    return NotFound();
                }

                // If logs is empty
                if (logs.Count == 0)
                {
                    return NoContent();
                }

                return Ok(logs);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET /connections/logs/last/{ConnectionId}
        /// <summary>
        /// Retrieves the most recent connection log for a specific connection.
        /// </summary>
        /// 
        /// <param name="ConnectionId">The ID of the connection to retrieve the most recent log for.</param>
        /// 
        /// <remarks>
        /// This endpoint fetches the latest log entry for a given connection identified by the ConnectionId.
        /// </remarks>
        /// 
        /// <response code="200">Returns the most recent connection log for the specified connection.</response>
        /// <response code="400">Bad request, invalid ConnectionId.</response>
        /// <response code="404">No connection logs found for the given connection ID or the connection itself does not exist.</response>
        /// <response code="500">An error occurred while retrieving the log.</response>
        [HttpGet("last/{ConnectionId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetLastLog(String ConnectionId)
        {
            try
            {
                // Check ConnectionId input
                if (ConnectionId.IsNullOrEmpty())
                {
                    return BadRequest("Invalid ConnectionId");
                }

                // Find the connection
                var connection = await _context.Connections.FindAsync(ConnectionId);

                // If the connection does not exist, return a not found
                if (connection == null)
                {
                    return NotFound();
                }

                // Get last log for the specified connection
                var log = await _context.ConnectionLogs
                    .Where(l => l.ConnectionId == ConnectionId)
                    .OrderByDescending(l => l.ActionDate)
                    .FirstOrDefaultAsync();

                // Log don´t exists
                if (log == null)
                {
                    return NotFound("No connection logs found for the given connection ID.");
                }

                return Ok(log);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
