import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3, heroXMark, heroMagnifyingGlass, heroBell, heroUser } from '@ng-icons/heroicons/outline';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgIconComponent,
    SidebarComponent,
    HeaderComponent
  ],
  providers: [
    provideIcons({ heroBars3, heroXMark, heroMagnifyingGlass, heroBell, heroUser })
  ],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <app-sidebar 
        [isCollapsed]="sidebarCollapsed()"
        [isMobile]="isMobile()"
        (toggleSidebar)="toggleSidebar()"
      ></app-sidebar>
      
      <!-- Main Content -->
      <div class="main-content">
        <!-- Header -->
        <app-header 
          [isMobile]="isMobile()"
          [sidebarCollapsed]="sidebarCollapsed()"
          (toggleSidebar)="toggleSidebar()"
        ></app-header>
        
        <!-- Content Area -->
        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </div>
      
      <!-- Mobile Overlay -->
      <div 
        *ngIf="isMobile() && !sidebarCollapsed()"
        class="mobile-overlay"
        (click)="toggleSidebar()"
      ></div>
    </div>
  `,
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  // Signals para el estado
  private sidebarCollapsedSignal = signal(false);
  private isMobileSignal = signal(false);
  
  // Computed properties
  sidebarCollapsed = computed(() => this.sidebarCollapsedSignal());
  isMobile = computed(() => this.isMobileSignal());
  
  private resizeListener?: () => void;

  ngOnInit() {
    this.checkMobileView();
    this.loadUserPreferences();
    
    // Listener para cambios de tamaño de ventana
    this.resizeListener = () => this.checkMobileView();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  toggleSidebar() {
    this.sidebarCollapsedSignal.update(collapsed => !collapsed);
    this.saveUserPreferences();
  }

  private checkMobileView() {
    this.isMobileSignal.set(window.innerWidth < 1024);
    
    // En móvil, colapsar sidebar por defecto
    if (this.isMobile()) {
      this.sidebarCollapsedSignal.set(true);
    }
  }

  private loadUserPreferences() {
    const savedState = localStorage.getItem('dashboard-sidebar-collapsed');
    if (savedState !== null && !this.isMobile()) {
      this.sidebarCollapsedSignal.set(JSON.parse(savedState));
    }
  }

  private saveUserPreferences() {
    localStorage.setItem('dashboard-sidebar-collapsed', JSON.stringify(this.sidebarCollapsed()));
  }
}