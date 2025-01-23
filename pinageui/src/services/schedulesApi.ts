import api from './api';
import { DeviceSchedule } from '../types/schedules';

export const schedulesApi = {
  getAllSchedules: async (): Promise<DeviceSchedule[]> => {
    const response = await api.get('/deviceschedules');
    return response.data;
  },

  getSchedulesByDevice: async (deviceId: number): Promise<DeviceSchedule[]> => {
    const response = await api.get(`/deviceschedules/device/${deviceId}`);
    return response.data;
  },

  createSchedule: async (schedule: Omit<DeviceSchedule, 'scheduleId'>): Promise<DeviceSchedule> => {
    const response = await api.post('/deviceschedules', schedule);
    return response.data;
  },

  updateSchedule: async (id: number, schedule: Partial<DeviceSchedule>): Promise<void> => {
    await api.put(`/deviceschedules/${id}`, schedule);
  },

  deleteSchedule: async (id: number): Promise<void> => {
    await api.delete(`/deviceschedules/${id}`);
  }
};