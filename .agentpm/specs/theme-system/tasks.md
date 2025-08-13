# Tasks - Sistema de Temas

## 🎯 Objetivo
Implementar un sistema completo de temas light/dark con Tailwind CSS v4, incluyendo toggle manual, persistencia de preferencias y temas por defecto según contexto de la aplicación.

## 📋 Pre-requisitos
- [ ] Tailwind CSS v4 instalado
- [ ] Angular 20.x configurado
- [ ] Font Awesome configurado
- [ ] Sistema de rutas funcionando
- [ ] **Documentación de Tailwind v4 revisada**
- [ ] **Herramientas de validación de contraste disponibles**

## 🔨 Tareas de Implementación

### Phase 1: Configuración Base de Tailwind v4 (Prioridad: Alta)

#### Task 1.1: Actualizar Tailwind a v4
- [ ] Actualizar package.json con Tailwind v4
- [ ] Verificar compatibilidad con Angular 20
- [ ] Actualizar postcss.config si es necesario
- [ ] Eliminar tailwind.config.js si ya no es necesario

```bash
# Comando para actualizar
npm install tailwindcss@next @tailwindcss/postcss@next
```

#### Task 1.2: Crear archivo de tema CSS
- [ ] Crear `src/styles/theme.css`
- [ ] Definir @custom-variant para dark mode
- [ ] Configurar @theme con paleta de colores
- [ ] Definir CSS variables para light/dark
- [ ] **Validar que el verde Supabase #6ee7b7 esté incluido**

```css
/* src/styles/theme.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

#### Task 1.3: Integrar tema en styles.css principal
- [ ] Importar theme.css en styles.css
- [ ] Verificar que los estilos se compilan correctamente
- [ ] Probar que las clases de Tailwind funcionan
- [ ] **Verificar transiciones suaves**

---

### Phase 2: Implementación del ThemeService (Prioridad: Alta)

#### Task 2.1: Crear ThemeService
- [ ] Crear servicio en `src/app/core/services/theme.service.ts`
- [ ] Implementar signals para estado reactivo
- [ ] Agregar lógica de persistencia con localStorage
- [ ] Implementar detección de prefers-color-scheme
- [ ] **Agregar lógica de temas por defecto según ruta**

```bash
# Generar servicio
ng generate service core/services/theme
```

#### Task 2.2: Configurar detección de rutas
- [ ] Inyectar Router en ThemeService
- [ ] Escuchar NavigationEnd events
- [ ] Aplicar tema dark para rutas: /, /auth/*, /login, /register
- [ ] Aplicar tema light para rutas: /dashboard/*, /teams/*, /planning/*
- [ ] **Solo aplicar defaults si no hay preferencia guardada**

#### Task 2.3: Implementar métodos del servicio
- [ ] `setTheme(theme: Theme, persist: boolean)`
- [ ] `toggleTheme()`
- [ ] `initializeTheme()`
- [ ] `applyTheme(theme: 'light' | 'dark')`
- [ ] **`getCssVariable(variable: string)`**

#### Task 2.4: Testing del ThemeService
- [ ] Escribir tests unitarios
- [ ] Probar persistencia en localStorage
- [ ] Probar aplicación de temas por ruta
- [ ] Probar toggle entre temas
- [ ] **Probar respeto a prefers-color-scheme**

---

### Phase 3: Crear ThemeToggleComponent (Prioridad: Alta)

#### Task 3.1: Generar componente standalone
- [ ] Crear componente en `src/app/shared/components/theme-toggle/`
- [ ] Configurar como standalone component
- [ ] Importar FontAwesomeModule
- [ ] **Importar iconos: faSun, faMoon, faDesktop**

```bash
# Generar componente
ng generate component shared/components/theme-toggle --standalone
```

#### Task 3.2: Implementar UI del toggle
- [ ] Diseñar switch estilo iOS/Material
- [ ] Agregar iconos de sol y luna
- [ ] Implementar animación de transición
- [ ] **Aplicar colores con contraste adecuado**
- [ ] **Agregar estados hover y focus visibles**

#### Task 3.3: Implementar lógica del toggle
- [ ] Inyectar ThemeService
- [ ] Conectar click con toggleTheme()
- [ ] Mostrar estado actual con computed signals
- [ ] **Implementar aria-labels dinámicos**
- [ ] **Agregar anuncio para screen readers**

#### Task 3.4: Accesibilidad del toggle
- [ ] Agregar role="switch"
- [ ] Implementar aria-pressed
- [ ] Soportar navegación por teclado (Space, Enter)
- [ ] **Focus trap correcto**
- [ ] **Aria-live para anunciar cambios**

---

### Phase 4: Integración con la Aplicación (Prioridad: Alta)

#### Task 4.1: Integrar en AppComponent
- [ ] Inyectar ThemeService en app.component.ts
- [ ] Inicializar tema al cargar la aplicación
- [ ] Verificar que no hay FOUC (flash of unstyled content)
- [ ] **Agregar script inline en index.html para prevenir FOUC**

```html
<!-- En index.html <head> -->
<script>
  // Prevenir FOUC
  (function() {
    const theme = localStorage.getItem('theme-preference');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

#### Task 4.2: Integrar toggle en Navbar
- [ ] Importar ThemeToggleComponent en navbar
- [ ] Mostrar solo para usuarios autenticados
- [ ] Posicionar correctamente en el layout
- [ ] **Verificar que es visible en ambos temas**
- [ ] **Probar en diferentes tamaños de pantalla**

#### Task 4.3: Actualizar componentes existentes
- [ ] Agregar clases dark: a componentes principales
- [ ] Actualizar cards para soportar ambos temas
- [ ] Actualizar formularios con colores de tema
- [ ] Actualizar tablas y listas
- [ ] **Validar contraste en todos los componentes**

#### Task 4.4: Actualizar Landing Page
- [ ] Aplicar tema dark por defecto
- [ ] Adaptar hero section
- [ ] Adaptar features section
- [ ] Adaptar footer
- [ ] **Verificar imágenes y gráficos en tema dark**

#### Task 4.5: Actualizar páginas de Auth
- [ ] Aplicar tema dark por defecto
- [ ] Adaptar formulario de login
- [ ] Adaptar formulario de registro
- [ ] Adaptar recuperación de contraseña
- [ ] **Validar contraste en campos de formulario**

---

### Phase 5: Validación y Testing (Prioridad: Alta)

#### Task 5.1: Validación de Contraste WCAG AA
- [ ] Usar WebAIM Contrast Checker
- [ ] Verificar texto normal (ratio >= 4.5:1)
- [ ] Verificar texto grande (ratio >= 3:1)
- [ ] Documentar ratios en frontend-spec.md
- [ ] **Ajustar colores que no cumplan**

#### Task 5.2: Testing de Accesibilidad
- [ ] Probar con axe DevTools
- [ ] Probar navegación solo con teclado
- [ ] Probar con screen reader (NVDA/JAWS)
- [ ] Verificar focus states en ambos temas
- [ ] **Validar aria-labels y roles**

#### Task 5.3: Testing Cross-browser
- [ ] Probar en Chrome
- [ ] Probar en Firefox
- [ ] Probar en Safari
- [ ] Probar en Edge
- [ ] **Verificar persistencia en todos los navegadores**

#### Task 5.4: Testing Responsive
- [ ] Probar en desktop (1920x1080)
- [ ] Probar en tablet (768x1024)
- [ ] Probar en móvil (375x667)
- [ ] Verificar que toggle es accesible en móvil
- [ ] **Verificar transiciones en dispositivos táctiles**

#### Task 5.5: Performance Testing
- [ ] Medir tiempo de cambio de tema (< 100ms)
- [ ] Verificar que no hay re-renders innecesarios
- [ ] Validar bundle size del tema
- [ ] **Verificar que no hay memory leaks**

---

### Phase 6: Documentación y Refinamiento (Prioridad: Media)

#### Task 6.1: Documentar Sistema de Temas
- [ ] Crear guía de uso en README
- [ ] Documentar paleta de colores
- [ ] Documentar clases utility para temas
- [ ] Crear ejemplos de componentes con tema
- [ ] **Documentar ratios de contraste**

#### Task 6.2: Crear Storybook Stories (Opcional)
- [ ] Story para ThemeToggleComponent
- [ ] Stories mostrando componentes en ambos temas
- [ ] Documentar variantes de colores
- [ ] **Mostrar estados de accesibilidad**

#### Task 6.3: Optimizaciones Finales
- [ ] Minimizar CSS no usado
- [ ] Optimizar transiciones
- [ ] Lazy load assets específicos de tema
- [ ] **Implementar modo sistema (futuro)**

---

## 📊 Estimación de Tiempo
- Phase 1 (Configuración): 2-3 horas
- Phase 2 (ThemeService): 3-4 horas
- Phase 3 (ThemeToggle): 2-3 horas
- Phase 4 (Integración): 4-5 horas
- Phase 5 (Validación): 3-4 horas
- Phase 6 (Documentación): 2-3 horas
- **Total: 16-22 horas**

## ✅ Definition of Done
- [ ] Sistema de temas funcionando en toda la aplicación
- [ ] Toggle accesible y funcional
- [ ] Preferencias persistentes
- [ ] Temas por defecto según contexto
- [ ] Sin errores en consola
- [ ] Tests unitarios pasando
- [ ] **Contraste WCAG AA validado**
  - [ ] Texto normal >= 4.5:1
  - [ ] Texto grande >= 3:1
  - [ ] Estados interactivos visibles
- [ ] **Accesibilidad completa**
  - [ ] Navegable por teclado
  - [ ] Compatible con screen readers
  - [ ] Aria-labels correctos
  - [ ] Focus states visibles
- [ ] Performance < 100ms para cambio de tema
- [ ] Documentación completa
- [ ] **Sin FOUC en ninguna página**

## 🎨 Design Tokens Finales
```scss
// Archivo: _theme-tokens.scss
// Colores principales con contraste validado

// Verde Supabase
$color-primary: #10b981;     // Light: 3.01:1, Dark: 8.84:1
$color-primary-600: #059669;  // Light: 4.54:1 ✓
$color-primary-300: #6ee7b7;  // Decorativo

// Estados
$color-success: #059669;      // 4.54:1 ✓
$color-warning: #f59e0b;      // 3.0:1 (texto grande)
$color-danger: #dc2626;       // 4.53:1 ✓
$color-info: #3b82f6;         // 3.14:1 (texto grande)

// Iconos del sistema
$icon-theme-light: 'faSun';
$icon-theme-dark: 'faMoon';
$icon-theme-system: 'faDesktop';
```

## 🚀 Comandos de Ejecución
```bash
# Instalar dependencias
npm install tailwindcss@next @tailwindcss/postcss@next

# Generar servicios y componentes
ng generate service core/services/theme
ng generate component shared/components/theme-toggle --standalone

# Ejecutar tests
ng test theme.service
ng test theme-toggle.component

# Validar accesibilidad
npx axe-cli http://localhost:4200 --tags wcag2aa

# Build de producción
ng build --configuration production
```

## 📝 Notas Importantes
- **FOUC Prevention**: El script inline en index.html es crítico
- **Contraste**: Usar herramientas online para validar cada cambio
- **Persistencia**: localStorage es suficiente para esta feature
- **Performance**: Las transiciones CSS son más eficientes que animaciones JS
- **Accesibilidad**: Probar con usuarios reales si es posible
- **Tailwind v4**: La sintaxis @theme es nueva, consultar docs si hay dudas
