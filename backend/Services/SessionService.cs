using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;

namespace PulseConnect.Services
{
    /// <summary>
    /// Service for managing user sessions.
    /// </summary>
    public class SessionService: ISessionService
    {
        private readonly APIDbContext _context;
        private readonly IJwtTokenService _JwtTokenService;

        /// <summary>
        /// Initializes a new instance of the <see cref="SessionService"/> class.
        /// </summary>
        /// <param name="context">The database Context.</param>
        /// <param name="jwtTokenService">The JWT token Service.</param>
        public SessionService(APIDbContext context, IJwtTokenService jwtTokenService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _JwtTokenService = jwtTokenService ?? throw new ArgumentNullException(nameof(jwtTokenService));
        }


        //Function to create a new session, that will be used later in the Login function

        /// <summary>
        /// Creates a new session for a user.
        /// </summary>
        /// <param name="userID">The ID of the user.</param>
        /// <param name="JwtToken">The JwtToken created by the login process.</param>
        /// <returns>The session token.</returns>
        public async Task<string> CreateSession(string userID, string JwtToken)
        {

            if (!_JwtTokenService.ValidateToken(JwtToken))
            {
                throw new Exception("Invalid JWT Token");
            }

            var session = new Session
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userID,
                SessionStart = DateTime.Now,
                SessionToken = JwtToken
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return session.SessionToken;
        }

        /// <summary>
        /// Ends a user session by marking the end time.
        /// </summary>
        /// <param name="sessionID">The Id of the session to end.</param>
        public async Task EndSession(string sessionID)
        {
            var session = await _context.Sessions.FindAsync(sessionID);

            if (session != null)
            {
                session.SessionEnd = DateTime.Now;
                session.SessionToken = null;
                _context.Sessions.Update(session);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Ends a user session internally, with optional force end flag.
        /// </summary>
        /// <param name="sessionID">The ID of the session to end.</param>
        /// <param name="forceEnd">Flag to force end the session.</param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        public async Task EndSessionInternal(string sessionID, bool forceEnd = false)
        {
            var session = await _context.Sessions.FindAsync(sessionID);

            if (session != null && (forceEnd || session.SessionEnd == null))
            {
                session.SessionEnd = DateTime.Now;
                _context.Sessions.Update(session);
                await _context.SaveChangesAsync();
            }
            // Optionally, you can handle cases where the session is already ended or doesn't exist.
            else if (session == null)
            {
                // Handle case where the session doesn't exist
                throw new ArgumentException($"Session with ID {sessionID} not found.");
            }
            else if (!forceEnd && session.SessionEnd != null)
            {
                // Handle case where the session is already ended
                throw new InvalidOperationException($"Session with ID {sessionID} is already ended.");
            }
        }
    }
}
