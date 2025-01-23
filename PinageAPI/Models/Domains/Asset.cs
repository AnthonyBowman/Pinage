// Asset.cs
namespace PinageAPI.Models.Domain
{
    public class Asset
    {
        public int AssetId { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileFormat { get; set; }
        public long FileSize { get; set; }
        public string FileHash { get; set; }
        public int UploadedBy { get; set; }
        public DateTime UploadDateTime { get; set; }
        public int? Duration { get; set; }
        public bool? Active { get; set; }
        public string ContentUrl { get; set; }

        // Navigation properties
        public ICollection<PlaylistItem> PlaylistItems { get; set; }
        public ICollection<DeviceStatus> DeviceStatuses { get; set; }
        public ICollection<ViewerEngagement> ViewerEngagements { get; set; }
        public ICollection<EngagementSummary> EngagementSummaries { get; set; }
    }
}
