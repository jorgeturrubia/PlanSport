import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { IMenuItem } from '../../core/models/navigation.interface';
import { UserRole } from '../../core/models/user.interface';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: {
    class: 'block'
  }
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(NavigationService);
  private readonly router = inject(Router);
  
  // Icons
  readonly faTimes = faTimes;
  
  // Signals and computed
  readonly isOpen = this.navigationService.isSidebarOpen;
  readonly isMobile = this.navigationService.isMobile;
  readonly user = this.authService.currentUser;
  
  // User display values
  readonly userName = computed(() => {
    const currentUser = this.user();
    return currentUser?.fullName || currentUser?.email || 'Usuario';
  });
  
  readonly userEmail = computed(() => {
    const currentUser = this.user();
    return currentUser?.email || '';
  });
  
  readonly userInitials = computed(() => {
    const name = this.userName();
    if (!name) return 'U';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  });
  
  readonly userRole = computed(() => {
    // Map from backend role to our UserRole enum
    const currentUser = this.user();
    const roleFromBackend = currentUser?.metadata?.role;
    
    // Convert backend role to UserRole enum
    switch (roleFromBackend?.toLowerCase()) {
      case 'admin':
        return UserRole.Admin;
      case 'director':
        return UserRole.Director;
      case 'entrenador':
      default:
        return UserRole.Entrenador;
    }
  });
  
  readonly userRoleDisplay = computed(() => {
    const role = this.userRole();
    switch (role) {
      case UserRole.Admin:
        return 'Administrador';
      case UserRole.Director:
        return 'Director Técnico';
      case UserRole.Entrenador:
        return 'Entrenador';
      default:
        return 'Usuario';
    }
  });
  
  // Filtered menu items based on user role
  readonly menuItems = computed(() => {
    const role = this.userRole();
    return this.navigationService.getFilteredMenuItems(role);
  });
  
  // Expose activeRoute as a public property for template access
  readonly activeRoute = this.navigationService.activeRoute;
  
  constructor() {
    // Listen to route changes to update active state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {
      this.navigationService.setActiveRoute(event.url);
    });
  }
  
  ngOnInit(): void {
    // Set initial active route
    this.navigationService.setActiveRoute(this.router.url);
  }
  
  /**
   * Close sidebar
   */
  closeSidebar(): void {
    this.navigationService.setSidebarState(false);
  }
  
  /**
   * Handle menu item click
   */
  onMenuItemClick(item: IMenuItem): void {
    this.navigationService.setActiveRoute(item.route);
  }
  
  /**
   * Check if menu item is visible based on user role
   */
  isMenuItemVisible(item: IMenuItem): boolean {
    const role = this.userRole();
    return this.navigationService.isMenuItemVisible(item, role);
  }
}
