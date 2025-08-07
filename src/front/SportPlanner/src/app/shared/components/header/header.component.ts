import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavigationItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  
  constructor(private router: Router) {}
  // Input signals for component configuration
  navigationItems = input<NavigationItem[]>([
    { id: 'features', label: 'Características' },
    { id: 'subscriptions', label: 'Suscripciones' },
    { id: 'testimonials', label: 'Opiniones' }
  ]);
  
  activeSection = input<string>('hero');

  // Output events for parent component communication
  navigate = output<string>();
  loginClicked = output<void>();
  registerClicked = output<void>();
  brandClicked = output<void>();

  /**
   * Handles navigation item clicks
   * Emits navigation event to parent component for anchor scrolling
   * @param sectionId The ID of the section to navigate to
   */
  onNavigate(sectionId: string): void {
    this.navigate.emit(sectionId);
  }

  /**
   * Handles brand/logo clicks
   * Typically used to navigate to hero section or homepage
   */
  onBrandClick(): void {
    this.brandClicked.emit();
  }

  /**
   * Handles login button click
   * Emits login event to parent component
   */
  onLoginClick(): void {
    this.loginClicked.emit();
  }

  /**
   * Handles register button click
   * Emits register event to parent component
   */
  onRegisterClick(): void {
    this.registerClicked.emit();
  }

  /**
   * Checks if a navigation item is currently active
   * @param itemId The navigation item ID to check
   * @returns true if the item is active
   */
  isActive(itemId: string): boolean {
    return this.activeSection() === itemId;
  }
}