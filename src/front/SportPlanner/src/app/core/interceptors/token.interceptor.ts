import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError, from, of, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip auth endpoints - Note: Using 'Auth' with capital A to match backend route
  const skipUrls = ['/api/Auth/login', '/api/Auth/register', '/api/Auth/refresh', '/api/Auth/forgot-password', '/api/Auth/reset-password'];
  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  // Add token to request
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const alreadyRetried = req.headers.has('X-Retry');
        if (alreadyRetried) {
          // Ya intentado, forzar logout
          return from(authService.logout()).pipe(switchMap(() => throwError(() => error)));
        }
        // Intentar refresh una vez y reintentar la petición original
        return from(authService.refreshAccessToken()).pipe(
          switchMap((refreshed) => {
            if (refreshed) {
              const newToken = authService.getToken();
              const retriedReq = req.clone({
                setHeaders: newToken ? { Authorization: `Bearer ${newToken}`, 'X-Retry': '1' } : { 'X-Retry': '1' }
              });
              return next(retriedReq);
            }
            return from(authService.logout()).pipe(switchMap(() => throwError(() => error)));
          })
        );
      } else if (error.status === 403) {
        // Forbidden - insufficient permissions
        router.navigate(['/unauthorized']); // Assuming an unauthorized route exists
      }
      return throwError(() => error);
    })
  );
};
