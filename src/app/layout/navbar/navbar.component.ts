import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';
import { 
  faBars, 
  faUser, 
  faSignOutAlt, 
  faCog,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FontAwesomeModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: {
    class: 'block'
  }
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  // Icons
  protected readonly faBars = faBars;
  protected readonly faUser = faUser;
  protected readonly faSignOutAlt = faSignOutAlt;
  protected readonly faCog = faCog;
  protected readonly faChevronDown = faChevronDown;
  
  // User data from auth service
  protected readonly user = this.authService.user;
  protected readonly userName = this.authService.userName;
  protected readonly userInitials = this.authService.userInitials;
  protected readonly userRole = this.authService.userRole;
  
  // Component state
  protected readonly isProfileDropdownOpen = signal(false);
  protected readonly isSidebarOpen = signal(false);
  
  // Computed role display
  protected readonly roleDisplay = computed(() => {
    const role = this.userRole();
    switch(role) {
      case 'admin':
        return 'Administrador';
      case 'director':
        return 'Director Técnico';
      case 'entrenador':
        return 'Entrenador';
      default:
        return 'Usuario';
    }
  });
  
  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
    // Emit event for sidebar component
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  }
  
  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen.update(value => !value);
  }
  
  closeDropdown(): void {
    this.isProfileDropdownOpen.set(false);
  }
  
  navigateToProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/profile']);
  }
  
  navigateToSettings(): void {
    this.closeDropdown();
    this.router.navigate(['/settings']);
  }
  
  logout(): void {
    this.closeDropdown();
    this.authService.logout();
  }
}
