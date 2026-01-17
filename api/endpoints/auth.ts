import { api } from '../client';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    ResendVerificationRequest,
    UserResponse,
    VerifyEmailRequest
} from '../types/requests';

export const authApi = {
  /**
   * Login user
   * POST /api/auth/authenticate
   */
  login: (credentials: LoginRequest) => 
    api.post<AuthResponse>('/auth/authenticate', credentials),

  /**
   * Register new user
   * POST /api/auth/register
   */
  register: (userData: RegisterRequest) => 
    api.post<UserResponse>('/auth/register', userData),

  /**
   * Verify email with code
   * POST /api/auth/verify
   */
  verifyEmail: (data: VerifyEmailRequest) => 
    api.post('/auth/verify', data),

  /**
   * Resend verification email
   * POST /api/auth/resend-verification
   */
  resendVerification: (data: ResendVerificationRequest) => 
    api.post('/auth/resend-verification', data),
};