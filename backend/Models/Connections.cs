using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("Connections")]
    public class Connection
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public ConnectionStatus Status { get; set; }

        // Foreign Key
        [Required]
        public String UserId1 { get; set; }

        // Foreign Key
        [Required]
        public String UserId2 { get; set; }
    }

    public enum ConnectionStatus
    {
        [Display(Name = "Imported")]
        Imported,

        [Display(Name = "Pending")]
        Pending,

        [Display(Name = "Accepted")]
        Accepted,

        [Display(Name = "Blocked")]
        Blocked
    }
}
