// Services/IFileStorageService.cs
namespace PinageAPI.Services
{
    public interface IFileStorageService
    {
        Task<(string fileName, string contentUrl)> SaveFileAsync(IFormFile file);
        Task DeleteFileAsync(string fileName);
        string GetFileHash(IFormFile file);
    }
}

// Services/LocalFileStorageService.cs
namespace PinageAPI.Services
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _uploadDirectory;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public LocalFileStorageService(
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
            _uploadDirectory = Path.Combine(_environment.ContentRootPath, "Uploads");
            
            // Ensure upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        public async Task<(string fileName, string contentUrl)> SaveFileAsync(IFormFile file)
        {
            // Generate a unique filename
            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_uploadDirectory, uniqueFileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Generate the content URL - use the correct port
            var contentUrl = $"/uploads/{uniqueFileName}";

            return (uniqueFileName, contentUrl);
        }

        public async Task DeleteFileAsync(string fileName)
        {
            var filePath = Path.Combine(_uploadDirectory, fileName);
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }

        public string GetFileHash(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                using (var sha256 = System.Security.Cryptography.SHA256.Create())
                {
                    var hash = sha256.ComputeHash(ms.ToArray());
                    return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
                }
            }
        }
    }
}