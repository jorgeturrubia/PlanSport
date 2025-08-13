// Interfaces para el sistema de autenticación

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  sport: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface SportOption {
  id: string;
  name: string;
  icon: any; // FontAwesome icon
  description?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    sport: string;
  };
  token?: string;
}

export interface ValidationMessage {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  field?: string;
}