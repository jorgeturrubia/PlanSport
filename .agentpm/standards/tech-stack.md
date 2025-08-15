# Tech Stack

## Context

Global tech stack defaults for Agent OS projects, overridable in project-specific `.agent-os/product/tech-stack.md`.

- Backend Framework: .NET 8+
- Language: C# 12+
- Runtime: .NET 8 Runtime
- Primary Database: Supabase (PostgreSQL)
- ORM: Entity Framework Core 8+
- Authentication: Supabase Auth
- Real-time: Supabase Realtime
- Storage: Supabase Storage
- Frontend Framework: Angular 20+
- TypeScript Version: 5.6+
- Build Tool: Angular CLI with esbuild
- Package Manager: npm
- Node Version: 22 LTS
- CSS Framework: TailwindCSS 4.0+
- UI Components: Angular Material 20+ or PrimeNG
- State Management: NgRx (for complex apps) or Angular Signals
- HTTP Client: Angular HttpClient with interceptors
- Font Provider: Google Fonts
- Font Loading: Self-hosted for performance
- Icons: Lucide Angular components or Material Icons
- Application Hosting: Vercel (Frontend) + Azure App Service (.NET API)
- Database Hosting: Supabase Cloud
- Database Backups: Supabase automated backups
- Asset Storage: Supabase Storage
- CDN: Vercel Edge Network + Supabase CDN
- Asset Access: Supabase Row Level Security (RLS)
- CI/CD Platform: GitHub Actions
- CI/CD Trigger: Push to main/staging branches
- Tests: .NET xUnit + Angular Jasmine/Karma
- Production Environment: main branch
- Staging Environment: staging branch
