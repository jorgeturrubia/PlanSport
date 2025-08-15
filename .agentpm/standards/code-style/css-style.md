# CSS Style Guide

## Context
CSS and TailwindCSS styling rules for Agent OS projects.

## Color System

We use Tailwind CSS v4 with OKLCH color space for better color consistency and modern browser support.

### Theme Configuration

- **Light Theme**: Default `:root` variables
- **Dark Theme**: `.dark` class modifier
- **Color Format**: OKLCH for all color values
- **Variable Naming**: Semantic naming (primary, secondary, accent, etc.)

### CSS Custom Properties

```css
:root {
  /* Light theme colors */
  --background: oklch(0.9842 0.0034 247.8575);
  --foreground: oklch(0.2795 0.0368 260.0310);
  --primary: oklch(0.5854 0.2041 277.1173);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.9276 0.0058 264.5313);
  --accent: oklch(0.9299 0.0334 272.7879);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --border: oklch(0.8717 0.0093 258.3382);
  --input: oklch(0.8717 0.0093 258.3382);
  --ring: oklch(0.5854 2041 277.1173);
  
  /* Typography */
  --font-sans: Inter, sans-serif;
  --font-serif: Merriweather, serif;
  --font-mono: JetBrains Mono, monospace;
  
  /* Spacing and Layout */
  --radius: 0.5rem;
  --spacing: 0.25rem;
}

.dark {
  /* Dark theme overrides */
  --background: oklch(0.2077 0.0398 265.7549);
  --foreground: oklch(0.9288 0.0126 255.5078);
  --primary: oklch(0.6801 0.1583 276.9349);
  --primary-foreground: oklch(0.2077 0.0398 265.7549);
  --secondary: oklch(0.3351 0.0331 260.9120);
  --border: oklch(0.4461 0.0263 256.8018);
  --input: oklch(0.4461 0.0263 256.8018);
}
```

### Tailwind v4 Integration

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

## Multi-line CSS classes in markup

- Use multi-line formatting for Tailwind CSS classes in HTML and Angular templates
- Each responsive breakpoint on its own line, ordered from smallest to largest
- Align classes vertically for readability
- Group interactive states (hover, focus) on separate lines
- Custom CSS classes at the beginning of the first line
- Use semantic color classes (bg-background, text-foreground, etc.)

### Responsive Breakpoints

- **xs**: 400px (custom breakpoint)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Example with OKLCH Colors

```html
<div class="custom-card bg-background text-foreground border-border p-4 rounded-lg w-full
            hover:bg-accent hover:text-accent-foreground
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            xs:p-6
            sm:p-8 sm:text-base
            md:p-10 md:text-lg
            lg:p-12 lg:text-xl lg:w-3/5
            xl:p-14 xl:text-2xl
            2xl:p-16 2xl:text-3xl 2xl:w-3/4">
  Content with semantic colors
</div>
```

### Angular-Specific Considerations

- Use ViewEncapsulation.None for global theme styles
- Implement theme toggle service for light/dark mode switching
- Apply `.dark` class to document body or root element
- Use Angular Material theming integration when applicable

### Color Usage Guidelines

- **background/foreground**: Main page colors
- **primary**: Main brand color for buttons, links
- **secondary**: Supporting elements, less prominent actions
- **accent**: Highlights, special elements
- **muted**: Subdued text, placeholders
- **destructive**: Error states, danger actions
- **border**: Dividers, input borders
- **input**: Form input backgrounds
- **ring**: Focus indicators
