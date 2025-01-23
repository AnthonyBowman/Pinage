using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly IRepository<Asset> _assetRepository;

        public AssetsController(IRepository<Asset> assetRepository)
        {
            _assetRepository = assetRepository;
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