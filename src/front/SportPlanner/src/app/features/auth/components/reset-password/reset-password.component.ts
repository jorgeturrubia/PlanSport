import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faEye, faEyeSlash, faSpinner, faCheck, faExclamationTriangle, faArrowLeft } from '../../auth-icons';
import { passwordStrengthValidator, passwordMatchValidator, calculatePasswordStrength } from '../../models/validators';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthErrorHandlerService } from '../../../../core/services/auth-error-handler.service'; // Import AuthErrorHandlerService

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authErrorHandler = inject(AuthErrorHandlerService); // Inject AuthErrorHandlerService

  // Icons
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faSpinner = faSpinner;
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faArrowLeft = faArrowLeft;

  // Signals
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly token = signal<string | null>(null);

  // Form
  readonly resetPasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator() });

  // Computed password strength
  readonly passwordStrength = computed(() => {
    const password = this.resetPasswordForm.get('password')?.value || '';
    return calculatePasswordStrength(password);
  });

  get passwordControl() {
    return this.resetPasswordForm.get('password')!;
  }

  get confirmPasswordControl() {
    return this.resetPasswordForm.get('confirmPassword')!;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.token.set(token);
      } else {
        this.errorMessage.set('Token de restablecimiento no encontrado.');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.invalid || !this.token()) {
      this.resetPasswordForm.markAllAsTouched();
      if (!this.token()) {
        this.errorMessage.set('Token de restablecimiento no válido o faltante.');
      }
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const password = this.resetPasswordForm.get('password')?.value;
      if (!password) {
        throw new Error('Password is required');
      }
      const success = await this.authService.resetPassword(this.token()!, password);
      if (!success) {
        throw new Error('Failed to reset password');
      }
      this.successMessage.set('Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.');
      // Optionally redirect after a delay
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 3000);
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.errorMessage.set(authError.userMessage);
      console.error('Reset password failed:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getFieldErrorMessage(fieldName: string): string {
    const control = this.resetPasswordForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['passwordStrength']) {
        return 'La contraseña no cumple con los requisitos de seguridad';
      }
    }

    if (fieldName === 'confirmPassword' && this.resetPasswordForm.errors?.['passwordMismatch'] && control?.touched) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  getPasswordStrengthColor(): string {
    const strength = this.passwordStrength();
    switch (strength.level) {
      case 'weak': return 'bg-red-500';
      case 'fair': return 'bg-yellow-500';
      case 'good': return 'bg-blue-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  }

  getPasswordStrengthText(): string {
    const strength = this.passwordStrength();
    switch (strength.level) {
      case 'weak': return 'Débil';
      case 'fair': return 'Regular';
      case 'good': return 'Buena';
      case 'strong': return 'Fuerte';
      default: return '';
    }
  }
}
