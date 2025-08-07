import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="tu@email.com"
          [class.border-red-500]="isFieldInvalid('email')"
        />
        <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
          <span *ngIf="loginForm.get('email')?.errors?.['required']">El correo es requerido</span>
          <span *ngIf="loginForm.get('email')?.errors?.['email']">Ingresa un correo válido</span>
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div class="relative">
          <input
            id="password"
            [type]="showPassword ? 'text' : 'password'"
            formControlName="password"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Tu contraseña"
            [class.border-red-500]="isFieldInvalid('password')"
          />
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg *ngIf="!showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg *ngIf="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          </button>
        </div>
        <div *ngIf="isFieldInvalid('password')" class="mt-1 text-sm text-red-600">
          <span *ngIf="loginForm.get('password')?.errors?.['required']">La contraseña es requerida</span>
          <span *ngIf="loginForm.get('password')?.errors?.['minlength']">La contraseña debe tener al menos 6 caracteres</span>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember"
            type="checkbox"
            formControlName="remember"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-700">
            Recordarme
          </label>
        </div>
        <button
          type="button"
          (click)="onForgotPassword()"
          class="text-sm text-blue-600 hover:text-blue-500 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        [disabled]="loginForm.invalid || isLoading"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        <svg *ngIf="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </button>
    </form>
  `,
  styles: []
})
export class LoginFormComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() loginError = new EventEmitter<string>();

  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      const { email, password } = this.loginForm.value;
      
      try {
        const result = await this.authService.login(email, password);
        
        if (result.success) {
          this.loginSuccess.emit();
          this.loginForm.reset();
        } else {
          this.loginError.emit(result.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        this.loginError.emit('Error inesperado al iniciar sesión');
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onForgotPassword(): Promise<void> {
    const email = this.loginForm.get('email')?.value;
    
    if (!email) {
      this.loginError.emit('Por favor ingresa tu correo electrónico primero');
      return;
    }

    try {
      const result = await this.authService.resetPassword(email);
      
      if (result.success) {
        this.loginError.emit('Se ha enviado un enlace de recuperación a tu correo');
      } else {
        this.loginError.emit(result.error || 'Error al enviar el enlace de recuperación');
      }
    } catch (error) {
      this.loginError.emit('Error inesperado al enviar el enlace de recuperación');
    }
  }
}