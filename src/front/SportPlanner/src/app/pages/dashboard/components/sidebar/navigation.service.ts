import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationConfig, NavigationItem, NavigationSection } from './navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationConfigSignal = signal<NavigationConfig>({
    sections: [
      {
        id: 'main',
        label: 'Principal',
        items: [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'home',
            route: '/dashboard',
            isActive: true
          },
          {
            id: 'equipos',
            label: 'Equipos',
            icon: 'users',
            route: '/dashboard/equipos',
            badge: {
              text: '3',
              color: 'primary'
            }
          },
          {
            id: 'entrenamientos',
            label: 'Entrenamientos',
            icon: 'activity',
            route: '/dashboard/entrenamientos'
          },
          {
            id: 'calendario',
            label: 'Calendario',
            icon: 'calendar',
            route: '/dashboard/calendario'
          }
        ]
      },
      {
        id: 'analytics',
        label: 'Análisis',
        items: [
          {
            id: 'estadisticas',
            label: 'Estadísticas',
            icon: 'bar-chart',
            route: '/dashboard/estadisticas'
          },
          {
            id: 'reportes',
            label: 'Reportes',
            icon: 'file-text',
            route: '/dashboard/reportes'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Configuración',
        items: [
          {
            id: 'perfil',
            label: 'Mi Perfil',
            icon: 'user',
            route: '/dashboard/perfil'
          },
          {
            id: 'configuracion',
            label: 'Configuración',
            icon: 'settings',
            route: '/dashboard/configuracion'
          }
        ]
      }
    ]
  });

  private currentRouteSignal = signal<string>('/dashboard');

  // Public readonly signals
  readonly navigationConfig = this.navigationConfigSignal.asReadonly();
  readonly currentRoute = this.currentRouteSignal.asReadonly();

  constructor(private router: Router) {
    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRouteSignal.set(event.url);
        this.updateActiveStates(event.url);
      });
    
    // Set initial route
    this.currentRouteSignal.set(this.router.url);
    this.updateActiveStates(this.router.url);
  }

  /**
   * Navigate to a specific route
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Toggle expanded state of navigation item with children
   */
  toggleItemExpanded(itemId: string): void {
    const config = this.navigationConfigSignal();
    const updatedConfig = this.updateItemInConfig(config, itemId, (item) => ({
      ...item,
      isExpanded: !item.isExpanded
    }));
    
    if (updatedConfig) {
      this.navigationConfigSignal.set(updatedConfig);
    }
  }

  /**
   * Toggle collapsed state of navigation section
   */
  toggleSectionCollapsed(sectionId: string): void {
    const config = this.navigationConfigSignal();
    const updatedSections = config.sections.map(section => {
      if (section.id === sectionId && section.isCollapsible) {
        return {
          ...section,
          isCollapsed: !section.isCollapsed
        };
      }
      return section;
    });

    this.navigationConfigSignal.set({
      ...config,
      sections: updatedSections
    });
  }

  /**
   * Update navigation config
   */
  updateNavigationConfig(config: NavigationConfig): void {
    this.navigationConfigSignal.set(config);
  }

  /**
   * Add badge to navigation item
   */
  setBadge(itemId: string, badge: NavigationItem['badge']): void {
    const config = this.navigationConfigSignal();
    const updatedConfig = this.updateItemInConfig(config, itemId, (item) => ({
      ...item,
      badge
    }));
    
    if (updatedConfig) {
      this.navigationConfigSignal.set(updatedConfig);
    }
  }

  /**
   * Remove badge from navigation item
   */
  removeBadge(itemId: string): void {
    const config = this.navigationConfigSignal();
    const updatedConfig = this.updateItemInConfig(config, itemId, (item) => ({
      ...item,
      badge: undefined
    }));
    
    if (updatedConfig) {
      this.navigationConfigSignal.set(updatedConfig);
    }
  }

  /**
   * Get navigation item by ID
   */
  getNavigationItem(itemId: string): NavigationItem | null {
    const config = this.navigationConfigSignal();
    return this.findItemInConfig(config, itemId);
  }

  /**
   * Check if route is active (exact or parent)
   */
  isRouteActive(route: string): boolean {
    const currentRoute = this.currentRouteSignal();
    return currentRoute === route || currentRoute.startsWith(route + '/');
  }

  /**
   * Update active states based on current route
   */
  private updateActiveStates(currentRoute: string): void {
    const config = this.navigationConfigSignal();
    const updatedConfig = this.updateActiveStatesInConfig(config, currentRoute);
    this.navigationConfigSignal.set(updatedConfig);
  }

  /**
   * Update active states in navigation config
   */
  private updateActiveStatesInConfig(config: NavigationConfig, currentRoute: string): NavigationConfig {
    const updatedSections = config.sections.map(section => ({
      ...section,
      items: section.items.map(item => this.updateItemActiveState(item, currentRoute))
    }));

    return {
      ...config,
      sections: updatedSections
    };
  }

  /**
   * Update active state for a navigation item and its children
   */
  private updateItemActiveState(item: NavigationItem, currentRoute: string): NavigationItem {
    const isActive = this.isRouteActive(item.route);
    
    return {
      ...item,
      isActive,
      children: item.children?.map(child => this.updateItemActiveState(child, currentRoute))
    };
  }

  /**
   * Find navigation item by ID in config
   */
  private findItemInConfig(config: NavigationConfig, itemId: string): NavigationItem | null {
    for (const section of config.sections) {
      const found = this.findItemInSection(section, itemId);
      if (found) return found;
    }
    return null;
  }

  /**
   * Find navigation item by ID in section
   */
  private findItemInSection(section: NavigationSection, itemId: string): NavigationItem | null {
    for (const item of section.items) {
      if (item.id === itemId) return item;
      if (item.children) {
        const found = this.findItemInChildren(item.children, itemId);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Find navigation item by ID in children array
   */
  private findItemInChildren(children: NavigationItem[], itemId: string): NavigationItem | null {
    for (const child of children) {
      if (child.id === itemId) return child;
      if (child.children) {
        const found = this.findItemInChildren(child.children, itemId);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Update specific item in navigation config
   */
  private updateItemInConfig(
    config: NavigationConfig, 
    itemId: string, 
    updater: (item: NavigationItem) => NavigationItem
  ): NavigationConfig | null {
    let found = false;
    
    const updatedSections = config.sections.map(section => ({
      ...section,
      items: section.items.map(item => {
        const result = this.updateItemRecursive(item, itemId, updater);
        if (result.updated) found = true;
        return result.item;
      })
    }));

    return found ? { ...config, sections: updatedSections } : null;
  }

  /**
   * Update item recursively
   */
  private updateItemRecursive(
    item: NavigationItem, 
    itemId: string, 
    updater: (item: NavigationItem) => NavigationItem
  ): { item: NavigationItem; updated: boolean } {
    if (item.id === itemId) {
      return { item: updater(item), updated: true };
    }

    if (item.children) {
      let updated = false;
      const updatedChildren = item.children.map(child => {
        const result = this.updateItemRecursive(child, itemId, updater);
        if (result.updated) updated = true;
        return result.item;
      });

      if (updated) {
        return { item: { ...item, children: updatedChildren }, updated: true };
      }
    }

    return { item, updated: false };
  }
}
