# Tasks - Landing Page

## 🎯 Objetivo
Desarrollar una landing page moderna, responsive y accesible que presente PlanSport a usuarios potenciales, mostrando características, marketplace y planes de suscripción, con navegación suave entre secciones y botones de autenticación.

## 📋 Pre-requisitos
- [x] Angular.tech.yaml configurado (incluye Font Awesome 6)
- [x] Dotnet.tech.yaml configurado
- [x] Autenticación funcionando (rutas /login y /register)
- [x] Base de datos conectada
- [x] **Font Awesome instalado y configurado**
- [x] **Paleta de colores con contraste validado**
- [x] Tailwind CSS configurado
- [x] Angular Router configurado

## 🔨 Tareas de Implementación

### Phase 1: Setup y Estructura (Prioridad: Alta)

#### Task 1.1: Crear estructura de carpetas
- [ ] Crear carpeta features/landing
- [ ] Crear subcarpetas para componentes
- [ ] Configurar archivos base

```bash
# Comandos para generar estructura
mkdir -p src/app/features/landing/components/{landing-header,hero-section,features-section,marketplace-section,subscriptions-section,footer}
mkdir -p src/app/features/landing/services
mkdir -p src/app/features/landing/models
```

#### Task 1.2: Generar componentes principales
- [ ] Generar LandingComponent
- [ ] Generar todos los componentes de sección
- [ ] Configurar como standalone components

```bash
# Generar componentes
ng generate component features/landing/landing --standalone
ng generate component features/landing/components/landing-header --standalone
ng generate component features/landing/components/hero-section --standalone
ng generate component features/landing/components/features-section --standalone
ng generate component features/landing/components/marketplace-section --standalone
ng generate component features/landing/components/subscriptions-section --standalone
ng generate component features/landing/components/footer --standalone
```

#### Task 1.3: Configurar routing
- [ ] Agregar ruta raíz para LandingComponent
- [ ] Configurar lazy loading
- [ ] Establecer como ruta por defecto

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    data: { preload: true }
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  // ... otras rutas
];
```

### Phase 2: Implementación de Componentes (Prioridad: Alta)

#### Task 2.1: Landing Header Component
- [ ] Implementar navegación sticky
- [ ] Agregar logo con icono faFutbol
- [ ] Crear menú de navegación desktop
- [ ] Implementar menú hamburguesa móvil
- [ ] Agregar botones de login/register
- [ ] **Configurar iconos: faBars, faTimes, faSignInAlt, faUserPlus**
- [ ] **Validar contraste de colores WCAG AA**

```typescript
// Importar iconos necesarios
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars, faTimes, faFutbol,
  faSignInAlt, faUserPlus 
} from '@fortawesome/free-solid-svg-icons';
```

#### Task 2.2: Hero Section Component
- [ ] Crear layout grid responsive
- [ ] Implementar título y subtítulo con gradiente
- [ ] Agregar iconos de deportes
- [ ] Crear botones CTA principales
- [ ] Implementar imagen/ilustración hero
- [ ] Agregar badges flotantes animados
- [ ] **Iconos: faFutbol, faBasketballBall, faSwimmer, faRunning, faVolleyballBall**
- [ ] **CTAs: faArrowRight, faPlayCircle, faCheck**

#### Task 2.3: Features Section Component
- [ ] Crear grid de 6 características
- [ ] Implementar cards con iconos
- [ ] Agregar animaciones de entrada
- [ ] Responsive: 3 cols desktop, 2 tablet, 1 móvil
- [ ] **Iconos: faRocket, faUsers, faChartLine, faCalendarAlt, faTasks, faClock**
- [ ] **Fondo con contraste adecuado**

#### Task 2.4: Marketplace Section Component
- [ ] Diseñar layout de 2 columnas
- [ ] Mostrar estadísticas del marketplace
- [ ] Crear cards de preview de planificaciones
- [ ] Implementar sistema de estrellas
- [ ] Agregar CTA "Explorar Marketplace"
- [ ] **Iconos: faStore, faStar, faDownload, faShare, faAward**
- [ ] **Ratings con estrellas amarillas visibles**

#### Task 2.5: Subscriptions Section Component
- [ ] Crear 3 cards de planes
- [ ] Destacar plan "Entrenador" como popular
- [ ] Implementar lista de características
- [ ] Diferenciar características incluidas/no incluidas
- [ ] Agregar CTAs específicos por plan
- [ ] **Iconos: faCrown, faGem, faCheck, faTimes**
- [ ] **Contraste en precios y CTAs**

#### Task 2.6: Footer Component
- [ ] Crear grid de 4 columnas
- [ ] Agregar información de empresa
- [ ] Implementar enlaces de navegación
- [ ] Agregar iconos de redes sociales
- [ ] Incluir información de contacto
- [ ] Copyright y enlaces legales
- [ ] **Iconos sociales: faFacebook, faTwitter, faInstagram, faLinkedin**
- [ ] **Contacto: faEnvelope, faPhone, faMapMarkerAlt**

### Phase 3: Servicios y Funcionalidad (Prioridad: Alta)

#### Task 3.1: Scroll Service
- [ ] Implementar scroll suave a secciones
- [ ] Crear IntersectionObserver para sección activa
- [ ] Manejar offset del header sticky
- [ ] Actualizar navegación según sección visible

```typescript
// scroll.service.ts
ng generate service features/landing/services/scroll
```

#### Task 3.2: Animaciones
- [ ] Configurar Angular Animations
- [ ] Crear animaciones de entrada (fadeIn, slideIn)
- [ ] Implementar animación de menú móvil
- [ ] Agregar efectos hover en cards
- [ ] Respetar prefers-reduced-motion

```typescript
// landing.animations.ts
import { trigger, transition, style, animate } from '@angular/animations';
```

#### Task 3.3: Navegación y Estado
- [ ] Implementar detección de sección activa
- [ ] Manejar estado del menú móvil
- [ ] Focus trap en menú móvil abierto
- [ ] Prevenir scroll cuando menú está abierto

### Phase 4: UI/UX y Estilos (Prioridad: Alta)

#### Task 4.1: Aplicar Tailwind CSS
- [ ] Configurar clases utility
- [ ] Implementar diseño responsive
- [ ] Aplicar espaciados consistentes
- [ ] Configurar breakpoints

#### Task 4.2: Validación de Contraste
- [ ] Verificar contraste de todos los textos (≥ 4.5:1)
- [ ] Validar botones y enlaces
- [ ] Comprobar estados hover/focus
- [ ] Asegurar legibilidad en todos los fondos
- [ ] **Usar herramienta: axe DevTools o similar**

#### Task 4.3: Iconografía
- [ ] Importar solo iconos necesarios
- [ ] Agregar aria-labels a todos los iconos
- [ ] Configurar tamaños apropiados
- [ ] Validar visibilidad y contraste

```typescript
// Optimización de imports
import { faHome, faUser /* solo los necesarios */ } from '@fortawesome/free-solid-svg-icons';
```

### Phase 5: Accesibilidad (Prioridad: Alta)

#### Task 5.1: Navegación por Teclado
- [ ] Implementar skip links
- [ ] Asegurar orden de tabulación lógico
- [ ] Focus visible en todos los elementos
- [ ] Navegación de menú con Arrow keys

#### Task 5.2: Screen Reader
- [ ] Agregar aria-labels descriptivos
- [ ] Implementar aria-expanded en menú
- [ ] Usar elementos semánticos HTML5
- [ ] Describir imágenes con alt text

#### Task 5.3: Responsive Design
- [ ] Test en móvil (320px+)
- [ ] Test en tablet (768px+)
- [ ] Test en desktop (1024px+)
- [ ] Verificar touch targets (min 44x44px)

### Phase 6: Testing (Prioridad: Media)

#### Task 6.1: Unit Tests
- [ ] Tests para ScrollService
- [ ] Tests para componentes individuales
- [ ] Tests de navegación
- [ ] Mock de FontAwesome

```bash
# Ejecutar tests
ng test --include='**/landing/**/*.spec.ts'
```

#### Task 6.2: E2E Tests
- [ ] Test de navegación entre secciones
- [ ] Test de menú móvil
- [ ] Test de redirección a login/register
- [ ] Test de scroll suave

```typescript
// landing.e2e.spec.ts con Playwright
test('should navigate to features section', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Características');
  await expect(page).toHaveURL('/#features');
});
```

#### Task 6.3: Accessibility Tests
- [ ] Ejecutar axe-core
- [ ] Validar con WAVE
- [ ] Test con NVDA/JAWS
- [ ] Verificar sin JavaScript

### Phase 7: Optimización y Performance (Prioridad: Media)

#### Task 7.1: Optimización de Assets
- [ ] Comprimir imágenes
- [ ] Implementar lazy loading de imágenes
- [ ] Optimizar fuentes
- [ ] Minificar CSS/JS

#### Task 7.2: Performance
- [ ] Lighthouse audit (target: >90)
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1

#### Task 7.3: SEO
- [ ] Meta tags apropiados
- [ ] Open Graph tags
- [ ] Structured data
- [ ] Sitemap

### Phase 8: Documentación (Prioridad: Baja)

#### Task 8.1: Documentar Componentes
- [ ] JSDoc en todos los componentes
- [ ] README con ejemplos de uso
- [ ] Guía de estilos

#### Task 8.2: Storybook (Opcional)
- [ ] Configurar Storybook
- [ ] Crear stories para cada componente
- [ ] Documentar variantes

## 📊 Estimación de Tiempo
- Setup y Estructura: 2-3 horas
- Componentes: 10-12 horas
- Servicios: 3-4 horas
- UI/UX: 4-5 horas
- Accesibilidad: 3-4 horas
- Testing: 4-5 horas
- Optimización: 2-3 horas
- **Total: 28-36 horas**

## ✅ Definition of Done
- [ ] Todos los componentes funcionando
- [ ] Navegación suave entre secciones
- [ ] Responsive en todos los dispositivos
- [ ] **Accesible (WCAG 2.1 AA)**
  - [ ] Contraste validado (≥ 4.5:1)
  - [ ] Navegable por teclado
  - [ ] Iconos con aria-labels
  - [ ] Focus states visibles
- [ ] Sin errores en consola
- [ ] Performance Lighthouse > 90
- [ ] Tests pasando (>80% coverage)
- [ ] Menú móvil funcional
- [ ] Enlaces a login/register funcionando
- [ ] Animaciones suaves
- [ ] **Iconos Font Awesome optimizados**

## 🎨 Design Tokens
```scss
// _landing-tokens.scss
// Colores validados para WCAG AA

$color-primary: #3B82F6;        // Para decoración
$color-primary-dark: #1E40AF;   // Ratio 7.8:1 sobre blanco ✓
$color-primary-light: #93C5FD;  // Para fondos

$color-text-primary: #111827;   // Ratio 16.1:1 ✓
$color-text-secondary: #6B7280; // Ratio 5.2:1 ✓

// Breakpoints
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;

// Espaciados
$spacing-unit: 0.25rem;
$container-padding: 1rem;

// Header height
$header-height: 64px;
$header-height-mobile: 56px;
```

## 🚀 Comandos de Ejecución
```bash
# Desarrollo
ng serve

# Build producción
ng build --configuration production

# Tests
ng test
ng e2e

# Linting
ng lint

# Análisis de bundle
ng build --stats-json
webpack-bundle-analyzer dist/sport-planner/stats.json

# Audit de accesibilidad
npx axe http://localhost:4200
```

## 📝 Notas
- **Contraste**: Validar con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Iconos**: Importar solo los necesarios para optimizar bundle
- **Accesibilidad**: Probar con axe DevTools y NVDA/JAWS
- **Performance**: Usar Chrome DevTools Lighthouse
- **Responsive**: Probar en dispositivos reales cuando sea posible
- **SEO**: La landing es la cara de la aplicación, optimizar para buscadores
- **Analytics**: Preparar para Google Analytics/Tag Manager en producción

## 🔄 Actualizaciones Futuras (Fase 2)
- [ ] Contenido dinámico desde API
- [ ] Formulario de contacto
- [ ] Newsletter subscription
- [ ] Chat widget
- [ ] A/B testing
- [ ] Multi-idioma (i18n)
- [ ] Blog section
- [ ] Testimonials carousel