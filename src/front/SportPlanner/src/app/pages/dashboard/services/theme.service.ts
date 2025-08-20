import { Injectable, signal, effect, PLATFORM_ID, inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  enableTransitions: boolean;
  transitionDuration: number;
  persistPreference: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'planSport-theme';
  private readonly CONFIG_KEY = 'planSport-theme-config';
  
  // Signals for theme management
  currentTheme = signal<Theme>('system');
  effectiveTheme = signal<'light' | 'dark'>('light');
  isTransitioning = signal<boolean>(false);
  
  // Configuration signal
  config = signal<ThemeConfig>({
    enableTransitions: true,
    transitionDuration: 200,
    persistPreference: true
  });
  
  // Computed properties for better UX
  isDarkMode = computed(() => this.effectiveTheme() === 'dark');
  isLightMode = computed(() => this.effectiveTheme() === 'light');
  isSystemTheme = computed(() => this.currentTheme() === 'system');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadConfiguration();
      this.initializeTheme();
      this.setupSystemThemeListener();
      
      // Effect to persist theme changes and apply to DOM
      effect(() => {
        const theme = this.currentTheme();
        if (this.config().persistPreference) {
          this.persistTheme(theme);
        }
        this.applyThemeWithTransition(theme);
      });
      
      // Effect to persist configuration changes
      effect(() => {
        const config = this.config();
        this.persistConfiguration(config);
      });
    }
  }

  private loadConfiguration(): void {
    const savedConfig = this.getSavedConfiguration();
    if (savedConfig) {
      this.config.set({ ...this.config(), ...savedConfig });
    }
  }

  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    
    if (savedTheme && this.config().persistPreference) {
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

  private applyThemeWithTransition(theme: Theme): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const config = this.config();
      
      // Set transitioning state
      this.isTransitioning.set(true);
      
      // Add transition class if enabled
      if (config.enableTransitions) {
        root.style.setProperty('--theme-transition-duration', `${config.transitionDuration}ms`);
        root.classList.add('theme-transitioning');
      }
      
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      
      // Apply new theme
      const effectiveTheme = theme === 'system' ? this.getSystemTheme() : theme;
      root.classList.add(effectiveTheme);
      root.setAttribute('data-theme', effectiveTheme);
      
      this.updateEffectiveTheme();
      
      // Remove transition class after animation
      if (config.enableTransitions) {
        setTimeout(() => {
          root.classList.remove('theme-transitioning');
          this.isTransitioning.set(false);
        }, config.transitionDuration);
      } else {
        this.isTransitioning.set(false);
      }
    }
  }

  private getSavedConfiguration(): Partial<ThemeConfig> | null {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.CONFIG_KEY);
      try {
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  private persistConfiguration(config: ThemeConfig): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
    }
  }

  // Public methods for theme management
  setTheme(theme: Theme): void {
    if (this.isTransitioning()) {
      return; // Prevent theme changes during transition
    }
    this.currentTheme.set(theme);
  }

  toggleTheme(): void {
    if (this.isTransitioning()) {
      return; // Prevent theme changes during transition
    }
    
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

  // Public methods for configuration
  updateConfig(partialConfig: Partial<ThemeConfig>): void {
    this.config.set({ ...this.config(), ...partialConfig });
  }

  resetConfig(): void {
    this.config.set({
      enableTransitions: true,
      transitionDuration: 200,
      persistPreference: true
    });
  }

  // Utility methods
  getNextTheme(): Theme {
    const current = this.currentTheme();
    switch (current) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
    }
  }

  getThemeIcon(): string {
    const current = this.currentTheme();
    switch (current) {
      case 'light': return 'sun';
      case 'dark': return 'moon';
      case 'system': return 'monitor';
    }
  }

  getThemeLabel(): string {
    const current = this.currentTheme();
    switch (current) {
      case 'light': return 'Modo Claro';
      case 'dark': return 'Modo Oscuro';
      case 'system': return 'Sistema';
    }
  }
}