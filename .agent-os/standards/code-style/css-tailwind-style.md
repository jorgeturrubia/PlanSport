# CSS & TailwindCSS 4 Style Guide para SportProyect

## Sistema de Theming con OKLCH
## instalation guide
Install Tailwind CSS with Angular
Setting up Tailwind CSS in an Angular project.

01
Create your project
Start by creating a new Angular project if you don’t have one set up already. The most common approach is to use Angular CLI.

Terminal
ng new my-project --style css
cd my-project
02
Install Tailwind CSS
Install @tailwindcss/postcss and its peer dependencies via npm.

Terminal
npm install tailwindcss @tailwindcss/postcss postcss --force
03
Configure PostCSS Plugins
Create a .postcssrc.json file in the root of your project and add the @tailwindcss/postcss plugin to your PostCSS configuration.

.postcssrc.json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
04
Import Tailwind CSS
Add an @import to ./src/styles.css that imports Tailwind CSS.

styles.css
@import "tailwindcss";
05
Start your build process
Run your build process with ng serve.

Terminal
ng serve
06
Start using Tailwind in your project
Start using Tailwind’s utility classes to style your content.

app.component.html
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
### Configuración Principal - styles.scss

```scss
// Importar Tailwind 4
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

// ========================================
// SISTEMA DE THEMING OKLCH PERSONALIZADO
// ========================================

:root {
  // Light Mode Colors (OKLCH)
  --background: oklch(0.9911 0 0);
  --foreground: oklch(0.2046 0 0);
  --card: oklch(0.9911 0 0);
  --card-foreground: oklch(0.2046 0 0);
  --popover: oklch(0.9911 0 0);
  --popover-foreground: oklch(0.4386 0 0);
  --primary: oklch(0.8348 0.1302 160.9080);
  --primary-foreground: oklch(0.2626 0.0147 166.4589);
  --secondary: oklch(0.9940 0 0);
  --secondary-foreground: oklch(0.2046 0 0);
  --muted: oklch(0.9461 0 0);
  --muted-foreground: oklch(0.2435 0 0);
  --accent: oklch(0.9461 0 0);
  --accent-foreground: oklch(0.2435 0 0);
  --destructive: oklch(0.5523 0.1927 32.7272);
  --destructive-foreground: oklch(0.9934 0.0032 17.2118);
  --border: oklch(0.9037 0 0);
  --input: oklch(0.9731 0 0);
  --ring: oklch(0.8348 0.1302 160.9080);
  
  // Chart Colors
  --chart-1: oklch(0.8348 0.1302 160.9080);
  --chart-2: oklch(0.6231 0.1880 259.8145);
  --chart-3: oklch(0.6056 0.2189 292.7172);
  --chart-4: oklch(0.7686 0.1647 70.0804);
  --chart-5: oklch(0.6959 0.1491 162.4796);
  
  // Sidebar Colors
  --sidebar: oklch(0.9911 0 0);
  --sidebar-foreground: oklch(0.5452 0 0);
  --sidebar-primary: oklch(0.8348 0.1302 160.9080);
  --sidebar-primary-foreground: oklch(0.2626 0.0147 166.4589);
  --sidebar-accent: oklch(0.9461 0 0);
  --sidebar-accent-foreground: oklch(0.2435 0 0);
  --sidebar-border: oklch(0.9037 0 0);
  --sidebar-ring: oklch(0.8348 0.1302 160.9080);
  
  // Typography
  --font-sans: Outfit, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: monospace;
  
  // Border Radius
  --radius: 0.5rem;
  
  // Shadows
  --shadow-2xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.09);
  --shadow-xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.09);
  --shadow-sm: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17);
  --shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17);
  --shadow-md: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 2px 4px -1px hsl(0 0% 0% / 0.17);
  --shadow-lg: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 4px 6px -1px hsl(0 0% 0% / 0.17);
  --shadow-xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 8px 10px -1px hsl(0 0% 0% / 0.17);
  --shadow-2xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.43);
  
  // Typography & Spacing
  --tracking-normal: 0.025em;
  --spacing: 0.25rem;
}

.dark {
  // Dark Mode Colors (OKLCH)
  --background: oklch(0.1822 0 0);
  --foreground: oklch(0.9288 0.0126 255.5078);
  --card: oklch(0.2046 0 0);
  --card-foreground: oklch(0.9288 0.0126 255.5078);
  --popover: oklch(0.2603 0 0);
  --popover-foreground: oklch(0.7348 0 0);
  --primary: oklch(0.4365 0.1044 156.7556);
  --primary-foreground: oklch(0.9213 0.0135 167.1556);
  --secondary: oklch(0.2603 0 0);
  --secondary-foreground: oklch(0.9851 0 0);
  --muted: oklch(0.2393 0 0);
  --muted-foreground: oklch(0.7122 0 0);
  --accent: oklch(0.3132 0 0);
  --accent-foreground: oklch(0.9851 0 0);
  --destructive: oklch(0.3123 0.0852 29.7877);
  --destructive-foreground: oklch(0.9368 0.0045 34.3092);
  --border: oklch(0.2809 0 0);
  --input: oklch(0.2603 0 0);
  --ring: oklch(0.8003 0.1821 151.7110);
  
  // Chart Colors - Dark
  --chart-1: oklch(0.8003 0.1821 151.7110);
  --chart-2: oklch(0.7137 0.1434 254.6240);
  --chart-3: oklch(0.7090 0.1592 293.5412);
  --chart-4: oklch(0.8369 0.1644 84.4286);
  --chart-5: oklch(0.7845 0.1325 181.9120);
  
  // Sidebar Colors - Dark
  --sidebar: oklch(0.1822 0 0);
  --sidebar-foreground: oklch(0.6301 0 0);
  --sidebar-primary: oklch(0.4365 0.1044 156.7556);
  --sidebar-primary-foreground: oklch(0.9213 0.0135 167.1556);
  --sidebar-accent: oklch(0.3132 0 0);
  --sidebar-accent-foreground: oklch(0.9851 0 0);
  --sidebar-border: oklch(0.2809 0 0);
  --sidebar-ring: oklch(0.8003 0.1821 151.7110);
  
  // Typography & other variables remain the same
  --font-sans: Outfit, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.09);
  --shadow-xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.09);
  --shadow-sm: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17);
  --shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 1px 2px -1px hsl(0 0% 0% / 0.17);
  --shadow-md: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 2px 4px -1px hsl(0 0% 0% / 0.17);
  --shadow-lg: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 4px 6px -1px hsl(0 0% 0% / 0.17);
  --shadow-xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.17), 0px 8px 10px -1px hsl(0 0% 0% / 0.17);
  --shadow-2xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.43);
}

// Tailwind Theme Inline Configuration
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}

// Global Styles
body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  letter-spacing: var(--tracking-normal);
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

// Scrollbar personalizado
html {
  scrollbar-width: thin;
  scrollbar-color: var(--muted-foreground) var(--muted);
}

html::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

html::-webkit-scrollbar-track {
  background-color: var(--muted);
}

html::-webkit-scrollbar-thumb {
  background-color: var(--muted-foreground);
  border-radius: calc(var(--radius) / 2);
}

html::-webkit-scrollbar-thumb:hover {
  background-color: var(--accent-foreground);
}
```

### tailwind.config.ts Actualizado

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.component.ts",
  ],
  darkMode: 'class', // Habilitado para clases .dark
  theme: {
    extend: {
      // Colores personalizados adicionales para deportes
      colors: {
        sport: {
          grass: '#22c55e',
          court: '#f97316', 
          pool: '#06b6d4',
          track: '#ef4444',
        },
        team: {
          home: 'var(--primary)',
          away: 'var(--destructive)',
          neutral: 'var(--muted-foreground)',
        }
      },
      // Spacings adicionales
      spacing: {
        '18': '4.5rem',
        '88': '22rem', 
        '128': '32rem',
      },
      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'theme-transition': 'themeTransition 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        themeTransition: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
```

## Estructura de Clases CSS

### Orden de Clases Tailwind

Siempre organiza las clases en este orden específico para mejor legibilidad:

```html
<!-- Orden recomendado -->
<div class="
  /* Layout */
  relative flex flex-col
  
  /* Sizing */
  w-full h-64 max-w-4xl
  
  /* Spacing */
  p-4 mx-auto my-8
  
  /* Typography */
  text-base font-medium text-gray-900
  
  /* Background & Borders */
  bg-white border border-gray-200 rounded-lg
  
  /* Effects & Transitions */
  shadow-md hover:shadow-lg transition-shadow duration-200
  
  /* Dark mode */
  dark:bg-gray-800 dark:border-gray-700 dark:text-white
">
  Content
</div>
```

### Componentes Reutilizables con Sistema de Theming

```css
/* styles.css - Componentes usando variables CSS personalizadas */
@layer components {
  /* ========================================
     BUTTONS - Usando variables de theming
     ======================================== */
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium;
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    font-family: var(--font-sans);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: var(--accent);
    box-shadow: var(--shadow-md);
  }
  
  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-primary {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
  }
  
  .btn-primary:hover {
    filter: brightness(0.9);
  }
  
  .btn-destructive {
    background-color: var(--destructive);
    color: var(--destructive-foreground);
    border-color: var(--destructive);
  }
  
  .btn-outline {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
  }
  
  .btn-outline:hover {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
  
  .btn-ghost {
    background-color: transparent;
    color: var(--foreground);
    border: none;
    box-shadow: none;
  }
  
  .btn-ghost:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }
  
  /* ========================================
     FORMS - Usando variables de theming
     ======================================== */
  .form-control {
    @apply block w-full px-3 py-2;
    background-color: var(--input);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-sans);
    transition: all 0.2s ease;
  }
  
  .form-control:focus {
    outline: none;
    border-color: var(--ring);
    box-shadow: 0 0 0 2px var(--ring), 0 0 0 4px oklch(from var(--ring) l c h / 0.1);
  }
  
  .form-control::placeholder {
    color: var(--muted-foreground);
  }
  
  .form-label {
    @apply block text-sm font-medium mb-2;
    color: var(--foreground);
    font-family: var(--font-sans);
  }
  
  .form-error {
    @apply mt-1 text-sm;
    color: var(--destructive);
  }
  
  .form-group {
    @apply mb-4;
  }
  
  /* ========================================
     CARDS - Usando variables de theming
     ======================================== */
  .card {
    background-color: var(--card);
    color: var(--card-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .card:hover {
    box-shadow: var(--shadow-lg);
  }
  
  .card-header {
    @apply px-6 py-4;
    border-bottom: 1px solid var(--border);
    background-color: var(--muted);
    color: var(--muted-foreground);
  }
  
  .card-body {
    @apply p-6;
  }
  
  .card-footer {
    @apply px-6 py-4;
    border-top: 1px solid var(--border);
    background-color: var(--muted);
    color: var(--muted-foreground);
  }
  
  /* ========================================
     BADGES - Usando variables de theming
     ======================================== */
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 text-xs font-medium;
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    border-radius: calc(var(--radius) * 2);
    font-family: var(--font-sans);
  }
  
  .badge-primary {
    background-color: oklch(from var(--primary) l c h / 0.1);
    color: var(--primary);
    border: 1px solid oklch(from var(--primary) l c h / 0.2);
  }
  
  .badge-success {
    background-color: oklch(0.8 0.1 142 / 0.1);
    color: oklch(0.4 0.15 142);
    border: 1px solid oklch(0.8 0.1 142 / 0.2);
  }
  
  .badge-warning {
    background-color: oklch(0.9 0.1 60 / 0.1);
    color: oklch(0.6 0.15 60);
    border: 1px solid oklch(0.9 0.1 60 / 0.2);
  }
  
  .badge-destructive {
    background-color: oklch(from var(--destructive) l c h / 0.1);
    color: var(--destructive);
    border: 1px solid oklch(from var(--destructive) l c h / 0.2);
  }
  
  /* ========================================
     TABLES - Usando variables de theming
     ======================================== */
  .table {
    @apply min-w-full;
    border-collapse: separate;
    border-spacing: 0;
    background-color: var(--card);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  
  .table-header {
    background-color: var(--muted);
  }
  
  .table-row {
    border-bottom: 1px solid var(--border);
    transition: background-color 0.2s ease;
  }
  
  .table-row:hover {
    background-color: var(--accent);
  }
  
  .table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm;
    color: var(--foreground);
  }
  
  .table-header .table-cell {
    color: var(--muted-foreground);
    font-weight: 600;
  }
  
  /* ========================================
     ALERTS - Usando variables de theming
     ======================================== */
  .alert {
    @apply p-4;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    font-family: var(--font-sans);
  }
  
  .alert-info {
    background-color: oklch(0.9 0.03 240 / 0.1);
    color: oklch(0.4 0.15 240);
    border-color: oklch(0.9 0.03 240 / 0.2);
  }
  
  .alert-success {
    background-color: oklch(0.8 0.1 142 / 0.1);
    color: oklch(0.3 0.15 142);
    border-color: oklch(0.8 0.1 142 / 0.2);
  }
  
  .alert-warning {
    background-color: oklch(0.9 0.1 60 / 0.1);
    color: oklch(0.5 0.15 60);
    border-color: oklch(0.9 0.1 60 / 0.2);
  }
  
  .alert-destructive {
    background-color: oklch(from var(--destructive) l c h / 0.1);
    color: var(--destructive);
    border-color: oklch(from var(--destructive) l c h / 0.2);
  }
  
  /* ========================================
     SIDEBARS - Usando variables específicas
     ======================================== */
  .sidebar {
    background-color: var(--sidebar);
    color: var(--sidebar-foreground);
    border-right: 1px solid var(--sidebar-border);
    font-family: var(--font-sans);
  }
  
  .sidebar-nav-item {
    @apply flex items-center px-4 py-2 text-sm;
    color: var(--sidebar-foreground);
    transition: all 0.2s ease;
    border-radius: calc(var(--radius) / 2);
  }
  
  .sidebar-nav-item:hover {
    background-color: var(--sidebar-accent);
    color: var(--sidebar-accent-foreground);
  }
  
  .sidebar-nav-item.active {
    background-color: var(--sidebar-primary);
    color: var(--sidebar-primary-foreground);
  }
  
  /* ========================================
     THEME TOGGLE - Componente específico
     ======================================== */
  .theme-toggle {
    @apply p-2;
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .theme-toggle:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
    box-shadow: var(--shadow-md);
  }
  
  .theme-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }
  
  /* ========================================
     COMPONENTES DEPORTIVOS ESPECÍFICOS
     ======================================== */
  .team-card {
    @extend .card;
    position: relative;
    overflow: hidden;
  }
  
  .team-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--chart-1), var(--chart-2));
  }
  
  .match-score {
    @apply text-4xl font-bold tabular-nums;
    color: var(--foreground);
    font-family: var(--font-mono);
  }
  
  .player-stat {
    @apply text-center p-4;
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.2s ease;
  }
  
  .player-stat:hover {
    background-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  /* ========================================
     CHARTS - Usando variables de chart
     ======================================== */
  .chart-container {
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .chart-title {
    color: var(--card-foreground);
    font-weight: 600;
    margin-bottom: 1rem;
    font-family: var(--font-sans);
  }
  
  /* Variables para gráficos */
  .chart-color-1 { color: var(--chart-1); }
  .chart-color-2 { color: var(--chart-2); }
  .chart-color-3 { color: var(--chart-3); }
  .chart-color-4 { color: var(--chart-4); }
  .chart-color-5 { color: var(--chart-5); }
}

@layer utilities {
  /* Text Utilities */
  .text-balance {
    text-wrap: balance;
  }
  
  /* Gradient Text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent;
  }
  
  /* Glass Effect */
  .glass {
    @apply bg-white/80 backdrop-blur-md border border-white/20 shadow-lg;
  }
  
  .dark .glass {
    @apply bg-gray-900/80 border-gray-700/50;
  }
  
  /* Scrollbar Styling */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.gray.400') theme('colors.gray.100');
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-gray-400 rounded-full dark:bg-gray-600;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500 dark:bg-gray-500;
  }
  
  /* Animation Utilities */
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* Focus Visible */
  .focus-visible-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900;
  }
}
```

## Patrones de Diseño Específicos

### Layout Patterns

```html
<!-- Container Pattern -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Full Width with Constrained Content -->
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Content -->
  </div>
</section>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Grid items -->
</div>

<!-- Flexbox Layout -->
<div class="flex flex-col lg:flex-row gap-8">
  <aside class="w-full lg:w-64 flex-shrink-0">
    <!-- Sidebar -->
  </aside>
  <main class="flex-1 min-w-0">
    <!-- Main content -->
  </main>
</div>
```

### Responsive Design Patterns

```html
<!-- Mobile-First Responsive Text -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<!-- Responsive Spacing -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <!-- Content with responsive padding -->
</div>

<!-- Responsive Grid with Container Queries -->
<div class="@container">
  <div class="grid @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    <!-- Items -->
  </div>
</div>

<!-- Hide/Show Elements -->
<nav class="hidden lg:flex">
  <!-- Desktop navigation -->
</nav>
<button class="lg:hidden">
  <!-- Mobile menu button -->
</button>
```

### Component-Specific Patterns

```html
<!-- Sports Team Card -->
<div class="card hover:shadow-xl transition-shadow duration-300">
  <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
    <img 
      src="team-logo.jpg" 
      alt="Team Name"
      class="object-contain p-4"
    />
  </div>
  <div class="card-body">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
      Team Name
    </h3>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
      City, Country
    </p>
    <div class="flex items-center gap-4 mt-4">
      <span class="badge badge-primary">Division A</span>
      <span class="text-sm text-gray-500">
        Founded 1950
      </span>
    </div>
  </div>
</div>

<!-- Match Score Display -->
<div class="bg-gradient-to-r from-team-home to-team-away p-1 rounded-lg">
  <div class="bg-white dark:bg-gray-900 rounded-md p-6">
    <div class="flex items-center justify-between">
      <div class="text-center">
        <img src="home-logo.jpg" class="w-16 h-16 mx-auto mb-2" />
        <h4 class="font-semibold">Home Team</h4>
      </div>
      <div class="text-center px-8">
        <div class="text-4xl font-bold tabular-nums">
          <span class="text-team-home">2</span>
          <span class="mx-2">-</span>
          <span class="text-team-away">1</span>
        </div>
        <p class="text-sm text-gray-500 mt-1">Final</p>
      </div>
      <div class="text-center">
        <img src="away-logo.jpg" class="w-16 h-16 mx-auto mb-2" />
        <h4 class="font-semibold">Away Team</h4>
      </div>
    </div>
  </div>
</div>

<!-- Player Stats Table -->
<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-cell text-left font-medium text-gray-900 dark:text-white">
          Player
        </th>
        <th class="table-cell text-center font-medium text-gray-900 dark:text-white">
          Goals
        </th>
        <th class="table-cell text-center font-medium text-gray-900 dark:text-white">
          Assists
        </th>
        <th class="table-cell text-center font-medium text-gray-900 dark:text-white">
          Points
        </th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      <tr class="table-row">
        <td class="table-cell">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full" src="player.jpg" alt="">
            <div class="ml-4">
              <div class="font-medium text-gray-900 dark:text-white">
                Player Name
              </div>
              <div class="text-gray-500 dark:text-gray-400">
                #10 • Forward
              </div>
            </div>
          </div>
        </td>
        <td class="table-cell text-center font-medium">15</td>
        <td class="table-cell text-center font-medium">8</td>
        <td class="table-cell text-center font-bold text-primary-600">23</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Dark Mode Patterns

```html
<!-- Always include dark mode variants -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- Content -->
</div>

<!-- Dark mode with different styling -->
<button class="
  bg-primary-600 hover:bg-primary-700 
  dark:bg-primary-500 dark:hover:bg-primary-400
  text-white font-medium
">
  Click me
</button>

<!-- Dark mode toggle button -->
<button 
  id="theme-toggle"
  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
>
  <!-- Light mode icon -->
  <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z"/>
  </svg>
  <!-- Dark mode icon -->
  <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
  </svg>
</button>
```

### Animation Patterns

```html
<!-- Hover Effects -->
<div class="
  transform transition-all duration-300 
  hover:scale-105 hover:-translate-y-1 hover:shadow-xl
">
  <!-- Card content -->
</div>

<!-- Loading States -->
<div class="animate-pulse">
  <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
  <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
</div>

<!-- Skeleton Loader -->
<div class="space-y-4">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-gray-300 dark:bg-gray-700 h-12 w-12"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
</div>

<!-- Smooth Transitions -->
<div class="
  transition-all duration-300 ease-in-out
  opacity-0 translate-y-4
  group-hover:opacity-100 group-hover:translate-y-0
">
  <!-- Hidden content revealed on hover -->
</div>
```

## Best Practices para CSS/Tailwind

1. **Mobile-First**: Siempre diseña para móvil primero
2. **Usa @apply con moderación**: Solo para componentes muy reutilizados
3. **Prefiere clases de utilidad**: Sobre CSS personalizado
4. **Agrupa clases relacionadas**: Para mejor legibilidad
5. **Usa variables CSS**: Para valores que cambien dinámicamente
6. **Optimiza para producción**: Purga clases no utilizadas
7. **Mantén consistencia**: En espaciado y tamaños
8. **Dark mode desde el inicio**: Diseña con ambos temas en mente
9. **Accesibilidad**: Asegura contraste adecuado
10. **Performance**: Evita animaciones costosas

## Variables CSS Personalizadas

```css
/* Global CSS Variables */
:root {
  /* Sport-specific colors */
  --color-grass: 34 197 94;
  --color-court: 249 115 22;
  --color-pool: 6 182 212;
  --color-track: 239 68 68;
  
  /* Spacing rhythm */
  --spacing-unit: 0.25rem;
  
  /* Animation timings */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
  
  /* Z-index scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Usage */
.custom-element {
  background-color: rgb(var(--color-grass) / 0.1);
  transition-duration: var(--transition-base);
  z-index: var(--z-modal);
}
```

## Convenciones de Nomenclatura CSS

1. **Clases de componentes**: Usa prefijos descriptivos
   - `.sport-card`, `.team-roster`, `.match-schedule`

2. **Estados**: Usa prefijos de estado
   - `.is-active`, `.is-loading`, `.has-error`

3. **Modificadores**: Usa guiones para variantes
   - `.btn-primary`, `.card-featured`, `.alert-success`

4. **Utilidades personalizadas**: Prefijo con `u-`
   - `.u-text-gradient`, `.u-shadow-sport`

5. **JavaScript hooks**: Prefijo con `js-`
   - `.js-modal-trigger`, `.js-tab-content`