using System.ComponentModel.DataAnnotations;

namespace template_generator.Models.Accounts
{
    public class ForgotPassword
    {
        [Required]
        public string Email { get; set; }
    }
}
