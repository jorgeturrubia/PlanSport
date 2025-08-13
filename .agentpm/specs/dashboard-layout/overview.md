# Feature: Dashboard con Layout Principal

## Descripción
Implementación del dashboard principal de la aplicación con un layout completo que incluye navbar superior, sidebar lateral con navegación, y sistema de autenticación con logout funcional. El dashboard servirá como punto central de navegación para todas las funcionalidades de PlanSport.

## Objetivos de Negocio
- Proporcionar una experiencia de usuario intuitiva y profesional
- Facilitar la navegación entre las diferentes secciones de la aplicación
- Mostrar información relevante del usuario de forma clara
- Permitir un acceso rápido a las funcionalidades principales
- Implementar un sistema de logout seguro y funcional

## Entidades del Dominio
- **User**: Información del usuario autenticado (nombre, rol, email)
- **UserRole**: Roles del sistema (admin, director, entrenador)
- **Navigation**: Estructura de menús y rutas de la aplicación
- **Session**: Gestión de la sesión del usuario

## Componentes del Sistema

### Backend (.NET API)
- Endpoints:
  - GET /auth/profile (obtener información del usuario actual)
  - POST /auth/logout (cerrar sesión)
  - GET /auth/refresh (refrescar token)
- Servicios:
  - AuthService (gestión de autenticación)
  - UserService (información del usuario)
- Validaciones:
  - Token JWT válido
  - Usuario autenticado
  - Roles y permisos

### Frontend (Angular)
- Componentes:
  - DashboardLayoutComponent (contenedor principal)
  - NavbarComponent (barra superior)
  - SidebarComponent (menú lateral)
  - DashboardHomeComponent (página inicial del dashboard)
- Servicios:
  - AuthService (gestión de autenticación y usuario)
  - NavigationService (gestión de navegación)
- Rutas:
  - /dashboard (home del dashboard)
  - /teams (equipos)
  - /login (redirección tras logout)
- **Iconos Font Awesome**:
  - Navbar: faBars, faUser, faSignOutAlt, faCog, faChevronDown
  - Sidebar: faHome, faUsers, faCalendarAlt, faStopwatch, faTrophy, faDumbbell, faStore, faChartLine
  - Usuario: faUserCircle para avatar

## Dependencias
- Sistema de autenticación implementado
- Rutas protegidas configuradas
- Font Awesome instalado y configurado
- Tailwind CSS configurado

## Consideraciones de Seguridad
- Tokens JWT almacenados de forma segura en localStorage
- Limpieza completa de sesión al hacer logout
- Rutas protegidas con guards
- Validación de roles para mostrar/ocultar opciones del menú

## Consideraciones de Accesibilidad
- Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- Navegación completa por teclado
- Aria-labels en todos los elementos interactivos
- Focus states visibles
- Responsive design para móviles y tablets
- Screen reader compatible