import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.interfaces';
import { AuthValidators, getFirstErrorMessage } from '../../validators/auth.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Crear cuenta</h2>
            <p class="mt-2 text-gray-600">Únete y comienza tu journey</p>
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
          @if (registerSuccess()) {
            <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3" role="status">
              <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <p class="text-sm text-green-700">¡Cuenta creada exitosamente! Redirigiendo...</p>
            </div>
          }

          <!-- Form -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Name Field -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  [class]="hasFieldError('firstName') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                           (firstNameControl.valid && firstNameControl.dirty) ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-gray-300'"
                  placeholder="Ingresa tu nombre completo"
                  autocomplete="name"
                />
              </div>
              @if (hasFieldError('firstName')) {
                <p class="mt-1 text-sm text-red-600">{{ getFieldErrorMessage('firstName') }}</p>
              }
            </div>

            <!-- Email Field -->
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
                  class="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                  class="block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  [class]="hasFieldError('password') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                           (passwordControl.valid && passwordControl.dirty) ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-gray-300'"
                  placeholder="Crea una contraseña"
                  autocomplete="new-password"
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
              
              <!-- Password Strength Indicator -->
              @if (passwordControl.value && !isPasswordStrong()) {
                <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div class="text-xs font-medium text-blue-700 mb-1">Requisitos de contraseña:</div>
                  @for (error of getPasswordStrengthErrors(); track error) {
                    <div class="text-xs text-blue-600">• {{ error }}</div>
                  }
                </div>
              }
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="confirmPassword"
                  class="block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  [class]="hasFieldError('confirmPassword') ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                           (confirmPasswordControl.valid && confirmPasswordControl.dirty) ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-gray-300'"
                  placeholder="Confirma tu contraseña"
                  autocomplete="new-password"
                />
              </div>
              
              @if (hasFieldError('confirmPassword')) {
                <p class="mt-1 text-sm text-red-600">{{ getFieldErrorMessage('confirmPassword') }}</p>
              }
              
              <!-- Password Match Indicator -->
              @if (confirmPasswordControl.value && confirmPasswordControl.value.length > 0) {
                <div class="mt-1 flex items-center">
                  @if (passwordControl.value === confirmPasswordControl.value) {
                    <div class="flex items-center text-green-600">
                      <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="text-xs">Las contraseñas coinciden</span>
                    </div>
                  } @else {
                    <div class="flex items-center text-red-600">
                      <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      <span class="text-xs">Las contraseñas no coinciden</span>
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="accept-terms"
                type="checkbox"
                formControlName="acceptTerms"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label for="accept-terms" class="ml-2 block text-sm text-gray-700">
                Acepto los 
                <button type="button" class="text-purple-600 hover:text-purple-500">
                  Términos de Servicio
                </button> 
                y 
                <button type="button" class="text-purple-600 hover:text-purple-500">
                  Política de Privacidad
                </button>
              </label>
            </div>
            @if (acceptTermsControl.invalid && acceptTermsControl.touched) {
              <p class="mt-1 text-sm text-red-600">
                Debes aceptar los términos y condiciones
              </p>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="registerForm.invalid || authService.isLoading()"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              @if (authService.isLoading()) {
                <div class="flex items-center space-x-2">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creando cuenta...</span>
                </div>
              } @else {
                Crear cuenta
              }
            </button>
          </form>

          <!-- Sign In Link -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">¿Ya tienes una cuenta?</span>
              </div>
            </div>
            <div class="mt-6 text-center">
              <button
                type="button"
                class="font-medium text-purple-600 hover:text-purple-500"
                (click)="onSignIn()"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  readonly showPassword = signal(false);
  readonly registerSuccess = signal(false);

  readonly registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, AuthValidators.name, AuthValidators.noWhitespace]],
    lastName: ['', [Validators.required, AuthValidators.name, AuthValidators.noWhitespace]],
    email: ['', [Validators.required, AuthValidators.email, AuthValidators.noWhitespace]],
    password: ['', [Validators.required, AuthValidators.passwordStrength]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, Validators.requiredTrue]
  }, {
    validators: [AuthValidators.passwordMatch('password', 'confirmPassword')]
  });

  // Getters para acceso fácil a los controles
  get firstNameControl() { return this.registerForm.controls.firstName; }
  get lastNameControl() { return this.registerForm.controls.lastName; }
  get emailControl() { return this.registerForm.controls.email; }
  get passwordControl() { return this.registerForm.controls.password; }
  get confirmPasswordControl() { return this.registerForm.controls.confirmPassword; }
  get acceptTermsControl() { return this.registerForm.controls.acceptTerms; }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(current => !current);
  }

  /**
   * Obtiene el mensaje de error para mostrar al usuario
   */
  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.registerForm.get(fieldName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      return getFirstErrorMessage(control);
    }
    return null;
  }

  /**
   * Obtiene los errores específicos de fortaleza de contraseña
   */
  getPasswordStrengthErrors(): string[] {
    const control = this.registerForm.get('password');
    if (control && control.errors && control.errors['passwordStrength']) {
      const errors = control.errors['passwordStrength'];
      return Object.values(errors).filter(error => typeof error === 'string') as string[];
    }
    return [];
  }

  /**
   * Verifica si un campo tiene errores y debe mostrar el estado de error
   */
  hasFieldError(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Verifica si la contraseña cumple con los criterios de fortaleza
   */
  isPasswordStrong(): boolean {
    const control = this.registerForm.get('password');
    return !!(control && control.value && !control.errors?.['passwordStrength']);
  }

  /**
   * Maneja la navegación al formulario de inicio de sesión
   */
  onSignIn(): void {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.registerForm.valid && !this.authService.isLoading()) {
      // Resetear estado de éxito al inicio
      this.registerSuccess.set(false);
      
      const formValue = this.registerForm.getRawValue();
      const registerData: RegisterRequest = {
        firstName: formValue.firstName?.trim() || '',
        lastName: formValue.lastName?.trim() || '',
        email: formValue.email?.trim() || '',
        password: formValue.password || '',
        acceptTerms: formValue.acceptTerms || false
      };
      
      this.authService.register(registerData).subscribe({
        next: () => {
          // Mostrar mensaje de éxito
          this.registerSuccess.set(true);
          
          // Redirigir al login después de un delay
          setTimeout(() => {
            this.router.navigate(['/auth/login'], {
              queryParams: { 
                message: 'Registro exitoso. Por favor inicia sesión con tus credenciales.' 
              }
            });
          }, 1500);
        },
        error: (error) => {
          console.error('Error en registro:', error);
          
          // Log información detallada del error
          if (error.errorDetails) {
            console.log('Tipo de error:', error.errorDetails.type);
            console.log('Código de error:', error.errorDetails.code);
            console.log('¿Es recuperable?:', error.errorDetails.isRecoverable);
            console.log('¿Requiere acción?:', error.errorDetails.requiresUserAction);
          }
          
          // Resetear estado de éxito en caso de error
          this.registerSuccess.set(false);
          
          // Manejar errores de validación específicos
          if (error.errorDetails?.type === 'validation' && error.errorDetails.validationErrors) {
            this.handleValidationErrors(error.errorDetails.validationErrors);
          }
          
          // El error ya se maneja en el AuthService
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched();
    }
  }

  /**
   * Maneja errores de validación específicos del backend
   */
  private handleValidationErrors(validationErrors: any[]): void {
    validationErrors.forEach(error => {
      const control = this.registerForm.get(error.field);
      if (control) {
        control.setErrors({ backend: error.message });
        control.markAsTouched();
      }
    });
  }

  /**
   * Marca todos los controles del formulario como touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
      
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}