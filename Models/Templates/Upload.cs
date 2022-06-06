namespace template_generator.Models.Templates
{
    public class Upload
    {
        public string FrontendName { get; set; }
        public IFormFile FrontendImage { get; set; }
        public string BackendName { get; set; }
        public IFormFile BackendImage { get; set; }
        public string Platform { get; set; }
    }
}
