import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// For AuthService
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  organizationId: string;
  emailConfirmed: boolean;
  metadata?: any;
}

export interface ProfileDto {
  id: string;
  email: string;
  fullName: string;
  role: string;
  organizationId: string;
  emailConfirmed: boolean;
  metadata?: any;
}

export interface UpdateProfileDto {
  fullName: string;
  metadata?: any;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  data: AuthResponseData;
  error?: any;
}

export interface RefreshResponseData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface RefreshResponse {
    success: boolean;
    data: RefreshResponseData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// For RegisterFormComponent
export interface SportOption {
  id: string;
  name: string;
  icon: IconDefinition;
  description: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  sport: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface PasswordStrength {
  level: 'empty' | 'weak' | 'fair' | 'good' | 'strong';
  score: number;
  requirements: {
    minLength: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}
