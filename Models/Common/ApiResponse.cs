using Newtonsoft.Json;

namespace template_generator.Models.Common
{
    public class ApiResponse
    {
        [JsonProperty("Code")]
        public int Code { get; set; }
        [JsonProperty("Message")]
        public string? Message { get; set; }
    }
}
