import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      [attr.aria-label]="'Cambiar a tema ' + getNextThemeLabel()"
      title="Cambiar tema"
    >
      <ng-icon 
        [name]="getCurrentThemeIcon()" 
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      ></ng-icon>
    </button>
  `
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getCurrentThemeIcon(): string {
    const currentTheme = this.themeService.currentTheme();
    
    switch (currentTheme) {
      case 'light':
        return 'heroSun';
      case 'dark':
        return 'heroMoon';
      case 'system':
        return 'heroComputerDesktop';
      default:
        return 'heroSun';
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