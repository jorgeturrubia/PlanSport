import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ProfileDto, UpdateProfileDto, ChangePasswordDto } from '../../models/auth.interfaces';
import { AuthErrorHandlerService } from '../../../../core/services/auth-error-handler.service'; // Import AuthErrorHandlerService

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly authErrorHandler = inject(AuthErrorHandlerService); // Inject AuthErrorHandlerService

  // Signals for UI state
  readonly profile = signal<ProfileDto | null>(null);
  readonly loading = signal(true);
  readonly profileUpdateLoading = signal(false);
  readonly passwordChangeLoading = signal(false);
  readonly emailVerificationLoading = signal(false);
  readonly profileUpdateSuccess = signal(false);
  readonly passwordChangeSuccess = signal(false);
  readonly emailVerificationSuccess = signal(false);
  readonly profileUpdateError = signal('');
  readonly passwordChangeError = signal('');
  readonly emailVerificationError = signal('');

  // Forms
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
    this.loadProfile();
  }

  private initializeForms(): void {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }] // Email is typically not editable
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  private async loadProfile(): Promise<void> {
    try {
      const profileData = await this.authService.getProfile();
      this.profile.set(profileData);
      
      // Update form with profile data
      this.profileForm.patchValue({
        fullName: profileData.fullName,
        email: profileData.email
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onSubmitProfile(): Promise<void> {
    if (this.profileForm.invalid) return;
    
    this.profileUpdateLoading.set(true);
    this.profileUpdateSuccess.set(false);
    this.profileUpdateError.set('');
    
    try {
      const profileData: UpdateProfileDto = {
        fullName: this.profileForm.get('fullName')?.value,
        metadata: this.profile()?.metadata
      };
      
      const success = await this.authService.updateProfile(profileData);
      
      if (success) {
        this.profileUpdateSuccess.set(true);
        // Reload profile to get updated data
        await this.loadProfile();
        // Hide success message after 3 seconds
        setTimeout(() => this.profileUpdateSuccess.set(false), 3000);
      } else {
        this.profileUpdateError.set('Failed to update profile. Please try again.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.profileUpdateError.set(authError.userMessage);
      console.error('Profile update error:', error);
    } finally {
      this.profileUpdateLoading.set(false);
    }
  }

  async onSubmitPassword(): Promise<void> {
    if (this.passwordForm.invalid) return;
    
    this.passwordChangeLoading.set(true);
    this.passwordChangeSuccess.set(false);
    this.passwordChangeError.set('');
    
    try {
      const passwordData: ChangePasswordDto = {
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      };
      
      const success = await this.authService.changePassword(passwordData);
      
      if (success) {
        this.passwordChangeSuccess.set(true);
        this.passwordForm.reset();
        // Hide success message after 3 seconds
        setTimeout(() => this.passwordChangeSuccess.set(false), 3000);
      } else {
        this.passwordChangeError.set('Failed to change password. Please check your current password and try again.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.passwordChangeError.set(authError.userMessage);
      console.error('Password change error:', error);
    } finally {
      this.passwordChangeLoading.set(false);
    }
  }

  // Getters for easy access to form controls
  get profileFullName() { return this.profileForm.get('fullName'); }
  get profileEmail() { return this.profileForm.get('email'); }
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

  async sendVerificationEmail(): Promise<void> {
    this.emailVerificationLoading.set(true);
    this.emailVerificationSuccess.set(false);
    this.emailVerificationError.set('');

    try {
      const success = await this.authService.sendEmailVerification();
      
      if (success) {
        this.emailVerificationSuccess.set(true);
        // Hide success message after 3 seconds
        setTimeout(() => this.emailVerificationSuccess.set(false), 3000);
      } else {
        this.emailVerificationError.set('Failed to send verification email. Please try again.');
      }
    } catch (error: any) {
      // Handle error with AuthErrorHandlerService
      const authError = this.authErrorHandler.handleHttpError(error);
      this.emailVerificationError.set(authError.userMessage);
      console.error('Send verification email error:', error);
    } finally {
      this.emailVerificationLoading.set(false);
    }
  }
}