namespace PinageAPI.Models.Domain
{
    public class DeviceStatus
    {
        public int StatusId { get; set; }
        public int? DeviceId { get; set; }
        public DateTime ReportedDateTime { get; set; }
        public int? CurrentPlaylistId { get; set; }
        public int? CurrentAssetId { get; set; }
        public decimal? CpuUsage { get; set; }
        public decimal? MemoryUsage { get; set; }
        public decimal? Temperature { get; set; }
        public int? ErrorCount { get; set; }
        public string LastError { get; set; }

        // Navigation properties
        public Device Device { get; set; }
        public Playlist CurrentPlaylist { get; set; }
        public Asset CurrentAsset { get; set; }
    }
}