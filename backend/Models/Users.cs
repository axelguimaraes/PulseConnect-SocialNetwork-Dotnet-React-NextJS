using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PulseConnect.Models
{
    [Table("Users")]
    public class Users : IdentityUser
    {
        [Required]
        public String FirstName { get; set; }

        [Required]
        public String LastName { get; set; }

        public String? Bio { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public String? ProfilePictureURL { get; set; }

        public String? HeaderImageURL { get; set; }

        public String? City{ get; set; }

        public String? CustomURL{ get; set; }

        public int? ConnectionsCount { get; set; }

        public DateTime LastActive { get; set; }

        [Required]
        public GenderEnum Gender { get; set; }

        public String? Country { get; set; }

        public Boolean MultiFactorEnable { get; set; }

        public String? MultiFactorCode { get; set; }

        public DateTime? MultiFactorExpired { get; set; }

        public DefaultType? MultiFactorType { get; set; }

        public Boolean IsOnline { get; set; } = false;

        public Boolean IsAccountActive { get; set; } = true;

    }

    public enum GenderEnum
    {
        Male,
        Female
    }

    public enum DefaultType
    {
        PhoneNumber,
        Email
    }

    public class AuthLoginRequest
    { 
        [Required]
        public String Email { get; set; }

        [Required]
        public String Password { get; set; }
    }

    public class AuthRegisterRequest
    {
        [Required]
        public String FirstName { get; set; }

        [Required]
        public String LastName { get; set; }

        [Required]
        public String UserName { get; set; }

        [Required]
        public String Email { get; set; }

        [Required]
        public String Password { get; set; }

        [Required]
        public String ConfirmPassword { get; set; }


    }

    public class  RequestAddUser
    {
        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "You must specify password between 8 and 20 characters")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        public string Bio { get; set; }

        public GenderEnum Gender { get; set; }

        public string Country { get; set; }

    }
}