// Device.cs

namespace PinageAPI.Models.Domain
{
    public class Device
    {
        public int DeviceId { get; set; }
        public int? LocationId { get; set; }
        public string DeviceName { get; set; }
        public string IPAddress { get; set; }
        public DateTime? LastHeartbeat { get; set; }
        public DateTime? LastSyncTime { get; set; }
        public string Status { get; set; }
        public long? CacheSize { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public Location Location { get; set; }
        public ICollection<DeviceSchedule> DeviceSchedules { get; set; }
        public ICollection<DeviceStatus> DeviceStatuses { get; set; }
        public ICollection<ViewerEngagement> ViewerEngagements { get; set; }
        public ICollection<EngagementSummary> EngagementSummaries { get; set; }
    }
}