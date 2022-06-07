using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using template_generator.Common;
using template_generator.Models;
using template_generator.Models.Templates;

namespace template_generator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TemplatesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private TemplateBookDbContext _dbContext;

        public TemplatesController(IConfiguration configuration,
                                    TemplateBookDbContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        //[Authorize]
        [HttpPost("upload")]
        public async Task<UploadResponse> Upload([FromForm]Upload model)
        {
            UploadResponse response = new UploadResponse();
            try
            {
                var template = new Template
                {
                    Backend = model.BackendName,
                    Frontend = model.FrontendName,
                    Platform = model.Platform
                };
                if (_dbContext.Templates.Contains<Template>(template))
                {
                    response.Code = StatusCodes.Status304NotModified;
                    response.Message = Constants.Templates.TEMPLATE_ALREADY_EXISTS;
                }
                else
                {
                    using (var s3client = new AmazonS3Client(region: Amazon.RegionEndpoint.USEast1))
                    {
                        using(var memoryStream = new MemoryStream())
                        {
                            model.FrontendImage.CopyTo(memoryStream);
                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = memoryStream,
                                Key = model.FrontendName.Replace(" ", "") + ".svg",
                                BucketName = _configuration.GetValue<string>("AWS:S3Images"),
                                ContentType = "image/svg+xml"
                            };
                            var fileTransferUtility = new TransferUtility(s3client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                        using(var memoryStream = new MemoryStream())
                        {
                            model.BackendImage.CopyTo(memoryStream);
                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = memoryStream,
                                Key = model.BackendName.Replace(" ", "") + ".svg",
                                BucketName = _configuration.GetValue<string>("AWS:S3Images"),
                                ContentType = "image/svg+xml"
                            };
                            var fileTransferUtility = new TransferUtility(s3client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                
                    _dbContext.Templates.Add(template);
                    _dbContext.SaveChanges();
                    response.Code = StatusCodes.Status200OK;
                    response.Message = Constants.Templates.UPLOAD_SUCCESSFUL;
                }
            }
            catch (Exception ex)
            {
                response.Code = StatusCodes.Status500InternalServerError;
                response.Message = Constants.Templates.UPLOAD_FAILED;
            }
            return response;
        }

        [HttpGet("alltemplates")]
        public async Task<List<Template>> GetAllTemplates()
        {
            try
            {
                return _dbContext.Templates.ToList();
            }
            catch (Exception ex)
            {
                return new List<Template>();
            }
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
