import { Component, signal, computed, output, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../../shared/services/layout.service';
import { ThemeService } from '../../../../shared/services/theme.service';
import { UserProfileDropdownComponent } from './user-profile-dropdown/user-profile-dropdown.component';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, UserProfileDropdownComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  // ViewChild for user button element (needed for dropdown positioning)
  @ViewChild('userButtonRef') userButtonRef!: ElementRef<HTMLElement>;
  
  // User data signals
  userName = signal<string>('Usuario');
  userEmail = signal<string>('');
  title = signal<string>('Dashboard');
  
  // Dropdown state
  isDropdownOpen = signal<boolean>(false);

  // Output events
  userMenuClicked = output<void>();
  sidebarToggled = output<void>();
  
  // New outputs for dropdown events
  portalClicked = output<void>();
  logoutClicked = output<void>();

  constructor(
    private layoutService: LayoutService,
    private themeService: ThemeService
  ) {}

  /**
   * Computed signal for user initials
   * Generates initials based on the user name
   */
  userInitials = computed(() => {
    const name = this.userName();
    if (name === 'Usuario') {
      return 'US';
    }
    
    const words = name.split(' ').filter(word => word.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return 'US';
  });

  /**
   * Get sidebar expanded state from layout service
   */
  isSidebarExpanded = computed(() => this.layoutService.isSidebarExpanded());

  /**
   * Get dark mode state from theme service
   */
  get isDarkMode() {
    return this.themeService.isDarkMode;
  }

  /**
   * Check if current view is mobile
   */
  isMobileView = computed(() => this.layoutService.isMobileView());

  /**
   * Check if current view is desktop
   */
  isDesktopView = computed(() => this.layoutService.isDesktopView());

  /**
   * Handle sidebar toggle button click
   */
  onToggleSidebar(): void {
    this.layoutService.toggleSidebar();
    this.sidebarToggled.emit();
  }

  /**
   * Handle user profile button click
   * Toggle dropdown visibility
   */
  onUserMenuClick(): void {
    this.isDropdownOpen.update(open => !open);
    this.userMenuClicked.emit();
  }
  
  /**
   * Handle dropdown close event
   */
  onDropdownClosed(): void {
    this.isDropdownOpen.set(false);
  }
  
  /**
   * Handle portal click from dropdown
   */
  onPortalClick(): void {
    this.portalClicked.emit();
  }
  
  /**
   * Handle logout click from dropdown
   */
  onLogoutClick(): void {
    this.logoutClicked.emit();
  }

  /**
   * Set user data
   * @param name - User's full name
   * @param email - User's email address
   */
  setUserData(name: string, email: string): void {
    this.userName.set(name);
    this.userEmail.set(email);
  }

  /**
   * Set page title
   * @param title - Page title to display
   */
  setTitle(title: string): void {
    this.title.set(title);
  }

  /**
   * Get CSS classes for the header based on current state
   */
  getHeaderClasses(): string {
    const classes = [
      'bg-background',
      'border-b', 
      'border-border',
      'h-16',
      'px-4',
      'sm:px-6',
      'lg:px-8',
      'flex',
      'items-center',
      'justify-between',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'relative',
      'z-30'
    ];

    return classes.join(' ');
  }

  /**
   * Get CSS classes for user info section
   */
  getUserInfoClasses(): string {
    const classes = [
      'flex',
      'items-center',
      'space-x-3',
      'min-w-0', // Prevent flex item from growing
      'flex-shrink-0' // Prevent shrinking
    ];

    return classes.join(' ');
  }

  /**
   * Get CSS classes for user button
   */
  getUserButtonClasses(): string {
    const classes = [
      'flex',
      'items-center',
      'space-x-3',
      'p-2',
      'rounded-lg',
      'hover:bg-accent',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2',
      'transition-colors',
      'duration-200',
      'cursor-pointer',
      'group'
    ];

    return classes.join(' ');
  }

  /**
   * Get CSS classes for sidebar toggle button
   */
  getToggleButtonClasses = computed(() => {
    const classes = [
      'p-2',
      'rounded-lg',
      'hover:bg-accent',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2',
      'transition-colors',
      'duration-200',
      'text-foreground'
    ];

    // Hide on mobile when sidebar is collapsed (hamburger will be handled by sidebar component)
    if (this.isMobileView()) {
      classes.push('lg:flex', 'hidden');
    }

    return classes.join(' ');
  });

  /**
   * Get CSS classes for page title
   */
  getTitleClasses(): string {
    const classes = [
      'text-lg',
      'font-semibold',
      'text-foreground',
      'truncate',
      'flex-1',
      'text-center',
      'mx-4'
    ];

    return classes.join(' ');
  }

  /**
   * Get CSS classes for user avatar
   */
  getAvatarClasses(): string {
    const classes = [
      'h-8',
      'w-8',
      'bg-primary',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'flex-shrink-0',
      'group-hover:bg-primary/90',
      'transition-colors',
      'duration-200'
    ];

    return classes.join(' ');
  }

  /**
   * Get CSS classes for user details (name and email)
   */
  getUserDetailsClasses = computed(() => {
    const classes = ['min-w-0', 'flex-1']; // min-w-0 allows text truncation

    // Hide on mobile for space optimization
    if (this.isMobileView()) {
      classes.push('hidden', 'md:block');
    }

    return classes.join(' ');
  });
}
