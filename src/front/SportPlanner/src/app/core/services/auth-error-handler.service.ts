import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthError {
  code: string;
  message: string;
  userMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandlerService {
  /**
   * Handle authentication-related HTTP errors and return user-friendly messages
   * @param error The HTTP error response
   * @returns An AuthError object with code, technical message, and user-friendly message
   */
  handleHttpError(error: HttpErrorResponse): AuthError {
    console.error('Auth error handler caught:', error);

    // Default error
    const defaultError: AuthError = {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      userMessage: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
    };

    // Handle specific HTTP status codes
    switch (error.status) {
      case 0:
        // Network error
        return {
          code: 'NETWORK_ERROR',
          message: 'Network error - server unreachable',
          userMessage: 'No se puede conectar al servidor. Verifica tu conexión a internet.'
        };
      
      case 400:
        // Bad Request
        return this.handleBadRequestError(error);
      
      case 401:
        // Unauthorized
        return {
          code: 'UNAUTHORIZED',
          message: error.message,
          userMessage: 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.'
        };
      
      case 403:
        // Forbidden
        return {
          code: 'FORBIDDEN',
          message: error.message,
          userMessage: 'No tienes permiso para realizar esta acción.'
        };
      
      case 404:
        // Not Found
        return {
          code: 'NOT_FOUND',
          message: error.message,
          userMessage: 'Recurso no encontrado.'
        };
      
      case 409:
        // Conflict
        return {
          code: 'CONFLICT',
          message: error.message,
          userMessage: 'Ya existe una cuenta con este email.'
        };
      
      case 422:
        // Unprocessable Entity
        return {
          code: 'VALIDATION_ERROR',
          message: error.message,
          userMessage: 'Datos inválidos. Por favor, verifica la información proporcionada.'
        };
      
      case 429:
        // Too Many Requests
        return {
          code: 'RATE_LIMITED',
          message: error.message,
          userMessage: 'Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.'
        };
      
      case 500:
        // Internal Server Error
        return {
          code: 'SERVER_ERROR',
          message: error.message,
          userMessage: 'Error interno del servidor. Nuestro equipo está trabajando para resolverlo.'
        };
      
      case 502:
      case 503:
      case 504:
        // Gateway/Service errors
        return {
          code: 'SERVICE_UNAVAILABLE',
          message: error.message,
          userMessage: 'Servicio temporalmente no disponible. Por favor, inténtalo de nuevo más tarde.'
        };
      
      default:
        return defaultError;
    }
  }

  /**
   * Handle specific bad request errors with more detailed messages
   * @param error The HTTP error response
   * @returns An AuthError object with specific error details
   */
  private handleBadRequestError(error: HttpErrorResponse): AuthError {
    // Check if we have specific error details from the server
    if (error.error && typeof error.error === 'object') {
      // Handle validation errors from the server
      if (error.error.errors) {
        const validationErrors = error.error.errors;
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          return {
            code: 'VALIDATION_ERROR',
            message: JSON.stringify(validationErrors),
            userMessage: validationErrors[0] // Use the first validation error message
          };
        }
      }
      
      // Handle specific error messages from the server
      if (error.error.message) {
        const message = error.error.message.toLowerCase();
        
        if (message.includes('email') && message.includes('exist')) {
          return {
            code: 'EMAIL_EXISTS',
            message: error.error.message,
            userMessage: 'Ya existe una cuenta con este email. Por favor, utiliza otro email o inicia sesión.'
          };
        }
        
        if (message.includes('password')) {
          return {
            code: 'INVALID_PASSWORD',
            message: error.error.message,
            userMessage: 'La contraseña no cumple con los requisitos de seguridad.'
          };
        }
        
        if (message.includes('token')) {
          return {
            code: 'INVALID_TOKEN',
            message: error.error.message,
            userMessage: 'El token es inválido o ha expirado. Por favor, solicita uno nuevo.'
          };
        }
        
        return {
          code: 'BAD_REQUEST',
          message: error.error.message,
          userMessage: error.error.message
        };
      }
    }
    
    // Generic bad request error
    return {
      code: 'BAD_REQUEST',
      message: error.message,
      userMessage: 'Solicitud inválida. Por favor, verifica la información proporcionada.'
    };
  }

  /**
   * Handle client-side errors (non-HTTP)
   * @param error The client-side error
   * @returns An AuthError object with error details
   */
  handleClientError(error: Error): AuthError {
    console.error('Client error handler caught:', error);
    
    return {
      code: 'CLIENT_ERROR',
      message: error.message,
      userMessage: 'Ocurrió un error en la aplicación. Por favor, inténtalo de nuevo.'
    };
  }

  /**
   * Log error for debugging purposes
   * @param error The error to log
   * @param context Additional context information
   */
  logError(error: any, context?: string): void {
    console.error('AuthErrorHandlerService:', {
      error,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }
}