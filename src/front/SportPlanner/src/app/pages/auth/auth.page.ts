import { Component } from '@angular/core';
@Component({
  selector: 'app-auth',
  template: `
    <div class="min-h-screen bg-neutral-100 flex flex-col justify-center items-center">
      <div class="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <nav class="flex mb-6">
          <button (click)="tab = 'login'" [class.bg-primary-500]="tab === 'login'" class="flex-1 py-3 rounded-l-lg text-neutral-800 font-semibold focus:outline-none" [ngClass]="{'text-neutral-100': tab === 'login'}">Iniciar sesión</button>
          <button (click)="tab = 'register'" [class.bg-primary-500]="tab === 'register'" class="flex-1 py-3 rounded-r-lg text-neutral-800 font-semibold focus:outline-none" [ngClass]="{'text-neutral-100': tab === 'register'}">Registrarse</button>
        </nav>
        <form *ngIf="tab === 'login'" (ngSubmit)="onLogin()" #loginForm="ngForm" autocomplete="off">
          <input class="w-full mb-3 p-3 border rounded text-neutral-800" placeholder="Email" type="email" [(ngModel)]="loginEmail" name="loginEmail" required />
          <input class="w-full mb-6 p-3 border rounded text-neutral-800" placeholder="Contraseña" type="password" [(ngModel)]="loginPassword" name="loginPassword" required />
          <button [disabled]="loading" class="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold p-3 rounded mt-2">Entrar</button>
          <div *ngIf="errorMsg" class="text-error-500 mt-3">{{ errorMsg }}</div>
        </form>
        <form *ngIf="tab === 'register'" (ngSubmit)="onRegister()" #registerForm="ngForm" autocomplete="off">
          <input class="w-full mb-3 p-3 border rounded text-neutral-800" placeholder="Email" type="email" [(ngModel)]="registerEmail" name="registerEmail" required />
          <input class="w-full mb-6 p-3 border rounded text-neutral-800" placeholder="Contraseña" type="password" [(ngModel)]="registerPassword" name="registerPassword" required />
          <button [disabled]="loading" class="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold p-3 rounded mt-2">Registrar</button>
          <div *ngIf="errorMsg" class="text-error-500 mt-3">{{ errorMsg }}</div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class AuthPage {
  tab: 'login' | 'register' = 'login';
  loginEmail = '';
  loginPassword = '';
  registerEmail = '';
  registerPassword = '';
  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService) {}

  async onLogin() {
    this.loading = true;
    this.errorMsg = '';
    try {
      await this.auth.login(this.loginEmail, this.loginPassword);
    } catch (e: any) {
      this.errorMsg = e.message;
    }
    this.loading = false;
  }
  async onRegister() {
    this.loading = true;
    this.errorMsg = '';
    try {
      await this.auth.register(this.registerEmail, this.registerPassword);
    } catch (e: any) {
      this.errorMsg = e.message;
    }
    this.loading = false;
  }
}

