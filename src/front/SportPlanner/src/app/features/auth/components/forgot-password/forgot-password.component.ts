import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faSpinner, faCheck, faExclamationTriangle, faArrowLeft } from '../../auth-icons';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthErrorHandlerService } from '../../../../core/services/auth-error-handler.service'; // Import AuthErrorHandlerService

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authErrorHandler = inject(AuthErrorHandlerService); // Inject AuthErrorHandlerService

  // Icons
  readonly faEnvelope = faEnvelope;
  readonly faSpinner = faSpinner;
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faArrowLeft = faArrowLeft;

  // Signals
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Form
  readonly forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailControl() {
    return this.forgotPasswordForm.get('email')!;
  }

  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const email = this.forgotPasswordForm.value.email;
      if (!email) {
        throw new Error('Email is required');
      }
      
      const success = await this.authService.forgotPassword(email);
      if (success) {
        this.successMessage.set('Si el email existe, recibirás instrucciones para restablecer tu contraseña.');
      } else {
        this.errorMessage.set('Error al solicitar el restablecimiento de contraseña.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.errorMessage.set(authError.userMessage);
      console.error('Forgot password failed:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getFieldErrorMessage(fieldName: string): string {
    const control = this.forgotPasswordForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'El correo electrónico es requerido';
      }
      if (control.errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
    }
    return '';
  }
}
