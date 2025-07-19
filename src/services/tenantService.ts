import api from './api';

export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roomId?: string;
  roomNumber?: string;
  documents: string[];
  rentStatus: boolean;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface UpdateTenantData {
  name?: string;
  phone?: string;
  roomId?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export const tenantService = {
  async getAllTenants() {
    const response = await api.get('/users');
    return response.data;
  },

  async getTenantById(id: string) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async updateTenant(id: string, data: UpdateTenantData) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  async deleteTenant(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async updateProfile(data: Partial<UpdateTenantData>) {
    const response = await api.put('/users/me', data);
    return response.data;
  },

  async getMyProfile() {
    const response = await api.get('/users/me');
    return response.data;
  },

  async assignRoom(tenantId: string, roomId: string) {
    const response = await api.patch(`/users/${tenantId}/room`, { roomId });
    return response.data;
  }
};