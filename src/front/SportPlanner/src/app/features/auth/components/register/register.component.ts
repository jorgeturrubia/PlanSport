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
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
      <div class="form-header">
        <h2 class="form-title">Crear cuenta</h2>
        <p class="form-subtitle">Únete a PlanSport y comienza tu entrenamiento</p>
      </div>

      @if (authService.error()) {
        <div class="error-message" role="alert">
          <span class="error-icon">⚠️</span>
          {{ authService.error() }}
        </div>
      }

      @if (registerSuccess()) {
        <div class="success-message" role="status">
          <span class="success-icon">✅</span>
          ¡Cuenta creada exitosamente! Redirigiendo...
        </div>
      }

      <!-- Nombre -->
      <div class="form-group">
        <label for="firstName" class="form-label">Nombre</label>
        <input
          id="firstName"
          type="text"
          formControlName="firstName"
          class="form-input"
          [class.error]="hasFieldError('firstName')"
          [class.success]="firstNameControl.valid && firstNameControl.dirty"
          placeholder="Tu nombre"
          autocomplete="given-name"
        />
        @if (hasFieldError('firstName')) {
          <div class="field-error">
            {{ getFieldErrorMessage('firstName') }}
          </div>
        }
      </div>

      <!-- Apellido -->
      <div class="form-group">
        <label for="lastName" class="form-label">Apellido</label>
        <input
          id="lastName"
          type="text"
          formControlName="lastName"
          class="form-input"
          [class.error]="hasFieldError('lastName')"
          [class.success]="lastNameControl.valid && lastNameControl.dirty"
          placeholder="Tu apellido"
          autocomplete="family-name"
        />
        @if (hasFieldError('lastName')) {
          <div class="field-error">
            {{ getFieldErrorMessage('lastName') }}
          </div>
        }
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="form-input"
          [class.error]="hasFieldError('email')"
          [class.success]="emailControl.valid && emailControl.dirty"
          placeholder="tu@email.com"
          autocomplete="email"
        />
        @if (hasFieldError('email')) {
          <div class="field-error">
            {{ getFieldErrorMessage('email') }}
          </div>
        }
      </div>

      <!-- Contraseña -->
      <div class="form-group">
        <label for="password" class="form-label">Contraseña</label>
        <div class="password-input-container">
          <input
            id="password"
            [type]="showPassword() ? 'text' : 'password'"
            formControlName="password"
            class="form-input"
            [class.error]="hasFieldError('password')"
            [class.success]="passwordControl.valid && passwordControl.dirty"
            placeholder="Mínimo 8 caracteres"
            autocomplete="new-password"
          />
          <button
            type="button"
            class="password-toggle"
            (click)="togglePasswordVisibility()"
            [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          >
            @if (showPassword()) {
              👁️
            } @else {
              🙈
            }
          </button>
        </div>
        @if (hasFieldError('password')) {
          <div class="field-error">
            {{ getFieldErrorMessage('password') }}
          </div>
        }
        @if (passwordControl.value && !isPasswordStrong()) {
          <div class="password-strength">
            <div class="strength-title">Requisitos de contraseña:</div>
            @for (error of getPasswordStrengthErrors(); track error) {
              <div class="strength-requirement">• {{ error }}</div>
            }
          </div>
        }
      </div>

      <!-- Confirmar Contraseña -->
      <div class="form-group">
        <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
        <div class="password-input-container">
          <input
            id="confirmPassword"
            [type]="showPassword() ? 'text' : 'password'"
            formControlName="confirmPassword"
            class="form-input"
            [class.error]="hasFieldError('confirmPassword')"
            [class.success]="confirmPasswordControl.valid && confirmPasswordControl.dirty"
            placeholder="Confirma tu contraseña"
            autocomplete="new-password"
          />
        </div>
        @if (hasFieldError('confirmPassword')) {
          <div class="field-error">
            {{ getFieldErrorMessage('confirmPassword') }}
          </div>
        }
      </div>

      <!-- Términos y condiciones -->
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            formControlName="acceptTerms"
            class="checkbox-input"
          />
          <span class="checkbox-text">
            Acepto los 
            <a href="/terms" class="terms-link" target="_blank">Términos de Servicio</a> y 
            <a href="/privacy" class="terms-link" target="_blank">Política de Privacidad</a>
          </span>
        </label>
        @if (acceptTermsControl.invalid && acceptTermsControl.touched) {
          <div class="field-error">
            Debes aceptar los términos y condiciones
          </div>
        }
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        class="submit-button"
        [disabled]="registerForm.invalid || authService.isLoading()"
      >
        @if (authService.isLoading()) {
          <span class="button-spinner"></span>
          Creando cuenta...
        } @else {
          Crear Cuenta
        }
      </button>
    </form>
  `,
  styles: [`
    .register-form {
      width: 100%;
    }

    .form-header {
      text-align: center;
      margin-bottom: var(--spacing-6);
    }

    .form-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-2) 0;
    }

    .form-subtitle {
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
      margin: 0;
    }

    .error-message {
      background: var(--color-error-50);
      border: 1px solid var(--color-error-200);
      color: var(--color-error-700);
      padding: var(--spacing-3);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-4);
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .success-message {
      background: var(--color-success-50);
      border: 1px solid var(--color-success-200);
      color: var(--color-success-700);
      padding: var(--spacing-3);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-4);
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .error-icon,
    .success-icon {
      font-size: var(--font-size-base);
      flex-shrink: 0;
    }

    .form-group {
      margin-bottom: var(--spacing-4);
    }

    .form-label {
      display: block;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-700);
      margin-bottom: var(--spacing-2);
    }

    .form-input {
      width: 100%;
      padding: var(--spacing-3);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }

    .form-input.error {
      border-color: var(--color-error-500);
    }

    .form-input.error:focus {
      box-shadow: 0 0 0 3px var(--color-error-100);
    }

    .form-input.success {
      border-color: var(--color-success-500);
    }

    .form-input.success:focus {
      box-shadow: 0 0 0 3px var(--color-success-100);
    }

    .password-input-container {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: var(--spacing-3);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--spacing-1);
      font-size: var(--font-size-sm);
    }

    .field-error {
      color: var(--color-error-600);
      font-size: var(--font-size-xs);
      margin-top: var(--spacing-1);
    }

    .password-strength {
      margin-top: var(--spacing-2);
      padding: var(--spacing-2);
      background: var(--color-blue-50);
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--color-blue-200);
    }

    .strength-title {
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-blue-700);
      margin-bottom: var(--spacing-1);
    }

    .strength-requirement {
      font-size: var(--font-size-xs);
      color: var(--color-blue-600);
      line-height: 1.3;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      gap: var(--spacing-2);
    }

    .checkbox-input {
      margin-top: 2px;
      flex-shrink: 0;
    }

    .checkbox-text {
      font-size: var(--font-size-sm);
      color: var(--color-gray-700);
      line-height: 1.4;
    }

    .terms-link {
      color: var(--color-primary-600);
      text-decoration: none;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .submit-button {
      width: 100%;
      background: var(--color-primary-600);
      color: white;
      border: none;
      padding: var(--spacing-3) var(--spacing-4);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
    }

    .submit-button:hover:not(:disabled) {
      background: var(--color-primary-700);
    }

    .submit-button:disabled {
      background: var(--color-gray-400);
      cursor: not-allowed;
    }

    .button-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
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