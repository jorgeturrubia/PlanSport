import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent),
        title: 'Dashboard - Inicio'
      },
      {
        path: 'teams',
        loadComponent: () => import('./pages/teams/teams.component').then(m => m.TeamsComponent),
        title: 'Dashboard - Equipos'
      }
    ]
  }
];