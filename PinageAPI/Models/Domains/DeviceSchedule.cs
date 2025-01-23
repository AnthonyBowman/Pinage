namespace PinageAPI.Models.Domain
{
    public class DeviceSchedule
    {
        public int ScheduleId { get; set; }
        public int? DeviceId { get; set; }
        public int? PlaylistId { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public string DaysOfWeek { get; set; }
        public int Priority { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public Device Device { get; set; }
        public Playlist Playlist { get; set; }
    }
}