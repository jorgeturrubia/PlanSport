import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';

export type Theme = 'light' | 'dark' | 'system';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ heroMoon, heroSun })
  ],
  template: `
    <button 
      (click)="toggleTheme()"
      class="theme-toggle-btn"
      [attr.aria-label]="'Cambiar a tema ' + (isDark() ? 'claro' : 'oscuro')"
      [title]="'Cambiar a tema ' + (isDark() ? 'claro' : 'oscuro')"
    >
      <ng-icon 
        [name]="isDark() ? 'heroSun' : 'heroMoon'" 
        class="theme-icon"
      ></ng-icon>
    </button>
  `,
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  private document = inject(DOCUMENT);
  
  // Señal para el tema actual
  currentTheme = signal<Theme>('system');
  
  // Señal computada para determinar si está en modo oscuro
  isDark = signal(false);

  constructor() {
    // Cargar tema guardado o usar 'system' por defecto
    const savedTheme = this.loadThemeFromStorage();
    this.currentTheme.set(savedTheme);
    
    // Efecto para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
    
    // Escuchar cambios en las preferencias del sistema
    this.listenToSystemThemeChanges();
    
    // Aplicar tema inicial
    this.applyTheme(this.currentTheme());
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDark() ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    this.saveThemeToStorage(newTheme);
  }

  private applyTheme(theme: Theme): void {
    const html = this.document.documentElement;
    
    // Remover clases de tema existentes
    html.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      // Usar preferencia del sistema
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }
    
    // Aplicar clase del tema
    html.classList.add(effectiveTheme);
    
    // Actualizar señal isDark
    this.isDark.set(effectiveTheme === 'dark');
  }

  private listenToSystemThemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme() === 'system') {
        this.applyTheme('system');
      }
    });
  }

  private loadThemeFromStorage(): Theme {
    try {
      const saved = localStorage.getItem('theme');
      return (saved as Theme) || 'system';
    } catch {
      return 'system';
    }
  }

  private saveThemeToStorage(theme: Theme): void {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignorar errores de localStorage
    }
  }
}