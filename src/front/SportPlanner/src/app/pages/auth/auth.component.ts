import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <h1 class="text-2xl font-bold text-white mb-2">SportAgentoos</h1>
          <p class="text-blue-100">Accede a tu cuenta o crea una nueva</p>
        </div>

        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-200">
          <button
            (click)="activeTab = 'login'"
            [class]="getTabClass('login')"
            class="flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
          <button
            (click)="activeTab = 'register'"
            [class]="getTabClass('register')"
            class="flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200"
          >
            Registrarse
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Login Form -->
          <div *ngIf="activeTab === 'login'" class="space-y-4">
            <app-login-form
              (loginSuccess)="onLoginSuccess()"
              (loginError)="onAuthError($event)"
            ></app-login-form>
          </div>

          <!-- Register Form -->
          <div *ngIf="activeTab === 'register'" class="space-y-4">
            <app-register-form
              (registerSuccess)="onRegisterSuccess()"
              (registerError)="onAuthError($event)"
            ></app-register-form>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-700 text-sm">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 text-center">
          <p class="text-xs text-gray-500">
            Al continuar, aceptas nuestros 
            <a href="#" class="text-blue-600 hover:underline">Términos de Servicio</a> y 
            <a href="#" class="text-blue-600 hover:underline">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AuthComponent implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  getTabClass(tab: 'login' | 'register'): string {
    const baseClasses = 'border-b-2 transition-colors duration-200';
    if (this.activeTab === tab) {
      return `${baseClasses} border-blue-500 text-blue-600 bg-blue-50`;
    }
    return `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50`;
  }

  onLoginSuccess(): void {
    this.clearMessages();
    this.successMessage = '¡Inicio de sesión exitoso! Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  onRegisterSuccess(): void {
    this.clearMessages();
    this.successMessage = '¡Registro exitoso! Redirigiendo al dashboard...';
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  onAuthError(error: string): void {
    this.clearMessages();
    this.errorMessage = error;
    // Clear error after 5 seconds
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}