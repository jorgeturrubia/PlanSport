import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NavigationItem } from '../../interfaces/navigation.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIcon
  ],
  template: `
    <aside 
      class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ease-in-out"
      [class.w-64]="!isCollapsed()"
      [class.w-16]="isCollapsed()"
    >
      <!-- Logo/Brand -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center" [class.justify-center]="isCollapsed()">
          <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">PS</span>
          </div>
          <span 
            *ngIf="!isCollapsed()" 
            class="ml-3 text-lg font-semibold text-gray-900 dark:text-white transition-opacity duration-300"
          >
            PlanSport
          </span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li *ngFor="let item of navigationItems()">
            <a
              [routerLink]="item.route"
              routerLinkActive="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-r-2 border-green-500"
              class="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              [class.justify-center]="isCollapsed()"
              (click)="onNavigationClick(item)"
            >
              <ng-container [ngSwitch]="item.icon">
                <ng-icon name="heroHome" *ngSwitchCase="'home'" class="w-5 h-5 flex-shrink-0"></ng-icon>
                <ng-icon name="heroUsers" *ngSwitchCase="'users'" class="w-5 h-5 flex-shrink-0"></ng-icon>
              </ng-container>
              <span 
                *ngIf="!isCollapsed()" 
                class="ml-3 transition-opacity duration-300"
              >
                {{ item.label }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  isCollapsed = input<boolean>(false);
  navigationClick = output<NavigationItem>();


  navigationItems = computed<NavigationItem[]>(() => [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard',
      isActive: false
    },
    {
      id: 'teams',
      label: 'Equipos',
      icon: 'users',
      route: '/dashboard/teams',
      isActive: false
    }
  ]);

  onNavigationClick(item: NavigationItem): void {
    this.navigationClick.emit(item);
  }
}