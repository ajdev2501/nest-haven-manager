import api from './api';

export interface ServiceRequest {
  _id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  type: 'maintenance' | 'cleaning' | 'wifi' | 'electrical' | 'plumbing' | 'other';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  adminNotes?: string;
}

export interface CreateRequestData {
  type: 'maintenance' | 'cleaning' | 'wifi' | 'electrical' | 'plumbing' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export const requestService = {
  async getAllRequests() {
    const response = await api.get('/requests');
    return response.data;
  },

  async getMyRequests() {
    const response = await api.get('/requests/my');
    return response.data;
  },

  async createRequest(data: CreateRequestData) {
    const response = await api.post('/requests', data);
    return response.data;
  },

  async updateRequestStatus(id: string, status: string, adminNotes?: string) {
    const response = await api.put(`/requests/${id}`, { status, adminNotes });
    return response.data;
  },

  async deleteRequest(id: string) {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },

  async getRequestById(id: string) {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  }
};