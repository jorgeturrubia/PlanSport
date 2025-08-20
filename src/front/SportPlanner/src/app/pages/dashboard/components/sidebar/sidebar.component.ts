import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHome, heroUserGroup, heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  providers: [
    provideIcons({ heroHome, heroUserGroup, heroBars3 })
  ],
  template: `
    <aside 
      class="sidebar"
      [class.collapsed]="isCollapsed"
      [class.mobile]="isMobile"
    >
      <!-- Logo/Brand -->
      <div class="sidebar-header">
        <div class="logo" [class.collapsed]="isCollapsed">
          <span class="logo-icon">SP</span>
          <span class="logo-text" *ngIf="!isCollapsed">SportPlanner</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              routerLink="/dashboard/home" 
              routerLinkActive="active"
              class="nav-link"
              [title]="isCollapsed ? 'Inicio' : ''"
            >
              <ng-icon name="heroHome" class="nav-icon"></ng-icon>
              <span class="nav-text" *ngIf="!isCollapsed">Inicio</span>
            </a>
          </li>
          <li class="nav-item">
            <a 
              routerLink="/dashboard/teams" 
              routerLinkActive="active"
              class="nav-link"
              [title]="isCollapsed ? 'Equipos' : ''"
            >
              <ng-icon name="heroUserGroup" class="nav-icon"></ng-icon>
              <span class="nav-text" *ngIf="!isCollapsed">Equipos</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Section -->
      <div class="sidebar-footer">
        <div class="user-separator" *ngIf="!isCollapsed">
          <hr class="separator-line">
        </div>
        <div class="user-initials">
          <div class="initials-circle">
            <span>{{ userInitials }}</span>
          </div>
          <span class="user-name" *ngIf="!isCollapsed">{{ userName }}</span>
        </div>
      </div>
    </aside>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() isMobile = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Mock user data - esto debería venir de un servicio de autenticación
  userName = 'Usuario Demo';
  userInitials = 'UD';

  onToggle() {
    this.toggleSidebar.emit();
  }
}