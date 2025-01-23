using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceSchedulesController : ControllerBase
    {
        private readonly IRepository<DeviceSchedule> _scheduleRepository;

        public DeviceSchedulesController(IRepository<DeviceSchedule> scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceSchedule>>> GetDeviceSchedules()
        {
            var schedules = await _scheduleRepository.GetAllAsync();
            return Ok(schedules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeviceSchedule>> GetDeviceSchedule(int id)
        {
            var schedule = await _scheduleRepository.GetByIdAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule);
        }

        [HttpPost]
        public async Task<ActionResult<DeviceSchedule>> CreateDeviceSchedule(DeviceSchedule schedule)
        {
            await _scheduleRepository.AddAsync(schedule);
            return CreatedAtAction(nameof(GetDeviceSchedule), new { id = schedule.ScheduleId }, schedule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeviceSchedule(int id, DeviceSchedule schedule)
        {
            if (id != schedule.ScheduleId)
            {
                return BadRequest();
            }

            var existingSchedule = await _scheduleRepository.GetByIdAsync(id);
            if (existingSchedule == null)
            {
                return NotFound();
            }

            _scheduleRepository.Update(schedule);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeviceSchedule(int id)
        {
            var schedule = await _scheduleRepository.GetByIdAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _scheduleRepository.Remove(schedule);
            return NoContent();
        }

        [HttpGet("device/{deviceId}")]
        public async Task<ActionResult<IEnumerable<DeviceSchedule>>> GetSchedulesByDevice(int deviceId)
        {
            var schedules = await _scheduleRepository.FindAsync(s => s.DeviceId == deviceId);
            return Ok(schedules);
        }

        [HttpGet("playlist/{playlistId}")]
        public async Task<ActionResult<IEnumerable<DeviceSchedule>>> GetSchedulesByPlaylist(int playlistId)
        {
            var schedules = await _scheduleRepository.FindAsync(s => s.PlaylistId == playlistId);
            return Ok(schedules);
        }
    }
}