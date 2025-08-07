# Tailwind CSS v4 Configuration Guide - SportPlanner

This guide documents the exact steps to configure Tailwind CSS v4 with Angular in the SportPlanner project.

## 📋 Prerequisites

- Node.js 18+
- Angular CLI 20.1.4+
- Angular project created

## 🚀 Installation Steps

### Step 1: Install Tailwind CSS v4 Dependencies

```bash
# Navigate to Angular project directory
cd src/front/SportPlanner/

# Install Tailwind CSS v4 with required dependencies
npm install tailwindcss @tailwindcss/postcss postcss --force
```

**Note**: The `--force` flag may be needed for Tailwind v4 compatibility.

### Step 2: Configure PostCSS

Create `.postcssrc.json` in the Angular project root:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### Step 3: Import Tailwind CSS

Update `src/styles.css`:

```css
@import "tailwindcss";

/* SportAgentoos Global Styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Custom component styles using Tailwind */
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
}
```

### Step 4: Test the Configuration

Start the development server:

```bash
npm start
# or
ng serve
```

The application should start at `http://localhost:4200` with Tailwind CSS working.

## ✅ Verification

### Development Server Test
- [ ] Server starts without errors
- [ ] Tailwind classes render correctly
- [ ] Hot reload works when changing CSS classes
- [ ] No console errors related to CSS processing

### Production Build Test
```bash
npm run build
```

- [ ] Build completes successfully  
- [ ] CSS is properly optimized and purged
- [ ] Bundle sizes are reasonable (~12kB CSS raw, ~3kB compressed)

## 🎨 Usage Examples

### Basic Utility Classes
```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Tailwind utilities work!
</div>
```

### Custom Components with @apply
```html
<button class="btn-primary">
  Custom Button
</button>
```

### Responsive Design
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
</div>
```

## 📁 File Structure

After setup, your Angular project should have:

```
src/front/SportPlanner/
├── .postcssrc.json          # PostCSS configuration
├── src/
│   └── styles.css           # Global styles with Tailwind imports
├── package.json             # Contains Tailwind dependencies
└── node_modules/
    ├── tailwindcss/         # Tailwind CSS v4
    └── @tailwindcss/postcss/ # PostCSS plugin
```

## 🐛 Common Issues

### Issue 1: "tailwindcss directly as a PostCSS plugin" Error
**Solution**: Use `@tailwindcss/postcss` plugin instead of direct `tailwindcss` in PostCSS config.

### Issue 2: CSS Not Loading
**Solution**: Ensure `.postcssrc.json` is in the Angular project root, not the workspace root.

### Issue 3: Styles Not Hot Reloading
**Solution**: Restart the development server after configuration changes.

## 🎯 Best Practices for SportPlanner

1. **Use utility-first approach**: Prefer Tailwind utilities over custom CSS
2. **Component abstraction**: Use `@apply` for frequently used component styles
3. **Responsive design**: Always design mobile-first with Tailwind breakpoints
4. **Custom colors**: Define sport-specific colors in future Tailwind config
5. **Performance**: Tailwind v4 automatically purges unused styles

## 🔄 Future Configuration

When more customization is needed, create `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sport: {
          primary: '#1e40af',
          secondary: '#3b82f6',
        }
      }
    }
  }
} satisfies Config;
```

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Angular + Tailwind Guide](https://tailwindcss.com/docs/guides/angular)
- [PostCSS Configuration](https://postcss.org/)

---

**Last Updated**: 2025-08-07  
**Tailwind Version**: 4.1.11  
**Angular Version**: 20.1.0  
**Status**: ✅ Working Configuration
