using Microsoft.AspNetCore.Mvc;

namespace cloudinaryweb.Controllers;

[ApiController]
[Route("[controller]")]
public class CloudinaryController : ControllerBase
{
    private readonly IConfiguration Configuration;
    private readonly ILogger<CloudinaryController> _logger;

    public CloudinaryController(IConfiguration configuration, ILogger<CloudinaryController> logger)
    {
        Configuration = configuration;
        _logger = logger;
    }

    [HttpGet("all-images")]
        public async Task<IActionResult> GetAllImages()
    {
        var cloud_name = Configuration["Cloudinary:CloudName"];
        var cloud_tags = Configuration["Cloudinary:CloudTags"];
        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri($"https://api.cloudinary.com/");
        client.DefaultRequestHeaders.Add("Authorization", $"Basic " + Configuration["Cloudinary:CloudApiBase64Secret"] );

        var result = await client.GetAsync($"v1_1/{cloud_name}/resources/image/tags/{cloud_tags}");
        if(result.StatusCode == System.Net.HttpStatusCode.OK){
            return new OkObjectResult(await result.Content.ReadAsStringAsync());
        }

        return new BadRequestResult();
    }

    [HttpGet("delete-all-images")]
    public async Task<IActionResult> DeleteCloudinaryAsync()
    {
        var cloud_name = Configuration["Cloudinary:CloudName"];
        var cloud_tags = Configuration["Cloudinary:CloudTags"];
        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri($"https://api.cloudinary.com/");
        client.DefaultRequestHeaders.Add("Authorization", $"Basic " + Configuration["Cloudinary:CloudApiBase64Secret"] );

        var result = await client.DeleteAsync($"v1_1/{cloud_name}/resources/image/tags/{cloud_tags}");
        if(result.StatusCode == System.Net.HttpStatusCode.OK){
            return new OkObjectResult(await result.Content.ReadAsStringAsync());
        }

        return new BadRequestResult();
    }
}
