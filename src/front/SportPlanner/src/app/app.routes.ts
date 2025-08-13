import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; // Import authGuard

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth-tabs/auth-tabs').then(m => m.AuthTabsComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login-form/login-form').then(m => m.LoginFormComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/components/register-form/register-form').then(m => m.RegisterFormComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) // Assuming this component will be created
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) // Assuming this component will be created
      },
      {
        path: 'verify-email/:token',
        loadComponent: () => import('./features/auth/components/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
      }
    ]
  },
  // Protected Routes
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), // Assuming this component exists
    canActivate: [authGuard]
  },
  {
    path: 'teams',
    loadComponent: () => import('./features/teams/teams.component').then(m => m.TeamsComponent), // Assuming this component exists
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/auth/components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  // Default redirect for any other path
  {
    path: '**',
    redirectTo: ''
  }
];
