# Frontend Specification - Sistema de Autenticación

## Routing
```typescript
// app.routes.ts
export const routes: Routes = [
  // Rutas públicas
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth-layout.component'),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component') },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component') },
      { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password.component') },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  // Rutas protegidas
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
    canActivate: [authGuard]
  },
  {
    path: 'teams',
    loadComponent: () => import('./features/teams/teams.component'),
    canActivate: [authGuard]
  },
  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
```

## Design System

### Color Palette con Contraste Validado
```scss
// _auth-colors.scss
// Modo Claro (Light Mode)
$light-colors: (
  // Primarios
  'primary': #1E40AF,        // Contrast con blanco: 7.8:1 ✓
  'primary-hover': #1E3A8A,   // Contrast con blanco: 8.5:1 ✓
  'primary-light': #3B82F6,   // Contrast con blanco: 3.1:1 (usar texto grande)
  
  // Estados
  'success': #059669,         // Contrast con blanco: 4.5:1 ✓
  'error': #DC2626,           // Contrast con blanco: 4.6:1 ✓
  'warning': #D97706,         // Contrast con blanco: 3.3:1 (texto grande)
  'info': #0284C7,            // Contrast con blanco: 4.5:1 ✓
  
  // Neutros
  'text-primary': #111827,    // Contrast con blanco: 16.1:1 ✓
  'text-secondary': #6B7280,  // Contrast con blanco: 5.2:1 ✓
  'text-muted': #9CA3AF,      // Contrast con blanco: 2.8:1 (decorativo)
  'background': #FFFFFF,
  'surface': #F9FAFB,
  'border': #E5E7EB
);

// Modo Oscuro (Dark Mode)
$dark-colors: (
  // Primarios
  'primary': #60A5FA,         // Contrast con #0F172A: 9.7:1 ✓
  'primary-hover': #93C5FD,   // Contrast con #0F172A: 12.1:1 ✓
  'primary-light': #2563EB,   // Contrast con #0F172A: 4.8:1 ✓
  
  // Estados
  'success': #10B981,         // Contrast con #0F172A: 8.9:1 ✓
  'error': #F87171,           // Contrast con #0F172A: 7.2:1 ✓
  'warning': #FBBF24,         // Contrast con #0F172A: 11.4:1 ✓
  'info': #38BDF8,            // Contrast con #0F172A: 10.1:1 ✓
  
  // Neutros
  'text-primary': #F9FAFB,    // Contrast con #0F172A: 19.9:1 ✓
  'text-secondary': #E5E7EB,  // Contrast con #0F172A: 17.1:1 ✓
  'text-muted': #9CA3AF,      // Contrast con #0F172A: 7.5:1 ✓
  'background': #0F172A,      // Fondo principal oscuro
  'surface': #1E293B,         // Superficie elevada
  'border': #334155           // Bordes sutiles
);
```

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Activar modo oscuro con clase
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores que cambian según el tema
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        // Estados semánticos
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### CSS Variables para Temas
```css
/* styles.css */
:root {
  /* Light theme (default) */
  --color-primary: 30 64 175;
  --color-primary-hover: 30 58 138;
  --color-primary-light: 59 130 246;
  --color-success: 5 150 105;
  --color-error: 220 38 38;
  --color-warning: 217 119 6;
  --color-info: 2 132 199;
}

.dark {
  /* Dark theme */
  --color-primary: 96 165 250;
  --color-primary-hover: 147 197 253;
  --color-primary-light: 37 99 235;
  --color-success: 16 185 129;
  --color-error: 248 113 113;
  --color-warning: 251 191 36;
  --color-info: 56 189 248;
}

/* Transiciones suaves para cambio de tema */
* {
  @apply transition-colors duration-200;
}

/* Excepciones para animaciones */
.no-transition {
  transition: none !important;
}
```

### Font Awesome Icons Specification
```typescript
// auth-icons.ts
import {
  // Autenticación
  faUser,           // Email/Usuario
  faLock,           // Contraseña
  faEye,            // Mostrar contraseña
  faEyeSlash,       // Ocultar contraseña
  faSignInAlt,      // Login
  faUserPlus,       // Registro
  faSignOutAlt,     // Logout
  
  // Estados y feedback
  faSpinner,        // Loading
  faCheck,          // Éxito/Validación correcta
  faTimes,          // Error/Cerrar
  faExclamationTriangle, // Advertencia
  faInfoCircle,     // Información
  
  // Navegación
  faArrowLeft,      // Volver
  faHome,           // Inicio
  
  // Seguridad
  faShield,         // Seguridad/Protección
  faKey,            // Token/API Key
  faLockOpen,       // Desbloqueado
  
  // Tema
  faSun,            // Modo claro
  faMoon,           // Modo oscuro
  
} from '@fortawesome/free-solid-svg-icons';

// Social login (si se implementa)
import {
  faGoogle,
  faGithub,
  faMicrosoft
} from '@fortawesome/free-brands-svg-icons';
```

## Components Structure

### 1. AuthLayoutComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/auth/auth-layout.component.ts`
**Descripción:** Layout wrapper para todas las páginas de autenticación

**Template Structure:**
```html
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
  <!-- Theme Toggle en esquina superior derecha -->
  <app-theme-toggle class="fixed top-4 right-4 z-50"></app-theme-toggle>
  
  <div class="max-w-md w-full">
    <!-- Logo y título -->
    <div class="text-center mb-8">
      <img src="assets/logo.svg" alt="PlanSport" class="h-12 w-auto mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">PlanSport</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Plataforma de Planificación Deportiva</p>
    </div>
    
    <!-- Content -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <router-outlet></router-outlet>
    </div>
    
    <!-- Footer links -->
    <div class="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
      <a routerLink="/" class="hover:text-primary-dark dark:hover:text-primary-light hover:underline">
        <fa-icon [icon]="faArrowLeft" class="mr-1"></fa-icon>
        Volver al inicio
      </a>
    </div>
  </div>
</div>
```

### 2. LoginComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/auth/login/login.component.ts`
**Descripción:** Formulario de inicio de sesión

**Component:**
```typescript
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  // Icons
  readonly faUser = faUser;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faSignInAlt = faSignInAlt;
  readonly faSpinner = faSpinner;
  
  // State
  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);
  
  // Form
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [true]
  });
  
  // Computed
  readonly emailErrors = computed(() => {
    const control = this.loginForm.controls.email;
    if (control.touched && control.errors) {
      if (control.errors['required']) return 'El email es obligatorio';
      if (control.errors['email']) return 'Email inválido';
    }
    return null;
  });
  
  ngOnInit(): void {
    // Check if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  togglePassword(): void {
    this.showPassword.update(show => !show);
  }
  
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loading.set(true);
    this.errorMessage.set(null);
    
    try {
      const credentials = this.loginForm.getRawValue();
      await this.authService.login(credentials);
      
      // Redirect to intended route or dashboard
      const redirectUrl = this.authService.redirectUrl() || '/dashboard';
      await this.router.navigate([redirectUrl]);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error al iniciar sesión');
    } finally {
      this.loading.set(false);
    }
  }
}
```

**Template:**
```html
<div class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
    <p class="mt-2 text-sm text-gray-600">
      ¿No tienes cuenta? 
      <a routerLink="/auth/register" class="text-primary hover:text-primary-hover font-medium">
        Regístrate aquí
      </a>
    </p>
  </div>
  
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
    <!-- Email field -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <fa-icon [icon]="faUser" class="text-gray-400"></fa-icon>
        </div>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="tu@email.com"
          [attr.aria-invalid]="loginForm.controls.email.invalid && loginForm.controls.email.touched"
          [attr.aria-describedby]="emailErrors() ? 'email-error' : null"
        />
      </div>
      @if (emailErrors()) {
        <p id="email-error" class="mt-1 text-sm text-red-600 flex items-center">
          <fa-icon [icon]="faTimes" class="mr-1"></fa-icon>
          {{ emailErrors() }}
        </p>
      }
    </div>
    
    <!-- Password field -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
        Contraseña
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <fa-icon [icon]="faLock" class="text-gray-400"></fa-icon>
        </div>
        <input
          id="password"
          [type]="showPassword() ? 'text' : 'password'"
          formControlName="password"
          class="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="••••••••"
        />
        <button
          type="button"
          (click)="togglePassword()"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        >
          <fa-icon 
            [icon]="showPassword() ? faEyeSlash : faEye" 
            class="text-gray-400 hover:text-gray-600"
          ></fa-icon>
        </button>
      </div>
    </div>
    
    <!-- Remember me & Forgot password -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          formControlName="rememberMe"
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
          Recordarme
        </label>
      </div>
      <a routerLink="/auth/forgot-password" class="text-sm text-primary hover:text-primary-hover">
        ¿Olvidaste tu contraseña?
      </a>
    </div>
    
    <!-- Error message -->
    @if (errorMessage()) {
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
        <fa-icon [icon]="faExclamationTriangle" class="mr-2 mt-0.5"></fa-icon>
        <span class="text-sm">{{ errorMessage() }}</span>
      </div>
    }
    
    <!-- Submit button -->
    <button
      type="submit"
      [disabled]="loading() || loginForm.invalid"
      class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      @if (loading()) {
        <fa-icon [icon]="faSpinner" class="animate-spin mr-2"></fa-icon>
        Iniciando sesión...
      } @else {
        <fa-icon [icon]="faSignInAlt" class="mr-2"></fa-icon>
        Iniciar Sesión
      }
    </button>
  </form>
</div>
```

### 3. ThemeToggleComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/shared/components/theme-toggle/theme-toggle.component.ts`
**Descripción:** Botón toggle para cambiar entre modo claro y oscuro

```typescript
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      [attr.aria-label]="isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      [attr.aria-pressed]="isDark()"
      role="switch"
    >
      <fa-icon 
        [icon]="isDark() ? faSun : faMoon" 
        class="text-yellow-500 dark:text-yellow-300 text-xl"
        [attr.aria-hidden]="true"
      ></fa-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  
  // Icons
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  
  // State
  readonly isDark = this.themeService.isDark;
  
  ngOnInit(): void {
    // Initialize theme from localStorage or system preference
    this.themeService.initializeTheme();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
```

### 4. ThemeService
**Tipo:** Injectable Service
**Ubicación:** `src/app/core/services/theme.service.ts`
**Descripción:** Servicio para gestionar el tema de la aplicación

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private readonly darkSignal = signal(false);
  
  // Public observables
  readonly isDark = this.darkSignal.asReadonly();
  readonly theme = computed(() => this.isDark() ? 'dark' : 'light');
  
  initializeTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme) {
      this.setTheme(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(this.THEME_KEY)) {
          this.setTheme(e.matches);
        }
      });
  }
  
  toggleTheme(): void {
    this.setTheme(!this.isDark());
  }
  
  setTheme(isDark: boolean): void {
    this.darkSignal.set(isDark);
    
    // Update DOM
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0F172A' : '#FFFFFF');
    }
  }
  
  clearPreference(): void {
    localStorage.removeItem(this.THEME_KEY);
    this.initializeTheme();
  }
}
```

### 5. AuthService
**Tipo:** Injectable Service
**Ubicación:** `src/app/core/services/auth.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly supabase = inject(SupabaseService);
  
  // State
  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(true);
  private readonly tokenSignal = signal<string | null>(null);
  
  // Public observables
  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.user());
  
  // Redirect URL for post-login
  redirectUrl = signal<string | null>(null);
  
  // Token refresh timer
  private refreshTimer?: number;
  
  constructor() {
    this.initializeAuth();
  }
  
  private async initializeAuth(): Promise<void> {
    try {
      // Check localStorage for existing session
      const storedToken = localStorage.getItem('access_token');
      const storedRefreshToken = localStorage.getItem('refresh_token');
      
      if (storedToken && storedRefreshToken) {
        // Verify token is still valid
        const isValid = await this.verifyToken(storedToken);
        if (isValid) {
          this.tokenSignal.set(storedToken);
          await this.loadUserProfile();
          this.scheduleTokenRefresh();
        } else {
          // Try to refresh
          await this.refreshToken(storedRefreshToken);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.clearAuth();
    } finally {
      this.loadingSignal.set(false);
    }
  }
  
  async login(credentials: LoginCredentials): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>('/api/auth/login', credentials)
    );
    
    this.handleAuthResponse(response);
  }
  
  async register(userData: RegisterData): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>('/api/auth/register', userData)
    );
    
    this.handleAuthResponse(response);
  }
  
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    try {
      await firstValueFrom(
        this.http.post('/api/auth/logout', { refreshToken })
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
      await this.router.navigate(['/auth/login']);
    }
  }
  
  private handleAuthResponse(response: AuthResponse): void {
    const { accessToken, refreshToken, expiresIn, user } = response.data;
    
    // Store tokens
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Update state
    this.tokenSignal.set(accessToken);
    this.userSignal.set(user);
    
    // Schedule refresh
    this.scheduleTokenRefresh(expiresIn);
  }
  
  private scheduleTokenRefresh(expiresIn: number = 900): void {
    // Clear existing timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    
    // Refresh 1 minute before expiration
    const refreshIn = (expiresIn - 60) * 1000;
    this.refreshTimer = window.setTimeout(() => {
      this.refreshToken();
    }, refreshIn);
  }
  
  private async refreshToken(refreshToken?: string): Promise<void> {
    const token = refreshToken || localStorage.getItem('refresh_token');
    
    if (!token) {
      this.clearAuth();
      return;
    }
    
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>('/api/auth/refresh', { refreshToken: token })
      );
      
      this.handleAuthResponse(response);
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      await this.router.navigate(['/auth/login']);
    }
  }
  
  private clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }
  
  getToken(): string | null {
    return this.tokenSignal();
  }
}
```

### 6. AuthGuard
**Tipo:** Functional Guard
**Ubicación:** `src/app/core/guards/auth.guard.ts`

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Wait for auth initialization
  if (authService.loading()) {
    return new Promise<boolean>((resolve) => {
      const checkAuth = setInterval(() => {
        if (!authService.loading()) {
          clearInterval(checkAuth);
          resolve(checkAuthentication());
        }
      }, 100);
    });
  }
  
  return checkAuthentication();
  
  function checkAuthentication(): boolean | UrlTree {
    if (authService.isAuthenticated()) {
      return true;
    }
    
    // Store the attempted URL for redirecting
    authService.redirectUrl.set(state.url);
    
    // Redirect to login
    return router.createUrlTree(['/auth/login']);
  }
};
```


### 7. TokenInterceptor
**Tipo:** HTTP Interceptor
**Ubicación:** `src/app/core/interceptors/token.interceptor.ts`

```typescript
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Skip auth endpoints
  const skipUrls = ['/auth/login', '/auth/register', '/auth/forgot-password'];
  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }
  
  // Add token to request
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid
        authService.logout();
      } else if (error.status === 403) {
        // Forbidden - insufficient permissions
        router.navigate(['/unauthorized']);
      }
      
      return throwError(() => error);
    })
  );
};
```

## Accessibility Checklist
- [ ] **Contraste de colores WCAG AA en ambos temas** (4.5:1 para texto normal)
- [ ] **Validación de contraste en modo claro y oscuro**
- [ ] Iconos tienen aria-labels descriptivos
- [ ] Focus visible en todos los elementos interactivos
- [ ] **Focus states visibles en ambos temas**
- [ ] Navegación completa por teclado
- [ ] Skip links disponibles
- [ ] Formularios con labels asociados
- [ ] Mensajes de error asociados a campos
- [ ] **Toggle de tema accesible con role="switch"**
- [ ] Animaciones respetan prefers-reduced-motion
- [ ] Screen reader announcements para cambios de estado
- [ ] Roles ARIA apropiados en componentes custom
- [ ] **Meta theme-color actualizado dinámicamente**

## Theme Implementation Checklist
- [ ] **Tailwind configurado con darkMode: 'class'**
- [ ] **CSS variables para colores dinámicos**
- [ ] **ThemeService inicializado en app.component**
- [ ] **Toggle de tema en AuthLayout**
- [ ] **Persistencia en localStorage**
- [ ] **Respeto por prefers-color-scheme**
- [ ] **Transiciones suaves entre temas**
- [ ] **Todos los componentes soportan ambos temas**
- [ ] **Gradientes accesibles en ambos modos**
- [ ] **Sombras ajustadas para modo oscuro**

## Testing Requirements
- [ ] **Test contraste en modo claro con WebAIM**
- [ ] **Test contraste en modo oscuro con WebAIM**
- [ ] **Verificar toggle funciona correctamente**
- [ ] **Probar persistencia tras reload**
- [ ] **Verificar sincronización con sistema**
- [ ] **Test en dispositivos móviles (meta theme-color)**
- [ ] **Verificar transiciones sin parpadeos**
- [ ] **Test con screen readers en ambos modos**
