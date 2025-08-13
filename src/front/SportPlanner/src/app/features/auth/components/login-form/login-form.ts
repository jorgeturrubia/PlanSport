import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faCheck, faExclamationTriangle, faSignInAlt } from '../../auth-icons';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  
  // Icons
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faSignInAlt = faSignInAlt;
  
  // Signals
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);
  
  // Form
  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });
  
  // Getters for form controls
  get emailControl() {
    return this.loginForm.get('email')!;
  }
  
  get passwordControl() {
    return this.loginForm.get('password')!;
  }
  
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      
      // Simulación de login para desarrollo visual
      setTimeout(() => {
        console.log('Login form submitted:', this.loginForm.value);
        this.isSubmitting.set(false);
        // Aquí se integrará con el servicio de autenticación
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
  
  getFieldErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName === 'email' ? 'El correo electrónico' : 'La contraseña'} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un correo electrónico válido';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
    }
    return '';
  }
}
