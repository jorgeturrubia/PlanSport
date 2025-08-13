import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IUser, IAuthResponse, UserRole } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  // Signal state for user
  private readonly userSignal = signal<IUser | null>(null);
  public readonly user = this.userSignal.asReadonly();
  
  // Computed values
  public readonly isAuthenticated = computed(() => this.user() !== null);
  public readonly userName = computed(() => this.user()?.name || '');
  public readonly userInitials = computed(() => {
    const user = this.user();
    if (!user) return '';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  });
  public readonly userRole = computed(() => this.user()?.role || null);
  
  private readonly API_URL = 'http://localhost:5000/api/v1';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  constructor() {
    this.loadStoredUser();
  }
  
  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser) as IUser;
        this.userSignal.set(user);
      } catch (error) {
        this.clearStorage();
      }
    }
  }
  
  login(email: string, password: string): Observable<IAuthResponse> {
    // Por ahora, simularemos el login con datos mock
    // En producción, esto sería: return this.http.post<IAuthResponse>(`${this.API_URL}/auth/login`, { email, password })
    
    const mockUser: IUser = {
      id: '1',
      email: email,
      name: 'Alejandro Ruiz García',
      firstName: 'Alejandro',
      lastName: 'Ruiz García',
      role: UserRole.DIRECTOR,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const mockResponse: IAuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
    
    return of(mockResponse).pipe(
      tap(response => {
        this.userSignal.set(response.user);
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      })
    );
  }
  
  logout(): void {
    // Limpiar el estado y storage
    this.userSignal.set(null);
    this.clearStorage();
    
    // Opcionalmente, llamar al endpoint de logout
    // this.http.post(`${this.API_URL}/auth/logout`, {}).subscribe();
    
    // Navegar al login
    this.router.navigate(['/login']);
  }
  
  private clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('refresh_token');
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  refreshToken(): Observable<IAuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    
    // En producción:
    // return this.http.post<IAuthResponse>(`${this.API_URL}/auth/refresh`, { refreshToken })
    
    // Mock para desarrollo
    return this.login('mock@email.com', 'password');
  }
  
  // Método para actualizar el usuario (útil cuando se edita el perfil)
  updateUser(updates: Partial<IUser>): void {
    const currentUser = this.user();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.userSignal.set(updatedUser);
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    }
  }
  
  // Mock method para simular diferentes roles (solo desarrollo)
  mockChangeRole(role: UserRole): void {
    const currentUser = this.user();
    if (currentUser) {
      this.updateUser({ role });
    }
  }
}
