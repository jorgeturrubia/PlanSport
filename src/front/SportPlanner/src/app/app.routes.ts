import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/landing/landing.page').then(m => m.LandingPage) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.page').then(m => m.AuthPage) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./pages/dashboard/home.page').then(m => m.HomePage) },
      { path: 'teams', loadChildren: () => import('./pages/teams/teams.page').then(m => m.TeamsPage), canActivate: [AuthGuard]},
    ]
  },
  { path: '**', redirectTo: '' },
];

