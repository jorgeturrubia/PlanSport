import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { FeaturesComponent } from '../../shared/components/features/features.component';
import { AboutComponent } from '../../shared/components/about/about.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, HeaderComponent, HeroComponent, FeaturesComponent, AboutComponent, CtaComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit, OnDestroy {
  // Signal to track the currently active section for navigation highlighting
  activeSection = signal<string>('hero');
  
  // Loading states
  isLoading = signal<boolean>(false);
  isNavigating = signal<boolean>(false);
  
  // Error handling
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  // Throttle timer for scroll events
  private scrollThrottleTimer: number | null = null;
  
  // All sections available for navigation
  private readonly allSections = ['hero', 'features', 'about', 'cta', 'subscriptions', 'testimonials'];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    // Initialize scroll detection
    this.detectActiveSection();
  }
  
  ngOnDestroy(): void {
    // Clean up throttle timer
    if (this.scrollThrottleTimer) {
      clearTimeout(this.scrollThrottleTimer);
    }
  }

  /**
   * Scrolls to a specific section on the page with smooth behavior
   * @param sectionId The ID of the section to scroll to (without '#')
   */
  scrollToSection(sectionId: string): void {
    this.scrollToSectionWithOffset(sectionId, 80);
  }

  /**
   * Updates the active section signal for navigation highlighting
   * @param sectionId The ID of the currently active section
   */
  updateActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  /**
   * Placeholder method for login functionality
   * Will be implemented when authentication system is ready
   */
  handleLogin(): void {
    console.log('Login functionality - Coming soon!');
    // TODO: Implement actual login logic when authentication is ready
  }

  /**
   * Placeholder method for register functionality
   * Will be implemented when authentication system is ready
   */
  handleRegister(): void {
    console.log('Register functionality - Coming soon!');
    // TODO: Implement actual registration logic when authentication is ready
  }

  /**
   * Handles brand click - scrolls to hero section
   */
  handleBrandClick(): void {
    this.scrollToSection('hero');
  }

  /**
   * Navigation menu items for the header
   */
  navigationItems = [
    { id: 'features', label: 'Características' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'subscriptions', label: 'Suscripciones' },
    { id: 'testimonials', label: 'Opiniones' }
  ];

  /**
   * Handles "Get Started" CTA button click
   * Will redirect to registration or trial signup when available
   */
  handleGetStarted(): void {
    console.log('Get Started CTA clicked - Redirecting to signup');
    // TODO: Navigate to registration/signup page when available
    // this.router.navigate(['/signup']);
  }

  /**
   * Handles "View Plans" CTA button click
   * Will navigate to pricing/subscription plans page when available
   */
  handleViewPlans(): void {
    console.log('View Plans CTA clicked - Redirecting to pricing');
    // TODO: Navigate to pricing page when available
    // this.router.navigate(['/pricing']);
    // For now, scroll to subscriptions section if it exists
    this.scrollToSection('subscriptions');
  }
  
  /**
   * Handles scroll events to automatically update active section
   * Uses throttling to improve performance
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Throttle scroll events for better performance
    if (this.scrollThrottleTimer) {
      clearTimeout(this.scrollThrottleTimer);
    }
    
    this.scrollThrottleTimer = window.setTimeout(() => {
      this.detectActiveSection();
    }, 100);
  }
  
  /**
   * Detects which section is currently active based on scroll position
   * Updates the activeSection signal accordingly
   */
  private detectActiveSection(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const headerHeight = 80; // Approximate header height in pixels
    const scrollPosition = window.scrollY + headerHeight + 50; // Add some offset
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If near the bottom of the page, set to the last section with content
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      const lastSectionWithContent = this.getLastSectionWithContent();
      if (lastSectionWithContent) {
        this.updateActiveSection(lastSectionWithContent);
        return;
      }
    }
    
    // Find the section that's currently most visible
    let activeSection = 'hero'; // Default to hero
    
    for (const sectionId of this.allSections) {
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        // Check if the section is in the viewport or above the current scroll position
        if (elementTop <= scrollPosition) {
          activeSection = sectionId;
        } else {
          break; // Stop checking once we find a section that's below the current position
        }
      }
    }
    
    // Only update if the active section has changed
    if (this.activeSection() !== activeSection) {
      this.updateActiveSection(activeSection);
    }
  }
  
  /**
   * Gets the last section that has actual content (not placeholder)
   * Useful for determining the active section when at the bottom of the page
   */
  private getLastSectionWithContent(): string | null {
    // Check sections in reverse order to find the last one with content
    const sectionsToCheck = ['cta', 'about', 'features', 'hero'];
    
    for (const sectionId of sectionsToCheck) {
      const element = document.getElementById(`${sectionId}-section`);
      if (element && element.offsetHeight > 0) {
        return sectionId;
      }
    }
    
    return 'hero'; // Fallback to hero
  }
  
  /**
   * Enhanced scroll to section with proper offset for fixed header
   * @param sectionId The ID of the section to scroll to
   * @param offset Optional offset in pixels (default: 80)
   */
  scrollToSectionWithOffset(sectionId: string, offset: number = 80): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try {
      this.isNavigating.set(true);
      this.clearError();
      
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        
        this.updateActiveSection(sectionId);
        
        // Clear navigating state after animation
        setTimeout(() => {
          this.isNavigating.set(false);
        }, 1000);
      } else {
        throw new Error(`Section '${sectionId}' not found`);
      }
    } catch (error) {
      this.handleError(error instanceof Error ? error.message : 'Navigation error occurred');
      this.isNavigating.set(false);
    }
  }
  
  /**
   * Handles errors and updates error state
   * @param message Error message to display
   */
  private handleError(message: string): void {
    this.hasError.set(true);
    this.errorMessage.set(message);
    console.error('Landing Page Error:', message);
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }
  
  /**
   * Clears error state
   */
  clearError(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
  }
  
  /**
   * Sets loading state
   * @param loading Whether the page is in loading state
   */
  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }
  
  /**
   * Handles window resize events for responsive behavior
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    // Recalculate active section on window resize
    if (this.scrollThrottleTimer) {
      clearTimeout(this.scrollThrottleTimer);
    }
    
    this.scrollThrottleTimer = window.setTimeout(() => {
      this.detectActiveSection();
    }, 200);
  }
  
  /**
   * Handles errors from child components
   * @param error Error from child component
   */
  onComponentError(error: any): void {
    this.handleError('Component error: ' + (error?.message || 'Unknown error'));
  }
  
  /**
   * Preloads critical resources
   */
  private preloadResources(): void {
    // This method can be extended to preload images, fonts, etc.
    try {
      // Example: preload critical images
      const criticalImages: string[] = [
        // Add image URLs here when available
        // '/assets/images/hero-bg.jpg',
        // '/assets/images/features-icon.svg'
      ];
      
      criticalImages.forEach((imageUrl: string) => {
        const img = new Image();
        img.src = imageUrl;
      });
    } catch (error) {
      console.warn('Resource preloading failed:', error);
    }
  }
}
