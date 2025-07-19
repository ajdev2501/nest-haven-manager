import api from './api';

export interface Payment {
  _id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  month: string;
  year: number;
  receiptId?: string;
  paymentMethod?: 'cash' | 'online' | 'bank_transfer';
}

export interface CreatePaymentData {
  tenantId: string;
  amount: number;
  month: string;
  year: number;
  paymentMethod: 'cash' | 'online' | 'bank_transfer';
}

export const paymentService = {
  async getAllPayments() {
    const response = await api.get('/payments/all');
    return response.data;
  },

  async getMyPayments() {
    const response = await api.get('/payments');
    return response.data;
  },

  async createPayment(data: CreatePaymentData) {
    const response = await api.post('/payments', data);
    return response.data;
  },

  async updatePaymentStatus(id: string, status: 'paid' | 'pending' | 'overdue') {
    const response = await api.put(`/payments/${id}`, { status });
    return response.data;
  },

  async getPaymentSummary() {
    const response = await api.get('/payments/summary');
    return response.data;
  },

  async downloadReceipt(paymentId: string) {
    const response = await api.get(`/payments/${paymentId}/receipt`, {
      responseType: 'blob'
    });
    return response.data;
  },

  async markAsPaid(id: string) {
    const response = await api.patch(`/payments/${id}/mark-paid`);
    return response.data;
  }
};