export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  organization?: string;
  role: 'coach' | 'coordinator' | 'manager' | 'assistant';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dashboard: {
    sidebarCollapsed: boolean;
    defaultView: string;
  };
}