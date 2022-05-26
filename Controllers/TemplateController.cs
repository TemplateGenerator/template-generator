using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using template_generator.Models;

namespace template_generator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TemplateController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("download")]
        public async Task<FileContentResult> Download(Template template)
        {
            if (ModelState.IsValid)
            {
                var templateName = template.Platform + "-" + template.Frontend + "-" + template.Backend;
                byte[]? reqBytes;
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "Request");
                    var apistr = _configuration.GetValue<string>("GithubApi:Repo:Download:Front") + templateName + _configuration.GetValue<string>("GithubApi:Repo:Download:Back");
                    var res = client.GetAsync(apistr).Result;
                    reqBytes = await res.Content.ReadAsByteArrayAsync();
                }
                return File(reqBytes, "application/zip", true);
            }
            return null;
        }
    }
}
