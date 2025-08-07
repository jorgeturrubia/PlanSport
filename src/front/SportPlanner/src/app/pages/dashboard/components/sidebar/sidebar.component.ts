import { IconComponent } from '../../../../shared/components/icon/icon.component';


import { Component, inject } from '@angular/core';


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../../shared/services/layout.service';
import { NavigationService } from './navigation.service';
import { NavigationItem, NavigationSection } from './navigation.interface';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { Theme } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);
  private navigationService = inject(NavigationService);
  
  isSidebarCollapsed = this.layoutService.isSidebarCollapsed;
  navigationConfig = this.navigationService.navigationConfig;

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  onNavigationItemClick(item: NavigationItem): void {
    if (item.children && item.children.length > 0) {
      this.navigationService.toggleItemExpanded(item.id);
    } else {
      this.navigationService.navigateTo(item.route);
    }
  }

  isItemActive(item: NavigationItem): boolean {
    return item.isActive || false;
  }

  shouldShowChildren(item: NavigationItem): boolean {
    return !!(item.children && item.children.length > 0 && item.isExpanded);
  }
}
