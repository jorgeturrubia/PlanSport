# Frontend Specification - Dashboard Layout

## Routing
```typescript
// app.routes.ts
{
  path: '',
  loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component'),
  canActivate: [authGuard],
  children: [
    { 
      path: 'dashboard', 
      loadComponent: () => import('./features/dashboard/dashboard-home.component') 
    },
    { 
      path: 'teams', 
      loadComponent: () => import('./features/teams/teams-list.component') 
    },
    { 
      path: 'planning', 
      loadComponent: () => import('./features/planning/planning-list.component') 
    },
    { 
      path: 'training', 
      loadComponent: () => import('./features/training/training-list.component') 
    },
    { 
      path: 'objectives', 
      loadComponent: () => import('./features/objectives/objectives-list.component') 
    },
    { 
      path: 'exercises', 
      loadComponent: () => import('./features/exercises/exercises-list.component') 
    },
    { 
      path: 'marketplace', 
      loadComponent: () => import('./features/marketplace/marketplace.component') 
    },
    { 
      path: 'reports', 
      loadComponent: () => import('./features/reports/reports.component'),
      canActivate: [roleGuard],
      data: { roles: ['admin', 'director'] }
    },
    { 
      path: 'profile', 
      loadComponent: () => import('./features/profile/profile.component') 
    },
    { 
      path: 'settings', 
      loadComponent: () => import('./features/settings/settings.component') 
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},
{
  path: 'login',
  loadComponent: () => import('./features/auth/login/login.component')
}
```

## Design System

### Color Palette con Contraste Validado
```scss
// Colores principales con ratios de contraste
$colors: (
  // Primarios
  'primary': #3B82F6,      // Contrast con blanco: 3.1:1 (usar texto grande)
  'primary-dark': #1E40AF, // Contrast con blanco: 7.8:1 ✓
  
  // Secundarios  
  'secondary': #10B981,     // Contrast con blanco: 2.5:1 (solo decorativo)
  'secondary-dark': #047857,// Contrast con blanco: 5.9:1 ✓
  
  // Estados
  'success': #059669,       // Contrast con blanco: 4.5:1 ✓
  'warning': #D97706,       // Contrast con blanco: 3.3:1 (texto grande)
  'danger': #DC2626,        // Contrast con blanco: 4.6:1 ✓
  
  // Neutros
  'text-primary': #111827,  // Contrast con blanco: 16.1:1 ✓
  'text-secondary': #6B7280,// Contrast con blanco: 5.2:1 ✓
  'background': #FFFFFF,
  'surface': #F9FAFB,
  'border': #E5E7EB
);
```

### Font Awesome Icons Specification
```typescript
// Navbar Icons
import {
  faBars,          // Menu hamburguesa
  faUser,          // Perfil
  faSignOutAlt,    // Logout
  faCog,           // Configuración
  faChevronDown,   // Dropdown arrow
  faUserCircle     // Avatar alternativo
} from '@fortawesome/free-solid-svg-icons';

// Sidebar Icons
import {
  faHome,          // Inicio
  faUsers,         // Equipos
  faCalendarAlt,   // Planificaciones
  faStopwatch,     // Entrenamientos
  faTrophy,        // Objetivos
  faDumbbell,      // Ejercicios
  faStore,         // Marketplace
  faChartLine,     // Reportes
  faTimes          // Cerrar sidebar (móvil)
} from '@fortawesome/free-solid-svg-icons';
```

## Components Structure

### 1. DashboardLayoutComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/layout/dashboard-layout/`
**Descripción:** Contenedor principal que incluye navbar, sidebar y router-outlet

**Template Structure:**
```html
<div class="min-h-screen bg-gray-50">
  <app-navbar></app-navbar>
  <div class="flex">
    <app-sidebar></app-sidebar>
    <main class="flex-1 p-4 lg:p-6">
      <router-outlet></router-outlet>
    </main>
  </div>
</div>
```

**Signals:**
- `isSidebarOpen = signal<boolean>(true)`
- `isMobile = signal<boolean>(false)`

### 2. NavbarComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/layout/navbar/`
**Descripción:** Barra de navegación superior con información del usuario

**Template Structure:**
- Logo a la izquierda
- Información del usuario a la derecha
- Dropdown con opciones de perfil
- Botón de menú en móviles

**Accessibility:**
```html
<!-- Botón accesible con icono -->
<button 
  class="bg-white hover:bg-gray-100" 
  [attr.aria-label]="'Abrir menú de usuario'"
  [attr.aria-expanded]="isDropdownOpen()"
  (click)="toggleDropdown()">
  <div class="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center">
    {{ userInitials() }}
  </div>
  <fa-icon [icon]="faChevronDown" [attr.aria-hidden]="true"></fa-icon>
</button>
```

**Signals:**
- `user = this.authService.user`
- `userName = this.authService.userName`
- `userInitials = this.authService.userInitials`
- `userRole = this.authService.userRole`
- `isDropdownOpen = signal<boolean>(false)`

**Methods:**
- `toggleDropdown()`
- `logout()`
- `navigateToProfile()`
- `navigateToSettings()`

### 3. SidebarComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/layout/sidebar/`
**Descripción:** Menú lateral con navegación principal

**Template Structure:**
```html
<aside 
  class="sidebar"
  [class.sidebar-open]="isOpen()"
  [class.sidebar-closed]="!isOpen()">
  
  <!-- User section -->
  <div class="p-4 border-b border-gray-200">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
        {{ userInitials() }}
      </div>
      @if (!isMobile()) {
        <div>
          <p class="font-semibold text-gray-900">{{ userName() }}</p>
          <p class="text-xs text-gray-500">{{ roleDisplay() }}</p>
        </div>
      }
    </div>
  </div>
  
  <!-- Navigation menu -->
  <nav class="p-4">
    @for (item of menuItems; track item.route) {
      @if (isMenuItemVisible(item)) {
        <a 
          [routerLink]="item.route"
          routerLinkActive="bg-blue-50 text-blue-600"
          class="sidebar-item">
          <fa-icon [icon]="item.icon"></fa-icon>
          <span>{{ item.label }}</span>
        </a>
      }
    }
  </nav>
</aside>
```

**Signals:**
- `isOpen = signal<boolean>(true)`
- `isMobile = signal<boolean>(false)`
- `menuItems = signal<MenuItem[]>(menuConfig)`

**Methods:**
- `toggleSidebar()`
- `isMenuItemVisible(item: MenuItem)`
- `closeSidebarOnMobile()`

### 4. AuthService
**Tipo:** Service
**Ubicación:** `src/app/core/services/`
**Descripción:** Gestión de autenticación y usuario

**Signals:**
```typescript
private readonly userSignal = signal<IUser | null>(null);
public readonly user = this.userSignal.asReadonly();
public readonly isAuthenticated = computed(() => this.user() !== null);
public readonly userName = computed(() => this.user()?.name || '');
public readonly userInitials = computed(() => {
  const user = this.user();
  if (!user) return '';
  const nameParts = user.name.split(' ');
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return user.name.substring(0, 2).toUpperCase();
});
public readonly userRole = computed(() => this.user()?.role || null);
```

**Methods:**
- `login(email: string, password: string): Observable<IAuthResponse>`
- `logout(): void`
- `refreshToken(): Observable<IAuthResponse>`
- `updateUser(updates: Partial<IUser>): void`
- `mockChangeRole(role: UserRole): void` // Solo desarrollo

## State Management
```typescript
// User State (en AuthService)
interface UserState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Navigation State (en NavigationService)
interface NavigationState {
  isSidebarOpen: boolean;
  isMobile: boolean;
  activeRoute: string;
}
```

## UI/UX Specifications

### Layout Structure
- Navbar fijo en la parte superior (sticky)
- Sidebar fijo a la izquierda (collapsible)
- Content area con scroll independiente
- Responsive breakpoints:
  - Mobile: < 640px (sidebar oculto por defecto)
  - Tablet: 640px - 1024px (sidebar toggle)
  - Desktop: > 1024px (sidebar visible)

### Contrast Requirements
```scss
// Navbar
.navbar {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  
  .user-name {
    color: #111827; // Ratio 16.1:1 ✓
  }
  
  .user-role {
    color: #6B7280; // Ratio 5.2:1 ✓
  }
  
  .avatar {
    background: #3B82F6;
    color: white; // Ratio 3.1:1 (texto grande) ✓
  }
}

// Sidebar
.sidebar-item {
  color: #374151; // Ratio 10.9:1 ✓
  
  &:hover {
    background: #F3F4F6;
  }
  
  &.active {
    background: #DBEAFE;
    color: #1E40AF; // Ratio 7.8:1 ✓
  }
}

// Logout button
.logout-button {
  color: #DC2626; // Ratio 4.6:1 ✓
  
  &:hover {
    background: #FEE2E2;
  }
}
```

### Animations
```scss
// Sidebar slide
.sidebar {
  transition: transform 0.3s ease-in-out;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

// Dropdown
.dropdown {
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

## Validations (Frontend)
- Usuario debe estar autenticado para acceder al dashboard
- Token JWT válido en localStorage
- Roles validados para rutas protegidas
- Sesión expirada redirige a login

## Error Handling
```typescript
// Auth Interceptor
if (error.status === 401) {
  this.authService.logout();
  this.router.navigate(['/login']);
  this.toastService.error('Sesión expirada');
}

// Logout errors
try {
  await this.authService.logout();
  this.toastService.success('Sesión cerrada exitosamente');
} catch (error) {
  // Logout local anyway
  this.clearLocalSession();
  this.router.navigate(['/login']);
}
```

## Accessibility Checklist
- [ ] Todos los colores cumplen WCAG AA (4.5:1 para texto normal)
- [ ] Iconos tienen aria-labels descriptivos
- [ ] Focus visible en todos los elementos interactivos
- [ ] Navegación completa por teclado
- [ ] Skip links disponibles
- [ ] Aria-expanded en dropdowns
- [ ] Aria-current en navegación activa
- [ ] Role="navigation" en sidebar
- [ ] Animaciones respetan prefers-reduced-motion