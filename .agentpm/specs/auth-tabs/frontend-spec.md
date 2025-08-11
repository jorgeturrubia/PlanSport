# Frontend Specification - Auth Tabs Component

## Routing
```typescript
// app.routes.ts
{
  path: 'auth',
  loadComponent: () => import('./features/auth/auth-tabs/auth-tabs.component'),
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent }
  ]
}
```

## Design System

### Color Palette con Contraste Validado
```scss
// auth-colors.scss
$auth-colors: (
  // Primarios - PlanSport Brand
  'primary': #3B82F6,        // Azul principal - Contrast con blanco: 3.1:1 (usar texto grande)
  'primary-dark': #1E40AF,   // Azul oscuro - Contrast con blanco: 7.8:1 ✓
  'primary-light': #EFF6FF,  // Azul muy claro para fondos
  
  // Estados de validación
  'success': #059669,        // Verde - Contrast con blanco: 4.5:1 ✓
  'success-light': #D1FAE5,  // Verde claro para fondos
  'error': #DC2626,          // Rojo - Contrast con blanco: 4.6:1 ✓
  'error-light': #FEE2E2,    // Rojo claro para fondos
  'warning': #D97706,        // Amarillo - Contrast con blanco: 3.3:1 (texto grande)
  
  // Neutros para formularios
  'text-primary': #111827,   // Casi negro - Contrast con blanco: 16.1:1 ✓
  'text-secondary': #6B7280, // Gris medio - Contrast con blanco: 5.2:1 ✓
  'text-muted': #9CA3AF,     // Gris claro - Contrast con blanco: 3.0:1 (solo decorativo)
  'border': #E5E7EB,         // Borde de inputs
  'border-focus': #3B82F6,   // Borde en focus
  'background': #FFFFFF,     // Fondo principal
  'surface': #F9FAFB,        // Fondo de cards
  'overlay': rgba(0,0,0,0.5) // Para modales futuros
);

// Reglas de uso:
// - Texto pequeño (<18px): Ratio mínimo 4.5:1
// - Texto grande (≥18px bold o ≥24px): Ratio mínimo 3:1
// - Enlaces y botones: Siempre usar primary-dark para garantizar contraste
// - Mensajes de error: Usar error con texto blanco o error sobre error-light
```

### Font Awesome Icons Specification
```typescript
// auth-icons.ts
import {
  // Navegación y tabs
  faSignInAlt,    // Tab de login
  faUserPlus,     // Tab de registro
  faArrowLeft,    // Volver (futuro)
  
  // Campos de formulario
  faUser,         // Campo nombre
  faEnvelope,     // Campo email
  faLock,         // Campo contraseña
  faEye,          // Mostrar contraseña
  faEyeSlash,     // Ocultar contraseña
  
  // Deportes para selector
  faFutbol,       // Fútbol (default)
  faBasketballBall, // Basketball
  faSwimmer,      // Natación
  faRunning,      // Atletismo
  faDumbbell,     // Gimnasio
  
  // Estados y validación
  faCheck,        // Campo válido
  faExclamationTriangle, // Error/advertencia
  faInfoCircle,   // Información/ayuda
  faSpinner,      // Loading (futuro)
  
  // Acciones
  faSignInAlt as faLoginAction,  // Botón login
  faUserPlus as faRegisterAction, // Botón registro
} from '@fortawesome/free-solid-svg-icons';
```

## Components Structure

### 1. AuthTabsComponent (Container Principal)
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/auth/auth-tabs/`
**Descripción:** Contenedor principal que gestiona los tabs y el enrutamiento

**Template Structure:**
```html
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <img src="assets/logo.png" alt="PlanSport" class="h-16 mx-auto mb-2">
      <h1 class="text-2xl font-bold text-gray-900">PlanSport</h1>
      <p class="text-gray-600">Planificación deportiva inteligente</p>
    </div>
    
    <!-- Card Container -->
    <div class="bg-white rounded-lg shadow-xl overflow-hidden">
      <!-- Tabs Navigation -->
      <div class="flex border-b border-gray-200" role="tablist">
        <button 
          class="flex-1 py-4 px-6 text-center font-medium transition-colors"
          [class.bg-primary-dark]="activeTab() === 'login'"
          [class.text-white]="activeTab() === 'login'"
          [class.text-gray-600]="activeTab() !== 'login'"
          [attr.aria-selected]="activeTab() === 'login'"
          [attr.aria-controls]="'login-panel'"
          role="tab"
          (click)="switchTab('login')">
          <fa-icon [icon]="faSignInAlt" class="mr-2" [attr.aria-hidden]="true"></fa-icon>
          <span>Iniciar Sesión</span>
        </button>
        
        <button 
          class="flex-1 py-4 px-6 text-center font-medium transition-colors"
          [class.bg-primary-dark]="activeTab() === 'register'"
          [class.text-white]="activeTab() === 'register'"
          [class.text-gray-600]="activeTab() !== 'register'"
          [attr.aria-selected]="activeTab() === 'register'"
          [attr.aria-controls]="'register-panel'"
          role="tab"
          (click)="switchTab('register')">
          <fa-icon [icon]="faUserPlus" class="mr-2" [attr.aria-hidden]="true"></fa-icon>
          <span>Registrarse</span>
        </button>
      </div>
      
      <!-- Tab Panels -->
      <div class="p-6" role="tabpanel" [attr.id]="activeTab() + '-panel'">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
</div>
```

**Component Class:**
```typescript
@Component({
  selector: 'app-auth-tabs',
  imports: [CommonModule, RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './auth-tabs.component.html',
  styleUrl: './auth-tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthTabsComponent {
  private readonly router = inject(Router);
  
  // Icons
  readonly faSignInAlt = faSignInAlt;
  readonly faUserPlus = faUserPlus;
  
  // Signals
  readonly activeTab = signal<'login' | 'register'>('login');
  
  switchTab(tab: 'login' | 'register'): void {
    this.activeTab.set(tab);
    this.router.navigate(['/auth', tab]);
  }
}
```

### 2. LoginFormComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/auth/components/login-form/`
**Descripción:** Formulario de inicio de sesión

**Template Structure:**
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
  <!-- Email Field -->
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
      Correo electrónico
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon 
          [icon]="faEnvelope" 
          class="text-gray-400"
          [attr.aria-hidden]="true">
        </fa-icon>
      </div>
      <input
        id="email"
        type="email"
        formControlName="email"
        placeholder="tu@email.com"
        autocomplete="email"
        class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        [class.border-red-500]="emailControl.invalid && emailControl.touched"
        [class.border-green-500]="emailControl.valid && emailControl.touched"
        [attr.aria-invalid]="emailControl.invalid && emailControl.touched"
        [attr.aria-describedby]="emailControl.invalid && emailControl.touched ? 'email-error' : null">
      @if (emailControl.valid && emailControl.touched) {
        <fa-icon 
          [icon]="faCheck" 
          class="absolute right-3 top-3 text-green-500"
          [attr.aria-label]="'Campo válido'">
        </fa-icon>
      }
    </div>
    @if (emailControl.invalid && emailControl.touched) {
      <p id="email-error" class="mt-1 text-sm text-red-600" role="alert">
        <fa-icon [icon]="faExclamationTriangle" class="mr-1"></fa-icon>
        {{ getErrorMessage('email') }}
      </p>
    }
  </div>

  <!-- Password Field -->
  <div>
    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
      Contraseña
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon 
          [icon]="faLock" 
          class="text-gray-400"
          [attr.aria-hidden]="true">
        </fa-icon>
      </div>
      <input
        id="password"
        [type]="showPassword() ? 'text' : 'password'"
        formControlName="password"
        placeholder="••••••••"
        autocomplete="current-password"
        class="pl-10 pr-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        [class.border-red-500]="passwordControl.invalid && passwordControl.touched"
        [attr.aria-invalid]="passwordControl.invalid && passwordControl.touched"
        [attr.aria-describedby]="passwordControl.invalid && passwordControl.touched ? 'password-error' : null">
      <button
        type="button"
        class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        (click)="togglePassword()"
        [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'">
        <fa-icon [icon]="showPassword() ? faEyeSlash : faEye"></fa-icon>
      </button>
    </div>
    @if (passwordControl.invalid && passwordControl.touched) {
      <p id="password-error" class="mt-1 text-sm text-red-600" role="alert">
        <fa-icon [icon]="faExclamationTriangle" class="mr-1"></fa-icon>
        {{ getErrorMessage('password') }}
      </p>
    }
  </div>

  <!-- Remember Me & Forgot Password -->
  <div class="flex items-center justify-between">
    <label class="flex items-center">
      <input
        type="checkbox"
        formControlName="rememberMe"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
      <span class="ml-2 text-sm text-gray-600">Recordarme</span>
    </label>
    <a href="#" class="text-sm text-blue-600 hover:text-blue-800 underline">
      ¿Olvidaste tu contraseña?
    </a>
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    [disabled]="loginForm.invalid || isLoading()"
    class="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
    @if (isLoading()) {
      <fa-icon [icon]="faSpinner" class="animate-spin mr-2" [attr.aria-label]="'Cargando'"></fa-icon>
      <span>Iniciando sesión...</span>
    } @else {
      <fa-icon [icon]="faSignInAlt" class="mr-2" [attr.aria-hidden]="true"></fa-icon>
      <span>Iniciar Sesión</span>
    }
  </button>
</form>
```

**Component Class:**
```typescript
@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  
  // Icons
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faCheck = faCheck;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faSignInAlt = faSignInAlt;
  readonly faSpinner = faSpinner;
  
  // Signals
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  
  // Form
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });
  
  get emailControl() { return this.loginForm.get('email')!; }
  get passwordControl() { return this.loginForm.get('password')!; }
  
  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
  
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control?.errors) return '';
    
    const errors: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Formato de email inválido',
      minlength: `Mínimo ${control.errors['minlength']?.requiredLength} caracteres`
    };
    
    const firstError = Object.keys(control.errors)[0];
    return errors[firstError] || 'Campo inválido';
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) return;
    
    // Simulación visual de carga
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Login form submitted:', this.loginForm.value);
    }, 2000);
  }
}
```

### 3. RegisterFormComponent
**Tipo:** Standalone Component
**Ubicación:** `src/app/features/auth/components/register-form/`
**Descripción:** Formulario de registro con validación completa

**Template Structure:**
```html
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
  <!-- Name Field -->
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
      Nombre completo
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon [icon]="faUser" class="text-gray-400" [attr.aria-hidden]="true"></fa-icon>
      </div>
      <input
        id="name"
        type="text"
        formControlName="name"
        placeholder="Juan Pérez"
        autocomplete="name"
        class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
    </div>
  </div>

  <!-- Email Field -->
  <div>
    <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">
      Correo electrónico
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon [icon]="faEnvelope" class="text-gray-400" [attr.aria-hidden]="true"></fa-icon>
      </div>
      <input
        id="reg-email"
        type="email"
        formControlName="email"
        placeholder="tu@email.com"
        autocomplete="email"
        class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
    </div>
  </div>

  <!-- Sport Selector -->
  <div>
    <label for="sport" class="block text-sm font-medium text-gray-700 mb-1">
      Deporte principal
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon [icon]="getSportIcon()" class="text-gray-400" [attr.aria-hidden]="true"></fa-icon>
      </div>
      <select
        id="sport"
        formControlName="sport"
        class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none">
        <option value="">Selecciona un deporte</option>
        @for (sport of sports; track sport.value) {
          <option [value]="sport.value">{{ sport.label }}</option>
        }
      </select>
    </div>
  </div>

  <!-- Password Field with Strength Indicator -->
  <div>
    <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">
      Contraseña
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon [icon]="faLock" class="text-gray-400" [attr.aria-hidden]="true"></fa-icon>
      </div>
      <input
        id="reg-password"
        [type]="showPassword() ? 'text' : 'password'"
        formControlName="password"
        placeholder="Mínimo 8 caracteres"
        autocomplete="new-password"
        class="pl-10 pr-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
      <button
        type="button"
        class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        (click)="togglePassword()">
        <fa-icon [icon]="showPassword() ? faEyeSlash : faEye"></fa-icon>
      </button>
    </div>
    
    <!-- Password Strength Indicator -->
    @if (passwordControl.value) {
      <div class="mt-2">
        <div class="flex gap-1">
          @for (bar of [1,2,3,4]; track bar) {
            <div 
              class="h-1 flex-1 rounded"
              [class.bg-red-500]="passwordStrength() >= 1 && bar === 1"
              [class.bg-yellow-500]="passwordStrength() >= 2 && bar <= 2"
              [class.bg-green-500]="passwordStrength() >= 3 && bar <= 3"
              [class.bg-green-600]="passwordStrength() === 4 && bar === 4"
              [class.bg-gray-300]="passwordStrength() < bar">
            </div>
          }
        </div>
        <p class="text-xs mt-1" [class.text-red-600]="passwordStrength() === 1"
           [class.text-yellow-600]="passwordStrength() === 2"
           [class.text-green-600]="passwordStrength() >= 3">
          {{ getPasswordStrengthText() }}
        </p>
      </div>
    }
    
    <ul class="mt-2 text-xs text-gray-600 space-y-1">
      <li [class.text-green-600]="hasMinLength()">
        <fa-icon [icon]="hasMinLength() ? faCheck : faInfoCircle" class="mr-1"></fa-icon>
        Mínimo 8 caracteres
      </li>
      <li [class.text-green-600]="hasUppercase()">
        <fa-icon [icon]="hasUppercase() ? faCheck : faInfoCircle" class="mr-1"></fa-icon>
        Una mayúscula
      </li>
      <li [class.text-green-600]="hasLowercase()">
        <fa-icon [icon]="hasLowercase() ? faCheck : faInfoCircle" class="mr-1"></fa-icon>
        Una minúscula
      </li>
      <li [class.text-green-600]="hasNumber()">
        <fa-icon [icon]="hasNumber() ? faCheck : faInfoCircle" class="mr-1"></fa-icon>
        Un número
      </li>
      <li [class.text-green-600]="hasSpecial()">
        <fa-icon [icon]="hasSpecial() ? faCheck : faInfoCircle" class="mr-1"></fa-icon>
        Un carácter especial
      </li>
    </ul>
  </div>

  <!-- Confirm Password -->
  <div>
    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
      Confirmar contraseña
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <fa-icon [icon]="faLock" class="text-gray-400" [attr.aria-hidden]="true"></fa-icon>
      </div>
      <input
        id="confirmPassword"
        [type]="showConfirmPassword() ? 'text' : 'password'"
        formControlName="confirmPassword"
        placeholder="Repite la contraseña"
        autocomplete="new-password"
        class="pl-10 pr-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
      @if (confirmPasswordControl.value && passwordsMatch()) {
        <fa-icon 
          [icon]="faCheck" 
          class="absolute right-3 top-3 text-green-500"
          [attr.aria-label]="'Las contraseñas coinciden'">
        </fa-icon>
      }
    </div>
    @if (confirmPasswordControl.touched && !passwordsMatch() && confirmPasswordControl.value) {
      <p class="mt-1 text-sm text-red-600" role="alert">
        <fa-icon [icon]="faExclamationTriangle" class="mr-1"></fa-icon>
        Las contraseñas no coinciden
      </p>
    }
  </div>

  <!-- Terms Checkbox -->
  <div>
    <label class="flex items-start">
      <input
        type="checkbox"
        formControlName="acceptTerms"
        class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
      <span class="ml-2 text-sm text-gray-600">
        Acepto los <a href="#" class="text-blue-600 underline">términos y condiciones</a> 
        y la <a href="#" class="text-blue-600 underline">política de privacidad</a>
      </span>
    </label>
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    [disabled]="registerForm.invalid || isLoading()"
    class="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
    @if (isLoading()) {
      <fa-icon [icon]="faSpinner" class="animate-spin mr-2" [attr.aria-label]="'Creando cuenta'"></fa-icon>
      <span>Creando cuenta...</span>
    } @else {
      <fa-icon [icon]="faUserPlus" class="mr-2" [attr.aria-hidden]="true"></fa-icon>
      <span>Crear Cuenta</span>
    }
  </button>
</form>
```

**Component Class:**
```typescript
@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  
  // Icons
  readonly faUser = faUser;
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faEye = faEye;
  readonly faEyeSlash = faEyeSlash;
  readonly faCheck = faCheck;
  readonly faInfoCircle = faInfoCircle;
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faUserPlus = faUserPlus;
  readonly faSpinner = faSpinner;
  readonly faFutbol = faFutbol;
  readonly faBasketballBall = faBasketballBall;
  readonly faSwimmer = faSwimmer;
  readonly faRunning = faRunning;
  readonly faDumbbell = faDumbbell;
  
  // Signals
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly isLoading = signal(false);
  readonly passwordStrength = computed(() => this.calculatePasswordStrength());
  
  // Sports list
  readonly sports = [
    { value: 'futbol', label: 'Fútbol', icon: this.faFutbol },
    { value: 'basketball', label: 'Basketball', icon: this.faBasketballBall },
    { value: 'natacion', label: 'Natación', icon: this.faSwimmer },
    { value: 'atletismo', label: 'Atletismo', icon: this.faRunning },
    { value: 'gimnasio', label: 'Gimnasio', icon: this.faDumbbell }
  ];
  
  // Form
  readonly registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    sport: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  }, { validators: this.passwordMatchValidator });
  
  get passwordControl() { return this.registerForm.get('password')!; }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword')!; }
  
  // Password validation helpers
  hasMinLength = computed(() => (this.passwordControl.value?.length ?? 0) >= 8);
  hasUppercase = computed(() => /[A-Z]/.test(this.passwordControl.value ?? ''));
  hasLowercase = computed(() => /[a-z]/.test(this.passwordControl.value ?? ''));
  hasNumber = computed(() => /\d/.test(this.passwordControl.value ?? ''));
  hasSpecial = computed(() => /[@$!%*?&]/.test(this.passwordControl.value ?? ''));
  
  passwordsMatch(): boolean {
    return this.passwordControl.value === this.confirmPasswordControl.value;
  }
  
  calculatePasswordStrength(): number {
    let strength = 0;
    if (this.hasMinLength()) strength++;
    if (this.hasUppercase()) strength++;
    if (this.hasLowercase() && this.hasNumber()) strength++;
    if (this.hasSpecial()) strength++;
    return strength;
  }
  
  getPasswordStrengthText(): string {
    const texts = ['', 'Muy débil', 'Débil', 'Buena', 'Fuerte'];
    return texts[this.passwordStrength()];
  }
  
  getSportIcon(): any {
    const sport = this.sports.find(s => s.value === this.registerForm.get('sport')?.value);
    return sport?.icon || this.faFutbol;
  }
  
  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
  
  passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid) return;
    
    // Simulación visual
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Register form submitted:', this.registerForm.value);
    }, 2000);
  }
}
```

## Services

### AuthFormService (Visual State Management)
```typescript
@Injectable({ providedIn: 'root' })
export class AuthFormService {
  // Signals para estado visual
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  
  // Simulación de llamadas (para desarrollo visual)
  simulateLogin(credentials: any): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    setTimeout(() => {
      this.loadingSignal.set(false);
      console.log('Login simulado:', credentials);
    }, 1500);
  }
  
  simulateRegister(userData: any): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    setTimeout(() => {
      this.loadingSignal.set(false);
      console.log('Registro simulado:', userData);
    }, 1500);
  }
  
  clearError(): void {
    this.errorSignal.set(null);
  }
}
```

## Animations

```typescript
// auth.animations.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const authAnimations = {
  slideIn: trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
  ]),
  
  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms ease-in', style({ opacity: 1 }))
    ])
  ])
};
```

## Accessibility Checklist
- [ ] Todos los colores cumplen WCAG AA (4.5:1 para texto normal)
- [ ] Iconos tienen aria-labels descriptivos o aria-hidden cuando son decorativos
- [ ] Focus visible en todos los elementos interactivos (outline de 2px)
- [ ] Navegación completa por teclado (Tab, Shift+Tab, Enter, Arrow keys)
- [ ] Formularios con labels asociados correctamente
- [ ] Mensajes de error con role="alert" y asociados a campos
- [ ] Tabs con roles ARIA apropiados (tablist, tab, tabpanel)
- [ ] Estados de loading anunciados a screen readers
- [ ] Autocompletado habilitado para campos apropiados
- [ ] Botones deshabilitados con aria-disabled
- [ ] Contraste mantenido en estados hover y focus
