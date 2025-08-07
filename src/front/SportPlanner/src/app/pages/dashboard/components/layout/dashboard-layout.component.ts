import { Component, ContentChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutService } from '../../../../shared/services/layout.service';

/**
 * DashboardLayoutComponent
 * 
 * Componente de layout reutilizable para páginas del dashboard.
 * Proporciona una estructura consistente con sidebar, header y área de contenido.
 * 
 * @features
 * - Layout responsive con sidebar colapsable
 * - Header integrado con funcionalidades de usuario
 * - Área de contenido flexible via ng-content
 * - Gestión automática del estado del layout
 * - Soporte para contenido personalizado en header
 * 
 * @usage
 * ```html
 * <app-dashboard-layout 
 *   [pageTitle]="'Mi Página'"
 *   [showBreadcrumb]="true"
 *   (userMenuClicked)="handleUserMenu()"
 *   (sidebarToggled)="handleSidebar()">
 *   
 *   <!-- Contenido de la página -->
 *   <div class="mi-contenido">...</div>
 *   
 * </app-dashboard-layout>
 * ```
 */
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="dashboard-layout" [class.sidebar-expanded]="layoutService.isSidebarExpanded()">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>
      
      <!-- Main Layout -->
      <div class="main-layout" [class.expanded]="layoutService.isSidebarExpanded()">
        <!-- Header Component -->
        <app-dashboard-header
          (userMenuClicked)="onUserMenuClick()"
          (sidebarToggled)="onSidebarToggle()"
          (portalClicked)="onPortalClick()"
          (logoutClicked)="onLogoutClick()">
        </app-dashboard-header>

        <!-- Main Content Area -->
        <main 
          class="main-content" 
          [class.with-padding]="contentPadding"
          [class.full-width]="fullWidth"
          data-testid="dashboard-main-content">
          
          <!-- Page Header (optional) -->
          <div *ngIf="pageTitle || pageSubtitle" class="page-header" data-testid="page-header">
            <div class="page-header-content">
              <h1 *ngIf="pageTitle" class="page-title" data-testid="page-title">{{ pageTitle }}</h1>
              <p *ngIf="pageSubtitle" class="page-subtitle" data-testid="page-subtitle">{{ pageSubtitle }}</p>
            </div>
            
            <!-- Page header actions -->
            <div *ngIf="headerTemplate" class="page-header-actions">
              <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
            </div>
          </div>

          <!-- Content Area -->
          <div class="content-area" data-testid="content-area">
            <ng-content></ng-content>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      min-height: 100vh;
      background: var(--color-background);
      display: flex;
    }

    .main-layout {
      flex: 1;
      margin-left: var(--sidebar-collapsed-width, 64px);
      transition: margin-left 0.3s ease;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-layout.expanded {
      margin-left: var(--sidebar-width, 280px);
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }

    .main-content.with-padding {
      padding: 1.5rem;
    }

    .main-content.full-width {
      max-width: none;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border-primary);
    }

    .page-header-content {
      flex: 1;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
    }

    .page-subtitle {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .page-header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .main-layout {
        margin-left: 0;
      }
      
      .main-layout.expanded {
        margin-left: 0;
      }

      .main-content.with-padding {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .page-header-actions {
        width: 100%;
        justify-content: flex-end;
      }

      .page-title {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .main-content.with-padding {
        padding: 0.75rem;
      }

      .page-title {
        font-size: 1.25rem;
      }
    }

    /* Dark mode support */
    :host-context(.dark) .dashboard-layout {
      background: var(--color-background-dark);
    }

    :host-context(.dark) .page-header {
      border-bottom-color: var(--color-border-primary-dark);
    }

    :host-context(.dark) .page-title {
      color: var(--color-text-primary-dark);
    }

    :host-context(.dark) .page-subtitle {
      color: var(--color-text-secondary-dark);
    }

    /* Loading state */
    .dashboard-layout.loading {
      pointer-events: none;
    }

    .dashboard-layout.loading .main-content {
      opacity: 0.7;
    }

    /* Print styles */
    @media print {
      .dashboard-layout {
        min-height: auto;
      }

      .main-layout {
        margin-left: 0 !important;
      }

      app-sidebar,
      app-dashboard-header {
        display: none !important;
      }

      .main-content {
        padding: 0 !important;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  @ContentChild('headerActions') headerTemplate?: TemplateRef<any>;

  /**
   * Título de la página que se muestra en el header y en el área de contenido
   */
  @Input() pageTitle?: string;

  /**
   * Subtítulo opcional para la página
   */
  @Input() pageSubtitle?: string;

  /**
   * Controla si se muestra el breadcrumb en el header
   */
  @Input() showBreadcrumb: boolean = false;

  /**
   * Items del breadcrumb para navegación
   */
  @Input() breadcrumbItems: Array<{label: string, route?: string}> = [];

  /**
   * Controla si el contenido principal tiene padding por defecto
   */
  @Input() contentPadding: boolean = true;

  /**
   * Controla si el contenido ocupa todo el ancho disponible
   */
  @Input() fullWidth: boolean = false;

  /**
   * Estado de carga del layout
   */
  @Input() loading: boolean = false;

  /**
   * Evento emitido cuando se hace click en "Portal de Usuario"
   */
  @Output() portalClicked = new EventEmitter<void>();

  /**
   * Evento emitido cuando se hace click en "Logout"
   */
  @Output() logoutClicked = new EventEmitter<void>();

  /**
   * Evento emitido cuando se hace click en el menú de usuario
   */
  @Output() userMenuClicked = new EventEmitter<void>();

  /**
   * Evento emitido cuando se togglea el sidebar
   */
  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
    protected layoutService: LayoutService
  ) {}

  /**
   * Handle user menu click from header
   */
  onUserMenuClick(): void {
    console.log('User menu clicked from layout');
    this.userMenuClicked.emit();
  }

  /**
   * Handle sidebar toggle from header
   */
  onSidebarToggle(): void {
    this.layoutService.toggleSidebar();
    this.sidebarToggled.emit(this.layoutService.isSidebarExpanded());
  }

  /**
   * Handle portal click from user dropdown
   */
  onPortalClick(): void {
    console.log('Portal clicked from layout');
    this.portalClicked.emit();
  }

  /**
   * Handle logout click from user dropdown
   */
  onLogoutClick(): void {
    console.log('Logout requested from layout');
    this.logoutClicked.emit();
  }
}
