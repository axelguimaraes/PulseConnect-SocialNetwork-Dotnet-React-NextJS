namespace PulseConnect.Services
{
    /// <summary>
    /// Service for handling JWT tokens operations.
    /// </summary>
    public interface IJwtTokenService
    {
        /// <summary>
        /// Generates a JWT token for the given user.
        /// </summary>
        /// <param name="userID">The ID of the user whom the token is generated.</param>
        /// <returns>The generated JWT token.</returns>
        string GenerateToken(string userID);

        /// <summary>
        /// Validates the given JWT token.
        /// </summary>
        /// <param name="token">The JWT token to validate.</param>
        /// <returns>True if the token is valid; otherwise, false.</returns>

        bool ValidateToken(string token);
    }
}
