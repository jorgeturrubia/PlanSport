import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-neutral-100">
      <nav class="flex bg-white px-8 py-4 shadow items-center">
        <img src="/assets/logo.svg" class="w-10 mr-4" alt="Logo" />
        <a routerLink="/dashboard/home" routerLinkActive="font-bold text-primary-500" class="mx-2">Home</a>
        <a routerLink="/dashboard/teams" routerLinkActive="font-bold text-primary-500" class="mx-2">Equipos</a>
        <span class="flex-1"></span>
        <button (click)="logout()" class="ml-4 bg-error-500 text-white rounded px-4 py-2">Salir</button>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class DashboardPage {
  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}

