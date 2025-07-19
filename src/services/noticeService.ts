import api from './api';

export interface Notice {
  _id: string;
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'payment' | 'event' | 'urgent';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  validUntil?: string;
}

export interface CreateNoticeData {
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'payment' | 'event' | 'urgent';
  priority: 'low' | 'medium' | 'high';
  validUntil?: string;
}

export const noticeService = {
  async getAllNotices() {
    const response = await api.get('/notices');
    return response.data;
  },

  async createNotice(data: CreateNoticeData) {
    const response = await api.post('/notices', data);
    return response.data;
  },

  async updateNotice(id: string, data: Partial<CreateNoticeData>) {
    const response = await api.put(`/notices/${id}`, data);
    return response.data;
  },

  async deleteNotice(id: string) {
    const response = await api.delete(`/notices/${id}`);
    return response.data;
  },

  async getNoticeById(id: string) {
    const response = await api.get(`/notices/${id}`);
    return response.data;
  }
};