import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, AuthResponseData, LoginCredentials, RefreshResponse, User, ProfileDto, UpdateProfileDto, ChangePasswordDto } from '../../features/auth/models/auth.interfaces';
import { AuthErrorHandlerService } from './auth-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authErrorHandler = inject(AuthErrorHandlerService);

  private readonly API_URL = `${environment.apiUrl}/api/Auth`;

  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(true);
  private readonly tokenSignal = signal<string | null>(null);

  readonly currentUser = this.userSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUser());

  redirectUrl: string | null = null;
  private refreshTimer?: any;

  private initResolver?: () => void;
  readonly initialized: Promise<void>;

  constructor() {
    this.initialized = new Promise<void>((resolve) => {
      this.initResolver = resolve;
    });
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        const verified = await this.verifyAccessTokenSafe();
        if (!verified) {
          await this.refreshAccessToken();
        } else {
          await this.loadUserProfileSafe();
        }
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.initializeAuth');
      this.clearAuthData();
    } finally {
      this.loadingSignal.set(false);
      this.initResolver?.();
    }
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      );
      if (response.success) {
        this.handleAuthResponse(response.data);
        await this.loadUserProfileSafe();
        const redirect = this.redirectUrl || '/dashboard';
        this.redirectUrl = null;
        await this.router.navigate([redirect]);
      } else {
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
      return false;
    }
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await firstValueFrom(this.http.post(`${this.API_URL}/logout`, { refreshToken }));
      } catch (error) {
        this.authErrorHandler.logError(error, 'AuthService.logout');
      }
    }
    this.clearAuthData();
    await this.router.navigate(['/auth/login']);
  }

  async refreshAccessToken(): Promise<boolean> {
    const token = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    if (!token) return false;
    try {
      const response = await firstValueFrom(
        this.http.post<RefreshResponse>(`${this.API_URL}/refresh`, { refreshToken: token })
      );
      if (response.success) {
        const { accessToken, refreshToken, expiresIn } = response.data;
        try {
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
        } catch {}
        this.tokenSignal.set(accessToken);
        await this.loadUserProfileSafe();
        this.scheduleTokenRefresh(expiresIn);
        return true;
      } else {
        this.clearAuthData();
        return false;
      }
    } catch (error) {
      this.authErrorHandler.logError(error, 'AuthService.refreshAccessToken');
      this.clearAuthData();
      return false;
    }
  }

  private handleAuthResponse(data: AuthResponseData): void {
    const { accessToken, refreshToken, expiresIn, user } = data;
    try {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    } catch {}
    this.tokenSignal.set(accessToken);
    this.userSignal.set(user);
    this.scheduleTokenRefresh(expiresIn);
  }

  private async loadUserProfileSafe(): Promise<void> {
    try {
      const profile = await this.getProfile();
      this.userSignal.set({ ...(this.userSignal() as any), ...profile } as unknown as User);
    } catch (e) {
      this.authErrorHandler.logError(e, 'AuthService.loadUserProfileSafe');
    }
  }

  private async verifyAccessTokenSafe(): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.http.get<{ success: boolean; data: any }>(`${this.API_URL}/verify`));
      return !!resp?.success;
    } catch {
      return false;
    }
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    const refreshInMs = (expiresIn - 60) * 1000;
    this.refreshTimer = setTimeout(() => {
      this.refreshAccessToken();
    }, refreshInMs);
  }

  private clearAuthData(): void {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch {}
    try {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
    } catch {}
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }

  getToken(): string | null {
    return this.tokenSignal() || localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
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
      return false;
    }
  }
}
