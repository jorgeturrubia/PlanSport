# Guía Técnica de Implementación UX/UI - PlanSport

## 1. Configuración del Sistema de Diseño

### 1.1 Tailwind CSS Configuración Avanzada

```javascript
// tailwind.config.js - Configuración Premium
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e'
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -15px, 0)' },
          '70%': { transform: 'translate3d(0, -7px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%'
      },
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Plugin personalizado para glassmorphism
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}
```

### 1.2 CSS Variables Globales

```css
/* src/styles/variables.css */
:root {
  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* Tipografía */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  --transition-slower: 500ms ease;
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
  
  /* Bordes */
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-2xl: 1.5rem;
  --border-radius-full: 9999px;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

/* Modo oscuro */
[data-theme="dark"] {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.6);
}
```

## 2. Componentes Base Avanzados

### 2.1 Button Component Premium

```typescript
// src/app/shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'gradient';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rounded' | 'pill' | 'square';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick($event)"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
    >
      <span class="relative flex items-center justify-center gap-2">
        <!-- Loading Spinner -->
        <svg 
          *ngIf="loading" 
          class="animate-spin h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            class="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            stroke-width="4"
          ></circle>
          <path 
            class="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        
        <!-- Icon Left -->
        <i *ngIf="iconLeft && !loading" [class]="iconLeft" [class.text-sm]="size === 'xs' || size === 'sm'"></i>
        
        <!-- Content -->
        <span [class.opacity-0]="loading">
          <ng-content></ng-content>
        </span>
        
        <!-- Icon Right -->
        <i *ngIf="iconRight && !loading" [class]="iconRight" [class.text-sm]="size === 'xs' || size === 'sm'"></i>
      </span>
      
      <!-- Ripple Effect -->
      <span class="absolute inset-0 overflow-hidden rounded-inherit">
        <span class="ripple" [class.active]="rippleActive"></span>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() shape: ButtonShape = 'rounded';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() fullWidth = false;
  @Input() elevated = false;
  
  @Output() clicked = new EventEmitter<Event>();
  
  rippleActive = false;
  
  get buttonClasses(): string {
    const baseClasses = [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'overflow-hidden'
    ];
    
    // Size classes
    const sizeClasses = {
      xs: ['px-2', 'py-1', 'text-xs'],
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-sm'],
      lg: ['px-6', 'py-3', 'text-base'],
      xl: ['px-8', 'py-4', 'text-lg']
    };
    
    // Shape classes
    const shapeClasses = {
      rounded: ['rounded-lg'],
      pill: ['rounded-full'],
      square: ['rounded-none']
    };
    
    // Variant classes
    const variantClasses = {
      primary: [
        'bg-primary-600',
        'text-white',
        'hover:bg-primary-700',
        'focus:ring-primary-500/50',
        'active:bg-primary-800'
      ],
      secondary: [
        'bg-secondary-100',
        'text-secondary-900',
        'hover:bg-secondary-200',
        'focus:ring-secondary-500/50',
        'active:bg-secondary-300'
      ],
      success: [
        'bg-success-600',
        'text-white',
        'hover:bg-success-700',
        'focus:ring-success-500/50',
        'active:bg-success-800'
      ],
      warning: [
        'bg-warning-600',
        'text-white',
        'hover:bg-warning-700',
        'focus:ring-warning-500/50',
        'active:bg-warning-800'
      ],
      error: [
        'bg-error-600',
        'text-white',
        'hover:bg-error-700',
        'focus:ring-error-500/50',
        'active:bg-error-800'
      ],
      ghost: [
        'bg-transparent',
        'text-secondary-700',
        'hover:bg-secondary-100',
        'focus:ring-secondary-500/50',
        'active:bg-secondary-200'
      ],
      gradient: [
        'bg-gradient-to-r',
        'from-primary-600',
        'to-accent-600',
        'text-white',
        'hover:from-primary-700',
        'hover:to-accent-700',
        'focus:ring-primary-500/50'
      ]
    };
    
    const widthClasses = this.fullWidth ? ['w-full'] : [];
    const elevationClasses = this.elevated ? ['shadow-lg', 'hover:shadow-xl'] : [];
    
    return [
      ...baseClasses,
      ...sizeClasses[this.size],
      ...shapeClasses[this.shape],
      ...variantClasses[this.variant],
      ...widthClasses,
      ...elevationClasses
    ].join(' ');
  }
  
  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.createRipple(event);
      this.clicked.emit(event);
    }
  }
  
  private createRipple(event: Event): void {
    this.rippleActive = true;
    setTimeout(() => {
      this.rippleActive = false;
    }, 300);
  }
}
```

```css
/* src/app/shared/components/button/button.component.css */
.ripple {
  @apply absolute inset-0 bg-white/20 rounded-inherit;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.ripple.active {
  transform: scale(1);
  opacity: 1;
  animation: ripple-fade 0.3s ease forwards;
}

@keyframes ripple-fade {
  to {
    opacity: 0;
    transform: scale(1.1);
  }
}

/* Hover effects específicos */
button:hover .ripple {
  background: rgba(255, 255, 255, 0.1);
}

/* Focus visible para accesibilidad */
button:focus-visible {
  @apply ring-4 ring-offset-2;
}

/* Gradient animation */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
```

### 2.2 Card Component Avanzado

```typescript
// src/app/shared/components/card/card.component.ts
import { Component, Input, HostBinding } from '@angular/core';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-card',
  template: `
    <div [class]="cardClasses">
      <!-- Header -->
      <div *ngIf="hasHeader" class="card-header" [class]="headerClasses">
        <ng-content select="[slot=header]"></ng-content>
      </div>
      
      <!-- Body -->
      <div class="card-body" [class]="bodyClasses">
        <ng-content></ng-content>
      </div>
      
      <!-- Footer -->
      <div *ngIf="hasFooter" class="card-footer" [class]="footerClasses">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() padding: CardPadding = 'md';
  @Input() hoverable = false;
  @Input() clickable = false;
  @Input() loading = false;
  @Input() hasHeader = false;
  @Input() hasFooter = false;
  
  get cardClasses(): string {
    const baseClasses = [
      'relative',
      'overflow-hidden',
      'transition-all',
      'duration-300'
    ];
    
    const variantClasses = {
      default: [
        'bg-white',
        'border',
        'border-secondary-200',
        'rounded-xl',
        'shadow-sm'
      ],
      elevated: [
        'bg-white',
        'rounded-xl',
        'shadow-lg',
        'hover:shadow-xl'
      ],
      outlined: [
        'bg-transparent',
        'border-2',
        'border-secondary-300',
        'rounded-xl'
      ],
      glass: [
        'glass',
        'rounded-xl',
        'shadow-lg'
      ],
      gradient: [
        'bg-gradient-to-br',
        'from-primary-50',
        'to-accent-50',
        'border',
        'border-white/20',
        'rounded-xl',
        'shadow-lg'
      ]
    };
    
    const interactionClasses = [];
    if (this.hoverable) {
      interactionClasses.push('hover:scale-[1.02]', 'hover:shadow-xl');
    }
    if (this.clickable) {
      interactionClasses.push('cursor-pointer', 'active:scale-[0.98]');
    }
    
    const loadingClasses = this.loading ? ['animate-pulse'] : [];
    
    return [
      ...baseClasses,
      ...variantClasses[this.variant],
      ...interactionClasses,
      ...loadingClasses
    ].join(' ');
  }
  
  get headerClasses(): string {
    const paddingClasses = {
      none: [],
      sm: ['p-3'],
      md: ['p-4'],
      lg: ['p-6'],
      xl: ['p-8']
    };
    
    return [
      'border-b',
      'border-secondary-200',
      ...paddingClasses[this.padding]
    ].join(' ');
  }
  
  get bodyClasses(): string {
    const paddingClasses = {
      none: [],
      sm: ['p-3'],
      md: ['p-4'],
      lg: ['p-6'],
      xl: ['p-8']
    };
    
    return paddingClasses[this.padding].join(' ');
  }
  
  get footerClasses(): string {
    const paddingClasses = {
      none: [],
      sm: ['p-3'],
      md: ['p-4'],
      lg: ['p-6'],
      xl: ['p-8']
    };
    
    return [
      'border-t',
      'border-secondary-200',
      'bg-secondary-50',
      ...paddingClasses[this.padding]
    ].join(' ');
  }
}
```

### 2.3 Input Component con Validación Visual

```typescript
// src/app/shared/components/input/input.component.ts
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

@Component({
  selector: 'app-input',
  template: `
    <div class="input-group" [class]="groupClasses">
      <!-- Label -->
      <label 
        *ngIf="label" 
        [for]="inputId" 
        [class]="labelClasses"
      >
        {{ label }}
        <span *ngIf="required" class="text-error-500 ml-1">*</span>
      </label>
      
      <!-- Input Container -->
      <div class="relative">
        <!-- Icon Left -->
        <div *ngIf="iconLeft" class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i [class]="iconLeft" [class]="iconClasses"></i>
        </div>
        
        <!-- Input -->
        <input
          [id]="inputId"
          [type]="currentType"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [class]="inputClasses"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          [attr.aria-describedby]="ariaDescribedBy"
          [attr.aria-invalid]="isInvalid"
        />
        
        <!-- Icon Right / Password Toggle -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <!-- Password Toggle -->
          <button
            *ngIf="type === 'password'"
            type="button"
            class="text-secondary-400 hover:text-secondary-600 focus:outline-none"
            (click)="togglePasswordVisibility()"
            [attr.aria-label]="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          >
            <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
          
          <!-- Icon Right -->
          <i *ngIf="iconRight && type !== 'password'" [class]="iconRight" [class]="iconClasses"></i>
          
          <!-- Validation Icon -->
          <i *ngIf="showValidationIcon" [class]="validationIconClass" class="ml-2"></i>
        </div>
      </div>
      
      <!-- Helper Text -->
      <p *ngIf="helperText && !errorMessage" [class]="helperClasses">
        {{ helperText }}
      </p>
      
      <!-- Error Message -->
      <p *ngIf="errorMessage" [class]="errorClasses">
        <i class="fas fa-exclamation-circle mr-1"></i>
        {{ errorMessage }}
      </p>
      
      <!-- Success Message -->
      <p *ngIf="successMessage" [class]="successClasses">
        <i class="fas fa-check-circle mr-1"></i>
        {{ successMessage }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  styleUrls: ['./input.component.css']
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() variant: InputVariant = 'default';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  @Input() successMessage?: string;
  @Input() control?: AbstractControl;
  
  @Output() inputChange = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<void>();
  @Output() inputBlur = new EventEmitter<void>();
  
  value = '';
  focused = false;
  showPassword = false;
  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  private onChange = (value: string) => {};
  private onTouched = () => {};
  
  get currentType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }
  
  get isInvalid(): boolean {
    return !!(this.errorMessage || (this.control?.invalid && this.control?.touched));
  }
  
  get isValid(): boolean {
    return !!(this.successMessage || (this.control?.valid && this.control?.touched && this.value));
  }
  
  get showValidationIcon(): boolean {
    return this.isInvalid || this.isValid;
  }
  
  get validationIconClass(): string {
    if (this.isInvalid) {
      return 'fas fa-exclamation-circle text-error-500';
    }
    if (this.isValid) {
      return 'fas fa-check-circle text-success-500';
    }
    return '';
  }
  
  get ariaDescribedBy(): string {
    const ids = [];
    if (this.helperText) ids.push(`${this.inputId}-helper`);
    if (this.errorMessage) ids.push(`${this.inputId}-error`);
    if (this.successMessage) ids.push(`${this.inputId}-success`);
    return ids.join(' ');
  }
  
  // CSS Classes
  get groupClasses(): string {
    return 'space-y-1';
  }
  
  get labelClasses(): string {
    const baseClasses = [
      'block',
      'text-sm',
      'font-medium',
      'transition-colors',
      'duration-200'
    ];
    
    const stateClasses = [];
    if (this.isInvalid) {
      stateClasses.push('text-error-700');
    } else if (this.focused) {
      stateClasses.push('text-primary-700');
    } else {
      stateClasses.push('text-secondary-700');
    }
    
    return [...baseClasses, ...stateClasses].join(' ');
  }
  
  get inputClasses(): string {
    const baseClasses = [
      'block',
      'w-full',
      'border-2',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-4',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    ];
    
    // Size classes
    const sizeClasses = {
      sm: ['px-3', 'py-2', 'text-sm'],
      md: ['px-4', 'py-3', 'text-base'],
      lg: ['px-5', 'py-4', 'text-lg']
    };
    
    // Variant classes
    const variantClasses = {
      default: ['rounded-lg'],
      filled: ['rounded-lg', 'bg-secondary-50'],
      outlined: ['rounded-lg', 'bg-transparent']
    };
    
    // State classes
    const stateClasses = [];
    if (this.isInvalid) {
      stateClasses.push(
        'border-error-300',
        'focus:border-error-500',
        'focus:ring-error-500/20'
      );
    } else if (this.isValid) {
      stateClasses.push(
        'border-success-300',
        'focus:border-success-500',
        'focus:ring-success-500/20'
      );
    } else {
      stateClasses.push(
        'border-secondary-300',
        'focus:border-primary-500',
        'focus:ring-primary-500/20'
      );
    }
    
    // Icon padding
    const iconClasses = [];
    if (this.iconLeft) iconClasses.push('pl-10');
    if (this.iconRight || this.type === 'password' || this.showValidationIcon) {
      iconClasses.push('pr-10');
    }
    
    return [
      ...baseClasses,
      ...sizeClasses[this.size],
      ...variantClasses[this.variant],
      ...stateClasses,
      ...iconClasses
    ].join(' ');
  }
  
  get iconClasses(): string {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    
    return `text-secondary-400 ${sizeClasses[this.size]}`;
  }
  
  get helperClasses(): string {
    return 'text-sm text-secondary-600';
  }
  
  get errorClasses(): string {
    return 'text-sm text-error-600 flex items-center';
  }
  
  get successClasses(): string {
    return 'text-sm text-success-600 flex items-center';
  }
  
  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }
  
  onFocus(): void {
    this.focused = true;
    this.inputFocus.emit();
  }
  
  onBlur(): void {
    this.focused = false;
    this.onTouched();
    this.inputBlur.emit();
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

## 3. Servicios de Utilidad

### 3.1 Theme Service

```typescript
// src/app/core/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private themeSubject = new BehaviorSubject<Theme>('light');
  
  theme$ = this.themeSubject.asObservable();
  
  constructor() {
    this.initializeTheme();
  }
  
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const systemTheme = this.getSystemTheme();
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(systemTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.themeSubject.value === 'auto') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    
    if (theme === 'auto') {
      const systemTheme = this.getSystemTheme();
      this.applyTheme(systemTheme);
    } else {
      this.applyTheme(theme);
    }
  }
  
  private applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
    }
  }
  
  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
  
  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
```

### 3.2 Animation Service

```typescript
// src/app/core/services/animation.service.ts
import { Injectable, ElementRef } from '@angular/core';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  
  fadeIn(element: ElementRef, options: AnimationOptions = {}): Promise<void> {
    const defaultOptions = {
      duration: 300,
      delay: 0,
      easing: 'ease-out',
      fill: 'forwards' as const
    };
    
    const config = { ...defaultOptions, ...options };
    
    return new Promise((resolve) => {
      const animation = element.nativeElement.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], config);
      
      animation.onfinish = () => resolve();
    });
  }
  
  slideInUp(element: ElementRef, options: AnimationOptions = {}): Promise<void> {
    const defaultOptions = {
      duration: 400,
      delay: 0,
      easing: 'ease-out',
      fill: 'forwards' as const
    };
    
    const config = { ...defaultOptions, ...options };
    
    return new Promise((resolve) => {
      const animation = element.nativeElement.animate([
        { 
          opacity: 0, 
          transform: 'translateY(30px)' 
        },
        { 
          opacity: 1, 
          transform: 'translateY(0)' 
        }
      ], config);
      
      animation.onfinish = () => resolve();
    });
  }
  
  scaleIn(element: ElementRef, options: AnimationOptions = {}): Promise<void> {
    const defaultOptions = {
      duration: 250,
      delay: 0,
      easing: 'ease-out',
      fill: 'forwards' as const
    };
    
    const config = { ...defaultOptions, ...options };
    
    return new Promise((resolve) => {
      const animation = element.nativeElement.animate([
        { 
          opacity: 0, 
          transform: 'scale(0.9)' 
        },
        { 
          opacity: 1, 
          transform: 'scale(1)' 
        }
      ], config);
      
      animation.onfinish = () => resolve();
    });
  }
  
  staggeredAnimation(elements: ElementRef[], animationType: 'fadeIn' | 'slideInUp' | 'scaleIn', staggerDelay = 100): Promise<void[]> {
    const animations = elements.map((element, index) => {
      const delay = index * staggerDelay;
      
      switch (animationType) {
        case 'fadeIn':
          return this.fadeIn(element, { delay });
        case 'slideInUp':
          return this.slideInUp(element, { delay });
        case 'scaleIn':
          return this.scaleIn(element, { delay });
        default:
          return this.fadeIn(element, { delay });
      }
    });
    
    return Promise.all(animations);
  }
}
```

## 4. Directivas de Utilidad

### 4.1 Animate On Scroll Directive

```typescript
// src/app/shared/directives/animate-on-scroll.directive.ts
import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'animate-fade-in-up';
  @Input() threshold = 0.1;
  @Input() rootMargin = '0px';
  @Input() once = true;
  
  private observer?: IntersectionObserver;
  
  constructor(private element: ElementRef) {}
  
  ngOnInit(): void {
    this.createObserver();
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  private createObserver(): void {
    const options = {
      threshold: this.threshold,
      rootMargin: this.rootMargin
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.animationClass);
          
          if (this.once) {
            this.observer?.unobserve(entry.target);
          }
        } else if (!this.once) {
          entry.target.classList.remove(this.animationClass);
        }
      });
    }, options);
    
    this.observer.observe(this.element.nativeElement);
  }
}
```

### 4.2 Ripple Effect Directive

```typescript
// src/app/shared/directives/ripple.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {
  @Input() rippleColor = 'rgba(255, 255, 255, 0.3)';
  @Input() rippleDuration = 600;
  
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.overflow = 'hidden';
  }
  
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.createRipple(event);
  }
  
  private createRipple(event: MouseEvent): void {
    const element = this.element.nativeElement;
    const rect = element.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = this.rippleColor;
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = `ripple ${this.rippleDuration}ms linear`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, this.rippleDuration);
  }
}
```

## 5. Implementación de Mejoras Específicas

### 5.1 Landing Page Hero Section Mejorado

```typescript
// src/app/features/landing/components/hero-section/hero-section.component.ts
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AnimationService } from '../../../../core/services/animation.service';

@Component({
  selector: 'app-hero-section',
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 animate-gradient-x"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="floating-element absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div class="floating-element absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-float" style="animation-delay: 1s;"></div>
        <div class="floating-element absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style="animation-delay: 2s;"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <!-- Main Heading -->
          <h1 #mainHeading class="text-5xl md:text-7xl font-bold text-white leading-tight opacity-0">
            Planifica tu
            <span class="text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Entrenamiento
            </span>
            <br>
            Perfecto
          </h1>
          
          <!-- Subtitle -->
          <p #subtitle class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto opacity-0">
            Crea rutinas personalizadas, sigue tu progreso y alcanza tus objetivos fitness con la plataforma más avanzada.
          </p>
          
          <!-- CTA Buttons -->
          <div #ctaButtons class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
            <app-button 
              variant="gradient" 
              size="lg" 
              class="transform hover:scale-105 transition-transform duration-200"
            >
              <i class="fas fa-rocket mr-2"></i>
              Comenzar Gratis
            </app-button>
            
            <app-button 
              variant="ghost" 
              size="lg"
              class="text-white border-white hover:bg-white/10"
            >
              <i class="fas fa-play mr-2"></i>
              Ver Demo
            </app-button>
          </div>
          
          <!-- Features Preview -->
          <div #featuresPreview class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-0">
            <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-dumbbell text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Rutinas Personalizadas</h3>
              <p class="text-white/80">Entrenamientos adaptados a tu nivel y objetivos</p>
            </div>
            
            <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-chart-line text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Seguimiento Avanzado</h3>
              <p class="text-white/80">Monitorea tu progreso con métricas detalladas</p>
            </div>
            
            <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-users text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Comunidad Activa</h3>
              <p class="text-white/80">Conecta con otros atletas y entrenadores</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {
  @ViewChild('mainHeading') mainHeading!: ElementRef;
  @ViewChild('subtitle') subtitle!: ElementRef;
  @ViewChild('ctaButtons') ctaButtons!: ElementRef;
  @ViewChild('featuresPreview') featuresPreview!: ElementRef;
  
  constructor(private animationService: AnimationService) {}
  
  ngOnInit(): void {
    this.animateElements();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect
    if (this.mainHeading) {
      this.mainHeading.nativeElement.style.transform = `translateY(${rate}px)`;
    }
  }
  
  private async animateElements(): Promise<void> {
    // Staggered animation for all elements
    const elements = [
      this.mainHeading,
      this.subtitle,
      this.ctaButtons,
      this.featuresPreview
    ];
    
    await this.animationService.staggeredAnimation(elements, 'slideInUp', 200);
  }
}
```

### 5.2 CSS Personalizado para Efectos Avanzados

```css
/* src/app/features/landing/components/hero-section/hero-section.component.css */

/* Gradient Animation */
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}

/* Floating Elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(5px) rotate(-1deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 3s ease infinite;
}

/* Glass Effect Enhanced */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Hover Effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Button Enhancements */
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  transition: all 0.3s ease;
}

.btn-gradient:hover {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

/* Scroll Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Loading States */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
```

## 6. Optimización de Performance

### 6.1 Lazy Loading Inteligente

```typescript
// src/app/core/services/lazy-loading.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingService {
  private imageObserver?: IntersectionObserver;
  
  constructor() {
    this.initImageObserver();
  }
  
  private initImageObserver(): void {
    this.imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset['src'];
            
            if (src) {
              img.src = src;
              img.classList.remove('lazy');
              img.classList.add('loaded');
              this.imageObserver?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );
  }
  
  observeImage(img: HTMLImageElement): void {
    img.classList.add('lazy');
    this.imageObserver?.observe(img);
  }
}
```

### 6.2 Performance Monitoring

```typescript
// src/app/core/services/performance.service.ts
import { Injectable } from '@angular/core';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metrics: Partial<PerformanceMetrics> = {};
  
  constructor() {
    this.initPerformanceObserver();
  }
  
  private initPerformanceObserver(): void {
    // Observe FCP and LCP
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
        if (entry.entryType === 'largest-contentful-paint') {
          this.metrics.lcp = entry.startTime;
        }
      }
    }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    
    // Observe FID
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
      }
    }).observe({ entryTypes: ['first-input'] });
    
    // Observe CLS
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cls = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }
  
  logMetrics(): void {
    console.table(this.metrics);
  }
}
```

## 7. Testing y Calidad

### 7.1 Visual Regression Testing

```typescript
// src/app/testing/visual-regression.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from '../features/landing/components/hero-section/hero-section.component';

describe('Visual Regression Tests', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSectionComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
  });
  
  it('should match hero section snapshot', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
  
  it('should maintain responsive design', () => {
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];
    
    viewports.forEach(viewport => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: viewport.width
      });
      
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: viewport.height
      });
      
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      
      expect(fixture.nativeElement).toMatchSnapshot(`viewport-${viewport.width}x${viewport.height}`);
    });
  });
});
```

## 8. Deployment y Optimización

### 8.1 Build Optimization

```json
// angular.json - Configuración optimizada
{
  "projects": {
    "sport-planner": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/sport-planner",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "src/assets/images",
                "output": "/assets/images",
                "ignore": ["**/*.psd", "**/*.sketch"]
              }
            ],
            "styles": [
              "src/styles/variables.css",
              "src/styles.css"
            ],
            "scripts": [],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "2mb",
                "maximumError": "5mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "10kb"
              }
            ],
            "optimization": {
              "scripts": true,
              "styles": {
                "minify": true,
                "inlineCritical": true
              },
              "fonts": {
                "inline": true
              }
            },
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true
          }
        }
      }
    }
  }
}
```

### 8.2 PWA Configuration

```json
// src/manifest.json
{
  "name": "PlanSport - Planificador de Entrenamientos",
  "short_name": "PlanSport",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "./",
  "start_url": "./",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```

## 9. Conclusión

Esta guía técnica proporciona una base sólida para implementar una experiencia de usuario excepcional en PlanSport. Los componentes, servicios y configuraciones presentados están diseñados para:

- **Maximizar el rendimiento** con lazy loading y optimizaciones avanzadas
- **Garantizar la accesibilidad** con ARIA labels y navegación por teclado
- **Proporcionar feedback visual** con animaciones y micro-interacciones
- **Mantener la consistencia** a través de un sistema de diseño robusto
- **Facilitar el mantenimiento** con código modular y bien documentado

La implementación gradual de estas mejoras asegurará que PlanSport se convierta en una aplicación visualmente impresionante y altamente funcional que supere las expectativas de los usuarios
```

