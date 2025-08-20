import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthValidators } from '../../validators/auth.validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        @if (!isSubmitted()) {
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">¿Olvidaste tu contraseña?</h2>
              <p class="mt-2 text-gray-600">
                No te preocupes, te enviaremos instrucciones para restablecerla.
              </p>
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

            <!-- Form -->
            <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
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
                    class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    [class]="hasFieldError('email') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'"
                    placeholder="Ingresa tu correo"
                    autocomplete="email"
                  />
                </div>
                @if (hasFieldError('email')) {
                  <p class="mt-1 text-sm text-red-600">{{ getFieldErrorMessage('email') }}</p>
                }
              </div>

              <button
                type="submit"
                [disabled]="forgotPasswordForm.invalid || authService.isLoading()"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                @if (authService.isLoading()) {
                  <div class="flex items-center space-x-2">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                } @else {
                  Restablecer contraseña
                }
              </button>
            </form>

            <!-- Back to Sign In -->
            <div class="mt-8 text-center">
              <button
                type="button"
                class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                (click)="onBackToSignIn()"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        } @else {
          <!-- Success State -->
          <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div class="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Revisa tu correo</h2>
            <p class="text-gray-600 mb-6">
              Hemos enviado un enlace de restablecimiento de contraseña a 
              <span class="font-medium text-gray-900">{{ submittedEmail() }}</span>
            </p>
            <div class="space-y-4">
              <p class="text-sm text-gray-500">
                ¿No recibiste el correo? Revisa tu carpeta de spam o intenta de nuevo.
              </p>
              <button
                type="button"
                class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                (click)="onTryAgain()"
              >
                Intentar con otro correo
              </button>
            </div>
            <div class="mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                (click)="onBackToSignIn()"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  readonly isSubmitted = signal(false);
  readonly submittedEmail = signal('');

  readonly forgotPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, AuthValidators.email, AuthValidators.noWhitespace]]
  });

  get emailControl() { return this.forgotPasswordForm.controls.email; }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.emailControl.value.trim();
      
      // TODO: Implement actual password reset functionality
      // For now, just simulate success
      setTimeout(() => {
        this.submittedEmail.set(email);
        this.isSubmitted.set(true);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  onTryAgain(): void {
    this.isSubmitted.set(false);
    this.submittedEmail.set('');
    this.forgotPasswordForm.reset();
  }

  onBackToSignIn(): void {
    this.router.navigate(['/auth/login']);
  }

  hasFieldError(fieldName: string): boolean {
    const control = this.forgotPasswordForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.forgotPasswordForm.get(fieldName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors?.['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (control.errors?.['noWhitespace']) {
        return 'El correo no puede contener solo espacios en blanco';
      }
    }
    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
      
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}