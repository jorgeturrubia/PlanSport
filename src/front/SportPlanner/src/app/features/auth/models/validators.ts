import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para fortaleza de contraseña
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    const hasMinLength = value.length >= 8;
    
    const passwordValid = hasNumber && hasUpper && hasLower && hasSpecial && hasMinLength;
    
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

// Validador para confirmar que las contraseñas coinciden
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  };
}

// Función para calcular la fortaleza de la contraseña
export interface PasswordStrength {
  score: number; // 0-4
  level: 'weak' | 'fair' | 'good' | 'strong';
  requirements: {
    minLength: boolean;
    hasNumber: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasSpecial: boolean;
  };
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  const requirements = {
    minLength: password.length >= 8,
    hasNumber: /[0-9]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasSpecial: /[#?!@$%^&*-]/.test(password)
  };
  
  const score = Object.values(requirements).filter(Boolean).length;
  
  let level: 'weak' | 'fair' | 'good' | 'strong';
  if (score <= 1) level = 'weak';
  else if (score <= 2) level = 'fair';
  else if (score <= 3) level = 'good';
  else level = 'strong';
  
  return {
    score,
    level,
    requirements
  };
}