# Technical Specification

This is the technical specification for the spec detailed in .agent-os/specs/2025-08-20-dashboard-professional-redesign/spec.md

## Technical Requirements

### Theme System Implementation
- **Dark/Light Mode Service**: Crear un servicio Angular con Signals para gestionar el estado del tema
- **CSS Variables**: Utilizar custom properties de CSS para colores que cambien dinámicamente
- **Tailwind Dark Mode**: Configurar Tailwind CSS con estrategia 'class' para modo oscuro
- **LocalStorage Persistence**: Persistir preferencia de tema en localStorage con fallback a preferencia del sistema
- **Theme Toggle Component**: Componente reutilizable con animación suave entre estados

### Sidebar Architecture
- **Expandible State Management**: Signal-based state para controlar expansión/contracción
- **Responsive Breakpoints**: Comportamiento diferente en mobile (overlay) vs desktop (push content)
- **Animation System**: Transiciones CSS suaves para width, opacity y transform
- **Navigation Structure**: Jerarquía clara con secciones, items y sub-items
- **Icon Integration**: Lucide Angular icons con labels condicionales según estado

### Professional Design System
- **Color Palette**: Definir paleta profesional con variantes para light/dark mode
- **Typography Scale**: Implementar escala tipográfica consistente con Tailwind
- **Spacing System**: Utilizar sistema de espaciado de Tailwind (4, 8, 12, 16, 24, 32px)
- **Shadow System**: Sombras sutiles para depth y jerarquía visual
- **Border Radius**: Consistencia en border-radius (4px, 8px, 12px)

### Component Updates
- **Header Component**: Integrar theme toggle y mejorar layout
- **Sidebar Component**: Refactorizar completamente con nuevo diseño
- **Main Content Area**: Ajustar padding y layout para sidebar variable
- **Card Components**: Actualizar con nuevo design system
- **Button Components**: Aplicar nuevos estilos profesionales

### Responsive Design
- **Mobile First**: Diseño mobile-first con progressive enhancement
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar Behavior**: Overlay en mobile, push content en desktop
- **Touch Interactions**: Gestures para mobile (swipe para abrir/cerrar sidebar)

### Performance Considerations
- **CSS-in-JS Avoidance**: Usar solo Tailwind classes para mejor performance
- **Animation Performance**: Utilizar transform y opacity para animaciones GPU-accelerated
- **Bundle Size**: Minimizar JavaScript adicional, aprovechar Tailwind purging
- **Theme Switching**: Evitar FOUC (Flash of Unstyled Content) durante cambio de tema

### Accessibility Requirements
- **ARIA Labels**: Labels apropiados para theme toggle y sidebar controls
- **Keyboard Navigation**: Soporte completo para navegación por teclado
- **Focus Management**: Focus trapping en sidebar cuando está abierta en mobile
- **Color Contrast**: Cumplir WCAG 2.1 AA en ambos modos (light/dark)
- **Reduced Motion**: Respetar prefers-reduced-motion para animaciones

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Custom Properties**: Soporte nativo requerido
- **CSS Grid/Flexbox**: Utilizar para layouts complejos
- **LocalStorage**: Fallback graceful si no está disponible