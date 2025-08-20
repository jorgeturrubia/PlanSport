import { Component, computed, input, output, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NavigationItem } from '../../interfaces/navigation.interface';
import { ThemeService } from '../../services/theme.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
      class="professional-sidebar bg-background border-r border-border h-full theme-transitioning"
      [class.sidebar-expanded]="!isCollapsed()"
      [class.sidebar-collapsed]="isCollapsed()"
      [class.theme-transitioning]="themeService.isTransitioning()"
    >
      <!-- Logo/Brand Section -->
      <div class="sidebar-header p-6 border-b border-border">
        <div class="flex items-center" [class.justify-center]="isCollapsed()">
          <!-- Logo -->
          <div class="logo-container relative">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <ng-icon name="heroTrophy" class="w-6 h-6 text-white"></ng-icon>
            </div>
            <!-- Notification Badge -->
            <div *ngIf="hasNotifications()" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <!-- Brand Text -->
          <div 
            *ngIf="!isCollapsed()" 
            class="ml-4 animate-fade-in"
          >
            <h1 class="text-xl font-bold text-text-primary">PlanSport</h1>
            <p class="text-xs text-text-secondary">Gestión Deportiva</p>
          </div>
        </div>
      </div>

      <!-- Navigation Section -->
      <nav class="sidebar-nav flex-1 p-4">
        <!-- Main Navigation -->
        <div class="mb-8">
          <h2 
            *ngIf="!isCollapsed()" 
            class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 animate-fade-in"
          >
            Principal
          </h2>
          <ul class="space-y-1">
            <li *ngFor="let item of navigationItems(); trackBy: trackByItemId">
              <a
                [routerLink]="item.route"
                routerLinkActive="nav-item-active"
                class="nav-item flex items-center px-3 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-all duration-200 group relative"
                [class.justify-center]="isCollapsed()"
                [class.nav-item-collapsed]="isCollapsed()"
                (click)="onNavigationClick(item)"
                [title]="isCollapsed() ? item.label : ''"
              >
                <!-- Icon -->
                <div class="nav-icon flex-shrink-0 relative">
                  <ng-container [ngSwitch]="item.icon">
                    <ng-icon name="heroHome" *ngSwitchCase="'home'" class="w-5 h-5"></ng-icon>
                    <ng-icon name="heroUsers" *ngSwitchCase="'users'" class="w-5 h-5"></ng-icon>
                    <ng-icon name="heroChartBar" *ngSwitchCase="'analytics'" class="w-5 h-5"></ng-icon>
                    <ng-icon name="heroCog6Tooth" *ngSwitchCase="'settings'" class="w-5 h-5"></ng-icon>
                  </ng-container>
                  <!-- Active Indicator -->
                  <div class="nav-indicator absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r opacity-0 transition-opacity duration-200"></div>
                </div>
                <!-- Label -->
                <span 
                  *ngIf="!isCollapsed()" 
                  class="nav-label ml-3 font-medium animate-fade-in"
                >
                  {{ item.label }}
                </span>
                <!-- Badge -->
                <span 
                  *ngIf="!isCollapsed() && item.badge" 
                  class="ml-auto px-2 py-1 text-xs bg-primary text-white rounded-full animate-fade-in"
                >
                  {{ item.badge }}
                </span>
                <!-- Tooltip for collapsed state -->
                <div 
                  *ngIf="isCollapsed()" 
                  class="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50"
                >
                  {{ item.label }}
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- Secondary Navigation -->
        <div *ngIf="secondaryNavigationItems().length > 0">
          <h2 
            *ngIf="!isCollapsed()" 
            class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3 animate-fade-in"
          >
            Herramientas
          </h2>
          <ul class="space-y-1">
            <li *ngFor="let item of secondaryNavigationItems(); trackBy: trackByItemId">
              <a
                [routerLink]="item.route"
                routerLinkActive="nav-item-active"
                class="nav-item flex items-center px-3 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-all duration-200 group relative"
                [class.justify-center]="isCollapsed()"
                [class.nav-item-collapsed]="isCollapsed()"
                (click)="onNavigationClick(item)"
                [title]="isCollapsed() ? item.label : ''"
              >
                <div class="nav-icon flex-shrink-0 relative">
                  <ng-container [ngSwitch]="item.icon">
                    <ng-icon name="heroChartBar" *ngSwitchCase="'analytics'" class="w-5 h-5"></ng-icon>
                    <ng-icon name="heroCog6Tooth" *ngSwitchCase="'settings'" class="w-5 h-5"></ng-icon>
                  </ng-container>
                  <div class="nav-indicator absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r opacity-0 transition-opacity duration-200"></div>
                </div>
                <span 
                  *ngIf="!isCollapsed()" 
                  class="nav-label ml-3 font-medium animate-fade-in"
                >
                  {{ item.label }}
                </span>
                <div 
                  *ngIf="isCollapsed()" 
                  class="nav-tooltip absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50"
                >
                  {{ item.label }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Footer Section -->
      <div class="sidebar-footer p-4 border-t border-border">
        <!-- User Status Indicator -->
        <div 
          *ngIf="!isCollapsed()" 
          class="flex items-center px-3 py-2 rounded-xl bg-background-secondary animate-fade-in"
        >
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="ml-2 text-sm text-text-secondary">Sistema activo</span>
        </div>
        <!-- Collapsed state indicator -->
        <div 
          *ngIf="isCollapsed()" 
          class="flex justify-center"
        >
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);
  readonly themeService = inject(ThemeService);

  // Inputs and Outputs
  isCollapsed = input<boolean>(false);
  isMobile = input<boolean>(false);
  currentUser = input<any>(null);
  recentTeams = input<any[]>([]);
  navigationClick = output<NavigationItem>();
  toggleSidebar = output<void>();

  // Signals
  private readonly currentRoute = signal<string>('');
  private readonly notifications = signal<boolean>(true);

  // Computed properties
  navigationItems = computed<NavigationItem[]>(() => [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard',
      isActive: this.currentRoute() === '/dashboard',
      badge: undefined
    },
    {
      id: 'teams',
      label: 'Equipos',
      icon: 'users',
      route: '/dashboard/teams',
      isActive: this.currentRoute().startsWith('/dashboard/teams'),
      badge: '3'
    }
  ]);

  secondaryNavigationItems = computed<NavigationItem[]>(() => [
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: 'analytics',
      route: '/dashboard/analytics',
      isActive: this.currentRoute().startsWith('/dashboard/analytics'),
      badge: undefined
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: 'settings',
      route: '/dashboard/settings',
      isActive: this.currentRoute().startsWith('/dashboard/settings'),
      badge: undefined
    }
  ]);

  ngOnInit(): void {
    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });

    // Set initial route
    this.currentRoute.set(this.router.url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hasNotifications(): boolean {
    return this.notifications();
  }

  onNavigationClick(item: NavigationItem): void {
    this.navigationClick.emit(item);
  }

  trackByItemId(index: number, item: NavigationItem): string {
    return item.id;
  }

  trackByTeam(index: number, team: any): string {
    return team.id;
  }
}