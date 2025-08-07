import { Injectable, signal } from '@angular/core';
import { BREAKPOINTS } from '../constants/breakpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarExpandedSignal = signal<boolean>(true);
  
  readonly isSidebarExpanded = this.sidebarExpandedSignal.asReadonly();
  
  constructor() {
    // Initialize responsive behavior
    this.setupResponsiveListeners();
    this.handleResponsiveLayout();
  }
  
  /**
   * Toggle sidebar between expanded and collapsed states
   */
  toggleSidebar(): void {
    this.sidebarExpandedSignal.update(expanded => !expanded);
  }
  
  /**
   * Expand the sidebar
   */
  expandSidebar(): void {
    this.sidebarExpandedSignal.set(true);
  }
  
  /**
   * Collapse the sidebar
   */
  collapseSidebar(): void {
    this.sidebarExpandedSignal.set(false);
  }
  
  /**
   * Check if current view is mobile based on window width
   * @returns true if mobile view (width < md breakpoint)
   */
  isMobileView(): boolean {
    if (typeof window === 'undefined') {
      return false; // SSR support
    }
    return window.innerWidth < BREAKPOINTS.md;
  }
  
  /**
   * Check if current view is tablet based on window width
   * @returns true if tablet view (width between md and lg breakpoints)
   */
  isTabletView(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
  }
  
  /**
   * Check if current view is desktop based on window width
   * @returns true if desktop view (width >= lg breakpoint)
   */
  isDesktopView(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth >= BREAKPOINTS.lg;
  }
  
  /**
   * Handle responsive layout changes
   * Automatically collapse sidebar on mobile for better UX
   */
  handleResponsiveLayout(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    if (this.isMobileView()) {
      // On mobile, collapse sidebar by default
      this.collapseSidebar();
    } else if (this.isDesktopView()) {
      // On desktop, expand sidebar for better navigation
      this.expandSidebar();
    }
    // On tablet, keep current state
  }
  
  /**
   * Setup event listeners for responsive behavior
   */
  private setupResponsiveListeners(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    // Listen for window resize events
    window.addEventListener('resize', () => {
      this.handleResponsiveLayout();
    });
    
    // Listen for orientation change (mobile devices)
    if ('onorientationchange' in window) {
      window.addEventListener('orientationchange', () => {
        // Delay to allow orientation change to complete
        setTimeout(() => {
          this.handleResponsiveLayout();
        }, 100);
      });
    }
  }
  
  /**
   * Get current sidebar width based on state and screen size
   * @returns Sidebar width in pixels
   */
  getSidebarWidth(): number {
    if (!this.isSidebarExpanded()) {
      return BREAKPOINTS.sidebarCollapsed; // Collapsed width
    }
    
    if (this.isMobileView()) {
      return BREAKPOINTS.sidebarMobile; // Full width on mobile when expanded
    }
    
    return BREAKPOINTS.sidebarExpanded; // Standard expanded width
  }
  
  /**
   * Check if sidebar should overlay content (mobile behavior)
   * @returns true if sidebar should overlay content
   */
  shouldSidebarOverlay(): boolean {
    return this.isMobileView() && this.isSidebarExpanded();
  }
  
  /**
   * Get CSS classes for main content area based on sidebar state
   * @returns CSS classes string
   */
  getMainContentClasses(): string {
    const classes: string[] = ['transition-all', 'duration-300', 'ease-in-out'];
    
    if (this.shouldSidebarOverlay()) {
      // Mobile overlay - full width content
      classes.push('w-full');
    } else if (this.isSidebarExpanded() && !this.isMobileView()) {
      // Desktop expanded - adjust for sidebar width
      classes.push('ml-64'); // Standard sidebar width
    } else if (!this.isSidebarExpanded() && !this.isMobileView()) {
      // Desktop collapsed - adjust for collapsed sidebar width
      classes.push('ml-16'); // Collapsed sidebar width
    }
    
    return classes.join(' ');
  }
  
  /**
   * Get CSS classes for sidebar based on current state
   * @returns CSS classes string
   */
  getSidebarClasses(): string {
    const classes: string[] = [
      'bg-sidebar',
      'border-r',
      'border-sidebar-border',
      'transition-all',
      'duration-300',
      'ease-in-out'
    ];
    
    if (this.shouldSidebarOverlay()) {
      classes.push(
        'fixed',
        'inset-y-0',
        'left-0',
        'z-50',
        'w-64',
        'transform',
        'translate-x-0'
      );
    } else if (this.isMobileView() && !this.isSidebarExpanded()) {
      classes.push(
        'fixed',
        'inset-y-0',
        'left-0',
        'z-50',
        'w-64',
        'transform',
        '-translate-x-full'
      );
    } else {
      // Desktop behavior
      classes.push('fixed', 'inset-y-0', 'left-0', 'z-40');
      
      if (this.isSidebarExpanded()) {
        classes.push('w-64');
      } else {
        classes.push('w-16');
      }
    }
    
    return classes.join(' ');
  }
}
