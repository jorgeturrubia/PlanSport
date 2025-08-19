# Technical Stack

## Frontend Architecture

**Application Framework:** Angular 20.1.0  
**JavaScript Framework:** Angular (TypeScript-based)  
**State Management:** Angular Signals (reactive state management)  
**CSS Framework:** Tailwind CSS 4.1.12  
**UI Component Library:** Custom components with Lucide Angular icons  
**Import Strategy:** Node modules with Angular CLI build system  

## Backend Architecture

**Application Framework:** .NET 8 Web API  
**Database System:** Supabase (PostgreSQL)  
**Authentication:** Supabase Auth  
**API Architecture:** RESTful API with JWT token-based authentication  

## Development Tools

**Language:** TypeScript 5.8.2  
**Build System:** Angular CLI with Webpack  
**Testing Framework:** Jasmine & Karma  
**Code Quality:** ESLint, Prettier  
**Package Manager:** npm  

## UI/UX Components

**Fonts Provider:** System fonts with Tailwind CSS typography  
**Icon Library:** Lucide Angular (SVG icons)  
**Responsive Design:** Tailwind CSS utility-first approach  
**Theme System:** Custom dark/light mode implementation  

## Hosting & Deployment

**Application Hosting:** Not specified (recommend Vercel/Netlify for frontend)  
**Database Hosting:** Supabase (managed PostgreSQL)  
**Asset Hosting:** Integrated with application hosting  
**Deployment Solution:** Not specified (recommend CI/CD with GitHub Actions)  

## Development Environment

**Code Repository:** Git-based version control  
**Development Server:** Angular CLI dev server with SSR support  
**API Base URL:** https://localhost:7061/api (development)  
**Build Output:** Angular Universal (SSR-enabled)  

## Key Architectural Decisions

**Component Architecture:** Standalone components with lazy loading  
**Service Layer:** Injectable services with dependency injection  
**Error Handling:** Centralized error handling service  
**Route Guards:** Authentication and authorization guards  
**HTTP Interceptors:** Token management and request/response processing  

## Authentication Flow

**Provider:** Supabase Auth  
**Token Management:** JWT access/refresh token strategy  
**Session Management:** Persistent login with "remember me" functionality  
**Role-based Access:** Admin, Coach, User roles with granular permissions  

## Database Design

**ORM/Query Builder:** Supabase client libraries  
**Schema Management:** Supabase database migrations  
**Real-time Features:** Supabase real-time subscriptions (planned)  
**File Storage:** Supabase Storage for user uploads (planned)  

## Performance Optimizations

**Code Splitting:** Angular lazy loading for routes and components  
**SSR/Hydration:** Angular Universal for server-side rendering  
**Bundle Optimization:** Angular CLI production build optimizations  
**Caching Strategy:** HTTP interceptor-based caching (planned)

## Coding Standards

### Angular Component Architecture

**Template Separation:** Always separate TypeScript files (.ts) from HTML template files (.html) and CSS files (.css). Never use inline templates in the @Component decorator.  
**File Organization:** Each component should have separate files: component.ts, component.html, component.css  
**Template Structure:** Use external templateUrl and styleUrls properties instead of inline template and styles  
**Component Naming:** Follow Angular naming conventions with .component.ts, .component.html, .component.css suffixes  

### File Structure Example
```
my-component/
  ├── my-component.component.ts
  ├── my-component.component.html
  ├── my-component.component.css
  └── my-component.component.spec.ts
```

### Component Declaration Pattern
```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  imports: [CommonModule, ...]
})
export class MyComponent {
  // Component logic here
}
```