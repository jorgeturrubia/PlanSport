# Tasks - Dashboard Layout

## 🎯 Objetivo
Implementar un dashboard completo con navbar, sidebar, sistema de autenticación funcional y navegación, proporcionando una experiencia de usuario profesional y accesible.

## 📋 Pre-requisitos
- [ ] Angular.tech.yaml configurado (incluye Font Awesome 6)
- [ ] Dotnet.tech.yaml configurado
- [ ] Base de datos PostgreSQL conectada
- [ ] **Font Awesome instalado y configurado**
- [ ] **Tailwind CSS configurado**
- [ ] **Angular Router configurado**

## 🔨 Tareas de Implementación

### Phase 1: Backend API (Prioridad: Alta)

#### Task 1.1: Database Setup
- [ ] Crear migración para tabla `users`
- [ ] Crear migración para tabla `user_sessions`
- [ ] Crear migración para tabla `user_preferences`
- [ ] Crear migración para tabla `navigation_menu`
- [ ] Crear migración para tabla `audit_log`
- [ ] Ejecutar migraciones
- [ ] Insertar datos seed del menú

```bash
# Comandos Entity Framework
dotnet ef migrations add CreateUserTables
dotnet ef database update
```

#### Task 1.2: Auth Controller
- [ ] Crear `AuthController.cs`
- [ ] Implementar endpoint `GET /auth/profile`
- [ ] Implementar endpoint `POST /auth/logout`
- [ ] Implementar endpoint `POST /auth/refresh`
- [ ] Agregar validación JWT
- [ ] Agregar manejo de errores

#### Task 1.3: User Service
- [ ] Crear `IUserService` interface
- [ ] Crear `UserService` implementation
- [ ] Implementar `GetUserById`
- [ ] Implementar `GetUserProfile`
- [ ] Implementar `UpdateLastLogin`

#### Task 1.4: Session Management
- [ ] Crear `ISessionService` interface
- [ ] Implementar gestión de tokens
- [ ] Implementar refresh token logic
- [ ] Implementar cleanup de sesiones expiradas
- [ ] Agregar logging de auditoría

#### Task 1.5: API Testing
- [ ] Test endpoint profile
- [ ] Test endpoint logout
- [ ] Test refresh token
- [ ] Test unauthorized access
- [ ] Test role-based access

### Phase 2: Frontend Angular (Prioridad: Alta)

#### Task 2.1: Core Module Setup
- [ ] Crear estructura de carpetas core
- [ ] Crear modelos e interfaces
- [ ] Configurar HttpClient
- [ ] **Importar módulo de Font Awesome**

```bash
# Comandos para generar estructura
ng generate interface core/models/user
ng generate enum core/models/user-role
ng generate service core/services/auth
ng generate service core/services/navigation
```

#### Task 2.2: Auth Service
- [ ] Crear `auth.service.ts`
- [ ] Implementar signals para estado del usuario
- [ ] Implementar computed para userName e initials
- [ ] Implementar método login (mock por ahora)
- [ ] Implementar método logout con limpieza
- [ ] Implementar refresh token
- [ ] **Mock de cambio de rol para testing**

```typescript
// Importar iconos necesarios
import { 
  faUser,
  faSignOutAlt,
  faCog,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
```

#### Task 2.3: Navbar Component
- [ ] Crear componente navbar standalone
- [ ] Implementar template con user info
- [ ] Agregar dropdown de perfil
- [ ] Implementar logout funcional
- [ ] **Agregar iconos Font Awesome**
- [ ] **Validar contraste de colores**
- [ ] **Agregar aria-labels**

#### Task 2.4: Sidebar Component
- [ ] Crear componente sidebar standalone
- [ ] Implementar menú de navegación
- [ ] Agregar RouterLink y RouterLinkActive
- [ ] Implementar toggle para móviles
- [ ] Filtrar items por rol
- [ ] **Agregar iconos específicos para cada sección**
- [ ] **Implementar navegación por teclado**

#### Task 2.5: Dashboard Layout Component
- [ ] Crear componente layout principal
- [ ] Integrar navbar y sidebar
- [ ] Agregar router-outlet
- [ ] Implementar responsive design
- [ ] Gestionar estado de sidebar
- [ ] **Aplicar tema y colores consistentes**

#### Task 2.6: Dashboard Home Component
- [ ] Crear componente home del dashboard
- [ ] Agregar contenido de bienvenida
- [ ] Mostrar información relevante
- [ ] Agregar widgets básicos
- [ ] **Usar cards con buen contraste**

#### Task 2.7: Auth Guard
- [ ] Crear `auth.guard.ts`
- [ ] Implementar verificación de autenticación
- [ ] Redirigir a login si no autenticado
- [ ] Implementar role guard
- [ ] Proteger rutas del dashboard

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
```

#### Task 2.8: Routing Configuration
- [ ] Configurar rutas principales
- [ ] Implementar lazy loading
- [ ] Agregar guards a rutas protegidas
- [ ] Configurar redirects
- [ ] Agregar rutas hijas en dashboard

#### Task 2.9: Responsive Design
- [ ] Implementar breakpoints de Tailwind
- [ ] Sidebar colapsable en móviles
- [ ] Navbar adaptativo
- [ ] Touch-friendly en móviles
- [ ] **Tamaños mínimos de touch targets**

#### Task 2.10: UI Polish
- [ ] Aplicar estilos Tailwind consistentes
- [ ] **Validar contraste de todos los elementos**
- [ ] **Configurar todos los iconos con aria-labels**
- [ ] Agregar animaciones suaves
- [ ] Implementar transiciones
- [ ] **Focus states visibles**
- [ ] Hover effects accesibles

### Phase 3: Accessibility & Quality Assurance (Prioridad: Alta)

#### Task 3.1: Accessibility Audit
- [ ] Ejecutar axe DevTools
- [ ] Verificar ratios de contraste >= 4.5:1
- [ ] Probar navegación solo con teclado
- [ ] Probar con screen reader (NVDA)
- [ ] Validar aria-labels en iconos
- [ ] Verificar skip links
- [ ] Validar focus order

#### Task 3.2: Icon Implementation Review
- [ ] Verificar que todos los iconos tienen aria-labels o aria-hidden
- [ ] Confirmar iconos semánticamente correctos
- [ ] Optimizar bundle importando solo iconos usados
- [ ] Documentar iconos para consistencia

```typescript
// Lista de iconos a importar
const NAVBAR_ICONS = [
  faBars,
  faUser,
  faSignOutAlt,
  faCog,
  faChevronDown
];

const SIDEBAR_ICONS = [
  faHome,
  faUsers,
  faCalendarAlt,
  faStopwatch,
  faTrophy,
  faDumbbell,
  faStore,
  faChartLine
];
```

#### Task 3.3: Color Contrast Validation
- [ ] Texto principal: ratio >= 4.5:1
- [ ] Texto grande (>18px): ratio >= 3:1
- [ ] Botones y enlaces: ratio >= 4.5:1
- [ ] Estados hover mantienen contraste
- [ ] Dropdown items legibles
- [ ] Avatar initials sobre fondo azul

### Phase 4: Testing (Prioridad: Alta)

#### Task 4.1: Unit Tests - Services
- [ ] Test AuthService login
- [ ] Test AuthService logout
- [ ] Test user signals y computed
- [ ] Test token management
- [ ] Test role validation

#### Task 4.2: Component Tests
- [ ] Test NavbarComponent dropdown
- [ ] Test SidebarComponent navigation
- [ ] Test logout functionality
- [ ] Test responsive behavior
- [ ] Test role-based menu filtering

#### Task 4.3: Integration Tests
- [ ] Test login flow completo
- [ ] Test logout y limpieza de sesión
- [ ] Test navegación protegida
- [ ] Test refresh token
- [ ] Test persistencia de sesión

#### Task 4.4: E2E Tests con Playwright
- [ ] Test login y acceso al dashboard
- [ ] Test navegación por menú
- [ ] Test dropdown de usuario
- [ ] Test logout completo
- [ ] Test responsive en diferentes viewports

### Phase 5: Documentation (Prioridad: Media)

#### Task 5.1: Component Documentation
- [ ] Documentar paleta de colores y ratios
- [ ] Lista de iconos Font Awesome usados
- [ ] Guías de accesibilidad
- [ ] Ejemplos de uso
- [ ] Documentar estructura de navegación

#### Task 5.2: API Documentation
- [ ] Documentar endpoints de auth
- [ ] Documentar DTOs
- [ ] Documentar códigos de error
- [ ] Ejemplos de requests/responses

## 📊 Estimación de Tiempo
- Backend API: 6-8 horas
- Frontend Components: 10-12 horas
- Accessibility: 2-3 horas
- Testing: 4-5 horas
- Documentation: 2 horas
- **Total: 24-30 horas**

## ✅ Definition of Done
- [ ] Todos los tests pasan
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Sin errores en consola
- [ ] Responsive en todos los dispositivos
- [ ] **Accesible (WCAG 2.1 AA)**
  - [ ] Contraste validado
  - [ ] Navegable por teclado
  - [ ] Iconos con aria-labels
  - [ ] Focus states visibles
- [ ] Performance < 2s carga inicial
- [ ] **Iconos Font Awesome optimizados**
- [ ] Logout funcional y seguro
- [ ] Sesión persistente tras refresh
- [ ] Navegación fluida entre secciones

## 🎨 Design Tokens
```scss
// Archivo: _dashboard-tokens.scss
// Colores validados para WCAG AA

$navbar-height: 64px;
$sidebar-width: 260px;
$sidebar-collapsed-width: 64px;

$color-navbar-bg: #FFFFFF;
$color-sidebar-bg: #FFFFFF;
$color-main-bg: #F9FAFB;

$color-avatar-bg: #3B82F6;     // Ratio 3.1:1 con blanco
$color-menu-active: #DBEAFE;
$color-menu-active-text: #1E40AF; // Ratio 7.8:1

$color-logout: #DC2626;        // Ratio 4.6:1
$color-logout-hover: #FEE2E2;

// Iconos del dashboard
$dashboard-icons: (
  'navbar': (
    'menu': 'faBars',
    'user': 'faUser',
    'settings': 'faCog',
    'logout': 'faSignOutAlt',
    'dropdown': 'faChevronDown'
  ),
  'sidebar': (
    'home': 'faHome',
    'teams': 'faUsers',
    'planning': 'faCalendarAlt',
    'training': 'faStopwatch',
    'objectives': 'faTrophy',
    'exercises': 'faDumbbell',
    'marketplace': 'faStore',
    'reports': 'faChartLine'
  )
);
```

## 🚀 Comandos de Ejecución
```bash
# Backend
cd backend
dotnet ef migrations add DashboardLayout
dotnet ef database update
dotnet run

# Frontend
cd frontend
npm install @fortawesome/fontawesome-free @fortawesome/angular-fontawesome
ng generate component layout/navbar --standalone
ng generate component layout/sidebar --standalone
ng generate component layout/dashboard-layout --standalone
ng generate service core/services/auth
ng serve

# Testing
ng test
ng e2e
npm run test:a11y
```

## 📝 Notas
- **Importante**: El logout debe limpiar completamente la sesión
- **Contraste**: Usar WebAIM Contrast Checker para validar
- **Iconos**: Importar solo los necesarios para optimizar bundle
- **Mobile First**: Diseñar primero para móviles
- **Accesibilidad**: Probar con axe DevTools y NVDA
- **Mock Data**: Usar datos mock para el usuario mientras no esté el backend