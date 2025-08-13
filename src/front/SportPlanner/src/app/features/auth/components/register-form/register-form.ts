import { Component, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser, faEnvelope, faLock, faEye, faEyeSlash, faCheck,
  faExclamationTriangle, faInfoCircle, faFutbol, faBasketballBall,
  faSwimmer, faRunning, faDumbbell, faUserPlus
} from '../../auth-icons';
import { passwordStrengthValidator, passwordMatchValidator, calculatePasswordStrength } from '../../models/validators';
import { SportOption, RegisterData } from '../../models/auth.interfaces';
import { AuthService } from '../../../../core/services/auth.service'; // Import AuthService
import { AuthErrorHandlerService } from '../../../../core/services/auth-error-handler.service'; // Import AuthErrorHandlerService
import { ErrorDisplayComponent } from '../../../../shared/components/error-display/error-display.component'; // Import ErrorDisplayComponent

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule, ErrorDisplayComponent],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService); // Inject AuthService
  private readonly authErrorHandler = inject(AuthErrorHandlerService); // Inject AuthErrorHandlerService

  // Icons
  readonly faUser = faUser;
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faInfoCircle = faInfoCircle;
  readonly faUserPlus = faUserPlus;
  readonly faFutbol = faFutbol;

  // Signals
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null); // Signal for error messages

  // Sport options
  sportOptions: SportOption[] = [
    { id: 'football', name: 'Fútbol', icon: faFutbol, description: 'El deporte rey' },
    { id: 'basketball', name: 'Baloncesto', icon: faBasketballBall, description: 'Deporte de canasta' },
    { id: 'swimming', name: 'Natación', icon: faSwimmer, description: 'Deporte acuático' },
    { id: 'running', name: 'Atletismo', icon: faRunning, description: 'Correr y saltar' },
    { id: 'gym', name: 'Gimnasio', icon: faDumbbell, description: 'Entrenamiento con pesas' }
  ];

  // Form
  readonly registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]], // Changed 'name' to 'fullName' to match API
    email: ['', [Validators.required, Validators.email]],
    sport: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  }, { validators: passwordMatchValidator() });

  // Computed password strength
  readonly passwordStrength = computed(() => {
    const password = this.registerForm.get('password')?.value || '';
    return calculatePasswordStrength(password);
  });

  // Getters for form controls
  get fullNameControl() { return this.registerForm.get('fullName')!; }
  get emailControl() { return this.registerForm.get('email')!; }
  get sportControl() { return this.registerForm.get('sport')!; }
  get passwordControl() { return this.registerForm.get('password')!; }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword')!; }
  get acceptTermsControl() { return this.registerForm.get('acceptTerms')!; }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  async onSubmit(): Promise<void> { // Make onSubmit async
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const formData: RegisterData = this.registerForm.value;
      await this.authService.register(formData);
      // Navigation is handled by the service on success
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.errorMessage.set(authError.userMessage);
      console.error('Registration failed:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getFieldErrorMessage(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        const fieldLabels: { [key: string]: string } = {
          fullName: 'El nombre completo',
          email: 'El correo electrónico',
          sport: 'El deporte',
          password: 'La contraseña',
          confirmPassword: 'La confirmación de contraseña',
          acceptTerms: 'Debes aceptar los términos y condiciones'
        };
        return `${fieldLabels[fieldName]} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        const requiredLength = control.errors['maxlength'].requiredLength;
        return `No puede tener más de ${requiredLength} caracteres`;
      }
      if (control.errors['passwordStrength']) {
        return 'La contraseña no cumple con los requisitos de seguridad';
      }
    }

    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && control?.touched) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  getSelectedSport(): SportOption | undefined {
    const sportId = this.registerForm.get('sport')?.value;
    return this.sportOptions.find((sport: SportOption) => sport.id === sportId);
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
