import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, AuthResponseData, LoginCredentials, RefreshResponse, User, ProfileDto, UpdateProfileDto, ChangePasswordDto } from '../../features/auth/models/auth.interfaces';
import { AuthErrorHandlerService } from './auth-error-handler.service';
import { environment } from '../../../environments/environment';

// --- SERVICE ---

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authErrorHandler = inject(AuthErrorHandlerService);

  private readonly API_URL = `${environment.apiUrl}/api/Auth`; // From environment config - Note: Capital 'A' in Auth

  // --- STATE SIGNALS ---
  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(true); // Start as true until initial check is done
  private readonly tokenSignal = signal<string | null>(null);

  // --- PUBLIC READABLE SIGNALS ---
  readonly currentUser = this.userSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUser());

  // --- REDIRECT URL ---
  redirectUrl: string | null = null;

  private refreshTimer?: any;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        // TODO: Implement a /verify endpoint call for better security
        // For now, we optimistically try to refresh
        await this.refreshToken(refreshToken);
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.initializeAuth');
      console.error('Auth initialization error:', error);
      this.clearAuthData(); // Clear inconsistent data
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      console.log('Attempting login to:', `${this.API_URL}/login`);
      console.log('With credentials:', credentials);
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      );

      if (response.success) {
        this.handleAuthResponse(response.data);
        const redirect = this.redirectUrl || '/dashboard';
        this.redirectUrl = null;
        await this.router.navigate([redirect]);
      } else {
        // The component will handle displaying the error based on the HTTP error response
        throw new Error('Login failed');
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.login');
      throw error;
    }
  }

  async register(userData: any): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
      );
      
      if (response.success) {
          this.handleAuthResponse(response.data);
          await this.router.navigate(['/dashboard']);
      } else {
          throw new Error('Registration failed');
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.register');
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${this.API_URL}/forgot-password`, { email })
      );
      return response?.message ? true : false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.forgotPassword');
      console.error('Forgot password request failed:', error);
      return false;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${this.API_URL}/reset-password`, { token, newPassword })
      );
      return response?.message ? true : false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.resetPassword');
      console.error('Reset password request failed:', error);
      return false;
    }
  }

  async sendEmailVerification(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${this.API_URL}/send-verification-email`, {})
      );
      return response?.message ? true : false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.sendEmailVerification');
      console.error('Send email verification request failed:', error);
      return false;
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${this.API_URL}/verify-email`, { token })
      );
      return response?.message ? true : false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.verifyEmail');
      console.error('Email verification failed:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        try {
            await firstValueFrom(this.http.post(`${this.API_URL}/logout`, { refreshToken }));
        } catch (error) {
            this.authErrorHandler.logError(error, 'AuthService.logout');
            console.error('Logout API call failed, clearing session locally anyway.', error);
        }
    }
    this.clearAuthData();
    await this.router.navigate(['/auth/login']);
  }

  private async refreshToken(token: string): Promise<void> {
    try {
        const response = await firstValueFrom(
            this.http.post<RefreshResponse>(`${this.API_URL}/refresh`, { refreshToken: token })
        );
        if(response.success) {
            // A refresh response is slightly different, we need to get user data separately
            // or assume it's the same user. For now, we just update tokens.
            const { accessToken, refreshToken, expiresIn } = response.data;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            this.tokenSignal.set(accessToken);
            
            // We need to get the user profile again after refreshing
            // TODO: await this.loadUserProfile();
            
            this.scheduleTokenRefresh(expiresIn);
        } else {
            this.clearAuthData();
        }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.refreshToken');
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      await this.router.navigate(['/auth/login']);
    }
  }

  private handleAuthResponse(data: AuthResponseData): void {
    const { accessToken, refreshToken, expiresIn, user } = data;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    this.tokenSignal.set(accessToken);
    this.userSignal.set(user);

    this.scheduleTokenRefresh(expiresIn);
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    // Refresh 1 minute before expiration to be safe
    const refreshInMs = (expiresIn - 60) * 1000;
    
    this.refreshTimer = setTimeout(() => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        this.refreshToken(refreshToken);
      }
    }, refreshInMs);
  }

  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    this.tokenSignal.set(null);
    this.userSignal.set(null);

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }

  getToken(): string | null {
    return this.tokenSignal() || localStorage.getItem('access_token');
  }

  async getProfile(): Promise<ProfileDto> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success: boolean; data: ProfileDto }>(`${this.API_URL}/profile`)
      );
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.getProfile');
      throw error;
    }
  }

  async updateProfile(profile: UpdateProfileDto): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.put<{ success: boolean; data: ProfileDto }>(`${this.API_URL}/profile`, profile)
      );
      
      if (response.success) {
        // Update the user signal with the new profile data
        this.userSignal.set({
          ...this.userSignal()!,
          fullName: response.data.fullName,
          metadata: response.data.metadata
        });
        return true;
      }
      return false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.updateProfile');
      console.error('Profile update failed:', error);
      return false;
    }
  }

  async changePassword(changePassword: ChangePasswordDto): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; message: string }>(`${this.API_URL}/change-password`, changePassword)
      );
      return response?.success ? true : false;
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.changePassword');
      console.error('Password change failed:', error);
      return false;
    }
  }
}
