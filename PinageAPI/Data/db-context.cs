using Microsoft.EntityFrameworkCore;
using PinageAPI.Models.Domain;

namespace PinageAPI.Data
{
    public class PinageDbContext : DbContext
    {
        public PinageDbContext(DbContextOptions<PinageDbContext> options)
            : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<DeviceSchedule> DeviceSchedules { get; set; }
        public DbSet<DeviceStatus> DeviceStatuses { get; set; }
        public DbSet<EngagementSummary> EngagementSummaries { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationType> LocationTypes { get; set; }
        public DbSet<PlaylistItem> PlaylistItems { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<ViewerEngagement> ViewerEngagements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // DeviceSchedule configuration
            modelBuilder.Entity<DeviceSchedule>()
                .HasKey(ds => ds.ScheduleId);

            // Device configuration
            modelBuilder.Entity<Device>()
                .HasKey(d => d.DeviceId);

            // Asset configuration
            modelBuilder.Entity<Asset>()
                .HasKey(a => a.AssetId);

            // Location configuration
            modelBuilder.Entity<Location>()
                .HasKey(l => l.LocationId);

            // LocationType configuration
            modelBuilder.Entity<LocationType>()
                .HasKey(lt => lt.LocationTypeId);

            // Playlist configuration
            modelBuilder.Entity<Playlist>()
                .HasKey(p => p.PlaylistId);

            // PlaylistItem configuration
            modelBuilder.Entity<PlaylistItem>()
                .HasKey(pi => pi.PlaylistItemId);

            // DeviceStatus configuration
            modelBuilder.Entity<DeviceStatus>()
                .HasKey(ds => ds.StatusId);

            // ViewerEngagement configuration
            modelBuilder.Entity<ViewerEngagement>()
                .HasKey(ve => ve.EngagementId);

            // EngagementSummary configuration
            modelBuilder.Entity<EngagementSummary>()
                .HasKey(es => es.SummaryId);

            // Configure default values
            modelBuilder.Entity<Asset>()
                .Property(a => a.Active)
                .HasDefaultValue(true);

            modelBuilder.Entity<Device>()
                .Property(d => d.Active)
                .HasDefaultValue(true);

            modelBuilder.Entity<DeviceSchedule>()
                .Property(ds => ds.Priority)
                .HasDefaultValue(1);

            modelBuilder.Entity<DeviceSchedule>()
                .Property(ds => ds.Active)
                .HasDefaultValue(true);

            modelBuilder.Entity<DeviceStatus>()
                .Property(ds => ds.ErrorCount)
                .HasDefaultValue(0);

            // Configure required fields
            modelBuilder.Entity<Asset>()
                .Property(a => a.FileName)
                .IsRequired();

            modelBuilder.Entity<Device>()
                .Property(d => d.DeviceName)
                .IsRequired();

            modelBuilder.Entity<Location>()
                .Property(l => l.LocationName)
                .IsRequired();

            modelBuilder.Entity<Playlist>()
                .Property(p => p.PlaylistName)
                .IsRequired();

            // Configure decimal properties for DeviceStatus
            modelBuilder.Entity<DeviceStatus>()
                .Property(ds => ds.CpuUsage)
                .HasPrecision(5, 2);

            modelBuilder.Entity<DeviceStatus>()
                .Property(ds => ds.MemoryUsage)
                .HasPrecision(5, 2);

            modelBuilder.Entity<DeviceStatus>()
                .Property(ds => ds.Temperature)
                .HasPrecision(5, 2);

            // Configure decimal properties for EngagementSummary
            modelBuilder.Entity<EngagementSummary>()
                .Property(es => es.AverageAttentionScore)
                .HasPrecision(3, 2);

            modelBuilder.Entity<EngagementSummary>()
                .Property(es => es.AverageViewDuration)
                .HasPrecision(6, 2);

            // Configure decimal properties for ViewerEngagement
            modelBuilder.Entity<ViewerEngagement>()
                .Property(ve => ve.AttentionScore)
                .HasPrecision(3, 2);

            modelBuilder.Entity<ViewerEngagement>()
                .Property(ve => ve.AverageDistance)
                .HasPrecision(5, 2);
        }
    }
}
