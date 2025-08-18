import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from '../../../../environments/environment';

// Variables globales para el manejo de refresh token
let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

/**
 * Interceptor funcional para manejar autenticación automática
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const http = inject(HttpClient);
  
  // Agregar token de autorización si está disponible
  const authRequest = addAuthorizationHeader(req, tokenService);
  
  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejar errores de autenticación
      if (error.status === 401) {
        return handle401Error(authRequest, next, http, tokenService);
      }
      
      if (error.status === 403) {
        return handle403Error();
      }
      
      return throwError(() => error);
    })
  );
};

/**
 * Agrega el header de autorización a la petición
 */
function addAuthorizationHeader(request: HttpRequest<any>, tokenService: TokenService): HttpRequest<any> {
  const accessToken = tokenService.getAccessToken();
  
  if (accessToken && !isAuthEndpoint(request.url)) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  
  return request;
}

/**
 * Verifica si la URL es un endpoint de autenticación
 */
function isAuthEndpoint(url: string): boolean {
  const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password'];
  return authEndpoints.some(endpoint => url.includes(endpoint));
}

/**
 * Maneja errores 401 (No autorizado)
 */
function handle401Error(
  request: HttpRequest<any>, 
  next: (req: HttpRequest<any>) => Observable<HttpEvent<any>>, 
  http: HttpClient, 
  tokenService: TokenService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);
    
    const refreshToken = tokenService.getRefreshToken();
    
    if (refreshToken) {
      // Implementar refreshToken directamente aquí en lugar de usar AuthService
      const API_URL = environment.apiUrl;
      const refreshRequest = { refreshToken };
      
      return http.post<any>(`${API_URL}/auth/refresh`, refreshRequest).pipe(
        tap(response => {
          // Actualizar tokens
          tokenService.setTokens(
            response.accessToken,
            response.refreshToken,
            tokenService.isRememberMeEnabled()
          );
        }),
        switchMap((tokenResponse: any) => {
          isRefreshing = false;
          refreshTokenSubject.next(tokenResponse.accessToken);
          
          // Reintentar la petición original con el nuevo token
          const newAuthRequest = addAuthorizationHeader(request, tokenService);
          return next(newAuthRequest);
        }),
        catchError((error) => {
          isRefreshing = false;
          refreshTokenSubject.next(null);
          
          // Si falla el refresh, limpiar tokens
          tokenService.clearTokens();
          return throwError(() => error);
        })
      );
    } else {
      // No hay refresh token, limpiar tokens
      tokenService.clearTokens();
      return throwError(() => new Error('No refresh token available'));
    }
  } else {
    // Hay un refresh en curso, esperar y reintentar con el nuevo token
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((): Observable<HttpEvent<any>> => {
        const newAuthRequest = addAuthorizationHeader(request, tokenService);
        return next(newAuthRequest);
      }),
      catchError(error => {
        // Si falla el reintento, limpiar tokens
        tokenService.clearTokens();
        return throwError(() => error);
      })
    );
  }
}

/**
 * Maneja errores 403 (Prohibido)
 */
function handle403Error(): Observable<never> {
  // El usuario no tiene permisos para acceder al recurso
  console.error('Acceso denegado: No tienes permisos para acceder a este recurso');
  return throwError(() => new Error('Acceso denegado'));
}