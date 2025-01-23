// Playlist.cs
namespace PinageAPI.Models.Domain
{
    public class Playlist
    {
        public int PlaylistId { get; set; }
        public string PlaylistName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public ICollection<PlaylistItem> PlaylistItems { get; set; }
        public ICollection<DeviceSchedule> DeviceSchedules { get; set; }
        public ICollection<DeviceStatus> DeviceStatuses { get; set; }
    }
}