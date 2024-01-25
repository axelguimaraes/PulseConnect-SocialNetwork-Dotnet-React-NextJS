using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseConnect.Models
{
    [Table("ConnectionLog")]
    public class ConnectionLog
    {

        [Required]
        public String Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public DateTime ActionDate { get; set; }

        [Required]
        public String Description { get; set; }

        // Foreign Key
        [Required]
        public String ConnectionId { get; set; }

    }
}
