# Tasks - Auth Tabs Component

## 🎯 Objetivo
Crear un componente visual de autenticación con tabs para login y registro, completamente accesible y con diseño moderno usando Angular 20, Tailwind CSS 4 y Font Awesome 6. Esta implementación será solo visual (sin funcionalidad backend).

## 📋 Pre-requisitos
- [ ] Angular 20.x instalado y configurado
- [ ] Tailwind CSS 4.x configurado
- [ ] **Font Awesome 6.x instalado y configurado**
- [ ] Angular Router configurado
- [ ] Reactive Forms module disponible
- [ ] **Paleta de colores con contraste validado definida**
- [ ] Ambiente de desarrollo funcionando

## 🔨 Tareas de Implementación

### Phase 1: Setup y Estructura (Prioridad: Alta)

#### Task 1.1: Crear estructura de carpetas
- [ ] Crear carpeta `src/app/features/auth/`
- [ ] Crear subcarpetas para componentes
- [ ] Crear carpeta para servicios
- [ ] Crear carpeta para modelos/interfaces

```bash
# Comandos para crear estructura
mkdir -p src/app/features/auth/auth-tabs
mkdir -p src/app/features/auth/components/login-form
mkdir -p src/app/features/auth/components/register-form
mkdir -p src/app/features/auth/services
mkdir -p src/app/features/auth/models
mkdir -p src/app/features/auth/animations
```

**Tiempo estimado:** 15 minutos

#### Task 1.2: Instalar y configurar Font Awesome
- [ ] Instalar paquetes de Font Awesome
- [ ] Configurar en angular.json si es necesario
- [ ] Crear archivo de exportación de iconos

```bash
# Instalar Font Awesome
npm install @fortawesome/fontawesome-free @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

```typescript
// src/app/features/auth/auth-icons.ts
export { 
  faSignInAlt,
  faUserPlus,
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faSpinner,
  faFutbol,
  faBasketballBall,
  faSwimmer,
  faRunning,
  faDumbbell
} from '@fortawesome/free-solid-svg-icons';
```

**Tiempo estimado:** 20 minutos

### Phase 2: Componente Principal - Auth Tabs (Prioridad: Alta)

#### Task 2.1: Generar AuthTabsComponent
- [ ] Generar componente standalone
- [ ] Configurar routing
- [ ] Implementar estructura de tabs

```bash
ng generate component features/auth/auth-tabs --standalone --inline-style=false
```

**Tiempo estimado:** 30 minutos

#### Task 2.2: Implementar navegación de tabs
- [ ] Crear signal para tab activo
- [ ] Implementar lógica de cambio de tabs
- [ ] Configurar rutas hijas
- [ ] **Agregar roles ARIA para tabs (tablist, tab, tabpanel)**
- [ ] **Implementar navegación por teclado (Arrow keys)**

```typescript
// Configurar en app.routes.ts
{
  path: 'auth',
  loadComponent: () => import('./features/auth/auth-tabs/auth-tabs.component').then(m => m.AuthTabsComponent),
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./features/auth/components/login-form/login-form.component').then(m => m.LoginFormComponent) },
    { path: 'register', loadComponent: () => import('./features/auth/components/register-form/register-form.component').then(m => m.RegisterFormComponent) }
  ]
}
```

**Tiempo estimado:** 45 minutos

#### Task 2.3: Aplicar estilos y diseño
- [ ] Implementar diseño con Tailwind
- [ ] Agregar logo y branding
- [ ] **Aplicar colores con contraste WCAG AA**
- [ ] **Agregar iconos Font Awesome a tabs**
- [ ] Implementar estados hover y active
- [ ] **Asegurar focus visible (outline de 2px)**

**Tiempo estimado:** 30 minutos

### Phase 3: Formulario de Login (Prioridad: Alta)

#### Task 3.1: Generar LoginFormComponent
- [ ] Generar componente standalone
- [ ] Importar ReactiveFormsModule y FontAwesomeModule

```bash
ng generate component features/auth/components/login-form --standalone
```

**Tiempo estimado:** 15 minutos

#### Task 3.2: Crear formulario reactivo
- [ ] Definir FormGroup con validaciones
- [ ] Crear campos de email y password
- [ ] Agregar checkbox "Recordarme"
- [ ] **Asociar labels con campos (for/id)**
- [ ] **Configurar autocomplete apropiado**

```typescript
loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  rememberMe: [false]
});
```

**Tiempo estimado:** 30 minutos

#### Task 3.3: Implementar toggle de contraseña
- [ ] Crear signal para showPassword
- [ ] Agregar botón con icono de ojo
- [ ] **Implementar iconos faEye/faEyeSlash**
- [ ] **Agregar aria-label descriptivo al botón**
- [ ] Cambiar tipo de input dinámicamente

**Tiempo estimado:** 20 minutos

#### Task 3.4: Agregar validación visual
- [ ] Implementar mensajes de error
- [ ] Agregar iconos de validación
- [ ] **Usar colores con contraste adecuado (verde #059669, rojo #DC2626)**
- [ ] **Asociar mensajes de error con campos (aria-describedby)**
- [ ] **Agregar role="alert" a mensajes de error**

**Tiempo estimado:** 30 minutos

### Phase 4: Formulario de Registro (Prioridad: Alta)

#### Task 4.1: Generar RegisterFormComponent
- [ ] Generar componente standalone
- [ ] Importar módulos necesarios

```bash
ng generate component features/auth/components/register-form --standalone
```

**Tiempo estimado:** 15 minutos

#### Task 4.2: Crear formulario completo
- [ ] Campo de nombre completo
- [ ] Campo de email
- [ ] Selector de deporte con iconos
- [ ] Campo de contraseña
- [ ] Campo confirmar contraseña
- [ ] Checkbox de términos y condiciones
- [ ] **Todos los campos con labels descriptivos**

```typescript
registerForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  sport: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(8), passwordValidator]],
  confirmPassword: ['', Validators.required],
  acceptTerms: [false, Validators.requiredTrue]
}, { validators: passwordMatchValidator });
```

**Tiempo estimado:** 40 minutos

#### Task 4.3: Implementar indicador de fortaleza
- [ ] Crear función calculatePasswordStrength
- [ ] Mostrar barras de progreso visuales
- [ ] Lista de requisitos con iconos
- [ ] **Usar computed signals para validaciones**
- [ ] **Colores accesibles para cada nivel de fortaleza**
- [ ] **Iconos faCheck/faInfoCircle para requisitos**

**Tiempo estimado:** 45 minutos

#### Task 4.4: Validador de contraseñas coincidentes
- [ ] Crear validador personalizado
- [ ] Mostrar mensaje cuando no coinciden
- [ ] **Icono de check cuando coinciden**
- [ ] Actualizar en tiempo real

**Tiempo estimado:** 20 minutos

### Phase 5: Servicio de Estado Visual (Prioridad: Media)

#### Task 5.1: Crear AuthFormService
- [ ] Generar servicio con providedIn: 'root'
- [ ] Crear signals para loading y error
- [ ] Métodos de simulación para desarrollo

```bash
ng generate service features/auth/services/auth-form
```

```typescript
@Injectable({ providedIn: 'root' })
export class AuthFormService {
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  
  simulateLogin(credentials: any): void {
    // Simulación para desarrollo visual
  }
}
```

**Tiempo estimado:** 25 minutos

### Phase 6: Animaciones y Transiciones (Prioridad: Media)

#### Task 6.1: Crear animaciones Angular
- [ ] Animación slideIn para cambio de tabs
- [ ] Animación fadeIn para mensajes
- [ ] Animación spin para loading
- [ ] **Respetar prefers-reduced-motion**

```typescript
// auth.animations.ts
export const authAnimations = {
  slideIn: trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
  ])
};
```

**Tiempo estimado:** 30 minutos

### Phase 7: Responsive Design (Prioridad: Alta)

#### Task 7.1: Implementar diseño mobile-first
- [ ] Mobile: formulario full width
- [ ] Tablet: máximo 480px de ancho
- [ ] Desktop: considerar split-screen design
- [ ] **Botones mínimo 44x44px para touch**
- [ ] **Texto mínimo 14px**

**Tiempo estimado:** 35 minutos

#### Task 7.2: Testing en diferentes dispositivos
- [ ] Test en Chrome DevTools
- [ ] Verificar en móvil real si es posible
- [ ] Probar orientación landscape
- [ ] Verificar touch targets

**Tiempo estimado:** 20 minutos

### Phase 8: Accesibilidad (Prioridad: Alta)

#### Task 8.1: Validación de contraste
- [ ] Ejecutar herramienta de contraste (axe DevTools)
- [ ] **Verificar todos los textos ≥ 4.5:1**
- [ ] **Texto grande (≥18px bold) ≥ 3:1**
- [ ] Ajustar colores si es necesario
- [ ] Documentar ratios finales

**Tiempo estimado:** 30 minutos

#### Task 8.2: Navegación por teclado
- [ ] Probar navegación solo con teclado
- [ ] **Verificar orden de tabulación lógico**
- [ ] **Focus visible en todos los elementos**
- [ ] **Tabs navegables con Arrow keys**
- [ ] Escape cierra dropdowns (si aplica)

**Tiempo estimado:** 25 minutos

#### Task 8.3: Screen reader testing
- [ ] Probar con NVDA o JAWS
- [ ] **Verificar aria-labels en iconos**
- [ ] **Mensajes de error anunciados**
- [ ] **Estados de formulario anunciados**
- [ ] Corregir problemas encontrados

**Tiempo estimado:** 30 minutos

#### Task 8.4: Implementar aria-labels
- [ ] **Todos los iconos con aria-label o aria-hidden**
- [ ] **Botones con texto descriptivo**
- [ ] **Campos con labels asociados**
- [ ] **Regiones con aria-labelledby**

```html
<!-- Ejemplo de implementación -->
<fa-icon 
  [icon]="faEnvelope" 
  [attr.aria-hidden]="true">
</fa-icon>

<button [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'">
  <fa-icon [icon]="showPassword() ? faEyeSlash : faEye"></fa-icon>
</button>
```

**Tiempo estimado:** 25 minutos

### Phase 9: Estados de Carga (Preparación) (Prioridad: Baja)

#### Task 9.1: Implementar loading states
- [ ] Agregar spinner a botones
- [ ] Deshabilitar campos durante "carga"
- [ ] **Icono faSpinner con animación**
- [ ] **aria-label="Cargando" en spinner**
- [ ] Método simulateLoading() para demos

**Tiempo estimado:** 20 minutos

### Phase 10: Testing (Prioridad: Media)

#### Task 10.1: Unit tests básicos
- [ ] Test de creación de componentes
- [ ] Test de validaciones de formulario
- [ ] Test de cambio de tabs
- [ ] Test de toggle password

```bash
ng test --include='**/auth/**/*.spec.ts'
```

**Tiempo estimado:** 45 minutos

#### Task 10.2: Tests de accesibilidad automatizados
- [ ] Configurar jest-axe o similar
- [ ] Tests de contraste
- [ ] Tests de roles ARIA
- [ ] Tests de navegación

**Tiempo estimado:** 30 minutos

### Phase 11: Documentación (Prioridad: Baja)

#### Task 11.1: Documentar componentes
- [ ] JSDoc en métodos públicos
- [ ] README en carpeta auth
- [ ] Documentar paleta de colores usada
- [ ] Lista de iconos Font Awesome utilizados

**Tiempo estimado:** 25 minutos

#### Task 11.2: Guía de uso
- [ ] Cómo navegar entre tabs
- [ ] Requisitos de contraseña
- [ ] Consideraciones de accesibilidad
- [ ] Screenshots de estados

**Tiempo estimado:** 20 minutos

## 📊 Estimación de Tiempo

| Fase | Tiempo Estimado |
|------|----------------|
| Phase 1: Setup | 35 minutos |
| Phase 2: Auth Tabs | 1.5 horas |
| Phase 3: Login Form | 1.5 horas |
| Phase 4: Register Form | 2 horas |
| Phase 5: Service | 25 minutos |
| Phase 6: Animaciones | 30 minutos |
| Phase 7: Responsive | 55 minutos |
| Phase 8: Accesibilidad | 1.8 horas |
| Phase 9: Loading States | 20 minutos |
| Phase 10: Testing | 1.25 horas |
| Phase 11: Documentación | 45 minutos |
| **TOTAL** | **~10.5 horas** |

## ✅ Definition of Done

- [ ] Componentes creados y funcionando visualmente
- [ ] Tabs navegables con mouse y teclado
- [ ] Formularios con validación visual completa
- [ ] **Accesible (WCAG 2.1 AA)**
  - [ ] Contraste validado (≥4.5:1)
  - [ ] Navegable por teclado completamente
  - [ ] Iconos con aria-labels apropiados
  - [ ] Focus states visibles
  - [ ] Compatible con screen readers
- [ ] Responsive en todos los dispositivos
- [ ] Sin errores en consola
- [ ] **Iconos Font Awesome funcionando**
- [ ] Animaciones suaves respetando prefers-reduced-motion
- [ ] Tests unitarios pasando
- [ ] Documentación completa

## 🎨 Design Tokens para Copy/Paste

```scss
// _auth-design-tokens.scss
// Colores validados para WCAG AA
$primary-dark: #1E40AF;        // Ratio 7.8:1 sobre blanco ✓
$success: #059669;             // Ratio 4.5:1 sobre blanco ✓
$error: #DC2626;               // Ratio 4.6:1 sobre blanco ✓
$text-primary: #111827;        // Ratio 16.1:1 sobre blanco ✓
$text-secondary: #6B7280;      // Ratio 5.2:1 sobre blanco ✓
```

## 🚀 Comandos de Ejecución

```bash
# Desarrollo
ng serve

# Generar componentes
ng g c features/auth/auth-tabs --standalone
ng g c features/auth/components/login-form --standalone
ng g c features/auth/components/register-form --standalone
ng g s features/auth/services/auth-form

# Testing
ng test
ng test --code-coverage

# Build
ng build --configuration=development

# Verificar accesibilidad (necesita extensión de navegador)
# Usar axe DevTools, WAVE o Lighthouse
```

## 📝 Notas Importantes

1. **Solo Visual**: Esta implementación es únicamente visual, sin conexión a backend
2. **Contraste**: Usar WebAIM Contrast Checker para validar colores
3. **Iconos**: Importar solo los iconos necesarios de Font Awesome
4. **Accesibilidad**: Probar con axe DevTools durante el desarrollo
5. **Performance**: Lazy load de componentes ya configurado
6. **Simulación**: Los métodos de simulación permiten ver estados de carga

## 🐛 Troubleshooting Común

| Problema | Solución |
|----------|----------|
| Iconos no aparecen | Verificar importación de FontAwesomeModule |
| Contraste insuficiente | Usar primary-dark (#1E40AF) en lugar de primary |
| Focus no visible | Agregar clase `focus:ring-2 focus:ring-blue-500` |
| Tabs no navegables | Verificar roles ARIA y event handlers |
| Validación no funciona | Verificar que ReactiveFormsModule esté importado |

## 🔗 Referencias

- [Angular Docs - Standalone Components](https://angular.io/guide/standalone-components)
- [Font Awesome Angular](https://github.com/FortAwesome/angular-fontawesome)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Forms](https://tailwindcss.com/docs/forms)
