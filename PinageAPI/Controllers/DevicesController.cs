using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceStatusController : ControllerBase
    {
        private readonly IRepository<DeviceStatus> _statusRepository;

        public DeviceStatusController(IRepository<DeviceStatus> statusRepository)
        {
            _statusRepository = statusRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceStatus>>> GetDeviceStatuses()
        {
            var statuses = await _statusRepository.GetAllAsync();
            return Ok(statuses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeviceStatus>> GetDeviceStatus(int id)
        {
            var status = await _statusRepository.GetByIdAsync(id);
            if (status == null)
            {
                return NotFound();
            }
            return Ok(status);
        }

        [HttpPost]
        public async Task<ActionResult<DeviceStatus>> CreateDeviceStatus(DeviceStatus status)
        {
            status.ReportedDateTime = DateTime.UtcNow;
            await _statusRepository.AddAsync(status);
            return CreatedAtAction(nameof(GetDeviceStatus), new { id = status.StatusId }, status);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeviceStatus(int id, DeviceStatus status)
        {
            if (id != status.StatusId)
            {
                return BadRequest();
            }

            var existingStatus = await _statusRepository.GetByIdAsync(id);
            if (existingStatus == null)
            {
                return NotFound();
            }

            _statusRepository.Update(status);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeviceStatus(int id)
        {
            var status = await _statusRepository.GetByIdAsync(id);
            if (status == null)
            {
                return NotFound();
            }

            _statusRepository.Remove(status);
            return NoContent();
        }

        [HttpGet("device/{deviceId}")]
        public async Task<ActionResult<IEnumerable<DeviceStatus>>> GetStatusesByDevice(int deviceId)
        {
            var statuses = await _statusRepository.FindAsync(s => s.DeviceId == deviceId);
            return Ok(statuses);
        }

        [HttpGet("device/{deviceId}/latest")]
        public async Task<ActionResult<DeviceStatus>> GetLatestDeviceStatus(int deviceId)
        {
            var statuses = await _statusRepository.FindAsync(s => s.DeviceId == deviceId);
            var latestStatus = statuses.OrderByDescending(s => s.ReportedDateTime).FirstOrDefault();
            
            if (latestStatus == null)
            {
                return NotFound();
            }
            
            return Ok(latestStatus);
        }

        [HttpGet("errors")]
        public async Task<ActionResult<IEnumerable<DeviceStatus>>> GetStatusesWithErrors()
        {
            var statuses = await _statusRepository.FindAsync(s => s.ErrorCount > 0);
            return Ok(statuses);
        }

        [HttpGet("temperature/above/{threshold}")]
        public async Task<ActionResult<IEnumerable<DeviceStatus>>> GetHighTemperatureStatuses(decimal threshold)
        {
            var statuses = await _statusRepository.FindAsync(s => s.Temperature > threshold);
            return Ok(statuses);
        }
    }
}