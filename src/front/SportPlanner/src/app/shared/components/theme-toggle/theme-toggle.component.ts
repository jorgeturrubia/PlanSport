import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      [attr.aria-label]="isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      [attr.aria-pressed]="isDark()"
      role="switch"
    >
      <fa-icon 
        [icon]="isDark() ? faSun : faMoon" 
        class="text-yellow-500 dark:text-yellow-300 text-xl"
        [attr.aria-hidden]="true"
      ></fa-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  
  // Icons
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  
  // State
  readonly isDark = this.themeService.isDark;
  
  ngOnInit(): void {
    // Initialize theme from localStorage or system preference
    this.themeService.initializeTheme();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
