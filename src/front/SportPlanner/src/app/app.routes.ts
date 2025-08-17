import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard, guestGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: Landing,
    canActivate: [guestGuard] // Solo usuarios no autenticados pueden ver el landing
  },
  {
    path: 'auth',
    canActivate: [guestGuard], // Solo usuarios no autenticados pueden acceder a auth
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], // Solo usuarios autenticados
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard], // Solo usuarios autenticados
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  // Redirecciones para compatibilidad
  { path: 'login', redirectTo: '/auth/login' },
  { path: 'register', redirectTo: '/auth/register' },
  { path: '**', redirectTo: '' }
];
