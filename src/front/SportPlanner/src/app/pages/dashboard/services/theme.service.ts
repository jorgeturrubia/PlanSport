import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'planSport-theme';
  
  // Signal for current theme
  currentTheme = signal<Theme>('system');
  
  // Signal for effective theme (resolved system preference)
  effectiveTheme = signal<'light' | 'dark'>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.setupSystemThemeListener();
      
      // Effect to persist theme changes and apply to DOM
      effect(() => {
        const theme = this.currentTheme();
        this.persistTheme(theme);
        this.applyTheme(theme);
      });
    }
  }

  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    const systemTheme = this.getSystemTheme();
    
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      this.currentTheme.set('system');
    }
    
    this.updateEffectiveTheme();
  }

  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', () => {
        this.updateEffectiveTheme();
      });
    }
  }

  private updateEffectiveTheme(): void {
    const currentTheme = this.currentTheme();
    
    if (currentTheme === 'system') {
      const systemTheme = this.getSystemTheme();
      this.effectiveTheme.set(systemTheme);
    } else {
      this.effectiveTheme.set(currentTheme);
    }
  }

  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  private getSavedTheme(): Theme | null {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.THEME_KEY);
      return saved as Theme || null;
    }
    return null;
  }

  private persistTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      
      // Apply new theme
      if (theme === 'system') {
        const systemTheme = this.getSystemTheme();
        root.classList.add(systemTheme);
        root.setAttribute('data-theme', systemTheme);
      } else {
        root.classList.add(theme);
        root.setAttribute('data-theme', theme);
      }
      
      this.updateEffectiveTheme();
    }
  }

  // Public methods
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  toggleTheme(): void {
    const current = this.currentTheme();
    
    switch (current) {
      case 'light':
        this.setTheme('dark');
        break;
      case 'dark':
        this.setTheme('system');
        break;
      case 'system':
        this.setTheme('light');
        break;
    }
  }

  isDarkMode(): boolean {
    return this.effectiveTheme() === 'dark';
  }
}