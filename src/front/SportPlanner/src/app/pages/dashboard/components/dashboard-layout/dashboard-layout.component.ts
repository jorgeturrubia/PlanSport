import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';
import { ThemeService } from '../../services/theme.service';
import { TeamsService } from '../../services/teams.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { NavigationItem, SidebarState } from '../../interfaces/navigation.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    LucideAngularModule,
    DashboardHeaderComponent,
    SidebarComponent,
    ThemeToggleComponent,
    UserMenuComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private teamsService = inject(TeamsService);

  // Sidebar state management
  sidebarState = signal<SidebarState>({
    isCollapsed: false,
    activeItem: null
  });

  // Mobile detection
  isMobile = signal<boolean>(false);
  
  // Search functionality
  searchQuery = signal<string>('');

  // Current user data
  currentUser = computed(() => this.authService.user());

  // Theme state
  currentTheme = computed(() => this.themeService.currentTheme());
  isDarkMode = computed(() => this.themeService.isDarkMode());
  
  // Teams data
  teams = computed(() => this.teamsService.teams());
  recentTeams = computed(() => 
    this.teams()
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3)
  );
  
  // Navigation items
  navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard',
      isActive: false
    },
    {
      id: 'teams',
      label: 'Equipos',
      icon: 'users',
      route: '/dashboard/teams',
      isActive: false
    }
  ];

  ngOnInit(): void {
    this.loadUserPreferences();
    this.checkMobileView();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.checkMobileView());
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
  
  private checkMobileView(): void {
    this.isMobile.set(window.innerWidth < 1280); // xl breakpoint
  }
  
  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  }
}