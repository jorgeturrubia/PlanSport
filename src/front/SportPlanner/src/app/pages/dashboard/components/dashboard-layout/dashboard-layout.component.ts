import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AuthUser } from '../../../../features/auth/models/auth.interfaces';
import { ThemeService } from '../../services/theme.service';
import { TeamsService } from '../../services/teams.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { NavigationItem, SidebarState } from '../../interfaces/navigation.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    LucideAngularModule,
    DashboardHeaderComponent,
    SidebarComponent,
    ThemeToggleComponent,
    UserMenuComponent
  ],
  template: `
    <!-- Modern Dark Layout with Off-canvas Mobile Menu -->
    <div class="h-full">
      <!-- Off-canvas menu for mobile -->
      <div 
        *ngIf="!sidebarState().isCollapsed && isMobile" 
        class="relative z-50 xl:hidden" 
        role="dialog" 
        aria-modal="true"
      >
        <div 
          class="fixed inset-0 bg-gray-900/80" 
          aria-hidden="true"
          (click)="toggleSidebar()"
        ></div>
        <div class="fixed inset-0 flex">
          <div class="relative mr-16 flex w-full max-w-xs flex-1">
            <!-- Close button -->
            <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
              <button 
                type="button" 
                class="-m-2.5 p-2.5" 
                (click)="toggleSidebar()"
              >
                <span class="sr-only">Cerrar sidebar</span>
                <lucide-icon name="x" class="h-6 w-6 text-white"></lucide-icon>
              </button>
            </div>
            
            <!-- Mobile Sidebar -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
              <div class="flex h-16 shrink-0 items-center">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-white font-bold text-sm">PS</span>
                  </div>
                  <span class="text-lg font-semibold text-white">PlanSport</span>
                </div>
              </div>
              
              <!-- Mobile Navigation -->
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li *ngFor="let item of navigationItems">
                        <a
                          [routerLink]="item.route"
                          routerLinkActive="bg-gray-800 text-white"
                          #rla="routerLinkActive"
                          [class]="'group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-colors ' + 
                            (rla.isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800')"
                          (click)="onNavigationClick(item)"
                        >
                          <lucide-icon [name]="item.icon" class="h-6 w-6 shrink-0"></lucide-icon>
                          {{ item.label }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  
                  <!-- User Profile (mobile) -->
                  <li class="-mx-6 mt-auto">
                    <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer">
                      <div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                        <span class="text-white font-medium text-sm">
                          {{ (currentUser()?.firstName || 'U').charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <span aria-hidden="true">{{ currentUser()?.firstName || 'Usuario' }}</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900/95 backdrop-blur-sm px-6 ring-1 ring-white/5">
          <div class="flex h-16 shrink-0 items-center">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span class="text-white font-bold text-sm">PS</span>
              </div>
              <span class="text-lg font-semibold text-white">PlanSport</span>
            </div>
          </div>
          
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li *ngFor="let item of navigationItems">
                    <a
                      [routerLink]="item.route"
                      routerLinkActive="bg-gray-800 text-white border-r-2 border-green-500"
                      #rla="routerLinkActive"
                      [class]="'group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-all duration-200 ' + 
                        (rla.isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800')"
                      (click)="onNavigationClick(item)"
                    >
                      <lucide-icon [name]="item.icon" class="h-6 w-6 shrink-0"></lucide-icon>
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </li>
              
              <!-- Teams Section -->
              <li *ngIf="recentTeams().length > 0">
                <div class="text-xs font-semibold text-gray-400 mb-2">Equipos Recientes</div>
                <ul role="list" class="-mx-2 space-y-1">
                  <li *ngFor="let team of recentTeams().slice(0, 3)">
                    <a
                      [routerLink]="['/dashboard/teams', team.id]"
                      class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      <span 
                        class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-xs font-medium text-gray-400 group-hover:text-white"
                        [style.background-color]="team.color + '40'"
                        [style.border-color]="team.color + '80'"
                        [style.color]="team.color"
                      >
                        {{ team.name.charAt(0).toUpperCase() }}
                      </span>
                      <span class="truncate">{{ team.name }}</span>
                    </a>
                  </li>
                </ul>
              </li>
              
              <!-- User Profile (desktop) -->
              <li class="-mx-6 mt-auto">
                <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer transition-colors">
                  <div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <span class="text-white font-medium text-sm">
                      {{ (currentUser()?.firstName || 'U').charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm">{{ currentUser()?.firstName || 'Usuario' }}</span>
                    <span class="text-xs text-gray-400">{{ currentUser()?.email || '' }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Main content area -->
      <div class="xl:pl-72">
        <!-- Sticky header with search -->
        <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 shadow-sm sm:px-6 lg:px-8">
          <!-- Mobile menu button -->
          <button 
            type="button" 
            class="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 xl:hidden" 
            (click)="toggleSidebar()"
          >
            <span class="sr-only">Abrir sidebar</span>
            <lucide-icon name="menu" class="h-5 w-5"></lucide-icon>
          </button>

          <!-- Search bar -->
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div class="relative flex-1">
              <label for="search-field" class="sr-only">Buscar</label>
              <lucide-icon 
                name="search" 
                class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3"
              ></lucide-icon>
              <input 
                id="search-field" 
                type="search" 
                name="search" 
                class="block h-full w-full border-0 py-0 pl-10 pr-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-none" 
                placeholder="Buscar equipos, jugadores..." 
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchChange($event)"
              />
            </div>
          </div>

          <!-- Header actions -->
          <div class="flex items-center gap-x-4">
            <!-- Theme toggle -->
            <app-theme-toggle></app-theme-toggle>
            
            <!-- Notifications -->
            <button 
              type="button" 
              class="p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <span class="sr-only">Ver notificaciones</span>
              <lucide-icon name="bell" class="h-5 w-5"></lucide-icon>
            </button>
            
            <!-- User menu -->
            <app-user-menu></app-user-menu>
          </div>
        </div>

        <!-- Main content -->
        <main class="flex-1">
          <div class="px-4 py-6 sm:px-6 lg:px-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private teamsService = inject(TeamsService);

  // Sidebar state management
  sidebarState = signal<SidebarState>({
    isCollapsed: false,
    activeItem: null
  });

  // Mobile detection
  isMobile = signal<boolean>(false);
  
  // Search functionality
  searchQuery = signal<string>('');

  // Current user data
  currentUser = computed(() => this.authService.user());

  // Theme state
  currentTheme = computed(() => this.themeService.currentTheme());
  isDarkMode = computed(() => this.themeService.isDarkMode());
  
  // Teams data
  teams = computed(() => this.teamsService.teams());
  recentTeams = computed(() => 
    this.teams()
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3)
  );
  
  // Navigation items
  navigationItems: NavigationItem[] = [
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
  ];

  ngOnInit(): void {
    this.loadUserPreferences();
    this.checkMobileView();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.checkMobileView());
  }

  toggleSidebar(): void {
    this.sidebarState.update(state => ({
      ...state,
      isCollapsed: !state.isCollapsed
    }));
    
    this.saveUserPreferences();
  }

  onNavigationClick(item: NavigationItem): void {
    this.sidebarState.update(state => ({
      ...state,
      activeItem: item.id
    }));
  }

  private loadUserPreferences(): void {
    // Load user preferences from localStorage or user profile
    const savedSidebarState = localStorage.getItem('planSport-sidebar-collapsed');
    
    if (savedSidebarState !== null) {
      this.sidebarState.update(state => ({
        ...state,
        isCollapsed: JSON.parse(savedSidebarState)
      }));
    }
  }

  private saveUserPreferences(): void {
    // Save sidebar state to localStorage
    localStorage.setItem(
      'planSport-sidebar-collapsed', 
      JSON.stringify(this.sidebarState().isCollapsed)
    );
  }
  
  private checkMobileView(): void {
    this.isMobile.set(window.innerWidth < 1280); // xl breakpoint
  }
  
  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  }
}