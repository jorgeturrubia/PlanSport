import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly headerHeight = 64; // Height of sticky header
  private observer?: IntersectionObserver;
  
  // Signal to track current active section
  currentSection = signal<string>('hero');

  /**
   * Scrolls smoothly to a specific element by ID
   * @param elementId - The ID of the element to scroll to
   */
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - this.headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Initializes intersection observer to track visible sections
   * @param sectionIds - Array of section IDs to observe
   */
  initSectionObserver(sectionIds: string[]): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${this.headerHeight}px 0px -50% 0px`,
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection.set(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        this.observer!.observe(element);
      }
    });
  }

  /**
   * Disconnects the intersection observer
   */
  disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Gets the current scroll position
   */
  getScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Check if user has scrolled past the header
   */
  hasScrolledPastHeader(): boolean {
    return this.getScrollPosition() > 100;
  }

  /**
   * Scroll to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
