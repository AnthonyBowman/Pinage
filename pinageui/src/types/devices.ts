// src/types/devices.ts

// Define a string literal type for device status
export type DeviceStatus = 'Online' | 'Offline' | 'Warning' | 'Maintenance';

// Base device interface
export interface Device {
  deviceId: number;
  deviceName: string;
  locationId?: number;
  ipAddress: string;
  lastHeartbeat?: Date;
  lastSyncTime?: Date;
  status: string;
  cacheSize?: number;
  active?: boolean;
  location?: {
    locationName: string;
    address: string;
    city: string;
  };
}

// Device status details interface
export interface DeviceStatusDetails {
  statusId: number;
  deviceId?: number;
  reportedDateTime: Date;
  currentPlaylistId?: number;
  currentAssetId?: number;
  cpuUsage?: number;
  memoryUsage?: number;
  temperature?: number;
  errorCount?: number;
  lastError?: string;
}

// Combined interface for device with its current status
export interface DeviceWithStatus extends Device {
  currentStatus?: DeviceStatusDetails;
}