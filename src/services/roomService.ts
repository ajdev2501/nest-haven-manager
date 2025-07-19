import api from './api';

export interface Room {
  _id: string;
  roomNumber: string;
  capacity: number;
  occupied: boolean;
  tenantId?: string;
  tenantName?: string;
  rent: number;
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

export interface CreateRoomData {
  roomNumber: string;
  capacity: number;
  rent: number;
  amenities: string[];
}

export const roomService = {
  async getAllRooms() {
    const response = await api.get('/rooms');
    return response.data;
  },

  async getRoomById(id: string) {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  async createRoom(data: CreateRoomData) {
    const response = await api.post('/rooms', data);
    return response.data;
  },

  async updateRoom(id: string, data: Partial<CreateRoomData>) {
    const response = await api.put(`/rooms/${id}`, data);
    return response.data;
  },

  async deleteRoom(id: string) {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  },

  async assignTenant(roomId: string, tenantId: string) {
    const response = await api.patch(`/rooms/${roomId}/assign`, { tenantId });
    return response.data;
  },

  async unassignTenant(roomId: string) {
    const response = await api.patch(`/rooms/${roomId}/unassign`);
    return response.data;
  },

  async getTenantRoom(tenantId: string) {
    const response = await api.get(`/rooms/tenant/${tenantId}`);
    return response.data;
  }
};