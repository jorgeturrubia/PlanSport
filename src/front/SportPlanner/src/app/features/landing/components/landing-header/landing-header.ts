import { Component, Input, Output, EventEmitter, inject, signal, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars, 
  faTimes, 
  faFutbol,
  faSignInAlt, 
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LandingHeaderComponent {
  private readonly router = inject(Router);
  
  @Input() currentSection: string = 'hero';
  @Output() scrollToSection = new EventEmitter<string>();
  
  // Mobile menu state
  isMobileMenuOpen = signal(false);
  
  // Font Awesome icons
  faBars = faBars;
  faTimes = faTimes;
  faFutbol = faFutbol;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  
  // Navigation items
  navigationItems = [
    { id: 'features', label: 'Características', ariaLabel: 'Ir a características' },
    { id: 'marketplace', label: 'Marketplace', ariaLabel: 'Ir a marketplace' },
    { id: 'subscriptions', label: 'Planes', ariaLabel: 'Ir a planes de suscripción' }
  ];

  /**
   * Handles navigation to a section
   * @param sectionId - The ID of the section to navigate to
   */
  onNavigate(sectionId: string): void {
    this.scrollToSection.emit(sectionId);
    this.closeMobileMenu();
  }

  /**
   * Toggles mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }

  /**
   * Closes mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  /**
   * Navigates to login page
   */
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Navigates to register page
   */
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Checks if a navigation item is active
   * @param sectionId - The section ID to check
   */
  isActiveSection(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }
}
