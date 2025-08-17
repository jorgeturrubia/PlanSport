import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validadores personalizados para el módulo de autenticación
 */
export class AuthValidators {

  /**
   * Validador para email con formato más estricto
   */
  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // No validar si está vacío (usar required por separado)
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { 
      email: { 
        message: 'El formato del email no es válido',
        actualValue: control.value 
      } 
    };
  }

  /**
   * Validador para fortaleza de contraseña
   * Requiere: mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número
   */
  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const password = control.value;
    const errors: any = {};

    // Mínimo 8 caracteres
    if (password.length < 8) {
      errors.minLength = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'La contraseña debe contener al menos una letra mayúscula';
    }

    // Al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'La contraseña debe contener al menos una letra minúscula';
    }

    // Al menos un número
    if (!/\d/.test(password)) {
      errors.number = 'La contraseña debe contener al menos un número';
    }

    // Al menos un carácter especial (opcional pero recomendado)
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.special = 'Se recomienda incluir al menos un carácter especial (!@#$%^&*)';
    }

    return Object.keys(errors).length > 0 ? { passwordStrength: errors } : null;
  }

  /**
   * Validador para confirmar contraseña
   * Debe usarse en el FormGroup, no en el control individual
   */
  static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordField);
      const confirmPassword = formGroup.get(confirmPasswordField);

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        // Agregar error al campo de confirmación
        confirmPassword.setErrors({ 
          passwordMismatch: {
            message: 'Las contraseñas no coinciden'
          }
        });
        return { passwordMismatch: true };
      } else {
        // Limpiar error si las contraseñas coinciden
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors['passwordMismatch'];
          confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
        }
        return null;
      }
    };
  }

  /**
   * Validador para nombres (solo letras, espacios y algunos caracteres especiales)
   */
  static name(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    const isValid = nameRegex.test(control.value) && control.value.trim().length >= 2;

    return isValid ? null : {
      name: {
        message: 'El nombre debe contener solo letras y tener al menos 2 caracteres',
        actualValue: control.value
      }
    };
  }

  /**
   * Validador para verificar que no contenga espacios en blanco al inicio o final
   */
  static noWhitespace(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const hasWhitespace = control.value !== control.value.trim();
    return hasWhitespace ? {
      whitespace: {
        message: 'No debe contener espacios al inicio o final'
      }
    } : null;
  }

  /**
   * Validador para longitud mínima con mensaje personalizado
   */
  static minLength(min: number, fieldName: string = 'campo'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length >= min) {
        return null;
      }

      return {
        minlength: {
          message: `El ${fieldName} debe tener al menos ${min} caracteres`,
          requiredLength: min,
          actualLength: control.value.length
        }
      };
    };
  }

  /**
   * Validador para verificar que el email no esté ya registrado
   * (Para uso futuro con verificación en backend)
   */
  static emailExists(checkEmailFn: (email: string) => Promise<boolean>): ValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!control.value) {
        return null;
      }

      try {
        const exists = await checkEmailFn(control.value);
        return exists ? {
          emailExists: {
            message: 'Este email ya está registrado'
          }
        } : null;
      } catch (error) {
        // En caso de error en la verificación, no bloquear el formulario
        return null;
      }
    };
  }
}

/**
 * Función helper para obtener el primer mensaje de error de un control
 */
export function getFirstErrorMessage(control: AbstractControl): string | null {
  if (!control.errors) {
    return null;
  }

  const firstError = Object.keys(control.errors)[0];
  const error = control.errors[firstError];

  // Priorizar errores del backend
  if (control.errors['backend']) {
    return control.errors['backend'];
  }

  // Si el error tiene un mensaje personalizado, usarlo
  if (error && typeof error === 'object' && error.message) {
    return error.message;
  }

  // Mensajes por defecto para errores comunes
  const defaultMessages: { [key: string]: string } = {
    required: 'Este campo es obligatorio',
    email: 'El formato del email no es válido',
    minlength: `Debe tener al menos ${error.requiredLength} caracteres`,
    maxlength: `No puede tener más de ${error.requiredLength} caracteres`,
    pattern: 'El formato no es válido',
    backend: error // Para errores del backend sin mensaje específico
  };

  return defaultMessages[firstError] || 'Valor no válido';
}