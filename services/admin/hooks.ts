import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import {
    AdminDashboardResponse,
    PageResponse,
    PropertyResponse,
    UserResponse
} from '../../api/types/responses';
import { adminService } from './functions';

/**
 * Hook to fetch admin dashboard metrics
 */
export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const dashboardData = await adminService.getDashboardMetrics();
        setData(dashboardData);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};

/**
 * Hook to get all users with pagination
 */
export const useAdminUsers = (page: number = 0, size: number = 10) => {
  const [users, setUsers] = useState<PageResponse<UserResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminService.getUsers(page, size);
      setUsers(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size]);

  return { users, loading, error, refetch: fetchUsers };
};

/**
 * Hook to update user status
 */
export const useUpdateUserStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    userId: number,
    status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED' | 'VERIFIED'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      await adminService.updateUserStatus(userId, status);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

/**
 * Hook to get admin properties
 */
export const useAdminProperties = (status?: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED') => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminService.getProperties(status);
      setProperties(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [status]);

  return { properties, loading, error, refetch: fetchProperties };
};

/**
 * Hook to update property status
 */
export const useUpdatePropertyStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    propertyId: number,
    status: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      await adminService.updatePropertyStatus(propertyId, status);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

/**
 * Hook to get pending verifications
 */
export const usePendingVerifications = () => {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminService.getPendingVerifications();
      setVerifications(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  return { verifications, loading, error, refetch: fetchVerifications };
};

/**
 * Hook to update verification status
 */
export const useUpdateVerificationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (verificationId: number, action: 'APPROVE' | 'REJECT') => {
    setLoading(true);
    setError(null);
    
    try {
      await adminService.updateVerificationStatus(verificationId, action);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

/**
 * Hook to get reports
 */
export const useAdminReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await adminService.getReports();
        setReports(data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error };
};