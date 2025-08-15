# Feature: Sistema de Temas Light/Dark con Tailwind v4

## Descripción
Implementación de un sistema completo de temas (light/dark) utilizando las nuevas características de Tailwind CSS v4, con soporte para preferencias de usuario persistentes y temas por defecto según el contexto de la aplicación.

## Objetivos de Negocio
- Mejorar la experiencia de usuario con soporte para modo oscuro
- Reducir fatiga visual en diferentes condiciones de iluminación
- Aumentar la accesibilidad y personalización de la aplicación
- Modernizar la interfaz con un sistema de diseño coherente
- Diferenciación visual entre áreas públicas (dark) y privadas (light)

## Entidades del Dominio
- **Theme**: Configuración de tema (light/dark/system)
- **UserPreference**: Preferencias de tema del usuario
- **ThemeContext**: Contexto de aplicación del tema (landing, auth, dashboard)
- **ColorPalette**: Paleta de colores basada en verde Supabase

## Componentes del Sistema

### Backend (.NET API)
- Endpoints: 
  - GET /api/user/preferences (obtener preferencias)
  - PUT /api/user/preferences/theme (actualizar tema)
- Servicios: UserPreferencesService
- Validaciones: Tema válido (light/dark/system)

### Frontend (Angular)
- Componentes: 
  - ThemeToggleComponent (botón toggle en navbar)
  - ThemeProviderComponent (wrapper para aplicar tema)
- Servicios: 
  - ThemeService (gestión del estado del tema)
  - ThemeInitializerService (inicialización según ruta)
- Rutas: Todas las rutas existentes con tema aplicado
- **Iconos Font Awesome**: 
  - faSun (modo light)
  - faMoon (modo dark)
  - faDesktop (seguir sistema)
  - faPalette (indicador de tema)

## Paleta de Colores

### Color Principal - Verde Supabase
```
--color-primary-50:  #ecfdf5   // Ratio 1.05:1 (decorativo)
--color-primary-100: #d1fae5   // Ratio 1.11:1 (decorativo)
--color-primary-200: #a7f3d0   // Ratio 1.29:1 (decorativo)
--color-primary-300: #6ee7b7   // Ratio 1.71:1 (decorativo)
--color-primary-400: #34d399   // Ratio 2.51:1 (decorativo)
--color-primary-500: #10b981   // Ratio 3.01:1 (texto grande)
--color-primary-600: #059669   // Ratio 4.54:1 ✓ (texto normal)
--color-primary-700: #047857   // Ratio 5.94:1 ✓
--color-primary-800: #065f46   // Ratio 7.56:1 ✓
--color-primary-900: #064e3b   // Ratio 9.12:1 ✓
--color-primary-950: #022c22   // Ratio 13.87:1 ✓
```

## Dependencias
- Tailwind CSS v4.x
- @fortawesome/angular-fontawesome para iconos
- localStorage para persistencia
- Angular Router para detección de rutas

## Consideraciones de Seguridad
- Preferencias almacenadas localmente (no sensible)
- Sin permisos especiales requeridos
- Validación de valores de tema en frontend

## Consideraciones de Accesibilidad
- Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- Respeta prefers-color-scheme si no hay preferencia guardada
- Transiciones respetan prefers-reduced-motion
- Focus visible en toggle de tema
- Aria-labels descriptivos en controles de tema
- Soporte completo para navegación por teclado
