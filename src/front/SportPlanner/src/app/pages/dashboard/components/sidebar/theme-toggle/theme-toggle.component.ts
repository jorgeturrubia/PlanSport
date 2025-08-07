import { Component, computed, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../../../../shared/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  // Output event for theme changes
  themeChanged = output<Theme>();

  // Computed signal for dark mode state
  isDarkMode = computed(() => this.themeService.isDarkMode());

  // Computed signal for aria-label
  ariaLabel = computed(() => {
    return this.isDarkMode() 
      ? 'Cambiar a modo claro' 
      : 'Cambiar a modo oscuro';
  });

  /**
   * Handle theme toggle click
   */
  onToggleClick(): void {
    try {
      this.themeService.toggleTheme();
      const newTheme = this.themeService.getCurrentTheme();
      this.themeChanged.emit(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }

  /**
   * Handle keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onToggleClick();
    }
  }
}
