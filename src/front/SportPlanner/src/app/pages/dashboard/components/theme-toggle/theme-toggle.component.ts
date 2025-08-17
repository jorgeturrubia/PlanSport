import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon, Monitor } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      [attr.aria-label]="'Cambiar a tema ' + getNextThemeLabel()"
      title="Cambiar tema"
    >
      <lucide-icon 
        [name]="getCurrentThemeIcon()" 
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      ></lucide-icon>
    </button>
  `
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly MonitorIcon = Monitor;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getCurrentThemeIcon(): string {
    const currentTheme = this.themeService.currentTheme();
    
    switch (currentTheme) {
      case 'light':
        return 'sun';
      case 'dark':
        return 'moon';
      case 'system':
        return 'monitor';
      default:
        return 'sun';
    }
  }

  getNextThemeLabel(): string {
    const currentTheme = this.themeService.currentTheme();
    
    switch (currentTheme) {
      case 'light':
        return 'oscuro';
      case 'dark':
        return 'sistema';
      case 'system':
        return 'claro';
      default:
        return 'oscuro';
    }
  }
}