import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth initialization
  if (authService.isLoading()) { // Use isLoading() from AuthService
    return new Promise<boolean>((resolve) => {
      const checkAuth = setInterval(() => {
        if (!authService.isLoading()) { // Use isLoading() from AuthService
          clearInterval(checkAuth);
          const result = checkAuthentication();
          resolve(result === true);
        }
      }, 100);
    });
  }

  return checkAuthentication();

  function checkAuthentication(): boolean | UrlTree {
    if (authService.isAuthenticated()) {
      return true;
    }

    // Store the attempted URL for redirecting
    authService.redirectUrl = state.url; // Direct assignment for signal

    // Redirect to login
    return router.createUrlTree(['/auth/login']);
  }
};
