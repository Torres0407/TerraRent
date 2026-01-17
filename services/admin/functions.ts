import { adminApi } from '../../api/endpoints/admin';
import {
  AdminDashboardResponse,
  PageResponse,
  PropertyResponse,
  UserResponse
} from '../../api/types/responses';

/**
 * Admin Service
 * Handles admin-specific business logic
 */
export const adminService = {
  /**
   * Get admin dashboard metrics
   */
  async getDashboardMetrics(): Promise<AdminDashboardResponse> {
    const response = await adminApi.getDashboardMetrics();
    return response.data;
  },

  /**
   * Get all users with pagination
   */
  async getUsers(page: number = 0, size: number = 10): Promise<PageResponse<UserResponse>> {
    const response = await adminApi.getUsers(page, size);
    return response.data;
  },

  /**
   * Update user status
   */
  async updateUserStatus(
    userId: number,
    status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED' | 'VERIFIED'
  ): Promise<void> {
    await adminApi.updateUserStatus(userId, status);
  },

  /**
   * Get all properties with optional status filter
   */
  async getProperties(status?: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED'): Promise<PropertyResponse[]> {
    const response = await adminApi.getProperties(status);
    return response.data;
  },

  /**
   * Approve or reject a property listing
   */
  async updatePropertyStatus(
    propertyId: number,
    status: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED'
  ): Promise<void> {
    await adminApi.updatePropertyStatus(propertyId, status);
  },

  /**
   * Get pending identity verifications
   */
  async getPendingVerifications(): Promise<any[]> {
    const response = await adminApi.getPendingVerifications();
    return response.data;
  },

  /**
   * Approve or reject identity verification
   */
  async updateVerificationStatus(verificationId: number, action: 'APPROVE' | 'REJECT'): Promise<void> {
    await adminApi.updateVerificationStatus(verificationId, action);
  },

  /**
   * Get all reports
   */
  async getReports(): Promise<any[]> {
    const response = await adminApi.getReports();
    return response.data;
  },

  /**
   * Get featured properties
   */
  async getFeaturedProperties(): Promise<any[]> {
    const response = await adminApi.getFeaturedProperties();
    return response.data;
  },

  /**
   * Update featured properties list
   */
  async updateFeaturedProperties(propertyIds: number[]): Promise<void> {
    await adminApi.updateFeaturedProperties(propertyIds);
  },
};