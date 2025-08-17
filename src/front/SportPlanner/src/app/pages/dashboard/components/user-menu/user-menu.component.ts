import { Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ChevronDown, LogOut } from 'lucide-angular';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  template: `
    <div class="relative">
      <!-- User Avatar and Info -->
      <button
        (click)="toggleMenu()"
        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        [attr.aria-expanded]="isMenuOpen()"
        aria-haspopup="true"
      >
        <!-- Avatar -->
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-medium">
            {{ userInitials() }}
          </span>
        </div>
        
        <!-- User Info (hidden on mobile) -->
        <div class="hidden md:block text-left">
          <div class="text-sm font-medium text-gray-900 dark:text-white">
            {{ currentUser()?.firstName || 'Usuario' }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ currentUser()?.email || 'email@ejemplo.com' }}
          </div>
        </div>
        
        <!-- Chevron -->
        <lucide-icon 
          name="chevron-down" 
          class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform"
          [class.rotate-180]="isMenuOpen()"
        ></lucide-icon>
      </button>

      <!-- Dropdown Menu -->
      <div
        *ngIf="isMenuOpen()"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
      >
        <button
          (click)="logout()"
          class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <lucide-icon name="log-out" class="w-4 h-4 mr-3"></lucide-icon>
          Cerrar Sesión
        </button>
      </div>
    </div>
  `
})
export class UserMenuComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = signal(false);
  
  readonly ChevronDownIcon = ChevronDown;
  readonly LogOutIcon = LogOut;

  currentUser = computed(() => this.authService.user());
  
  userInitials = computed(() => {
    const user = this.currentUser();
    if (user && user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    } else if (user && user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    return 'U';
  });

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  logout(): void {
    // Show confirmation dialog
    const confirmed = confirm('¿Estás seguro de que quieres cerrar sesión?');
    
    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
    
    this.isMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userMenu = target.closest('.relative');
    
    if (!userMenu) {
      this.isMenuOpen.set(false);
    }
  }
}