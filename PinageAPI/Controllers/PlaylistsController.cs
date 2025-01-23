using Microsoft.AspNetCore.Mvc;
using PinageAPI.Infrastructure.Repositories;
using PinageAPI.Models.Domain;

namespace PinageAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistsController : ControllerBase
    {
        private readonly IRepository<Playlist> _playlistRepository;

        public PlaylistsController(IRepository<Playlist> playlistRepository)
        {
            _playlistRepository = playlistRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Playlist>>> GetPlaylists()
        {
            var playlists = await _playlistRepository.GetAllAsync();
            return Ok(playlists);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Playlist>> GetPlaylist(int id)
        {
            var playlist = await _playlistRepository.GetByIdAsync(id);
            if (playlist == null)
            {
                return NotFound();
            }
            return Ok(playlist);
        }

        [HttpPost]
        public async Task<ActionResult<Playlist>> CreatePlaylist(Playlist playlist)
        {
            playlist.CreatedDateTime = DateTime.UtcNow;
            await _playlistRepository.AddAsync(playlist);
            return CreatedAtAction(nameof(GetPlaylist), new { id = playlist.PlaylistId }, playlist);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlaylist(int id, Playlist playlist)
        {
            if (id != playlist.PlaylistId)
            {
                return BadRequest();
            }

            var existingPlaylist = await _playlistRepository.GetByIdAsync(id);
            if (existingPlaylist == null)
            {
                return NotFound();
            }

            _playlistRepository.Update(playlist);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylist(int id)
        {
            var playlist = await _playlistRepository.GetByIdAsync(id);
            if (playlist == null)
            {
                return NotFound();
            }

            _playlistRepository.Remove(playlist);
            return NoContent();
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Playlist>>> GetActivePlaylists()
        {
            var playlists = await _playlistRepository.FindAsync(p => p.Active == true);
            return Ok(playlists);
        }
    }
}