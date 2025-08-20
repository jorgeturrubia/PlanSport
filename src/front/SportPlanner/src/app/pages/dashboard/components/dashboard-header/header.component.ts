import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3, heroMoon, heroSun, heroUser, heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';

import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ThemeToggleComponent, UserMenuComponent],
  providers: [
    provideIcons({ heroBars3, heroMoon, heroSun, heroUser, heroArrowRightOnRectangle })
  ],
  template: `
    <header class="dashboard-header">
      <!-- Left Section -->
      <div class="header-left">
        <!-- Mobile Menu Button -->
        <button 
          *ngIf="isMobile"
          (click)="onToggleSidebar()"
          class="mobile-menu-btn"
          aria-label="Toggle sidebar"
        >
          <ng-icon name="heroBars3" class="w-6 h-6"></ng-icon>
        </button>
        
        <!-- Desktop Sidebar Toggle -->
        <button 
          *ngIf="!isMobile"
          (click)="onToggleSidebar()"
          class="sidebar-toggle-btn"
          [class.collapsed]="sidebarCollapsed"
          aria-label="Toggle sidebar"
        >
          <ng-icon name="heroBars3" class="w-5 h-5"></ng-icon>
        </button>
        
        <!-- Page Title -->
        <div class="page-title">
          <h1>Dashboard</h1>
        </div>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Theme Toggle -->
        <app-theme-toggle></app-theme-toggle>
        
        <!-- User Menu -->
        <app-user-menu></app-user-menu>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isMobile = false;
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}