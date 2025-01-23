import api from './api';
import { Playlist, PlaylistItem } from '../types/playlists';

export const playlistsApi = {
  getAllPlaylists: async (): Promise<Playlist[]> => {
    const response = await api.get('/playlists');
    return response.data;
  },

  getPlaylist: async (id: number): Promise<Playlist> => {
    const response = await api.get(`/playlists/${id}`);
    return response.data;
  },

  createPlaylist: async (playlist: Omit<Playlist, 'playlistId'>): Promise<Playlist> => {
    const response = await api.post('/playlists', playlist);
    return response.data;
  },

  updatePlaylist: async (id: number, playlist: Partial<Playlist>): Promise<void> => {
    await api.put(`/playlists/${id}`, playlist);
  },

  deletePlaylist: async (id: number): Promise<void> => {
    await api.delete(`/playlists/${id}`);
  },

  getPlaylistItems: async (playlistId: number): Promise<PlaylistItem[]> => {
    const response = await api.get(`/playlists/${playlistId}/items`);
    return response.data;
  },

  updatePlaylistItems: async (playlistId: number, items: PlaylistItem[]): Promise<void> => {
    await api.put(`/playlists/${playlistId}/items`, items);
  }
};