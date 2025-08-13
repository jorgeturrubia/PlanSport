import { Injectable, ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  handleError(error: any): void {
    console.error('Global error handler caught:', error);

    // Handle HTTP errors
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      // Handle client-side errors
      this.handleClientError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    // Log the error for debugging
    console.error('HTTP Error:', error);

    // Handle specific HTTP status codes
    switch (error.status) {
      case 400:
        // Bad Request - usually validation errors
        console.error('Bad Request:', error.message);
        break;
      case 401:
        // Unauthorized - token expired or invalid
        console.warn('Unauthorized access - redirecting to login');
        this.authService.logout();
        break;
      case 403:
        // Forbidden - insufficient permissions
        console.warn('Access forbidden - redirecting to unauthorized page');
        this.router.navigate(['/unauthorized']);
        break;
      case 404:
        // Not Found
        console.error('Resource not found:', error.url);
        break;
      case 500:
        // Internal Server Error
        console.error('Internal server error occurred');
        break;
      default:
        // Other HTTP errors
        console.error(`HTTP ${error.status}:`, error.message);
        break;
    }
  }

  private handleClientError(error: Error): void {
    // Log client-side errors
    console.error('Client Error:', error);

    // Handle specific error types
    if (error instanceof TypeError) {
      console.error('Type Error:', error.message);
    } else if (error instanceof ReferenceError) {
      console.error('Reference Error:', error.message);
    } else {
      console.error('Unknown Client Error:', error.message);
    }
  }
}