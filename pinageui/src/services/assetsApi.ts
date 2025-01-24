import api from './api';
import { Asset } from '../types/assets';

export const assetsApi = {
  getAllAssets: async (): Promise<Asset[]> => {
    const response = await api.get('/assets');
    return response.data;
  },

  getAsset: async (id: number): Promise<Asset> => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  uploadAsset: async (formData: FormData): Promise<Asset> => {
    const response = await api.post('/assets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateAsset: async (id: number, asset: Partial<Asset>): Promise<void> => {
    await api.put(`/assets/${id}`, asset);
  },

  deleteAsset: async (id: number): Promise<void> => {
    await api.delete(`/assets/${id}`);
  },

  getAssetsByType: async (fileType: string): Promise<Asset[]> => {
    const response = await api.get(`/assets/type/${fileType}`);
    return response.data;
  }
};