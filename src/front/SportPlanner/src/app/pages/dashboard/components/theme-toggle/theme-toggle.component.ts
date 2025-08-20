import { Component, inject, signal, computed, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  template: `
    <div class="theme-toggle relative">
      <!-- Toggle Button -->
      <button
        #toggleButton
        (click)="toggleDropdown()"
        class="theme-toggle-button group"
        [class.loading]="themeService.isTransitioning()"
        [attr.aria-label]="'Tema actual: ' + getCurrentThemeLabel() + '. Clic para cambiar'"
        [attr.aria-expanded]="isDropdownOpen()"
        aria-haspopup="true"
      >
        <div class="relative">
          <ng-icon 
            [name]="getCurrentThemeIcon()" 
            class="theme-icon transition-all duration-300"
            [class.animate-spin]="themeService.isTransitioning()"
            [class.scale-110]="isDropdownOpen()"
          ></ng-icon>
          
          <!-- Loading indicator -->
          <div 
            *ngIf="themeService.isTransitioning()"
            class="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
          ></div>
        </div>
        
        <!-- Tooltip -->
        <div class="theme-tooltip">
          {{ getCurrentThemeLabel() }}
        </div>
      </button>

      <!-- Dropdown Menu -->
      <div 
        *ngIf="isDropdownOpen()"
        class="theme-dropdown"
        [class.open]="isDropdownOpen()"
        role="menu"
        aria-labelledby="theme-toggle-button"
      >
        <div 
          *ngFor="let option of themeOptions(); trackBy: trackByTheme"
          (click)="selectTheme(option.value)"
          class="theme-option"
          [class.active]="option.value === themeService.currentTheme()"
          role="menuitem"
          [attr.aria-selected]="option.value === themeService.currentTheme()"
          tabindex="0"
          (keydown.enter)="selectTheme(option.value)"
          (keydown.space)="selectTheme(option.value)"
        >
          <div class="theme-option-icon">
            <ng-icon [name]="option.icon"></ng-icon>
          </div>
          <div class="theme-option-text">
            <div class="theme-label">{{ option.label }}</div>
            <div class="theme-description">{{ option.description }}</div>
          </div>
          <div class="theme-option-check">
            <ng-icon name="heroCheck"></ng-icon>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);
  
  // State
  isDropdownOpen = signal(false);
  
  // Theme options
  themeOptions = computed(() => [
    {
      value: 'light' as Theme,
      label: 'Claro',
      description: 'Tema claro siempre activo',
      icon: 'heroSun'
    },
    {
      value: 'dark' as Theme,
      label: 'Oscuro',
      description: 'Tema oscuro siempre activo',
      icon: 'heroMoon'
    },
    {
      value: 'system' as Theme,
      label: 'Sistema',
      description: 'Sigue la configuración del sistema',
      icon: 'heroComputerDesktop'
    }
  ]);

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen.set(false);
    }
  }

  // Close dropdown on escape key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isDropdownOpen.set(false);
  }

  toggleDropdown(): void {
    if (this.themeService.isTransitioning()) {
      return;
    }
    this.isDropdownOpen.update(open => !open);
  }

  selectTheme(theme: Theme): void {
    if (this.themeService.isTransitioning()) {
      return;
    }
    
    this.themeService.setTheme(theme);
    this.isDropdownOpen.set(false);
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

  getCurrentThemeLabel(): string {
    const currentTheme = this.themeService.currentTheme();
    const option = this.themeOptions().find(opt => opt.value === currentTheme);
    return option?.label || 'Claro';
  }

  trackByTheme(index: number, option: any): string {
    return option.value;
  }
}