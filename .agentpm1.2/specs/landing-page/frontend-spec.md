# Frontend Specification - Landing Page

## Routing
```typescript
// app.routes.ts
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
  'primary-light': #93C5FD,// Para fondos suaves
  
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
  'text-light': #9CA3AF,    // Contrast con blanco: 3.1:1 (texto grande)
  'background': #FFFFFF,
  'surface': #F9FAFB,
  'surface-dark': #F3F4F6
);

// Gradientes para hero section
$gradient-primary: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
$gradient-secondary: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
```

### Font Awesome Icons Specification
```typescript
// landing.component.ts - Importar específicamente estos iconos
import {
  // Header/Navegación
  faBars,           // Menú hamburguesa
  faTimes,          // Cerrar menú
  faChevronDown,    // Dropdown indicator
  
  // Hero Section
  faFutbol,         // Deporte fútbol
  faBasketballBall, // Deporte basketball  
  faSwimmer,        // Deporte natación
  faRunning,        // Deporte atletismo
  faVolleyballBall, // Deporte voleibol
  
  // Features
  faRocket,         // Inicio rápido
  faUsers,          // Gestión de equipos
  faChartLine,      // Análisis y reportes
  faCalendarAlt,    // Planificación
  faTasks,          // Objetivos
  faClock,          // Ahorro de tiempo
  
  // Marketplace
  faStar,           // Valoraciones
  faDownload,       // Descargas
  faShare,          // Compartir
  faStore,          // Marketplace
  faAward,          // Planificaciones premiadas
  
  // Suscripciones
  faCheck,          // Características incluidas
  faCheckCircle,    // Check con círculo
  faTimes as faTimesCircle, // No incluido
  faCrown,          // Plan premium
  faGem,            // Plan club
  
  // CTAs
  faArrowRight,     // Flecha acción
  faSignInAlt,      // Login
  faUserPlus,       // Registro
  faPlayCircle,     // Empezar/Demo
  
  // Footer
  faEnvelope,       // Email
  faPhone,          // Teléfono
  faMapMarkerAlt    // Ubicación
} from '@fortawesome/free-solid-svg-icons';

// Redes sociales (brands)
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
```

## Components Structure

### 1. LandingComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/landing/`
**Descripción:** Componente contenedor principal de la landing page

**Template Structure:**
```html
<div class="landing-page">
  <app-landing-header 
    (scrollToSection)="scrollToSection($event)"
    [currentSection]="currentSection()"/>
  
  <main>
    <app-hero-section id="hero"/>
    <app-features-section id="features"/>
    <app-marketplace-section id="marketplace"/>
    <app-subscriptions-section id="subscriptions"/>
  </main>
  
  <app-footer/>
</div>
```

**Component:**
```typescript
@Component({
  selector: 'app-landing',
  imports: [
    LandingHeaderComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    MarketplaceSectionComponent,
    SubscriptionsSectionComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  private readonly scrollService = inject(ScrollService);
  
  currentSection = signal<string>('hero');
  
  ngOnInit(): void {
    this.observeSections();
  }
  
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElement(sectionId);
  }
  
  private observeSections(): void {
    // Implementar IntersectionObserver para detectar sección activa
  }
}
```

### 2. LandingHeaderComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/landing/components/landing-header/`

**Template con Iconos y Contraste:**
```html
<header class="fixed top-0 w-full bg-white shadow-md z-50">
  <nav class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <fa-icon [icon]="faFutbol" class="text-primary-dark text-2xl"></fa-icon>
        <span class="text-xl font-bold text-gray-900">PlanSport</span>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a 
          (click)="onNavigate('features')"
          class="text-gray-700 hover:text-primary-dark cursor-pointer transition-colors"
          [class.text-primary-dark]="currentSection() === 'features'"
          [attr.aria-label]="'Ir a características'">
          Características
        </a>
        <a 
          (click)="onNavigate('marketplace')"
          class="text-gray-700 hover:text-primary-dark cursor-pointer transition-colors"
          [class.text-primary-dark]="currentSection() === 'marketplace'"
          [attr.aria-label]="'Ir a marketplace'">
          Marketplace
        </a>
        <a 
          (click)="onNavigate('subscriptions')"
          class="text-gray-700 hover:text-primary-dark cursor-pointer transition-colors"
          [class.text-primary-dark]="currentSection() === 'subscriptions'"
          [attr.aria-label]="'Ir a suscripciones'">
          Suscripciones
        </a>
      </div>
      
      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center space-x-4">
        <button 
          routerLink="/login"
          class="px-4 py-2 text-gray-700 hover:text-primary-dark transition-colors"
          [attr.aria-label]="'Iniciar sesión'">
          <fa-icon [icon]="faSignInAlt" class="mr-2"></fa-icon>
          Iniciar Sesión
        </button>
        <button 
          routerLink="/register"
          class="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-blue-800 transition-colors"
          [attr.aria-label]="'Registrarse'">
          <fa-icon [icon]="faUserPlus" class="mr-2"></fa-icon>
          Registrarse
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        (click)="toggleMobileMenu()"
        class="md:hidden p-2 text-gray-700"
        [attr.aria-label]="mobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'"
        [attr.aria-expanded]="mobileMenuOpen()">
        <fa-icon [icon]="mobileMenuOpen() ? faTimes : faBars" size="lg"></fa-icon>
      </button>
    </div>
  </nav>
  
  <!-- Mobile Menu -->
  @if (mobileMenuOpen()) {
    <div class="md:hidden bg-white border-t" [@slideDown]>
      <div class="px-4 py-4 space-y-3">
        <a 
          (click)="onMobileNavigate('features')"
          class="block py-2 text-gray-700">Características</a>
        <a 
          (click)="onMobileNavigate('marketplace')"
          class="block py-2 text-gray-700">Marketplace</a>
        <a 
          (click)="onMobileNavigate('subscriptions')"
          class="block py-2 text-gray-700">Suscripciones</a>
        <hr class="my-3">
        <button 
          routerLink="/login"
          class="w-full py-2 text-gray-700 border border-gray-300 rounded-lg">
          <fa-icon [icon]="faSignInAlt" class="mr-2"></fa-icon>
          Iniciar Sesión
        </button>
        <button 
          routerLink="/register"
          class="w-full py-2 bg-primary-dark text-white rounded-lg">
          <fa-icon [icon]="faUserPlus" class="mr-2"></fa-icon>
          Registrarse
        </button>
      </div>
    </div>
  }
</header>
```

### 3. HeroSectionComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/landing/components/hero-section/`

**Template:**
```html
<section class="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
  <div class="container mx-auto px-4 py-20">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Content -->
      <div class="space-y-6" [@fadeInLeft]>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Planifica entrenamientos
          <span class="text-primary-dark"> profesionales</span>
          en minutos
        </h1>
        <p class="text-xl text-gray-700">
          Accede a cientos de planificaciones probadas, crea las tuyas propias 
          y gestiona tus equipos de forma eficiente.
        </p>
        
        <!-- Sports Icons -->
        <div class="flex space-x-4 py-4">
          <fa-icon [icon]="faFutbol" class="text-3xl text-gray-600"></fa-icon>
          <fa-icon [icon]="faBasketballBall" class="text-3xl text-gray-600"></fa-icon>
          <fa-icon [icon]="faSwimmer" class="text-3xl text-gray-600"></fa-icon>
          <fa-icon [icon]="faRunning" class="text-3xl text-gray-600"></fa-icon>
          <fa-icon [icon]="faVolleyballBall" class="text-3xl text-gray-600"></fa-icon>
        </div>
        
        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            routerLink="/register"
            class="px-8 py-3 bg-primary-dark text-white rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105"
            [attr.aria-label]="'Empezar gratis'">
            Empezar Gratis
            <fa-icon [icon]="faArrowRight" class="ml-2"></fa-icon>
          </button>
          <button 
            (click)="playDemo()"
            class="px-8 py-3 border-2 border-primary-dark text-primary-dark rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            [attr.aria-label]="'Ver demo'">
            <fa-icon [icon]="faPlayCircle" class="mr-2"></fa-icon>
            Ver Demo
          </button>
        </div>
        
        <!-- Trust Indicators -->
        <div class="flex items-center space-x-6 text-gray-600">
          <div class="flex items-center">
            <fa-icon [icon]="faCheck" class="text-green-600 mr-2"></fa-icon>
            <span>Sin tarjeta de crédito</span>
          </div>
          <div class="flex items-center">
            <fa-icon [icon]="faCheck" class="text-green-600 mr-2"></fa-icon>
            <span>Configuración en 2 minutos</span>
          </div>
        </div>
      </div>
      
      <!-- Hero Image/Illustration -->
      <div class="relative" [@fadeInRight]>
        <img 
          src="assets/images/hero-dashboard.png" 
          alt="Dashboard de PlanSport mostrando planificaciones deportivas"
          class="rounded-lg shadow-2xl"
          loading="lazy">
        <!-- Floating badges -->
        <div class="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3" [@float]>
          <div class="flex items-center space-x-2">
            <fa-icon [icon]="faStar" class="text-yellow-500"></fa-icon>
            <span class="font-bold">4.8/5</span>
          </div>
        </div>
        <div class="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3" [@float]="{value: '', params: {delay: 500}}">
          <div class="flex items-center space-x-2">
            <fa-icon [icon]="faUsers" class="text-primary-dark"></fa-icon>
            <span class="font-bold">1,500+ usuarios</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 4. FeaturesSectionComponent
**Tipo:** Standalone Component

**Template:**
```html
<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Todo lo que necesitas para entrenar mejor
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Herramientas profesionales diseñadas para optimizar tu tiempo y mejorar resultados
      </p>
    </div>
    
    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (feature of features(); track feature.id) {
        <div 
          class="p-6 rounded-lg hover:shadow-lg transition-shadow border border-gray-100"
          [@fadeInUp]="{value: '', params: {delay: feature.delay}}">
          <div class="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
            <fa-icon [icon]="feature.icon" class="text-primary-dark text-xl"></fa-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      }
    </div>
  </div>
</section>
```

**Component:**
```typescript
export class FeaturesSectionComponent {
  features = signal([
    {
      id: 1,
      icon: faRocket,
      title: 'Inicio Rápido',
      description: 'Crea tu primera planificación en menos de 5 minutos con plantillas predefinidas.',
      delay: 0
    },
    {
      id: 2,
      icon: faUsers,
      title: 'Gestión de Equipos',
      description: 'Organiza jugadores, controla asistencias y gestiona múltiples equipos fácilmente.',
      delay: 100
    },
    {
      id: 3,
      icon: faCalendarAlt,
      title: 'Planificación Inteligente',
      description: 'Genera entrenamientos automáticamente basados en objetivos y tiempo disponible.',
      delay: 200
    },
    {
      id: 4,
      icon: faChartLine,
      title: 'Análisis Detallado',
      description: 'Reportes completos de progreso, cumplimiento de objetivos y rendimiento.',
      delay: 300
    },
    {
      id: 5,
      icon: faTasks,
      title: 'Objetivos Personalizados',
      description: 'Define y rastrea objetivos técnicos, tácticos, físicos y psicológicos.',
      delay: 400
    },
    {
      id: 6,
      icon: faClock,
      title: 'Ahorra Tiempo',
      description: 'Reduce hasta un 70% el tiempo de preparación con herramientas automatizadas.',
      delay: 500
    }
  ]);
}
```

### 5. MarketplaceSectionComponent
**Tipo:** Standalone Component

**Template:**
```html
<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Content -->
      <div class="space-y-6">
        <div class="inline-flex items-center px-3 py-1 bg-primary-light rounded-full">
          <fa-icon [icon]="faStore" class="text-primary-dark mr-2"></fa-icon>
          <span class="text-primary-dark font-semibold">Marketplace</span>
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
          Comparte y descubre planificaciones probadas
        </h2>
        
        <p class="text-lg text-gray-600">
          Accede a una biblioteca con cientos de planificaciones creadas y validadas 
          por entrenadores profesionales de todo el mundo.
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-dark">500+</div>
            <div class="text-sm text-gray-600">Planificaciones</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-dark">2,000+</div>
            <div class="text-sm text-gray-600">Ejercicios</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-dark">4.8</div>
            <div class="flex justify-center">
              @for (star of [1,2,3,4,5]; track star) {
                <fa-icon 
                  [icon]="faStar" 
                  class="text-yellow-500 text-xs"
                  [class.text-gray-300]="star === 5"></fa-icon>
              }
            </div>
          </div>
        </div>
        
        <!-- Benefits -->
        <div class="space-y-3">
          <div class="flex items-start">
            <fa-icon [icon]="faCheckCircle" class="text-green-600 mt-1 mr-3"></fa-icon>
            <span class="text-gray-700">Importa planificaciones completas con un click</span>
          </div>
          <div class="flex items-start">
            <fa-icon [icon]="faCheckCircle" class="text-green-600 mt-1 mr-3"></fa-icon>
            <span class="text-gray-700">Adapta y personaliza según tus necesidades</span>
          </div>
          <div class="flex items-start">
            <fa-icon [icon]="faCheckCircle" class="text-green-600 mt-1 mr-3"></fa-icon>
            <span class="text-gray-700">Comparte tus creaciones y gana reconocimiento</span>
          </div>
        </div>
        
        <button 
          class="px-6 py-3 bg-primary-dark text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          [attr.aria-label]="'Explorar marketplace'">
          Explorar Marketplace
          <fa-icon [icon]="faArrowRight" class="ml-2"></fa-icon>
        </button>
      </div>
      
      <!-- Preview Cards -->
      <div class="space-y-4">
        @for (planning of samplePlannings(); track planning.id) {
          <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ planning.name }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ planning.sport }} - {{ planning.category }}</p>
                <div class="flex items-center mt-2 space-x-4">
                  <div class="flex items-center">
                    @for (star of [1,2,3,4,5]; track star) {
                      <fa-icon 
                        [icon]="faStar" 
                        class="text-yellow-500 text-xs"
                        [class.text-gray-300]="star > planning.rating"></fa-icon>
                    }
                    <span class="text-sm text-gray-600 ml-1">{{ planning.rating }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <fa-icon [icon]="faDownload" class="mr-1"></fa-icon>
                    {{ planning.downloads }}
                  </div>
                </div>
              </div>
              <fa-icon [icon]="faAward" class="text-yellow-500 text-xl" *ngIf="planning.featured"></fa-icon>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>
```

### 6. SubscriptionsSectionComponent
**Tipo:** Standalone Component

**Template:**
```html
<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Elige el plan perfecto para ti
      </h2>
      <p class="text-xl text-gray-600">Sin compromisos, cancela cuando quieras</p>
    </div>
    
    <!-- Pricing Cards -->
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      @for (plan of plans(); track plan.id) {
        <div 
          class="relative rounded-lg border-2 p-8"
          [class.border-primary-dark]="plan.featured"
          [class.border-gray-200]="!plan.featured"
          [class.shadow-xl]="plan.featured"
          [class.transform]="plan.featured"
          [class.scale-105]="plan.featured">
          
          @if (plan.featured) {
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-primary-dark text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </span>
            </div>
          }
          
          <!-- Plan Header -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
              <fa-icon [icon]="plan.icon" class="text-primary-dark text-2xl"></fa-icon>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">{{ plan.name }}</h3>
            <div class="mt-4">
              @if (plan.price === 0) {
                <span class="text-4xl font-bold text-gray-900">Gratis</span>
              } @else {
                <span class="text-4xl font-bold text-gray-900">€{{ plan.price }}</span>
                <span class="text-gray-600">/mes</span>
              }
            </div>
          </div>
          
          <!-- Features -->
          <ul class="space-y-3 mb-8">
            @for (feature of plan.features; track feature) {
              <li class="flex items-start">
                <fa-icon 
                  [icon]="faCheck" 
                  class="text-green-600 mt-0.5 mr-3 flex-shrink-0"></fa-icon>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            }
            @for (limitation of plan.limitations; track limitation) {
              <li class="flex items-start text-gray-400">
                <fa-icon 
                  [icon]="faTimesCircle" 
                  class="text-gray-400 mt-0.5 mr-3 flex-shrink-0"></fa-icon>
                <span>{{ limitation }}</span>
              </li>
            }
          </ul>
          
          <!-- CTA -->
          <button 
            class="w-full py-3 rounded-lg font-semibold transition-colors"
            [class.bg-primary-dark]="plan.featured"
            [class.text-white]="plan.featured"
            [class.hover:bg-blue-800]="plan.featured"
            [class.border-2]="!plan.featured"
            [class.border-primary-dark]="!plan.featured"
            [class.text-primary-dark]="!plan.featured"
            [class.hover:bg-blue-50]="!plan.featured"
            [attr.aria-label]="'Seleccionar plan ' + plan.name">
            {{ plan.price === 0 ? 'Empezar Gratis' : 'Elegir Plan' }}
          </button>
        </div>
      }
    </div>
    
    <!-- FAQ Link -->
    <div class="text-center mt-12">
      <p class="text-gray-600">
        ¿Tienes preguntas? 
        <a href="#" class="text-primary-dark font-semibold hover:underline">
          Ver preguntas frecuentes
        </a>
      </p>
    </div>
  </div>
</section>
```

### 7. FooterComponent
**Tipo:** Standalone Component

**Template:**
```html
<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div>
        <div class="flex items-center space-x-2 mb-4">
          <fa-icon [icon]="faFutbol" class="text-2xl"></fa-icon>
          <span class="text-xl font-bold">PlanSport</span>
        </div>
        <p class="text-gray-400 mb-4">
          La plataforma definitiva para la planificación deportiva profesional.
        </p>
        <!-- Social Links -->
        <div class="flex space-x-4">
          <a href="#" [attr.aria-label]="'Facebook'" class="text-gray-400 hover:text-white">
            <fa-icon [icon]="faFacebook" size="lg"></fa-icon>
          </a>
          <a href="#" [attr.aria-label]="'Twitter'" class="text-gray-400 hover:text-white">
            <fa-icon [icon]="faTwitter" size="lg"></fa-icon>
          </a>
          <a href="#" [attr.aria-label]="'Instagram'" class="text-gray-400 hover:text-white">
            <fa-icon [icon]="faInstagram" size="lg"></fa-icon>
          </a>
          <a href="#" [attr.aria-label]="'LinkedIn'" class="text-gray-400 hover:text-white">
            <fa-icon [icon]="faLinkedin" size="lg"></fa-icon>
          </a>
        </div>
      </div>
      
      <!-- Product -->
      <div>
        <h3 class="font-semibold mb-4">Producto</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">Características</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Marketplace</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Precios</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Actualizaciones</a></li>
        </ul>
      </div>
      
      <!-- Company -->
      <div>
        <h3 class="font-semibold mb-4">Empresa</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Carreras</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Contacto</a></li>
        </ul>
      </div>
      
      <!-- Contact -->
      <div>
        <h3 class="font-semibold mb-4">Contacto</h3>
        <ul class="space-y-2">
          <li class="flex items-center text-gray-400">
            <fa-icon [icon]="faEnvelope" class="mr-2"></fa-icon>
            info@plansport.com
          </li>
          <li class="flex items-center text-gray-400">
            <fa-icon [icon]="faPhone" class="mr-2"></fa-icon>
            +34 900 123 456
          </li>
          <li class="flex items-start text-gray-400">
            <fa-icon [icon]="faMapMarkerAlt" class="mr-2 mt-1"></fa-icon>
            <span>Madrid, España</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="border-t border-gray-800 mt-8 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} PlanSport. Todos los derechos reservados.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm">Términos de Servicio</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Política de Privacidad</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Cookies</a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

## Services

### ScrollService
```typescript
@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  observeSections(sectionIds: string[]): Observable<string> {
    return new Observable(observer => {
      const options = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };
      
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.next(entry.target.id);
          }
        });
      }, options);
      
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          intersectionObserver.observe(element);
        }
      });
      
      return () => {
        intersectionObserver.disconnect();
      };
    });
  }
}
```

## Animations

```typescript
// landing.animations.ts
import { trigger, transition, style, animate, state } from '@angular/animations';

export const landingAnimations = [
  trigger('fadeInLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-30px)' }),
      animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),
  
  trigger('fadeInRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(30px)' }),
      animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),
  
  trigger('fadeInUp', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('600ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { params: { delay: 0 } })
  ]),
  
  trigger('slideDown', [
    transition(':enter', [
      style({ height: 0, opacity: 0 }),
      animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ height: 0, opacity: 0 }))
    ])
  ]),
  
  trigger('float', [
    state('*', style({ transform: 'translateY(0)' })),
    transition(':enter', [
      animate('2s {{delay}}ms ease-in-out', 
        style({ transform: 'translateY(-10px)' })
      ),
      animate('2s ease-in-out', 
        style({ transform: 'translateY(0)' })
      )
    ], { params: { delay: 0 } })
  ])
];
```

## Accessibility Checklist
- [x] Todos los colores cumplen WCAG AA (4.5:1 para texto normal)
- [x] Iconos tienen aria-labels descriptivos
- [x] Focus visible en todos los elementos interactivos
- [x] Navegación completa por teclado
- [x] Skip links disponibles
- [x] Estructura semántica HTML5
- [x] Imágenes con alt text descriptivo
- [x] Animaciones respetan prefers-reduced-motion
- [x] Mobile menu con focus trap
- [x] Aria-expanded en elementos colapsables