import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, UserProfile } from '../../core/services/auth.service';
import { User } from '@supabase/supabase-js';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout 
      pageTitle="Dashboard" 
      pageSubtitle="Bienvenido a SportAgentoos - Gestiona tus entrenamientos y equipos"
      [contentPadding]="true"
      (portalClicked)="onPortalClick()"
      (logoutClicked)="onLogoutClick()">
      
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="text-center">
              <!-- Welcome Message -->
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                ¡Bienvenido, {{ getDisplayName() }}!
              </h2>
              
              <p class="text-gray-600 mb-6">
                Has iniciado sesión exitosamente en SportAgentoos. Aquí podrás gestionar tus entrenamientos y planificaciones deportivas.
              </p>

              <!-- User Stats -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600">0</div>
                  <div class="text-sm text-blue-800">Entrenamientos</div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">0</div>
                  <div class="text-sm text-green-800">Equipos</div>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-purple-600">0</div>
                  <div class="text-sm text-purple-800">Planes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section mt-6">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Acciones Rápidas
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Nuevo Entrenamiento</span>
              </button>
              
              <button class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Gestionar Equipo</span>
              </button>
              
              <button class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Ver Estadísticas</span>
              </button>
              
              <button class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Configuración</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: [`
    .welcome-section {
      margin-bottom: 1.5rem;
    }

    .quick-actions-section {
      /* Additional styles can be added here */
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .welcome-section {
        margin-bottom: 1rem;
      }
    }
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