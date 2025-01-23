// PlaylistItem.cs

namespace PinageAPI.Models.Domain
{
    public class PlaylistItem
    {
        public int PlaylistItemId { get; set; }
        public int? PlaylistId { get; set; }
        public int? AssetId { get; set; }
        public int DisplayOrder { get; set; }
        public int? DisplayDuration { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public Playlist Playlist { get; set; }
        public Asset Asset { get; set; }
        public ICollection<ViewerEngagement> ViewerEngagements { get; set; }
    }
}