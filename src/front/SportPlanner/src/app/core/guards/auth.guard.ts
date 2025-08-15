import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Esperar la inicialización del AuthService sin polling
  try {
    await authService.initialized;
  } catch {}

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
