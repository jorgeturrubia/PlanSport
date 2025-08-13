import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private readonly darkSignal = signal(false);

  // Public observables
  readonly isDark = this.darkSignal.asReadonly();
  readonly theme = computed(() => this.isDark() ? 'dark' : 'light');

  initializeTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    if (savedTheme) {
      this.setTheme(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(this.THEME_KEY)) {
          this.setTheme(e.matches);
        }
      });
  }

  toggleTheme(): void {
    this.setTheme(!this.isDark());
  }

  setTheme(isDark: boolean): void {
    this.darkSignal.set(isDark);

    // Update DOM
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0F172A' : '#FFFFFF');
    }
  }

  clearPreference(): void {
    localStorage.removeItem(this.THEME_KEY);
    this.initializeTheme();
  }
}
