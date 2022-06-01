using System.ComponentModel.DataAnnotations;

namespace template_generator.Models.Accounts
{
    public class ConfirmNewPassword
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string ConfirmationCode { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        public string NewConfirmPassword { get; set; }
    }
}
