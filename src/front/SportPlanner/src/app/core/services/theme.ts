import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly router = inject(Router);
  private readonly STORAGE_KEY = 'theme-preference';
  
  // Signals para estado reactivo
  private readonly themeSignal = signal<Theme>('system');
  private readonly effectiveThemeSignal = signal<'light' | 'dark'>('light');
  
  // Computed values públicos
  readonly theme = this.themeSignal.asReadonly();
  readonly effectiveTheme = this.effectiveThemeSignal.asReadonly();
  readonly isDark = computed(() => this.effectiveTheme() === 'dark');
  readonly isLight = computed(() => this.effectiveTheme() === 'light');
  
  // Media query para preferencia del sistema
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  constructor() {
    // Inicializar tema
    this.initializeTheme();
    
    // Escuchar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {
      this.applyRouteDefaultTheme(event.url);
    });
    
    // Escuchar cambios en preferencia del sistema
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.theme() === 'system') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
    
    // Effect para aplicar tema cuando cambia
    effect(() => {
      const theme = this.theme();
      if (theme === 'system') {
        this.applyTheme(this.mediaQuery.matches ? 'dark' : 'light');
      } else {
        this.applyTheme(theme);
      }
    });
  }
  
  private initializeTheme(): void {
    // Intentar cargar preferencia guardada
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.themeSignal.set(savedTheme);
    } else {
      // Aplicar tema por defecto según la ruta actual
      this.applyRouteDefaultTheme(this.router.url);
    }
  }
  
  private applyRouteDefaultTheme(url: string): void {
    // Solo aplicar defaults si no hay preferencia guardada
    if (localStorage.getItem(this.STORAGE_KEY)) {
      return;
    }
    
    // Landing y auth: dark por defecto
    if (url === '/' || url.startsWith('/auth') || url.startsWith('/login') || url.startsWith('/register')) {
      this.setTheme('dark', false); // No guardar en localStorage
    }
    // Dashboard y rutas protegidas: light por defecto
    else if (url.startsWith('/dashboard') || url.startsWith('/teams') || url.startsWith('/planning')) {
      this.setTheme('light', false); // No guardar en localStorage
    }
  }
  
  private applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    this.effectiveThemeSignal.set(theme);
    
    // Dispatch evento para otros componentes
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
  }
  
  setTheme(theme: Theme, persist: boolean = true): void {
    this.themeSignal.set(theme);
    
    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }
  
  toggleTheme(): void {
    const current = this.effectiveTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  private isValidTheme(theme: string): theme is Theme {
    return ['light', 'dark', 'system'].includes(theme);
  }
  
  // Método para obtener color CSS variable
  getCssVariable(variable: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }
}
