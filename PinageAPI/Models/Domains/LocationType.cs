namespace PinageAPI.Models.Domain
{
    public class LocationType
    {
        public int LocationTypeId { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public ICollection<Location> Locations { get; set; }
    }
}