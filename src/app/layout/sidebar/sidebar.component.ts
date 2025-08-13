import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHome,
  faUsers,
  faCalendarAlt,
  faClipboardList,
  faStore,
  faChartLine,
  faCog,
  faTimes,
  faFutbol,
  faDumbbell,
  faStopwatch,
  faTrophy,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: any;
  route: string;
  children?: MenuItem[];
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: {
    class: 'block'
  }
})
export class SidebarComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  // Icons
  protected readonly faHome = faHome;
  protected readonly faUsers = faUsers;
  protected readonly faCalendarAlt = faCalendarAlt;
  protected readonly faClipboardList = faClipboardList;
  protected readonly faStore = faStore;
  protected readonly faChartLine = faChartLine;
  protected readonly faCog = faCog;
  protected readonly faTimes = faTimes;
  protected readonly faFutbol = faFutbol;
  protected readonly faDumbbell = faDumbbell;
  protected readonly faStopwatch = faStopwatch;
  protected readonly faTrophy = faTrophy;
  protected readonly faUserCircle = faUserCircle;
  
  // State
  protected readonly isOpen = signal(true);
  protected readonly isMobile = signal(false);
  
  // User info
  protected readonly user = this.authService.user;
  protected readonly userInitials = this.authService.userInitials;
  protected readonly userName = this.authService.userName;
  protected readonly userRole = this.authService.userRole;
  
  // Menu items
  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: faHome,
      route: '/dashboard'
    },
    {
      label: 'Equipos',
      icon: faUsers,
      route: '/teams'
    },
    {
      label: 'Planificaciones',
      icon: faCalendarAlt,
      route: '/planning'
    },
    {
      label: 'Entrenamientos',
      icon: faStopwatch,
      route: '/training'
    },
    {
      label: 'Objetivos',
      icon: faTrophy,
      route: '/objectives'
    },
    {
      label: 'Ejercicios',
      icon: faDumbbell,
      route: '/exercises'
    },
    {
      label: 'Marketplace',
      icon: faStore,
      route: '/marketplace'
    },
    {
      label: 'Reportes',
      icon: faChartLine,
      route: '/reports',
      roles: ['admin', 'director']
    }
  ];
  
  private resizeListener: (() => void) | null = null;
  private toggleListener: (() => void) | null = null;
  
  ngOnInit(): void {
    this.checkScreenSize();
    
    // Listen to window resize
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
    
    // Listen to toggle event from navbar
    this.toggleListener = this.onToggleEvent.bind(this);
    window.addEventListener('toggle-sidebar', this.toggleListener);
  }
  
  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.toggleListener) {
      window.removeEventListener('toggle-sidebar', this.toggleListener);
    }
  }
  
  private onResize(): void {
    this.checkScreenSize();
  }
  
  private onToggleEvent(): void {
    this.toggleSidebar();
  }
  
  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 1024;
    this.isMobile.set(isMobile);
    
    // Auto-close on mobile
    if (isMobile) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
    }
  }
  
  toggleSidebar(): void {
    this.isOpen.update(value => !value);
  }
  
  closeSidebarOnMobile(): void {
    if (this.isMobile()) {
      this.isOpen.set(false);
    }
  }
  
  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.roles) return true;
    
    const userRole = this.userRole();
    return userRole ? item.roles.includes(userRole) : false;
  }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidebarOnMobile();
  }
}
