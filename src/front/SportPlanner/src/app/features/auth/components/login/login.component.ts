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
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-header">
        <h2 class="form-title">Bienvenido de vuelta</h2>
        <p class="form-subtitle">Ingresa tus credenciales para continuar</p>
      </div>

      @if (authService.error()) {
        <div class="error-message" role="alert">
          <span class="error-icon">⚠️</span>
          {{ authService.error() }}
        </div>
      }

      @if (loginSuccess()) {
        <div class="success-message" role="status">
          <span class="success-icon">✅</span>
          ¡Inicio de sesión exitoso! Redirigiendo...
        </div>
      }

      <!-- Campo Email -->
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

      <!-- Campo Contraseña -->
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
            placeholder="Tu contraseña"
            autocomplete="current-password"
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
      </div>

      <!-- Recordarme y Olvidé contraseña -->
      <div class="form-options">
        <label class="checkbox-label">
          <input
            type="checkbox"
            formControlName="rememberMe"
            class="checkbox-input"
          />
          <span class="checkbox-text">Recordarme</span>
        </label>
        <button
          type="button"
          class="forgot-password-link"
          (click)="onForgotPassword()"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        class="submit-button"
        [disabled]="loginForm.invalid || authService.isLoading()"
      >
        @if (authService.isLoading()) {
          <span class="button-spinner"></span>
          Iniciando sesión...
        } @else {
          Iniciar Sesión
        }
      </button>
    </form>
  `,
  styles: [`
    .login-form {
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

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-6);
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .checkbox-input {
      margin-right: var(--spacing-2);
    }

    .checkbox-text {
      font-size: var(--font-size-sm);
      color: var(--color-gray-700);
    }

    .forgot-password-link {
      background: none;
      border: none;
      color: var(--color-primary-600);
      font-size: var(--font-size-sm);
      cursor: pointer;
      text-decoration: none;
    }

    .forgot-password-link:hover {
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
        next: () => {
          this.loginSuccess.set(true);
          
          // Pequeño delay para mostrar el mensaje de éxito
          setTimeout(() => {
            // Obtener URL de retorno de los query params
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          }, 1500);
        },
        error: (error) => {
          this.loginSuccess.set(false);
          
          // Log detallado del error para debugging
          console.error('Error en login:', error);
          
          // Si el error tiene detalles específicos, los mostramos
          if (error.errorDetails) {
            console.log('Tipo de error:', error.errorDetails.type);
            console.log('Código de error:', error.errorDetails.code);
            console.log('Es recuperable:', this.authService.isErrorRecoverable(error));
            console.log('Requiere acción:', this.authService.doesErrorRequireAction(error));
            
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
    console.log('Forgot password clicked');
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