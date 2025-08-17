import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

/**
 * Guard funcional para proteger rutas que requieren autenticación
 * Verifica si el usuario está autenticado y tiene un token válido
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Verificar si hay un token válido
  const hasValidToken = tokenService.hasValidToken();
  
  if (!hasValidToken) {
    // No hay token válido, redirigir al login
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  // Verificar el estado de autenticación del servicio
  const isAuthenticated = authService.isAuthenticated();
  
  if (isAuthenticated) {
    return true;
  } else {
    // Usuario no autenticado, redirigir al login
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};

/**
 * Guard funcional para rutas que solo deben ser accesibles por usuarios no autenticados
 * Útil para páginas de login/registro que no deben ser accesibles si ya estás logueado
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  
  if (isAuthenticated) {
    // Usuario ya autenticado, redirigir al dashboard o home
    router.navigate(['/']);
    return false;
  } else {
    // Usuario no autenticado, puede acceder a la ruta
    return true;
  }
};

/**
 * Guard funcional para verificar roles específicos
 * Ejemplo de uso futuro cuando se implementen roles de usuario
 */
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.user();
    
    if (!user) {
      // Usuario no autenticado
      router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Verificar si el usuario tiene alguno de los roles permitidos
    const hasRequiredRole = allowedRoles.includes(user.role);

    if (!hasRequiredRole) {
      // Usuario no tiene el rol requerido
      router.navigate(['/access-denied']);
      return false;
    }

    return true;
  };
};