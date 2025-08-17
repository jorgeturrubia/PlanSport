// Interfaces para el módulo de autenticación

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin' | 'coach';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface RegisterResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  message: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
  value?: any;
}

export interface ErrorResponse {
  error: ApiError;
  timestamp: string;
  path: string;
  status: number;
}

export interface AuthErrorCodes {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS';
  TOKEN_EXPIRED: 'TOKEN_EXPIRED';
  TOKEN_INVALID: 'TOKEN_INVALID';
  UNAUTHORIZED: 'UNAUTHORIZED';
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED';
  ACCOUNT_NOT_VERIFIED: 'ACCOUNT_NOT_VERIFIED';
  
  // Validation errors
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS';
  WEAK_PASSWORD: 'WEAK_PASSWORD';
  INVALID_EMAIL: 'INVALID_EMAIL';
  VALIDATION_ERROR: 'VALIDATION_ERROR';
  
  // Server errors
  SERVER_ERROR: 'SERVER_ERROR';
  DATABASE_ERROR: 'DATABASE_ERROR';
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE';
  RATE_LIMIT: 'RATE_LIMIT';
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR';
  TIMEOUT: 'TIMEOUT';
}