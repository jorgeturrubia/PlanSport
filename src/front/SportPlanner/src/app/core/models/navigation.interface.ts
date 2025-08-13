import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UserRole } from './user.interface';

/**
 * Navigation menu item interface
 */
export interface IMenuItem {
  id: string;
  label: string;
  route: string;
  icon: IconDefinition;
  roles?: UserRole[]; // If not specified, available for all roles
  children?: IMenuItem[];
  badge?: number | string;
  isActive?: boolean;
}
