namespace PinageAPI.Models.Domain
{
    public class ViewerEngagement
    {
        public int EngagementId { get; set; }
        public int? DeviceId { get; set; }
        public int? AssetId { get; set; }
        public int? PlaylistItemId { get; set; }
        public DateTime DetectionDateTime { get; set; }
        public int ViewerCount { get; set; }
        public int ViewDurationSeconds { get; set; }
        public decimal? AverageDistance { get; set; }
        public string EstimatedAgeRange { get; set; }
        public decimal? AttentionScore { get; set; }
        public string GenderDistribution { get; set; }

        // Navigation properties
        public Device Device { get; set; }
        public Asset Asset { get; set; }
        public PlaylistItem PlaylistItem { get; set; }
    }
}