import api from './api';

export interface Document {
  _id: string;
  tenantId: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  documentType: 'id_proof' | 'address_proof' | 'agreement' | 'photo' | 'other';
  uploadedAt: string;
  url: string;
}

export const documentService = {
  async getMyDocuments() {
    const response = await api.get('/documents/my');
    return response.data;
  },

  async getTenantDocuments(tenantId: string) {
    const response = await api.get(`/documents/${tenantId}`);
    return response.data;
  },

  async uploadDocument(file: File, documentType: string) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDocument(id: string) {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },

  async downloadDocument(id: string) {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};