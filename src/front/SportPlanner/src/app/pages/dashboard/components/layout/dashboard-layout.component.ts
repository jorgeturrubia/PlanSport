import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutService } from '../../../../shared/services/layout.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="dashboard-layout" [class.sidebar-collapsed]="layoutService.isSidebarCollapsed()">
      <app-sidebar></app-sidebar>
      
      <div class="main-layout" [class.collapsed]="layoutService.isSidebarCollapsed()">
        <app-dashboard-header
          (sidebarToggled)="onSidebarToggle()">
        </app-dashboard-header>

        <main 
          class="main-content" 
          [class.with-padding]="contentPadding"
          [class.full-width]="fullWidth">
          
          <div *ngIf="pageTitle || pageSubtitle" class="page-header">
            <div class="page-header-content">
              <h1 *ngIf="pageTitle" class="page-title">{{ pageTitle }}</h1>
              <p *ngIf="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
            </div>
            
            <div *ngIf="headerTemplate" class="page-header-actions">
              <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
            </div>
          </div>

          <div class="content-area">
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
      margin-left: var(--sidebar-width, 280px); /* Expanded by default */
      transition: margin-left 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-layout.collapsed {
      margin-left: var(--sidebar-collapsed-width, 64px);
    }

    /* Other styles remain the same */
  `]
})
export class DashboardLayoutComponent {
  @ContentChild('headerActions') headerTemplate?: TemplateRef<any>;

  @Input() pageTitle?: string;
  @Input() pageSubtitle?: string;
  @Input() contentPadding: boolean = true;
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;

  constructor(
    protected layoutService: LayoutService
  ) {}

  onSidebarToggle(): void {
    this.layoutService.toggleSidebar();
  }
}
