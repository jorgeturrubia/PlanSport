# Tasks del Módulo Dashboard Deportivo

## Resumen de Progreso
- Total tasks: 18
- Completadas: 0
- En progreso: 0
- Pendientes: 18

## Validaciones Obligatorias por Task

### ✅ Checklist de Consistencia Técnica (APLICAR A CADA TASK)
- [ ] **Interfaces Completas:** Verificar que todas las propiedades estén definidas
- [ ] **Naming Conventions:** Seguir convenciones establecidas (*.interfaces.ts, *.component.ts)
- [ ] **Null Safety:** Manejar explícitamente null/undefined con ? o !
- [ ] **Paradigma Consistente:** Usar solo Signals (Angular 20+), no Observables para estado
- [ ] **Mapeo Form-Interface:** Cada campo del formulario debe tener su propiedad en la interface
- [ ] **Imports Correctos:** Verificar rutas de importación antes de implementar
- [ ] **Componentes Referenciados:** Crear todos los componentes mencionados en rutas

## Tasks

### Setup y Configuración Base
- [ ] Crear interfaces base para el dashboard (User, Team, NavigationItem) (1h)
- [ ] Configurar rutas del dashboard en app.routes.ts (30min)
- [ ] Crear guard de autenticación para rutas del dashboard (45min)
- [ ] Configurar servicios base (AuthService, ThemeService, TeamsService) (1.5h)

### Header Dashboard
- [ ] Crear componente DashboardHeaderComponent standalone (1h)
- [ ] Implementar logo y navegación básica en header (45min)
- [ ] Integrar toggle de tema dark/light en header (1h)
- [ ] Crear menú de usuario con avatar de iniciales (1.5h)
- [ ] Implementar funcionalidad de logout en menú usuario (30min)

### Sidebar Navigation
- [ ] Crear componente SidebarComponent standalone y colapsible (2h)
- [ ] Implementar navegación: Inicio, Equipos, con iconos Lucide (1h)
- [ ] Añadir animaciones de colapso/expansión con TailwindCSS (1h)
- [ ] Integrar estado de sidebar con localStorage para persistencia (45min)

### Gestión de Equipos
- [ ] Crear página TeamsComponent para listar equipos (1.5h)
- [ ] Implementar TeamCardComponent con acciones (editar, eliminar) (2h)
- [ ] Crear modal TeamModalComponent para crear/editar equipos (2.5h)
- [ ] Implementar formulario reactivo para datos del equipo (1.5h)
- [ ] Añadir confirmación de eliminación de equipos (45min)

### Validación Final
- [ ] **Build Success:** ng build sin errores de compilación
- [ ] **Type Safety:** Todas las interfaces implementadas correctamente
- [ ] **Import Consistency:** Todas las rutas de importación funcionan
- [ ] **Component Creation:** Todos los componentes referenciados existen
- [ ] **Responsive Design:** Dashboard funcional en mobile y desktop
- [ ] **Theme Toggle:** Cambio de tema funciona correctamente
- [ ] **Navigation:** Todas las rutas del dashboard funcionan
- [ ] **CRUD Teams:** Crear, leer, actualizar y eliminar equipos funciona

### Notas Técnicas Importantes:
- Usar Angular 20+ con standalone components (NO NgModules)
- Implementar signals para estado local, NO Observables
- Usar control flow nativo (@if, @for) en lugar de *ngIf, *ngFor
- Aplicar ChangeDetectionStrategy.OnPush en todos los componentes
- Usar input() y output() functions en lugar de decoradores
- Implementar lazy loading para las rutas del dashboard
- Seguir convenciones de naming: *.interfaces.ts, *.service.ts, *.component.ts
- Usar TailwindCSS para todos los estilos
- Iconos con Lucide Angular
- Formularios reactivos con validaciones