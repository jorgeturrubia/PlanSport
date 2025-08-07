import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-preference';
  private darkModeSignal = signal<boolean>(false);
  
  readonly isDarkMode = this.darkModeSignal.asReadonly();
  
  constructor() {
    this.initializeTheme();
  }
  
  /**
   * Initialize theme from localStorage or default to light mode
   */
  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    const isDark = savedTheme === 'dark';
    this.darkModeSignal.set(isDark);
    this.applyTheme();
  }
  
  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.darkModeSignal.update(dark => !dark);
    this.applyTheme();
    this.savePreference();
  }
  
  /**
   * Set specific theme
   * @param theme - The theme to set ('light' or 'dark')
   */
  setTheme(theme: Theme): void {
    const isDark = theme === 'dark';
    this.darkModeSignal.set(isDark);
    this.applyTheme();
    this.savePreference();
  }
  
  /**
   * Get current theme as string
   * @returns Current theme ('light' or 'dark')
   */
  getCurrentTheme(): Theme {
    return this.darkModeSignal() ? 'dark' : 'light';
  }
  
  /**
   * Apply theme to document element
   */
  private applyTheme(): void {
    const isDark = this.darkModeSignal();
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Add theme transition class temporarily for smooth transitions
    document.documentElement.style.setProperty('--theme-transition-duration', '0.3s');
  }
  
  /**
   * Save theme preference to localStorage
   */
  private savePreference(): void {
    const theme = this.getCurrentTheme();
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme preference to localStorage:', error);
    }
  }
  
  /**
   * Get saved theme from localStorage
   * @returns Saved theme or null if not found
   */
  private getSavedTheme(): Theme | null {
    try {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return null;
    } catch (error) {
      console.warn('Failed to read theme preference from localStorage:', error);
      return null;
    }
  }
}
