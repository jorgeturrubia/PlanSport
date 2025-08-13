import { Routes } from '@angular/router';

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
      }
    ]
  },
  {
    path: 'login',
    redirectTo: 'auth/login'
  },
  {
    path: 'register',
    redirectTo: 'auth/register'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
