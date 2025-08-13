import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button
      type="button"
      (click)="toggleTheme()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="isDark()"
      role="switch"
      class="relative inline-flex h-10 w-20 items-center rounded-full
             bg-gray-200 dark:bg-gray-700
             transition-colors duration-300 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
             hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      <span class="sr-only">{{ ariaLabel() }}</span>
      
      <!-- Slider -->
      <span
        [class.translate-x-10]="isDark()"
        class="pointer-events-none relative inline-block h-8 w-8
               transform rounded-full bg-white dark:bg-gray-900
               shadow-lg transition-transform duration-300 ease-in-out
               translate-x-1"
      >
        <!-- Iconos -->
        <span class="absolute inset-0 flex items-center justify-center">
          @if (isDark()) {
            <fa-icon 
              [icon]="faMoon" 
              class="h-4 w-4 text-primary"
              [attr.aria-hidden]="true"
            ></fa-icon>
          } @else {
            <fa-icon 
              [icon]="faSun" 
              class="h-4 w-4 text-yellow-500"
              [attr.aria-hidden]="true"
            ></fa-icon>
          }
        </span>
      </span>
      
      <!-- Iconos de fondo -->
      <span class="absolute left-2">
        <fa-icon 
          [icon]="faSun" 
          class="h-4 w-4 text-yellow-500 opacity-60"
          [attr.aria-hidden]="true"
        ></fa-icon>
      </span>
      <span class="absolute right-2">
        <fa-icon 
          [icon]="faMoon" 
          class="h-4 w-4 text-primary opacity-60"
          [attr.aria-hidden]="true"
        ></fa-icon>
      </span>
    </button>
    
    <!-- Tooltip opcional -->
    @if (showTooltip()) {
      <div class="absolute -bottom-10 left-1/2 -translate-x-1/2
                  bg-gray-900 dark:bg-gray-100
                  text-white dark:text-gray-900
                  text-xs px-2 py-1 rounded
                  pointer-events-none opacity-0 
                  group-hover:opacity-100 transition-opacity">
        {{ tooltipText() }}
      </div>
    }
  `,
  styles: [`
    :host {
      @apply relative inline-block;
    }
  `],
  host: {
    class: 'group'
  }
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  
  // Iconos
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  readonly faDesktop = faDesktop;
  
  // Estado
  readonly isDark = this.themeService.isDark;
  readonly theme = this.themeService.theme;
  
  // Computed
  readonly ariaLabel = computed(() => 
    this.isDark() 
      ? 'Cambiar a modo claro' 
      : 'Cambiar a modo oscuro'
  );
  
  readonly tooltipText = computed(() => 
    this.isDark() 
      ? 'Modo oscuro activo' 
      : 'Modo claro activo'
  );
  
  readonly showTooltip = computed(() => false); // Activar si se necesita
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
    
    // Anunciar cambio para screen readers
    this.announceThemeChange();
  }
  
  private announceThemeChange(): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Tema cambiado a modo ${this.isDark() ? 'oscuro' : 'claro'}`;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
}
