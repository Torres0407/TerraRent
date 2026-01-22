import { authApi } from '../../api/endpoints/auth';
import { LoginRequest, RegisterRequest } from '../../api/types/requests';
import { AuthResponse, UserResponse } from '../../api/types/responses';

/**
 * Auth Service
 * Handles authentication business logic
 */
export const authService = {
  /**
   * Login user and store token
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await authApi.login(credentials);
    const { accessToken, user } = response.data;
    
    // Store token and user in localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<UserResponse> {
    const response = await authApi.register(userData);
    return response.data;
  },

  /**
   * Verify email with code
   */
  async verifyEmail(email: string, code: string): Promise<void> {
    await authApi.verifyEmail({ email, code });
  },

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<void> {
    await authApi.resendVerification({ email });
  },

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): UserResponse | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Check if user has specific role
   */
  hasRole(role: 'RENTER' | 'LANDLORD' | 'ADMIN'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },
};