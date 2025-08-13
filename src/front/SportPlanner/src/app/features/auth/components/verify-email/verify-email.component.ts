import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthErrorHandlerService } from '../../../../core/services/auth-error-handler.service'; // Import AuthErrorHandlerService

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authErrorHandler = inject(AuthErrorHandlerService); // Inject AuthErrorHandlerService

  // Signals
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly token = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.token.set(token);
        this.verifyEmail(token);
      } else {
        this.errorMessage.set('Invalid verification token.');
      }
    });
  }

  async verifyEmail(token: string): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const success = await this.authService.verifyEmail(token);
      if (success) {
        this.successMessage.set('Your email has been verified successfully! You can now close this page or navigate to your profile.');
      } else {
        this.errorMessage.set('Failed to verify email. The token may have expired or is invalid.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.errorMessage.set(authError.userMessage);
      console.error('Email verification failed:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async resendVerification(): Promise<void> {
    if (!this.token()) return;
    
    this.loading.set(true);
    this.errorMessage.set(null);
    
    try {
      const success = await this.authService.sendEmailVerification();
      if (success) {
        this.successMessage.set('Verification email resent successfully! Please check your inbox.');
      } else {
        this.errorMessage.set('Failed to resend verification email. Please try again.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.errorMessage.set(authError.userMessage);
      console.error('Resend verification email failed:', error);
    } finally {
      this.loading.set(false);
    }
  }
}