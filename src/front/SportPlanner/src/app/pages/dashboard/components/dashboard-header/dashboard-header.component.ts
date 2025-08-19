import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    UserMenuComponent,
    ThemeToggleComponent
  ],
  template: `
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
      <!-- Left side: Menu toggle and Logo -->
      <div class="flex items-center space-x-4">
        <button
          (click)="toggleSidebar.emit()"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <lucide-icon [name]="'menu'" class="w-5 h-5 text-gray-600 dark:text-gray-300"></lucide-icon>
        </button>
        
        <!-- PlanSport Logo that redirects to home -->
        <h1 
          class="text-xl font-bold text-primary-600 dark:text-primary-400 cursor-pointer hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          (click)="navigateToHome()"
        >
          PlanSport
        </h1>
      </div>

      <!-- Right side: Theme toggle and User menu -->
      <div class="flex items-center space-x-4">
        <app-theme-toggle></app-theme-toggle>
        <app-user-menu></app-user-menu>
      </div>
    </header>
  `
})
export class DashboardHeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  toggleSidebar = output<void>();

  // No need to reassign icons as we're using LucideAngularModule
  
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}