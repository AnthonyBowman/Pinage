import api from './api';
import { Location, LocationType } from '../types/locations';

export const locationsApi = {
  getAllLocations: async (): Promise<Location[]> => {
    const response = await api.get('/locations');
    return response.data;
  },

  getLocation: async (id: number): Promise<Location> => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  },

  createLocation: async (location: Omit<Location, 'locationId'>): Promise<Location> => {
    const response = await api.post('/locations', location);
    return response.data;
  },

  updateLocation: async (id: number, location: Partial<Location>): Promise<void> => {
    await api.put(`/locations/${id}`, location);
  },

  deleteLocation: async (id: number): Promise<void> => {
    await api.delete(`/locations/${id}`);
  },

  getLocationTypes: async (): Promise<LocationType[]> => {
    const response = await api.get('/locationtypes');
    return response.data;
  },

  getLocationsByType: async (typeId: number): Promise<Location[]> => {
    const response = await api.get(`/locations/type/${typeId}`);
    return response.data;
  }
};