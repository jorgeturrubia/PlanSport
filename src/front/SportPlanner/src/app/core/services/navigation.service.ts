import { Injectable, signal, computed } from '@angular/core';
import { 
  faHome, 
  faUsers, 
  faCalendarAlt, 
  faStopwatch, 
  faTrophy, 
  faDumbbell, 
  faStore, 
  faChartLine,
  faUser,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { IMenuItem } from '../models/navigation.interface';
import { UserRole } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  // Signals for reactive state
  private readonly isSidebarOpenSignal = signal<boolean>(true);
  private readonly isMobileSignal = signal<boolean>(false);
  private readonly activeRouteSignal = signal<string>('/dashboard');
  
  // Public readonly signals
  public readonly isSidebarOpen = this.isSidebarOpenSignal.asReadonly();
  public readonly isMobile = this.isMobileSignal.asReadonly();
  public readonly activeRoute = this.activeRouteSignal.asReadonly();
  
  // Menu items configuration
  private readonly menuItemsConfig: IMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Inicio',
      route: '/dashboard',
      icon: faHome
    },
    {
      id: 'teams',
      label: 'Equipos',
      route: '/teams',
      icon: faUsers
    },
    {
      id: 'planning',
      label: 'Planificaciones',
      route: '/planning',
      icon: faCalendarAlt
    },
    {
      id: 'training',
      label: 'Entrenamientos',
      route: '/training',
      icon: faStopwatch
    },
    {
      id: 'objectives',
      label: 'Objetivos',
      route: '/objectives',
      icon: faTrophy
    },
    {
      id: 'exercises',
      label: 'Ejercicios',
      route: '/exercises',
      icon: faDumbbell
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      route: '/marketplace',
      icon: faStore
    },
    {
      id: 'reports',
      label: 'Reportes',
      route: '/reports',
      icon: faChartLine,
      roles: [UserRole.Admin, UserRole.Director]
    }
  ];
  
  // Profile menu items
  public readonly profileMenuItems: IMenuItem[] = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      route: '/profile',
      icon: faUser
    },
    {
      id: 'settings',
      label: 'Configuración',
      route: '/settings',
      icon: faCog
    }
  ];
  
  // Computed menu items
  public readonly menuItems = computed(() => this.menuItemsConfig);
  
  constructor() {
    this.detectMobileBreakpoint();
    this.setupResizeListener();
  }
  
  /**
   * Toggle sidebar open/closed state
   */
  toggleSidebar(): void {
    this.isSidebarOpenSignal.update(isOpen => !isOpen);
  }
  
  /**
   * Set sidebar state
   */
  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpenSignal.set(isOpen);
  }
  
  /**
   * Close sidebar on mobile after navigation
   */
  closeSidebarOnMobile(): void {
    if (this.isMobile()) {
      this.isSidebarOpenSignal.set(false);
    }
  }
  
  /**
   * Set active route
   */
  setActiveRoute(route: string): void {
    this.activeRouteSignal.set(route);
    this.closeSidebarOnMobile();
  }
  
  /**
   * Check if menu item is visible based on user role
   */
  isMenuItemVisible(item: IMenuItem, userRole: UserRole | null): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true; // No role restriction
    }
    
    if (!userRole) {
      return false; // User has no role but item requires one
    }
    
    return item.roles.includes(userRole);
  }
  
  /**
   * Filter menu items by user role
   */
  getFilteredMenuItems(userRole: UserRole | null): IMenuItem[] {
    return this.menuItemsConfig.filter(item => 
      this.isMenuItemVisible(item, userRole)
    );
  }
  
  /**
   * Detect if current viewport is mobile
   */
  private detectMobileBreakpoint(): void {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    this.isMobileSignal.set(isMobile);
    
    // Auto-close sidebar on mobile
    if (isMobile) {
      this.isSidebarOpenSignal.set(false);
    }
  }
  
  /**
   * Setup resize listener for responsive behavior
   */
  private setupResizeListener(): void {
    let resizeTimer: any;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.detectMobileBreakpoint();
      }, 250);
    });
  }
}
