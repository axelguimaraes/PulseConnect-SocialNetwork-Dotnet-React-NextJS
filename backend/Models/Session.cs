using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("Sessions")]
    public class Session
    {
        public String Id { get; set; } = Guid.NewGuid().ToString();

        // Foreign Key
        [Required (ErrorMessage ="User ID is required")]
        public String UserId { get; set; }

        [Required(ErrorMessage ="Session Start Time is required")]
        public DateTime SessionStart { get; set; }

        public DateTime? SessionEnd { get; set; } // This is not required, as the session may still be active

        public String? SessionToken { get; set; } 

        public String? Device { get; set; }
    }
}
