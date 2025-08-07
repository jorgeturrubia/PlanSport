# Dashboard Refactoring Specification

**Project:** SportAgentoos  
**Date:** 2025-08-07  
**Type:** UI/UX Refactoring  
**Priority:** Medium  

## Overview

Refactorizar la interfaz de usuario del dashboard para mejorar la usabilidad, implementar una navegación lateral colapsible, reorganizar los controles de usuario y añadir funcionalidad de modo oscuro. Esta refactorización mejorará la experiencia del usuario y establecerá una base sólida para futuras funcionalidades.

## User Stories

### Historia Principal: Navegación Mejorada del Dashboard
**Como** coach o administrador de SportAgentoos  
**Quiero** tener una interfaz de dashboard más organizada con navegación lateral  
**Para que** pueda acceder rápidamente a las funciones principales y tener mejor control sobre mi sesión

**Flujo detallado:**
1. El usuario accede al dashboard y ve la nueva interfaz reorganizada
2. La información del usuario se encuentra en la esquina superior izquierda
3. Al hacer clic en el perfil de usuario, se despliega un menú con opciones
4. La barra lateral izquierda contiene la navegación principal
5. El usuario puede colapsar/expandir la barra lateral según necesite
6. El toggle de modo oscuro funciona inmediatamente sin recargar la página

### Historia Secundaria: Control de Tema
**Como** usuario de la aplicación  
**Quiero** poder alternar entre modo claro y oscuro  
**Para que** pueda usar la aplicación cómodamente en diferentes condiciones de iluminación

**Flujo detallado:**
1. El usuario ve el toggle de modo oscuro en la barra lateral
2. Al presionar el toggle, el tema cambia inmediatamente
3. La preferencia se guarda en localStorage
4. Al recargar la página, se mantiene el tema seleccionado

## Spec Scope

1. **Reorganización del Header** - Mover información de usuario a la izquierda, eliminar botón de logout directo
2. **Menú Desplegable de Usuario** - Implementar dropdown con Portal de Usuario y Logout
3. **Barra Lateral Colapsible** - Crear sidebar con navegación Dashboard, Equipos y Settings
4. **Toggle de Modo Oscuro Funcional** - Implementar cambio de tema dinámico con persistencia
5. **Responsive Design** - Asegurar que todos los componentes funcionen en móvil y desktop

## Out of Scope

- Funcionalidad real de las opciones "Equipos" y "Settings" (solo navegación preparatoria)
- Cambios en el contenido principal del dashboard
- Implementación de nuevas páginas o vistas
- Modificaciones al backend o API
- Autenticación adicional o cambios en login/logout

## Expected Deliverable

1. **Interface funcional** - Dashboard con nueva estructura visual y navegación operativa
2. **Modo oscuro implementado** - Toggle funcional que persiste la preferencia del usuario
3. **Componentes responsive** - Todos los elementos se adaptan correctamente a diferentes tamaños de pantalla

---

## Technical Requirements

### Framework & Dependencies
- **Angular 20.1.0** con standalone components
- **TailwindCSS 4.1.11** para styling usando el sistema de theming OKLCH
- **Angular Material Icons** para iconografía
- **TypeScript 5.8.2** con strict mode

### Components to Create/Modify
1. **HeaderComponent** - Refactorizar para nueva disposición
2. **UserProfileDropdownComponent** - Nuevo componente para menú de usuario
3. **SidebarComponent** - Nueva barra lateral con navegación
4. **ThemeToggleComponent** - Toggle para modo oscuro
5. **DashboardLayoutComponent** - Layout principal que integra todo

### State Management
- **ThemeService** - Servicio para manejo del tema (claro/oscuro)
- **LayoutService** - Servicio para estado de la barra lateral (expandida/colapsada)
- **LocalStorage** - Para persistir preferencias de usuario

### Styling Standards
- Usar variables CSS del sistema de theming OKLCH establecido
- Seguir convenciones de clases Tailwind definidas en los estándares
- Implementar transiciones suaves (0.3s ease) para cambios de estado
- Asegurar contraste adecuado en ambos modos (claro/oscuro)

---

## Design Specifications

### Header Layout
```
[UserProfile▼] [Spacer] [Page Title] [Spacer] [Other Controls]
```

### Sidebar Structure
```
┌─ Dashboard (🏠)
├─ Equipos (👥)
├─ ─────────────
├─ Settings (⚙️)
└─ [Theme Toggle 🌙/☀️]
```

### User Dropdown Menu
```
┌─────────────────┐
│ Portal de Usuario │
├─────────────────┤
│ Logout          │
└─────────────────┤
```

### Responsive Behavior
- **Desktop**: Sidebar visible, header completo
- **Tablet**: Sidebar colapsable, header adaptado
- **Mobile**: Sidebar overlay, header compacto

---

## Implementation Priority

### Phase 1: Core Structure
1. Crear componentes base (HeaderComponent, SidebarComponent)
2. Implementar layout principal con nueva estructura
3. Configurar servicios básicos (ThemeService, LayoutService)

### Phase 2: User Interface
1. Implementar UserProfileDropdownComponent
2. Agregar funcionalidad de colapso a la sidebar
3. Integrar iconografía y estilos Tailwind

### Phase 3: Theme Implementation
1. Crear ThemeToggleComponent funcional
2. Implementar cambio dinámico de tema
3. Configurar persistencia en localStorage

### Phase 4: Polish & Responsive
1. Refinar estilos y transiciones
2. Implementar comportamiento responsive
3. Testing en diferentes dispositivos y navegadores
