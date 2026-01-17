import { useState } from 'react';
import { handleApiError } from '../../api/client';
import { LoginRequest, RegisterRequest } from '../../api/types/requests';
import { UserResponse } from '../../api/types/responses';
import { authService } from './functions';

/**
 * Hook for login functionality
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

/**
 * Hook for registration functionality
 */
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.register(userData);
      return user;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

/**
 * Hook for email verification
 */
export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyEmail = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.verifyEmail(email, code);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyEmail, loading, error };
};

/**
 * Hook to get current authenticated user
 */
export const useAuth = () => {
  const [user] = useState<UserResponse | null>(authService.getCurrentUser());
  const isAuthenticated = authService.isAuthenticated();

  const logout = () => {
    authService.logout();
  };

  const hasRole = (role: 'ROLE_RENTER' | 'ROLE_LANDLORD' | 'ROLE_ADMIN') => {
    return authService.hasRole(role);
  };

  return {
    user,
    isAuthenticated,
    logout,
    hasRole,
  };
};