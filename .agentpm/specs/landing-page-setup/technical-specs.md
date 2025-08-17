# Especificaciones Técnicas - Landing Page Setup

## Arquitectura General

### Stack Tecnológico

- **Framework:** Angular 17+ (Standalone Components)
- **Estilos:** Tailwind CSS 3.4+
- **Iconos:** Angular Material Icons / Lucide Angular
- **Build Tool:** Angular CLI
- **CSS Processor:** PostCSS
- **Responsive:** Mobile-first approach

### Estructura de Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   └── header.component.css
│   │   └── footer/
│   │       ├── footer.component.ts
│   │       ├── footer.component.html
│   │       └── footer.component.css
│   ├── pages/
│   │   └── landing/
│   │       ├── landing.component.ts
│   │       ├── landing.component.html
│   │       └── landing.component.css
│   ├── services/
│   │   └── navigation.service.ts
│   └── shared/
│       └── interfaces/
├── assets/
│   ├── images/
│   └── icons/
└── styles.css
```

## Configuración de Tailwind CSS

### Instalación

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

### Configuración PostCSS (`.postcssrc.json`)

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
### Configuración Automática

Con la versión actual de Tailwind CSS para Angular, la configuración se maneja automáticamente a través de PostCSS. No es necesario crear manualmente un archivo `tailwind.config.js` para la configuración básica. colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
```

### Estilos Globales (`src/styles.css`)

```css
@import 'tailwindcss';

/* Variables CSS personalizadas */
:root {
  --header-height: 4rem;
  --footer-height: 12rem;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Utilidades personalizadas */
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
}

.btn-secondary {
  @apply bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-4 rounded-lg border border-primary-600 transition-colors duration-200;
}
```

## Configuración de Iconos

### Opción 1: Angular Material Icons

```bash
npm install @angular/material @angular/cdk
```

```typescript
// app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    provideAnimationsAsync()
  ]
};
```

### Opción 2: Lucide Angular (Recomendado)

```bash
npm install lucide-angular
```

```typescript
// app.config.ts
import { LucideAngularModule } from 'lucide-angular';

// En el componente
import { Menu, X, ChevronDown } from 'lucide-angular';
```

## Componentes Principales

### HeaderComponent

```typescript
// header.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 w-full bg-white shadow-sm z-50">
      <nav class="container-custom">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold text-primary-600">PlanSport</h1>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a *ngFor="let item of menuItems" 
                 (click)="navigateToSection(item.anchor)"
                 class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors">
                {{ item.label }}
              </a>
            </div>
          </div>
          
          <!-- Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <button class="btn-secondary">Iniciar Sesión</button>
            <button class="btn-primary">Registrarse</button>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button (click)="toggleMobileMenu()" class="p-2">
              <!-- Icon here -->
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div *ngIf="isMobileMenuOpen" class="md:hidden">
          <!-- Mobile menu content -->
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  private navigationService = inject(NavigationService);
  
  isMobileMenuOpen = false;
  
  menuItems = [
    { label: 'Características', anchor: 'caracteristicas' },
    { label: 'Suscripciones', anchor: 'suscripciones' },
    { label: 'Marketplace', anchor: 'marketplace' },
    { label: 'Reseñas', anchor: 'resenas' }
  ];
  
  navigateToSection(anchor: string) {
    this.navigationService.scrollToSection(anchor);
    this.isMobileMenuOpen = false;
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
```

### NavigationService

```typescript
// navigation.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  constructor(private router: Router) {}
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL with anchor
      this.router.navigate([], { fragment: sectionId });
    }
  }
  
  getCurrentSection(): string {
    const sections = ['caracteristicas', 'suscripciones', 'marketplace', 'resenas'];
    const scrollPosition = window.scrollY + 100;
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element && scrollPosition >= element.offsetTop && 
          scrollPosition < element.offsetTop + element.offsetHeight) {
        return sectionId;
      }
    }
    return '';
  }
}
```

### LandingComponent

```typescript
// landing.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="pt-16"> <!-- Offset for fixed header -->
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div class="container-custom">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Planifica tu Entrenamiento Deportivo
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
              La plataforma completa para atletas y entrenadores
            </p>
            <div class="space-x-4">
              <button class="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Comenzar Gratis
              </button>
              <button class="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Características Section -->
      <section id="caracteristicas" class="py-20 bg-gray-50">
        <!-- Content here -->
      </section>
      
      <!-- Suscripciones Section -->
      <section id="suscripciones" class="py-20">
        <!-- Content here -->
      </section>
      
      <!-- Marketplace Section -->
      <section id="marketplace" class="py-20 bg-gray-50">
        <!-- Content here -->
      </section>
      
      <!-- Reseñas Section -->
      <section id="resenas" class="py-20">
        <!-- Content here -->
      </section>
    </main>
    
    <app-footer></app-footer>
  `
})
export class LandingComponent implements OnInit {
  
  ngOnInit() {
    // Initialize any required data
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Handle scroll events for active section highlighting
  }
}
```

## Responsive Design

### Breakpoints Tailwind

- **sm:** 640px (tablet pequeña)
- **md:** 768px (tablet)
- **lg:** 1024px (desktop)
- **xl:** 1280px (desktop grande)
- **2xl:** 1536px (desktop extra grande)

### Estrategia Mobile-First

1. Diseñar primero para móvil
2. Usar clases responsive de Tailwind (`sm:`, `md:`, `lg:`)
3. Menú hamburguesa para móvil
4. Grid responsive para secciones
5. Imágenes optimizadas para diferentes tamaños

## Performance y Optimización

### Lazy Loading

```typescript
// Implementar lazy loading para imágenes
<img loading="lazy" src="..." alt="...">
```

### Bundle Optimization

```typescript
// Usar standalone components para tree-shaking
// Importar solo los iconos necesarios
// Optimizar imágenes (WebP, tamaños múltiples)
```

### SEO Básico

```typescript
// Añadir meta tags
// Estructura semántica HTML
// Alt text en imágenes
// Títulos descriptivos
```

## Testing

### Unit Tests

```typescript
// Testear componentes individuales
// Testear servicios
// Testear navegación
```

### E2E Tests

```typescript
// Testear navegación completa
// Testear responsive design
// Testear funcionalidad de scroll
```

## Deployment

### Build de Producción

```bash
ng build --configuration production
```

### Optimizaciones

- Minificación CSS/JS
- Compresión de imágenes
- Purge de CSS no utilizado (Tailwind)
- Service Worker para caching