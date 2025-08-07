# Technical Specification - Dashboard Refactoring

**Related Spec:** `.agent-os/specs/2025-08-07-dashboard-refactoring/spec.md`

## Technical Requirements

### Angular Architecture
- **Component Strategy:** Standalone Components (Angular 20.1.0+)
- **Change Detection:** OnPush strategy para optimización de rendimiento
- **Lazy Loading:** Componentes cargados dinámicamente cuando sea necesario
- **Signal-based State:** Usar Angular Signals para estado reactivo
- **Control Flow:** Usar nueva sintaxis `@if`, `@for`, `@switch`

### Services Architecture
```typescript
// Core services needed
ThemeService         - Manejo de tema claro/oscuro
LayoutService        - Estado de sidebar (expandida/colapsada)
UserPreferencesService - Persistencia en localStorage
```

### Component Structure
```
src/app/dashboard/
├── components/
│   ├── header/
│   │   ├── header.component.ts
│   │   └── user-profile-dropdown/
│   │       ├── user-profile-dropdown.component.ts
│   │       └── user-profile-dropdown.component.html
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── theme-toggle/
│   │       ├── theme-toggle.component.ts
│   │       └── theme-toggle.component.html
│   └── layout/
│       ├── dashboard-layout.component.ts
│       └── dashboard-layout.component.html
└── services/
    ├── theme.service.ts
    ├── layout.service.ts
    └── user-preferences.service.ts
```

### State Management Patterns
- **Reactive Forms:** Para cualquier control de usuario
- **Observables:** Para comunicación entre componentes
- **Signals:** Para estado local y derivado
- **LocalStorage:** Para persistencia de preferencias

### Styling Implementation
- **CSS Variables:** Usar sistema OKLCH para theming
- **Tailwind Classes:** Seguir orden establecido en estándares
- **Component Styles:** Usar @Component con ViewEncapsulation.None cuando sea necesario
- **Responsive Design:** Mobile-first con breakpoints estándar

## External Dependencies

### Angular Material
- **@angular/cdk/overlay** - Para dropdown funcional
- **@angular/material/icons** - Iconografía consistente

**Justification:** Angular CDK overlay proporciona posicionamiento robusto para dropdowns, y Material Icons mantiene consistencia visual con el resto de la aplicación.

### Additional Dev Dependencies
- **@angular/cdk/a11y** - Para accesibilidad en componentes interactivos

**Justification:** Asegurar que todos los nuevos componentes cumplan estándares de accesibilidad.

## Implementation Details

### Theme Service Implementation
```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSignal = signal<boolean>(false);
  
  readonly isDarkMode = this.darkModeSignal.asReadonly();
  
  constructor() {
    // Load saved preference
    const saved = localStorage.getItem('theme-preference');
    this.darkModeSignal.set(saved === 'dark');
    this.applyTheme();
  }
  
  toggleTheme(): void {
    this.darkModeSignal.update(dark => !dark);
    this.applyTheme();
    this.savePreference();
  }
  
  private applyTheme(): void {
    const isDark = this.darkModeSignal();
    document.documentElement.classList.toggle('dark', isDark);
  }
  
  private savePreference(): void {
    localStorage.setItem('theme-preference', 
      this.darkModeSignal() ? 'dark' : 'light');
  }
}
```

### Layout Service Implementation
```typescript
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarExpandedSignal = signal<boolean>(true);
  
  readonly isSidebarExpanded = this.sidebarExpandedSignal.asReadonly();
  
  toggleSidebar(): void {
    this.sidebarExpandedSignal.update(expanded => !expanded);
  }
  
  expandSidebar(): void {
    this.sidebarExpandedSignal.set(true);
  }
  
  collapseSidebar(): void {
    this.sidebarExpandedSignal.set(false);
  }
}
```

### Responsive Breakpoints
```typescript
// breakpoints.constant.ts
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px'
} as const;

// Usage in components for sidebar behavior
@Component({...})
export class SidebarComponent {
  @HostBinding('class.mobile-overlay')
  get isMobileOverlay(): boolean {
    return window.innerWidth < 768; // md breakpoint
  }
}
```

### Performance Optimizations
- **OnPush Change Detection:** Todos los componentes nuevos
- **trackBy Functions:** Para cualquier lista dinámica
- **Async Pipe:** Para subscripciones automáticas
- **Lazy Loading:** Componentes no críticos
- **CSS Containment:** Para aislamiento de estilos

### Testing Strategy
- **Unit Tests:** Todos los servicios y componentes
- **Component Tests:** Usando Angular Testing Library
- **E2E Tests:** Flujos críticos con Cypress
- **Accessibility Tests:** Automated a11y testing

## Performance Considerations

### Bundle Size
- Tree-shaking automático con standalone components
- Lazy loading de componentes no esenciales
- CSS purging en producción

### Runtime Performance
- OnPush change detection en todos los componentes
- Signals para estado reactivo sin subscripciones manuales
- CSS transitions optimizadas (transform/opacity)

### Memory Management
- Automatic subscription cleanup con async pipe
- Signal cleanup automático
- Event listener cleanup en OnDestroy

## Browser Support
- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features:** CSS Custom Properties, CSS Grid, Flexbox
- **JavaScript Features:** ES2020, Signals (Angular 20+)

## Accessibility Requirements
- **WCAG 2.1 AA Compliance:** Contraste, navegación por teclado
- **Screen Reader Support:** ARIA labels y live regions
- **Keyboard Navigation:** Tab order lógico, escape sequences
- **Focus Management:** Visible focus indicators, focus trapping en dropdown
