import React from 'react';
import { Users, Bell, Shield, Database, Network } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage system preferences and configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage user accounts, roles, and permissions
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Configure Users →
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Configure system alerts and notification preferences
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Manage Notifications →
          </button>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Security</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Security settings and authentication options
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Security Settings →
          </button>
        </div>

        {/* Database */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Database className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Configure storage settings and cleanup options
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Storage Settings →
          </button>
        </div>

        {/* Network */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Network className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Network</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Network configuration and connectivity settings
          </p>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Network Settings →
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Version:</span> 1.0.0
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Environment:</span> Production
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;