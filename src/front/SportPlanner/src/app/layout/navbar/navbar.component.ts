import { Component, inject, signal, computed, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars, 
  faUser, 
  faSignOutAlt, 
  faCog, 
  faChevronDown,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: {
    class: 'block'
  }
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(NavigationService);
  
  // Icons
  readonly faBars = faBars;
  readonly faUser = faUser;
  readonly faSignOutAlt = faSignOutAlt;
  readonly faCog = faCog;
  readonly faChevronDown = faChevronDown;
  readonly faUserCircle = faUserCircle;
  
  // Signals
  private readonly isDropdownOpenSignal = signal<boolean>(false);
  
  // Public signals and computed
  readonly isDropdownOpen = this.isDropdownOpenSignal.asReadonly();
  readonly isMobile = this.navigationService.isMobile;
  readonly user = this.authService.currentUser;
  
  // Computed values for user display
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
    const currentUser = this.user();
    // Map the role from backend if needed
    return currentUser?.metadata?.role || 'Entrenador';
  });
  
  ngOnInit(): void {
    // Any initialization if needed
  }
  
  /**
   * Toggle sidebar (mobile)
   */
  toggleSidebar(): void {
    this.navigationService.toggleSidebar();
  }
  
  /**
   * Toggle dropdown menu
   */
  toggleDropdown(): void {
    this.isDropdownOpenSignal.update(isOpen => !isOpen);
  }
  
  /**
   * Close dropdown when clicking outside
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('user-dropdown');
    
    if (dropdownButton && dropdownMenu) {
      if (!dropdownButton.contains(target) && !dropdownMenu.contains(target)) {
        this.isDropdownOpenSignal.set(false);
      }
    }
  }
  
  /**
   * Navigate to profile
   */
  navigateToProfile(): void {
    this.isDropdownOpenSignal.set(false);
    // Navigation will be handled by RouterLink
  }
  
  /**
   * Navigate to settings
   */
  navigateToSettings(): void {
    this.isDropdownOpenSignal.set(false);
    // Navigation will be handled by RouterLink
  }
  
  /**
   * Logout user
   */
  async logout(): Promise<void> {
    this.isDropdownOpenSignal.set(false);
    try {
      await this.authService.logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
