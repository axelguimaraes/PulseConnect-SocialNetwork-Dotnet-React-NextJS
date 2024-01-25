using JsonApiDotNetCore.Resources;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("PasswordReset")]
    public class PasswordReset
    {
        public String Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public required String UserId { get; set; }

        [Required]
        public required String Token { get; set; }

        [Required]
        public DateTime ExpireDate { get; set; }
    }

    public class ResetPassword
    {
        [Required]
        public required String CurrentPassword { get; set; }

        [Required]
        public required String NewPassword { get; set; }
    }
}
