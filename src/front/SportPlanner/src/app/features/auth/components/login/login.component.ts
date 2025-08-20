import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.interfaces';
import { AuthValidators, getFirstErrorMessage } from '../../validators/auth.validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Bienvenido de vuelta</h2>
            <p class="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          <!-- Error Message -->
          @if (authService.error()) {
            <div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3" role="alert">
              <svg class="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm text-red-700">{{ authService.error() }}</p>
            </div>
          }

          <!-- Success Message -->
          @if (loginSuccess()) {
            <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3" role="status">
              <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <p class="text-sm text-green-700">¡Inicio de sesión exitoso! Redirigiendo...</p>
            </div>
          }

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
                <span class="sr-only">(obligatorio)</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  [class]="hasFieldError('email') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                           (emailControl.valid && emailControl.dirty) ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-gray-300'"
                  placeholder="Ingresa tu correo"
                  autocomplete="email"
                />
              </div>
              @if (hasFieldError('email')) {
                <p class="mt-1 text-sm text-red-600">{{ getFieldErrorMessage('email') }}</p>
              }
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
                <span class="sr-only">(obligatorio)</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  class="block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  [class]="hasFieldError('password') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                           (passwordControl.valid && passwordControl.dirty) ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-gray-300'"
                  placeholder="Ingresa tu contraseña"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  (click)="togglePasswordVisibility()"
                  [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  @if (showPassword()) {
                    <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                    </svg>
                  } @else {
                    <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  }
                </button>
              </div>
              @if (hasFieldError('password')) {
                <p class="mt-1 text-sm text-red-600">{{ getFieldErrorMessage('password') }}</p>
              }
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  formControlName="rememberMe"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <button
                type="button"
                class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                (click)="onForgotPassword()"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loginForm.invalid || authService.isLoading()"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              @if (authService.isLoading()) {
                <div class="flex items-center space-x-2">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </div>
              } @else {
                Iniciar Sesión
              }
            </button>
          </form>

          <!-- Sign Up Link -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">¿No tienes una cuenta?</span>
              </div>
            </div>
            <div class="mt-6 text-center">
              <button
                type="button"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                (click)="onSignUp()"
              >
                Crear tu cuenta
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center text-sm text-gray-600">
          Al iniciar sesión, aceptas nuestros 
          <button class="text-indigo-600 hover:text-indigo-500">Términos de Servicio</button> 
          y 
          <button class="text-indigo-600 hover:text-indigo-500">Política de Privacidad</button>
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly authService = inject(AuthService);

  readonly showPassword = signal(false);
  readonly loginSuccess = signal(false);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, AuthValidators.email, AuthValidators.noWhitespace]],
    password: ['', [Validators.required, AuthValidators.minLength(6, 'contraseña')]],
    rememberMe: [false]
  });

  // Getters para acceso fácil a los controles
  get emailControl() { return this.loginForm.controls.email; }
  get passwordControl() { return this.loginForm.controls.password; }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(current => !current);
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginSuccess.set(false);
      
      const formValue = this.loginForm.getRawValue();
      const loginData: LoginRequest = {
        email: formValue.email.trim(),
        password: formValue.password
      };
      
      this.authService.login(loginData, formValue.rememberMe).subscribe({
        next: (response) => {
          this.loginSuccess.set(true);
          
          // Pequeño delay para mostrar el mensaje de éxito
          setTimeout(() => {
            // Obtener URL de retorno de los query params
            // Si no hay returnUrl específica, ir al dashboard (usuarios autenticados)
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([returnUrl]);
          }, 1500);
        },
        error: (error) => {
          this.loginSuccess.set(false);
          
          // Si el error tiene detalles específicos, los mostramos
          if (error.errorDetails) {
            // Manejar errores específicos si es necesario
            if (error.errorDetails.type === 'validation' && error.errorDetails.validationErrors) {
              // Mostrar errores de validación específicos en los campos
              this.handleValidationErrors(error.errorDetails.validationErrors);
            }
          }
          
          // El mensaje de error ya se maneja en el AuthService y se muestra en el template
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched();
    }
  }

  /**
   * Maneja el clic en "Olvidé mi contraseña"
   */
  onForgotPassword(): void {
    // TODO: Implementar modal o navegación a página de recuperación
    this.router.navigate(['/auth/forgot-password']);
  }

  /**
   * Maneja la navegación al formulario de registro
   */
  onSignUp(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Obtiene el mensaje de error para mostrar al usuario
   */
  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.loginForm.get(fieldName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      return getFirstErrorMessage(control);
    }
    return null;
  }

  /**
   * Verifica si un campo tiene errores y debe mostrar el estado de error
   */
  hasFieldError(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Maneja errores de validación específicos del backend
   */
  private handleValidationErrors(validationErrors: any[]): void {
    validationErrors.forEach(error => {
      const control = this.loginForm.get(error.field);
      if (control) {
        // Agregar error personalizado del backend
        control.setErrors({ 
          ...control.errors, 
          backend: error.message 
        });
        control.markAsTouched();
      }
    });
  }

  /**
   * Marca todos los controles del formulario como touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
      
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}