import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, UserProfile } from '../../core/services/auth.service';
import { User } from '@supabase/supabase-js';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';
import { TeamManagementComponent } from './components/team-management/team-management.component'; // Added import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, TeamManagementComponent], // Added component to imports
  template: `
    <app-dashboard-layout
      pageTitle="Equipos"
      pageSubtitle="Crea, edita y gestiona tus equipos"
      [contentPadding]="true"
      (portalClicked)="onPortalClick()"
      (logoutClicked)="onLogoutClick()">

      <app-team-management></app-team-management>

    </app-dashboard-layout>
  `,
  styles: [`
    /* Styles can be adjusted if needed, for now keeping them minimal */
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userProfile: UserProfile | null = null;
  isLoggingOut = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to user changes
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (user) {
          this.loadUserProfile(user.id);
        } else {
          // Redirect to auth if no user
          this.router.navigate(['/auth']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadUserProfile(userId: string): Promise<void> {
    try {
      this.userProfile = await this.authService.getUserProfile(userId);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  getDisplayName(): string {
    if (this.userProfile?.full_name) {
      return this.userProfile.full_name;
    }
    if (this.user?.email) {
      return this.user.email.split('@')[0];
    }
    return 'Usuario';
  }

  getUserInitials(): string {
    const name = this.getDisplayName();
    if (name === 'Usuario') {
      return 'U';
    }

    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }


  /**
   * Handle portal click from user dropdown
   */
  onPortalClick(): void {
    console.log('Navigating to user portal...');
    // TODO: Navigate to user profile/portal page when it exists
    // this.router.navigate(['/profile']);
    alert('La funcionalidad del portal de usuario se implementará próximamente.');
  }

  /**
   * Handle logout click from user dropdown
   */
  onLogoutClick(): void {
    console.log('Logout requested from dropdown');
    this.logout();
  }

  async logout(): Promise<void> {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;

    try {
      const result = await this.authService.logout();
      if (!result.success) {
        console.error('Logout error:', result.error);
        // Still redirect even if logout had an error
        this.router.navigate(['/auth']);
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
      this.router.navigate(['/auth']);
    } finally {
      this.isLoggingOut = false;
    }
  }
}
