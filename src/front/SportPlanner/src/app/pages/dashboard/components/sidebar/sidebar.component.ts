import { Component, computed, inject, NO_ERRORS_SCHEMA } from '@angular/core';
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
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);
  private navigationService = inject(NavigationService);
  
  // Computed signals for sidebar and navigation state
  isSidebarExpanded = computed(() => this.layoutService.isSidebarExpanded());
  navigationConfig = this.navigationService.navigationConfig;
  currentRoute = this.navigationService.currentRoute;

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  onNavigationItemClick(item: NavigationItem): void {
    if (item.children && item.children.length > 0) {
      // Toggle expansion for items with children
      this.navigationService.toggleItemExpanded(item.id);
    } else {
      // Navigate to route for items without children
      this.navigationService.navigateTo(item.route);
    }
  }

  onSectionToggle(section: NavigationSection): void {
    if (section.isCollapsible) {
      this.navigationService.toggleSectionCollapsed(section.id);
    }
  }

  isItemActive(item: NavigationItem): boolean {
    return item.isActive || false;
  }

  shouldShowChildren(item: NavigationItem): boolean {
    return !!(item.children && item.children.length > 0 && item.isExpanded);
  }

  shouldShowSection(section: NavigationSection): boolean {
    return !section.isCollapsed;
  }

  onThemeChanged(theme: Theme): void {
    // Theme change is handled by the ThemeToggleComponent
    // This method can be used for any additional logic if needed
    console.log('Theme changed to:', theme);
  }
}
