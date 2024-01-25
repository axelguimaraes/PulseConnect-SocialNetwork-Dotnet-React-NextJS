using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ThirdPartyAccount")]
    public class ThirdPartyAccount
    {

        public String Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public String UserId { get; set; }

        [Required]
        public String AccountType { get; set; }
    }
}
