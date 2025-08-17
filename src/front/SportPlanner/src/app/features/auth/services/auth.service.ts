import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { 
  AuthUser, 
  AuthState, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ApiError
} from '../models/auth.interfaces';
import { TokenService } from './token.service';
import { ErrorHandlerService, ErrorDetails } from './error-handler.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly errorHandler = inject(ErrorHandlerService);
  
  // URL base de la API desde environment
  private readonly API_URL = environment.apiUrl;
  
  // Estado reactivo con signals
  private readonly _authState = signal<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Getters públicos para el estado
  readonly authState = this._authState.asReadonly();
  readonly user = computed(() => this._authState().user);
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly isLoading = computed(() => this._authState().isLoading);
  readonly error = computed(() => this._authState().error);

  constructor() {
    this.initializeAuthState();
  }

  /**
   * Inicializa el estado de autenticación al cargar la aplicación
   */
  private initializeAuthState(): void {
    if (this.tokenService.hasValidTokens()) {
      const userInfo = this.tokenService.getUserInfoFromToken();
      if (userInfo) {
        // Cargar datos completos del usuario
        this.getCurrentUser().subscribe({
          next: (user) => {
            this.updateAuthState({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
          },
          error: (error) => {
            // Si falla, manejar error apropiadamente
            this.handleAuthError(error);
          }
        });
      }
    } else {
      // No hay tokens válidos, asegurar que el estado esté limpio
      this.tokenService.clearTokens();
      this.updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  }

  /**
   * Actualiza el estado de autenticación
   */
  private updateAuthState(newState: Partial<AuthState>): void {
    this._authState.update(current => ({ ...current, ...newState }));
  }

  /**
   * Inicia sesión con email y contraseña
   */
  login(credentials: LoginRequest, rememberMe: boolean = false): Observable<LoginResponse> {
    this.updateAuthState({ isLoading: true, error: null });
    
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.data?.accessToken) {
            // Almacenar tokens con preferencia de persistencia
            this.tokenService.setTokens(
              response.data.accessToken, 
              response.data.refreshToken, 
              rememberMe
            );
            
            // Actualizar estado
            this.updateAuthState({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          }
        }),
        catchError(error => {
          const errorDetails = this.handleAuthError(error);
          this.updateAuthState({ 
            isLoading: false, 
            error: this.errorHandler.getUserFriendlyMessage(errorDetails)
          });
          // Agregar detalles del error al objeto de error para uso en componentes
          const enhancedError = { ...error, errorDetails };
          return throwError(() => enhancedError);
        })
      );
  }

  /**
   * Registra un nuevo usuario
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    this.updateAuthState({ isLoading: true, error: null });
    
    return this.http.post<RegisterResponse>(`${this.API_URL}/auth/register`, userData)
      .pipe(
        tap(response => {
          // Almacenar tokens
          this.tokenService.setTokens(
            response.data.accessToken, 
            response.data.refreshToken, 
            false // Por defecto no recordar en registro
          );
          
          // Actualizar estado
          this.updateAuthState({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        }),
        catchError(error => {
          const errorDetails = this.handleAuthError(error);
          this.updateAuthState({ 
            isLoading: false, 
            error: this.errorHandler.getUserFriendlyMessage(errorDetails)
          });
          // Agregar detalles del error al objeto de error para uso en componentes
          const enhancedError = { ...error, errorDetails };
          return throwError(() => enhancedError);
        })
      );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(redirectToLogin: boolean = true): Observable<void> {
    const refreshToken = this.tokenService.getRefreshToken();
    
    // Limpiar estado local inmediatamente
    this.tokenService.clearTokens();
    this.updateAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    // Redirigir según parámetro
    if (redirectToLogin) {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/']);
    }
    
    // Notificar al servidor (opcional, no bloquear si falla)
    if (refreshToken) {
      return this.http.post<void>(`${this.API_URL}/auth/logout`, { refreshToken })
        .pipe(
          catchError(() => of(void 0)) // Ignorar errores del servidor
        );
    }
    
    return of(void 0);
  }

  /**
   * Renueva el token de acceso
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    
    const request: RefreshTokenRequest = { refreshToken };
    
    return this.http.post<RefreshTokenResponse>(`${this.API_URL}/auth/refresh`, request)
      .pipe(
        tap(response => {
          // Actualizar tokens
          this.tokenService.setTokens(
            response.accessToken,
            response.refreshToken,
            this.tokenService.isRememberMeEnabled()
          );
        }),
        catchError(error => {
          // Si falla el refresh, cerrar sesión
          this.logout().subscribe();
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos del usuario actual
   */
  getCurrentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.API_URL}/auth/me`)
      .pipe(
        tap(user => {
          this.updateAuthState({ user });
        }),
        catchError(error => {
          // Si falla, intentar renovar token
          if (error.status === 401) {
            return this.refreshToken().pipe(
              switchMap(() => this.http.get<AuthUser>(`${this.API_URL}/auth/me`)),
              tap(user => {
                this.updateAuthState({ user });
              })
            );
          }
          return throwError(() => error);
        })
      );
  }

  /**
   * Solicita recuperación de contraseña
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/auth/forgot-password`, request);
  }

  /**
   * Verifica si el usuario está autenticado y los tokens son válidos
   */
  isAuthenticatedAndValid(): boolean {
    return this.isAuthenticated() && this.tokenService.hasValidTokens();
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.user();
    return user?.role === role || false;
  }

  /**
   * Verifica si el usuario tiene alguno de los roles especificados
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Obtiene información sobre la sesión actual
   */
  getSessionInfo(): { isRemembered: boolean; expiresAt: Date | null } {
    return {
      isRemembered: this.tokenService.isRememberMeEnabled(),
      expiresAt: this.tokenService.getTokenExpiration()
    };
  }

  /**
   * Extiende la sesión actual (útil para actividad del usuario)
   */
  extendSession(): void {
    if (this.isAuthenticated() && this.tokenService.hasValidTokens()) {
      // Renovar token si es necesario
      this.refreshToken().subscribe({
        error: () => {
          // Si falla la renovación, cerrar sesión
          this.logout().subscribe();
        }
      });
    }
  }

  /**
   * Redirige después del login exitoso
   */
  redirectAfterLogin(): void {
    // TODO: Implementar lógica de redirección basada en el rol del usuario
    // Por ahora redirigir al dashboard
    this.router.navigate(['/dashboard']);
  }

  /**
   * Maneja errores de autenticación
   */
  private handleAuthError(error: any): ErrorDetails {
    console.error('Error de autenticación:', error);
    
    const errorDetails = this.errorHandler.processError(error);
    
    // Limpiar sesión para errores de autenticación/autorización
    if (errorDetails.type === 'authentication' || errorDetails.type === 'authorization') {
      this.tokenService.clearTokens();
      this.updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
    
    return errorDetails;
  }

  /**
   * Extrae mensaje de error de la respuesta HTTP usando ErrorHandlerService
   */
  private getErrorMessage(error: any): string {
    const errorDetails = this.errorHandler.processError(error);
    return this.errorHandler.getUserFriendlyMessage(errorDetails);
  }

  /**
   * Obtiene detalles completos del error
   */
  getErrorDetails(error: any): ErrorDetails {
    return this.errorHandler.processError(error);
  }

  /**
   * Verifica si un error es recuperable
   */
  isErrorRecoverable(error: any): boolean {
    const errorDetails = this.errorHandler.processError(error);
    return this.errorHandler.isRecoverable(errorDetails);
  }

  /**
   * Verifica si un error requiere acción del usuario
   */
  doesErrorRequireAction(error: any): boolean {
    const errorDetails = this.errorHandler.processError(error);
    return this.errorHandler.requiresUserAction(errorDetails);
  }
}