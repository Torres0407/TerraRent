import { api } from '../client';
import {
    AdminDashboardResponse,
    PageResponse,
    PropertyResponse,
    UserResponse
} from '../types/responses';

export const adminApi = {
  /**
   * Get admin dashboard metrics
   * GET /api/admin/dashboard/metrics
   */
  getDashboardMetrics: () => 
    api.get<AdminDashboardResponse>('/admin/dashboard/metrics'),

  /**
   * Get all users (paginated)
   * GET /api/admin/users
   */
  getUsers: (page: number = 0, size: number = 10) => 
    api.get<PageResponse<UserResponse>>('/admin/users', { 
      params: { page, size } 
    }),

  /**
   * Update user status
   * PUT /api/admin/users/{id}/status
   * Note: Backend expects plain string, not JSON object
   */
  updateUserStatus: (id: number, status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED' | 'VERIFIED') => 
    api.put(`/admin/users/${id}/status`, status, {
      headers: { 'Content-Type': 'text/plain' }
    }),

  /**
   * Get all properties (with optional status filter)
   * GET /api/admin/properties
   */
  getProperties: (status?: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED') => 
    api.get<PropertyResponse[]>('/admin/properties', { 
      params: status ? { status } : undefined 
    }),

  /**
   * Update property status (approve/reject listing)
   * POST /api/admin/properties/{id}/status
   * Note: Backend expects plain string, not JSON object
   */
  updatePropertyStatus: (id: number, status: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED') => 
    api.post(`/admin/properties/${id}/status`, status, {
      headers: { 'Content-Type': 'text/plain' }
    }),

  /**
   * Get pending identity verifications
   * GET /api/admin/verifications
   */
  getPendingVerifications: () => 
    api.get('/admin/verifications'),

  /**
   * Approve or reject identity verification
   * POST /api/admin/verifications/{id}/action
   * Note: Backend expects plain string "APPROVE" or "REJECT"
   */
  updateVerificationStatus: (id: number, action: 'APPROVE' | 'REJECT') => 
    api.post(`/admin/verifications/${id}/action`, action, {
      headers: { 'Content-Type': 'text/plain' }
    }),

  /**
   * Get all reports
   * GET /api/admin/reports
   */
  getReports: () => 
    api.get('/admin/reports'),

  /**
   * Get featured properties
   * GET /api/admin/featured-properties
   */
  getFeaturedProperties: () => 
    api.get('/admin/featured-properties'),

  /**
   * Update featured properties list
   * PUT /api/admin/featured-properties
   */
  updateFeaturedProperties: (propertyIds: number[]) => 
    api.put('/admin/featured-properties', propertyIds),
};