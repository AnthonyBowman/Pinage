// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import api from '../services/api';

interface DeviceStatus {
  deviceName: string;
  location: string;
  status: string;
  currentPlaylist: string;
  lastSync: string;
}

interface DashboardStats {
  totalDevices: number;
  activePlaylists: number;
  totalAssets: number;
  dailyViews: number;
  deviceChange: number;
  storageUsed: string;
  viewsChange: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalDevices: 0,
    activePlaylists: 0,
    totalAssets: 0,
    dailyViews: 0,
    deviceChange: 0,
    storageUsed: '0',
    viewsChange: 0
  });

  const [deviceStatuses, setDeviceStatuses] = useState<DeviceStatus[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would make these API calls
        // const statsResponse = await api.get('/dashboard/stats');
        // const devicesResponse = await api.get('/devices/status');
        
        // For now, using mock data
        setStats({
          totalDevices: 24,
          activePlaylists: 12,
          totalAssets: 156,
          dailyViews: 2451,
          deviceChange: 3,
          storageUsed: '23.4 GB',
          viewsChange: 12
        });

        setDeviceStatuses([
          {
            deviceName: 'Display-001',
            location: 'Main Entrance',
            status: 'Online',
            currentPlaylist: 'Welcome Loop',
            lastSync: '2 mins ago'
          },
          {
            deviceName: 'Display-002',
            location: 'Cafeteria',
            status: 'Offline',
            currentPlaylist: 'Lunch Menu',
            lastSync: '2 hours ago'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Devices</h3>
          <p className="text-2xl font-semibold mt-2">{stats.totalDevices}</p>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm">{stats.deviceChange} this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Playlists</h3>
          <p className="text-2xl font-semibold mt-2">{stats.activePlaylists}</p>
          <span className="text-blue-500 text-sm">Currently Playing</span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Assets</h3>
          <p className="text-2xl font-semibold mt-2">{stats.totalAssets}</p>
          <span className="text-gray-500 text-sm">{stats.storageUsed} Used</span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Daily Views</h3>
          <p className="text-2xl font-semibold mt-2">{stats.dailyViews.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm">↑ {stats.viewsChange}% vs last week</span>
          </div>
        </div>
      </div>

      {/* Device Status Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Device Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Playlist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deviceStatuses.map((device, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{device.deviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        device.status === 'Online'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{device.currentPlaylist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {device.lastSync}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;