export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface SidebarState {
  isCollapsed: boolean;
  activeItem: string | null;
}