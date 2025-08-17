import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';
import { ThemeService } from '../../services/theme.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavigationItem, SidebarState } from '../../interfaces/navigation.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DashboardHeaderComponent,
    SidebarComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <!-- Dashboard Header -->
      <app-dashboard-header 
        (toggleSidebar)="toggleSidebar()"
      ></app-dashboard-header>

      <div class="flex h-[calc(100vh-4rem)]">
        <!-- Sidebar -->
        <app-sidebar 
          [isCollapsed]="sidebarState().isCollapsed"
          (navigationClick)="onNavigationClick($event)"
        ></app-sidebar>

        <!-- Main Content -->
        <main 
          class="flex-1 overflow-auto transition-all duration-300 ease-in-out"
          [class.ml-0]="sidebarState().isCollapsed"
        >
          <div class="p-6">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  // Sidebar state management
  sidebarState = signal<SidebarState>({
    isCollapsed: false,
    activeItem: null
  });

  // Current user data
  currentUser = computed(() => this.authService.user());

  // Theme state
  currentTheme = computed(() => this.themeService.currentTheme());
  isDarkMode = computed(() => this.themeService.isDarkMode());

  ngOnInit(): void {
    this.loadUserPreferences();
  }

  toggleSidebar(): void {
    this.sidebarState.update(state => ({
      ...state,
      isCollapsed: !state.isCollapsed
    }));
    
    this.saveUserPreferences();
  }

  onNavigationClick(item: NavigationItem): void {
    this.sidebarState.update(state => ({
      ...state,
      activeItem: item.id
    }));
  }

  private loadUserPreferences(): void {
    // Load user preferences from localStorage or user profile
    const savedSidebarState = localStorage.getItem('planSport-sidebar-collapsed');
    
    if (savedSidebarState !== null) {
      this.sidebarState.update(state => ({
        ...state,
        isCollapsed: JSON.parse(savedSidebarState)
      }));
    }
  }

  private saveUserPreferences(): void {
    // Save sidebar state to localStorage
    localStorage.setItem(
      'planSport-sidebar-collapsed', 
      JSON.stringify(this.sidebarState().isCollapsed)
    );
  }
}