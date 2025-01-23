namespace PinageAPI.Models.Domain
{
    public class EngagementSummary
    {
        public int SummaryId { get; set; }
        public int? DeviceId { get; set; }
        public int? AssetId { get; set; }
        public DateTime DateSummary { get; set; }
        public int TotalViewers { get; set; }
        public decimal AverageViewDuration { get; set; }
        public int PeakViewerCount { get; set; }
        public int TotalEngagementSeconds { get; set; }
        public decimal? AverageAttentionScore { get; set; }

        // Navigation properties
        public Device Device { get; set; }
        public Asset Asset { get; set; }
    }
}