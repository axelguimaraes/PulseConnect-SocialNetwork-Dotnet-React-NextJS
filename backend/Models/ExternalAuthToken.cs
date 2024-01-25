using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ExternalAuthToken")]
    public class ExternalAuthToken
    {
        [Key]
        public String Id { get; set; } = Guid.NewGuid().ToString();

        [Required] // FK
        public String ThirdPartyAccountId { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        public String AccessToken { get; set; }
    }
}
