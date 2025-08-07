/**
 * Interface for navigation items in the sidebar
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
  badge?: {
    text: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  children?: NavigationItem[];
  isExpanded?: boolean;
  permissions?: string[];
}

/**
 * Navigation section grouping related items
 */
export interface NavigationSection {
  id: string;
  label: string;
  items: NavigationItem[];
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

/**
 * Complete navigation configuration
 */
export interface NavigationConfig {
  sections: NavigationSection[];
}
