using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly IRepository<Location> _locationRepository;

        public LocationsController(IRepository<Location> locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            var locations = await _locationRepository.GetAllAsync();
            return Ok(locations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            var location = await _locationRepository.GetByIdAsync(id);
            if (location == null)
            {
                return NotFound();
            }
            return Ok(location);
        }

        [HttpPost]
        public async Task<ActionResult<Location>> CreateLocation(Location location)
        {
            await _locationRepository.AddAsync(location);
            return CreatedAtAction(nameof(GetLocation), new { id = location.LocationId }, location);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLocation(int id, Location location)
        {
            if (id != location.LocationId)
            {
                return BadRequest();
            }

            var existingLocation = await _locationRepository.GetByIdAsync(id);
            if (existingLocation == null)
            {
                return NotFound();
            }

            _locationRepository.Update(location);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _locationRepository.GetByIdAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _locationRepository.Remove(location);
            return NoContent();
        }

        [HttpGet("type/{locationTypeId}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocationsByType(int locationTypeId)
        {
            var locations = await _locationRepository.FindAsync(l => l.LocationTypeId == locationTypeId);
            return Ok(locations);
        }

        [HttpGet("city/{city}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocationsByCity(string city)
        {
            var locations = await _locationRepository.FindAsync(l => l.City == city);
            return Ok(locations);
        }
    }
}