import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

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
        // Token expired or invalid
        authService.logout(); // This will also navigate to login
      } else if (error.status === 403) {
        // Forbidden - insufficient permissions
        router.navigate(['/unauthorized']); // Assuming an unauthorized route exists
      }

      return throwError(() => error);
    })
  );
};
