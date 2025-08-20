import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser, heroArrowRightOnRectangle, heroCog6Tooth, heroChevronDown } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  providers: [
    provideIcons({ heroUser, heroArrowRightOnRectangle, heroCog6Tooth, heroChevronDown })
  ],
  template: `
    <div class="user-menu-container">
      <!-- User Menu Button -->
      <button 
        (click)="toggleMenu()"
        class="user-menu-btn"
        [class.active]="isMenuOpen()"
        aria-label="Menú de usuario"
      >
        <div class="user-avatar">
          <span class="user-initials">{{ userInitials }}</span>
        </div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">{{ userRole }}</span>
        </div>
        <ng-icon 
          name="heroChevronDown" 
          class="chevron-icon"
          [class.rotated]="isMenuOpen()"
        ></ng-icon>
      </button>

      <!-- Dropdown Menu -->
      <div 
        class="user-dropdown"
        [class.open]="isMenuOpen()"
        *ngIf="isMenuOpen()"
      >
        <div class="dropdown-content">
          <!-- User Info Section -->
          <div class="user-info-section">
            <div class="user-avatar-large">
              <span class="user-initials-large">{{ userInitials }}</span>
            </div>
            <div class="user-details">
              <p class="user-name-large">{{ userName }}</p>
              <p class="user-email">{{ userEmail }}</p>
            </div>
          </div>

          <hr class="dropdown-separator">

          <!-- Menu Items -->
          <nav class="dropdown-nav">
            <a 
              routerLink="/profile" 
              class="dropdown-item"
              (click)="closeMenu()"
            >
              <ng-icon name="heroUser" class="dropdown-icon"></ng-icon>
              <span>Mi Perfil</span>
            </a>
            
            <a 
              routerLink="/settings" 
              class="dropdown-item"
              (click)="closeMenu()"
            >
              <ng-icon name="heroCog6Tooth" class="dropdown-icon"></ng-icon>
              <span>Configuración</span>
            </a>
          </nav>

          <hr class="dropdown-separator">

          <!-- Logout -->
          <button 
            (click)="logout()"
            class="dropdown-item logout-item"
          >
            <ng-icon name="heroArrowRightOnRectangle" class="dropdown-icon"></ng-icon>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  isMenuOpen = signal(false);
  
  // Mock user data - esto debería venir de un servicio de autenticación
  userName = 'Usuario Demo';
  userEmail = 'usuario@sportplanner.com';
  userRole = 'Entrenador';
  userInitials = 'UD';

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  logout(): void {
    // Aquí iría la lógica de logout
    console.log('Logout clicked');
    this.closeMenu();
    // Ejemplo: this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const container = target.closest('.user-menu-container');
    
    if (!container && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
}