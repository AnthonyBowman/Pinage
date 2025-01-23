import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Play, Pause, Clock, Monitor, Calendar, MoreVertical } from 'lucide-react';
import { playlistsApi } from '../services/playlistsApi';
import { Playlist } from '../types/playlists';

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const data = await playlistsApi.getAllPlaylists();
      setPlaylists(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch playlists');
      console.error('Error fetching playlists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const formatDuration = (items: Playlist['playlistItems'] = []) => {
    const totalSeconds = items.reduce((total, item) => total + (item.displayDuration || 0), 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Playlists</h1>
          <p className="text-gray-600">Manage your content playlists</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchPlaylists}
            className="flex items-center px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Playlist
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading playlists...
          </div>
        ) : playlists.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No playlists found
          </div>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.playlistId} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{playlist.playlistName}</h3>
                      {playlist.active ? (
                        <span className="ml-2 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {formatDuration(playlist.playlistItems)}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span>Playing on {playlist.deviceCount || 0} devices</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Created {formatDate(playlist.createdDateTime)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {playlist.playlistItems?.length || 0} items
                    </span>
                    <div className="space-x-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlists;