import { Injectable, inject } from '@angular/core';
import { TokenPayload } from '../models/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'plansport_access_token';
  private readonly REFRESH_TOKEN_KEY = 'plansport_refresh_token';
  private readonly REMEMBER_ME_KEY = 'plansport_remember_me';

  private useLocalStorage: boolean = false;

  /**
   * Almacena los tokens de autenticación
   */
  setTokens(accessToken: string, refreshToken: string, rememberMe: boolean = false): void {
    // Configurar el tipo de almacenamiento según la preferencia del usuario
    this.setStorageType(rememberMe);
    
    this.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    this.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    this.setItem('rememberMe', rememberMe.toString());
  }

  /**
   * Obtiene el token de acceso
   */
  getAccessToken(): string | null {
    return this.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Obtiene el token de refresco
   */
  getRefreshToken(): string | null {
    return this.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Verifica si "recordar sesión" está habilitado
   */
  isRememberMeEnabled(): boolean {
    return this.isSessionPersistent();
  }

  /**
   * Decodifica el payload del token JWT
   */
  decodeToken(token: string): TokenPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded) as TokenPayload;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Verifica si el token ha expirado
   */
  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  /**
   * Verifica si el token expira en los próximos minutos
   */
  isTokenExpiringSoon(token: string, minutesThreshold: number = 5): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const thresholdTime = currentTime + (minutesThreshold * 60);
    return payload.exp < thresholdTime;
  }

  /**
   * Obtiene el tiempo restante hasta la expiración del token en minutos
   */
  getTimeUntilExpiration(): number {
    const expiration = this.getTokenExpiration();
    if (!expiration) return 0;
    
    const now = new Date().getTime();
    const timeLeft = expiration.getTime() - now;
    return Math.max(0, Math.floor(timeLeft / (1000 * 60))); // en minutos
  }

  /**
   * Obtiene la fecha de expiración del token
   */
  getTokenExpiration(): Date | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = this.decodeToken(token);
      return payload?.exp ? new Date(payload.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  /**
   * Limpia todos los tokens almacenados
   */
  clearTokens(): void {
    // Limpiar de ambos tipos de almacenamiento
    this.removeItem(this.ACCESS_TOKEN_KEY);
    this.removeItem(this.REFRESH_TOKEN_KEY);
    this.removeItem('rememberMe');
    
    // También limpiar del localStorage si existe
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem('rememberMe');
    }
  }

  /**
   * Verifica si existe un token válido
   */
  hasValidToken(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Verifica si existen tokens válidos (access y refresh)
   */
  hasValidTokens(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return !!accessToken && !!refreshToken;
  }

  /**
   * Obtiene información del usuario desde el token
   */
  getUserInfoFromToken(): { id: string; email: string; role: string } | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payload = this.decodeToken(token);
    if (!payload) return null;

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
  }

  /**
   * Verifica si la sesión está configurada como persistente
   */
  isSessionPersistent(): boolean {
    const rememberMe = this.getItem('rememberMe');
    return rememberMe === 'true';
  }

  /**
   * Configura el tipo de almacenamiento según la preferencia del usuario
   */
  private setStorageType(persistent: boolean): void {
    this.useLocalStorage = persistent && this.isLocalStorageAvailable();
  }

  /**
   * Almacena un elemento en el storage apropiado
   */
  private setItem(key: string, value: string): void {
    try {
      if (this.useLocalStorage && this.isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
      } else if (this.isSessionStorageAvailable()) {
        sessionStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Error al almacenar en storage:', error);
    }
  }

  /**
   * Obtiene un elemento del storage
   */
  private getItem(key: string): string | null {
    try {
      // Primero intentar localStorage
      if (this.isLocalStorageAvailable()) {
        const item = localStorage.getItem(key);
        if (item) return item;
      }
      
      // Luego intentar sessionStorage
      if (this.isSessionStorageAvailable()) {
        return sessionStorage.getItem(key);
      }
    } catch (error) {
      console.warn('Error al leer del storage:', error);
    }
    return null;
  }

  /**
   * Elimina un elemento del storage
   */
  private removeItem(key: string): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(key);
      }
      if (this.isSessionStorageAvailable()) {
        sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Error al eliminar del storage:', error);
    }
  }

  /**
   * Verifica si localStorage está disponible
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica si sessionStorage está disponible
   */
  private isSessionStorageAvailable(): boolean {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}