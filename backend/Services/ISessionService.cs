namespace PulseConnect.Services
{
    /// <summary>
    /// Service for managing user sessions.
    /// </summary>
    public interface ISessionService
    {
        /// <summary>
        /// Creates a new session for a user.
        /// </summary>
        /// <param name="userID">The ID of the user.</param>
        /// <param name="JwtToken">The JWT token created by the login process.</param>
        /// <returns>The session token.</returns>
        Task<string> CreateSession(string userID, string JwtToken);

        /// <summary>
        /// Ends a user session by marking the end time.
        /// </summary>
        /// <param name="sessionID">The ID of the session to end.</param>
        Task EndSession(string sessionID);
        
        /// <summary>
        /// Ends a user session internally, with optional force end flag.
        /// </summary>
        /// <param name="sessionID">The ID of the session to end.</param>
        /// <param name="forceEnd">Flag to force end the session.</param>
        Task EndSessionInternal(string sessionID, bool forceEnd);
    }
}
