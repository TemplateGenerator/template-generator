using System.ComponentModel.DataAnnotations;

namespace template_generator.Models.Accounts
{
    public class SignIn
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
