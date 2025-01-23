// src/services/devicesApi.ts
import api from './api';
import { Device, DeviceStatusDetails } from '../types/devices';

export const devicesApi = {
  getAllDevices: async (): Promise<Device[]> => {
    const response = await api.get('/devices');
    return response.data;
  },

  getDevice: async (id: number): Promise<Device> => {
    const response = await api.get(`/devices/${id}`);
    return response.data;
  },

  getDeviceStatus: async (deviceId: number): Promise<DeviceStatusDetails> => {
    const response = await api.get(`/devicestatus/device/${deviceId}/latest`);
    return response.data;
  },

  createDevice: async (device: Omit<Device, 'deviceId'>): Promise<Device> => {
    const response = await api.post('/devices', device);
    return response.data;
  },

  updateDevice: async (id: number, device: Partial<Device>): Promise<void> => {
    await api.put(`/devices/${id}`, device);
  },

  deleteDevice: async (id: number): Promise<void> => {
    await api.delete(`/devices/${id}`);
  }
};