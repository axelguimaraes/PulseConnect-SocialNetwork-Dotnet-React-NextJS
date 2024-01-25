using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Data;
using PulseConnect.Models;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Mail;

namespace PulseConnect.Controllers
{

    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    public class PasswordResetController : Controller
    {
        private readonly APIDbContext _context;
        private readonly UserManager<Users> _userManager;

        public PasswordResetController(APIDbContext context, UserManager<Users> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST: api/passwordreset/request
        /// <summary>
        /// Requests a password reset for a user.
        /// </summary>
        /// 
        /// <param name="request">The password reset request details.</param>
        /// 
        /// <response code="200">Password reset request was successful, and the reset token is returned.</response>
        /// <response code="400">Bad request, such as a non-existent user or an error in sending the email.</response>
        /// <response code="500">An error occurred while processing the request.</response>
        [HttpPost("request")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RequestPasswordReset([FromBody] PasswordReset request)
        {
            try
            {
                // Found user in database by username
                var user = await _userManager.FindByIdAsync(request.UserId);

                // If user not found, return bad request
                if (user == null)
                {
                    return BadRequest("User not found");
                }

                // Generate response token
                PasswordReset passwordReset = new PasswordReset
                {
                    UserId = user.Id,
                    Token = _userManager.GeneratePasswordResetTokenAsync(user).Result,
                    ExpireDate = DateTime.UtcNow.AddMinutes(15)
                };

                // Store token in database
                _context.PasswordResets.Add(passwordReset);
                await _context.SaveChangesAsync();

                // If user contais email, send email
                if (!String.IsNullOrEmpty(user.Email))
                {
                    SendResetPasswordEmail(user.Email, passwordReset.Token);
                }

                // Return token
                return Ok(new { token = passwordReset.Token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        
        }

        // POST: api/passwordreset/reset
        /// <summary>
        /// Resets the user's password.
        /// </summary>
        /// 
        /// <param name="token">The reset token received from the password reset request.</param>
        /// <param name="request">The new password details.</param>
        /// 
        /// <response code="200">Password reset was successful.</response>
        /// <response code="400">Bad request, such as invalid token, password criteria not met, or incorrect current password.</response>
        /// <response code="500">An error occurred while resetting the password.</response>
        [HttpPost("reset")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ResetPassword([FromQuery] String token, [FromBody] ResetPassword request)
        {
            // Validate request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check new password is equal to current password
                if (request.CurrentPassword.Equals(request.NewPassword))
                {
                    return BadRequest("New password must be different from current password.");
                }

                // Find token in database
                var passwordReset = await _context.PasswordResets.FirstOrDefaultAsync(x => x.Token == token && x.ExpireDate > DateTime.Now);

                // If token not found, return bad request
                if (passwordReset == null)
                {
                    return BadRequest("Token not found.");
                }

                // Find user in database
                var user = await _userManager.FindByIdAsync(passwordReset.UserId);

                // If user not found, return bad request
                if (user == null)
                {
                    return BadRequest("User not found.");
                }

                // Check if current password is correct
                var isCurrentPasswordCorrect = await _userManager.CheckPasswordAsync(user, request.CurrentPassword);
                if (!isCurrentPasswordCorrect)
                {
                    return BadRequest("Current password is incorrect.");
                }

                // Reset password
                var resetPasswordResult = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);
                Console.WriteLine(resetPasswordResult);

                // If reset password failed, return bad request
                if (!resetPasswordResult.Succeeded)
                {
                    return BadRequest("Failed to reset password.");
                }

                // Remove token from database
                _context.PasswordResets.Remove(passwordReset);
                await _context.SaveChangesAsync();

                // Return success
                return Ok("Password reset successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private void SendResetPasswordEmail(string userEmail, string resetToken)
        {
            
            var resetUrl = $"https://localhost/PasswordReset/reset?token={resetToken}";

            var smtpClient = new SmtpClient()
            {
                Port = 587,
                Credentials = new NetworkCredential("lds.pulseconnect@gmail.com", "frmu pvee jngb bmkn"),
                EnableSsl = true,
        };
            var mailMessage = new MailMessage
            {
                From = new MailAddress("lds.pulseconnect@gmail.com"),
                Subject = "Redefinição de Senha",
                Body = $"Clique no link a seguir para redefinir sua senha: {resetUrl}",
                IsBodyHtml = false
            };

            mailMessage.To.Add(userEmail);

            smtpClient.Send(mailMessage);
        }


    }

}


