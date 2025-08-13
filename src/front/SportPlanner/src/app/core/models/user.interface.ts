/**
 * User interface representing the authenticated user
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: UserMetadata;
}

/**
 * User roles enum
 */
export enum UserRole {
  Admin = 'admin',
  Director = 'director',
  Entrenador = 'entrenador'
}

/**
 * User metadata for additional information
 */
export interface UserMetadata {
  phone?: string;
  sport?: string;
  organization?: string;
  preferences?: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  language?: 'es' | 'en';
  notifications?: boolean;
}

/**
 * Auth response from the API
 */
export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: IUser;
}

/**
 * Login request
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Profile update request
 */
export interface IUpdateProfileRequest {
  name?: string;
  phone?: string;
  metadata?: Partial<UserMetadata>;
}
