import { api } from '../client';

export const imageApi = {
  /**
   * Upload an image for a property
   * POST /api/images/upload/property/{propertyId}
   */
  uploadPropertyImage: (propertyId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/images/upload/property/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};