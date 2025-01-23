namespace PinageAPI.Models.Domain
{
    public class Location
    {
        public int LocationId { get; set; }
        public int? LocationTypeId { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPhone { get; set; }
        public bool? Active { get; set; }

        // Navigation properties
        public LocationType LocationType { get; set; }
        public ICollection<Device> Devices { get; set; }
    }
}