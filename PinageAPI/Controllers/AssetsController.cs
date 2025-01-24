using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;
using PinageAPI.Services;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly IRepository<Asset> _assetRepository;
        private readonly IFileStorageService _fileStorageService;
        private readonly IUnitOfWork _unitOfWork;

        public AssetsController(
            IRepository<Asset> assetRepository,
            IFileStorageService fileStorageService,
            IUnitOfWork unitOfWork)
        {
            _assetRepository = assetRepository;
            _fileStorageService = fileStorageService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<Asset>> UploadAsset(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            try
            {
                // Save file and get storage details
                var (fileName, contentUrl) = await _fileStorageService.SaveFileAsync(file);
                var fileHash = _fileStorageService.GetFileHash(file);

                // Determine file type and format
                var fileType = DetermineFileType(file.ContentType);
                var fileFormat = Path.GetExtension(file.FileName).TrimStart('.').ToLower();

                // Create asset record
                var asset = new Asset
                {
                    FileName = Path.GetFileName(file.FileName),
                    FileType = fileType,
                    FileFormat = fileFormat,
                    FileSize = file.Length,
                    FileHash = fileHash,
                    UploadedBy = 1, // TODO: Get from authentication
                    UploadDateTime = DateTime.UtcNow,
                    Duration = null, // TODO: Calculate for video/audio
                    Active = true,
                    ContentUrl = contentUrl
                };

                await _assetRepository.AddAsync(asset);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, asset);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, "Error uploading file");
            }
        }

        private string DetermineFileType(string contentType)
        {
            if (contentType.StartsWith("video/"))
                return "video";
            else if (contentType.StartsWith("image/"))
                return "image";
            else if (contentType.StartsWith("audio/"))
                return "audio";
            else
                return "other";
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAssets()
        {
            var assets = await _assetRepository.GetAllAsync();
            return Ok(assets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound();
            }
            return Ok(asset);
        }

        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset(Asset asset)
        {
            asset.UploadDateTime = DateTime.UtcNow;
            await _assetRepository.AddAsync(asset);
            return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, asset);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(int id, Asset asset)
        {
            if (id != asset.AssetId)
            {
                return BadRequest();
            }

            var existingAsset = await _assetRepository.GetByIdAsync(id);
            if (existingAsset == null)
            {
                return NotFound();
            }

            _assetRepository.Update(asset);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _assetRepository.Remove(asset);
            return NoContent();
        }

        [HttpGet("type/{fileType}")]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAssetsByType(string fileType)
        {
            var assets = await _assetRepository.FindAsync(a => a.FileType == fileType);
            return Ok(assets);
        }
    }
}