import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/auth.interfaces';

export interface ErrorDetails {
  message: string;
  code?: string;
  field?: string;
  type: 'validation' | 'authentication' | 'authorization' | 'server' | 'network' | 'unknown';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  /**
   * Procesa errores HTTP y los convierte en ErrorDetails
   */
  processError(error: any): ErrorDetails {
    if (error instanceof HttpErrorResponse) {
      return this.processHttpError(error);
    }
    
    if (error.error) {
      return this.processApiError(error.error);
    }
    
    return {
      message: error.message || 'Ha ocurrido un error inesperado',
      type: 'unknown'
    };
  }

  /**
   * Procesa errores HTTP específicos
   */
  private processHttpError(error: HttpErrorResponse): ErrorDetails {
    switch (error.status) {
      case 400:
        return this.processBadRequestError(error);
      case 401:
        return {
          message: 'Credenciales inválidas. Por favor verifica tu email y contraseña.',
          code: 'UNAUTHORIZED',
          type: 'authentication'
        };
      case 403:
        return {
          message: 'No tienes permisos para realizar esta acción.',
          code: 'FORBIDDEN',
          type: 'authorization'
        };
      case 404:
        return {
          message: 'El recurso solicitado no fue encontrado.',
          code: 'NOT_FOUND',
          type: 'server'
        };
      case 409:
        return this.processConflictError(error);
      case 422:
        return this.processValidationError(error);
      case 429:
        return {
          message: 'Demasiados intentos. Por favor espera un momento antes de intentar nuevamente.',
          code: 'RATE_LIMIT',
          type: 'server'
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          message: 'Error del servidor. Por favor intenta más tarde.',
          code: 'SERVER_ERROR',
          type: 'server'
        };
      case 0:
        return {
          message: 'Error de conexión. Verifica tu conexión a internet.',
          code: 'NETWORK_ERROR',
          type: 'network'
        };
      default:
        return {
          message: `Error ${error.status}: ${error.statusText || 'Error desconocido'}`,
          code: `HTTP_${error.status}`,
          type: 'server'
        };
    }
  }

  /**
   * Procesa errores de validación (422)
   */
  private processValidationError(error: HttpErrorResponse): ErrorDetails {
    const apiError = error.error as ApiError;
    
    if (apiError?.errors && Array.isArray(apiError.errors)) {
      // Múltiples errores de validación
      const firstError = apiError.errors[0];
      return {
        message: firstError.message || 'Error de validación',
        code: firstError.code || 'VALIDATION_ERROR',
        field: firstError.field,
        type: 'validation'
      };
    }
    
    if (apiError?.message) {
      return {
        message: apiError.message,
        code: apiError.code || 'VALIDATION_ERROR',
        type: 'validation'
      };
    }
    
    return {
      message: 'Los datos proporcionados no son válidos.',
      code: 'VALIDATION_ERROR',
      type: 'validation'
    };
  }

  /**
   * Procesa errores de conflicto (409)
   */
  private processConflictError(error: HttpErrorResponse): ErrorDetails {
    const apiError = error.error as ApiError;
    
    if (apiError?.code === 'EMAIL_ALREADY_EXISTS') {
      return {
        message: 'Este email ya está registrado. ¿Ya tienes una cuenta?',
        code: 'EMAIL_ALREADY_EXISTS',
        field: 'email',
        type: 'validation'
      };
    }
    
    return {
      message: apiError?.message || 'El recurso ya existe o hay un conflicto.',
      code: apiError?.code || 'CONFLICT',
      type: 'validation'
    };
  }

  /**
   * Procesa errores de solicitud incorrecta (400)
   */
  private processBadRequestError(error: HttpErrorResponse): ErrorDetails {
    const apiError = error.error as ApiError;
    
    if (apiError?.code === 'INVALID_CREDENTIALS') {
      return {
        message: 'Email o contraseña incorrectos.',
        code: 'INVALID_CREDENTIALS',
        type: 'authentication'
      };
    }
    
    if (apiError?.code === 'ACCOUNT_LOCKED') {
      return {
        message: 'Tu cuenta ha sido bloqueada temporalmente por seguridad.',
        code: 'ACCOUNT_LOCKED',
        type: 'authentication'
      };
    }
    
    if (apiError?.code === 'ACCOUNT_NOT_VERIFIED') {
      return {
        message: 'Debes verificar tu email antes de iniciar sesión.',
        code: 'ACCOUNT_NOT_VERIFIED',
        type: 'authentication'
      };
    }
    
    return {
      message: apiError?.message || 'Solicitud incorrecta.',
      code: apiError?.code || 'BAD_REQUEST',
      type: 'validation'
    };
  }

  /**
   * Procesa errores de API estructurados
   */
  private processApiError(apiError: ApiError): ErrorDetails {
    return {
      message: apiError.message || 'Error de la API',
      code: apiError.code,
      type: this.getErrorTypeFromCode(apiError.code)
    };
  }

  /**
   * Determina el tipo de error basado en el código
   */
  private getErrorTypeFromCode(code?: string): ErrorDetails['type'] {
    if (!code) return 'unknown';
    
    const authCodes = ['INVALID_CREDENTIALS', 'TOKEN_EXPIRED', 'UNAUTHORIZED'];
    const validationCodes = ['VALIDATION_ERROR', 'EMAIL_ALREADY_EXISTS', 'WEAK_PASSWORD'];
    const serverCodes = ['SERVER_ERROR', 'DATABASE_ERROR', 'SERVICE_UNAVAILABLE'];
    
    if (authCodes.includes(code)) return 'authentication';
    if (validationCodes.includes(code)) return 'validation';
    if (serverCodes.includes(code)) return 'server';
    
    return 'unknown';
  }

  /**
   * Obtiene un mensaje de error amigable para el usuario
   */
  getUserFriendlyMessage(errorDetails: ErrorDetails): string {
    // Mensajes específicos por código de error
    const friendlyMessages: Record<string, string> = {
      'EMAIL_ALREADY_EXISTS': '¡Este email ya está registrado! ¿Quizás quieras iniciar sesión?',
      'INVALID_CREDENTIALS': 'Email o contraseña incorrectos. ¿Olvidaste tu contraseña?',
      'ACCOUNT_LOCKED': 'Tu cuenta está temporalmente bloqueada por seguridad. Contacta soporte si necesitas ayuda.',
      'ACCOUNT_NOT_VERIFIED': 'Revisa tu email y haz clic en el enlace de verificación para activar tu cuenta.',
      'WEAK_PASSWORD': 'Tu contraseña debe ser más segura. Incluye mayúsculas, números y símbolos.',
      'RATE_LIMIT': 'Has hecho demasiados intentos. Tómate un descanso y prueba en unos minutos.',
      'NETWORK_ERROR': 'Parece que hay un problema de conexión. Revisa tu internet e intenta de nuevo.',
      'SERVER_ERROR': 'Nuestros servidores están teniendo problemas. Ya estamos trabajando en solucionarlo.'
    };
    
    return friendlyMessages[errorDetails.code || ''] || errorDetails.message;
  }

  /**
   * Verifica si el error requiere acción del usuario
   */
  requiresUserAction(errorDetails: ErrorDetails): boolean {
    const actionRequiredCodes = [
      'ACCOUNT_NOT_VERIFIED',
      'ACCOUNT_LOCKED',
      'EMAIL_ALREADY_EXISTS'
    ];
    
    return actionRequiredCodes.includes(errorDetails.code || '');
  }

  /**
   * Verifica si el error es recuperable (el usuario puede reintentar)
   */
  isRecoverable(errorDetails: ErrorDetails): boolean {
    const nonRecoverableCodes = [
      'EMAIL_ALREADY_EXISTS',
      'ACCOUNT_LOCKED',
      'FORBIDDEN'
    ];
    
    return !nonRecoverableCodes.includes(errorDetails.code || '');
  }
}