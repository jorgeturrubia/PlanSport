import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * HTTP Interceptor that automatically adds JWT tokens to requests
 * and handles token refresh when needed
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip interceptor for auth-related requests to avoid infinite loops
  if (req.url.includes('/auth/') || req.url.includes('supabase.co')) {
    return next(req);
  }

  return authService.getAccessToken().pipe(
    switchMap(token => {
      // Clone request and add authorization header if token exists
      const authReq = token 
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        : req;

      return next(authReq);
    }),
    catchError(error => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        // Clear user session and redirect to auth page
        authService.logout();
        router.navigate(['/auth']);
      }
      
      return throwError(() => error);
    })
  );
};