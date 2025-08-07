# Tech Stack - SportAgentoos

## Application Architecture

**Architecture Pattern:** Full-Stack Web Application with SPA Frontend + REST API Backend  
**Deployment Model:** Cloud-native with separate frontend and backend services  
**Data Strategy:** PostgreSQL with Supabase managed services  

## Frontend Stack

**Application Framework:** Angular 20.1.0  
**Language:** TypeScript 5.8.2  
**UI Component Library:** Angular Material 20.1.4  
**CSS Framework:** TailwindCSS 4.1.11 ✅ INSTALLED  
**Build Tool:** Angular CLI with Webpack  
**State Management:** RxJS with Services pattern  
**Routing:** Angular Router with lazy loading  
**HTTP Client:** Angular HTTP Client  
**Testing:** Jasmine + Karma + Cypress (E2E)  

## Backend Stack

**Application Framework:** ASP.NET Core 8.0  
**Language:** C# with .NET 8.0  
**API Pattern:** REST API with OpenAPI/Swagger  
**Authentication:** JWT Bearer with Supabase Auth  
**Dependency Injection:** Built-in .NET DI Container  
**Testing:** xUnit with Moq  
**Documentation:** Swagger/OpenAPI 3.0  

## Database & Storage

**Database System:** PostgreSQL (via Supabase)  
**Database Hosting:** Supabase managed PostgreSQL  
**Authentication Provider:** Supabase Auth  
**File Storage:** Supabase Storage (future)  
**Database Migrations:** Supabase Migration system  
**Connection Library:** Entity Framework Core 9.0.8 + Npgsql 9.0.4 ✅ INSTALLED  

## Development Tools

**CSS Preprocessing:** PostCSS with Autoprefixer  
**Font Provider:** Google Fonts (Inter family)  
**Icon Library:** Angular Material Icons  
**Version Control:** Git  
**Package Managers:** npm (Frontend), NuGet (Backend)  

## Infrastructure & Deployment

**Application Hosting:** To be defined (Angular deployment)  
**API Hosting:** To be defined (ASP.NET Core deployment)  
**Database Hosting:** Supabase Cloud  
**Asset Hosting:** To be defined  
**Deployment Solution:** To be defined  
**Environment Management:** Angular environments + .NET Configuration  

## Security & Performance

**Authentication Flow:** Supabase Auth with JWT tokens  
**API Security:** JWT Bearer validation  
**CORS Configuration:** Configured for localhost development  
**Password Security:** Handled by Supabase Auth  
**Data Validation:** Angular Forms + ASP.NET Core Model Validation  

## Development Environment

**IDE Support:** Visual Studio Code, Visual Studio, JetBrains IDEs  
**Code Quality:** ESLint (Frontend), .NET Analyzers (Backend)  
**Formatting:** Prettier (Frontend), EditorConfig (Both)  
**Hot Reload:** Angular Dev Server + ASP.NET Core Watch  

## Third-Party Integrations

**Supabase Services:**
- Authentication and user management
- PostgreSQL database
- Real-time subscriptions (future)
- Row Level Security (RLS)

## Project Structure

```
SportAgentoos/
├── src/
│   ├── front/sport-agent-front/     # Angular application
│   ├── back/SportPlanner/           # ASP.NET Core API
│   ├── back/SportPlanner.Tests/     # Backend tests
│   └── tests/                       # Integration tests
├── supabase/                        # Database migrations
├── .agent-os/                       # Agent OS configuration
└── package.json                     # Root dependencies (TailwindCSS)
```

## Multi-Tenant Architecture

**Data Isolation:** Row Level Security (RLS) with organization-based filtering  
**User Management:** Supabase Auth with custom user profiles  
**Subscription Handling:** Custom subscription management system  
**Scalability:** Designed for horizontal scaling with cloud deployment  

## Performance Considerations

**Frontend:**
- Lazy loading for dashboard modules
- Angular OnPush change detection
- TailwindCSS purging for optimal bundle size
- Angular SSR for improved initial load

**Backend:**
- Async/await patterns throughout
- Efficient database queries with proper indexing
- Connection pooling via Supabase
- API response caching strategies (future)

## Version Requirements

- Node.js: 18+ (for Angular development)
- .NET: 8.0
- Angular CLI: 20.1.4+
- PowerShell: 5.1+ (Windows development)
- Supabase CLI: Latest (for database management)

## ✅ Infrastructure Setup Status (2025-08-07)

### Frontend Setup ✅ COMPLETED
- **Tailwind CSS v4.1.11**: Fully configured with Angular build system
- **PostCSS Integration**: Configured with @tailwindcss/postcss plugin
- **Hot Reload**: Working with Angular dev server (http://localhost:4200)
- **Production Optimization**: CSS purging and minification verified
- **Configuration Files**: 
  - `.postcssrc.json` - PostCSS configuration
  - `styles.css` - Tailwind imports and custom styles

### Backend Setup ✅ COMPLETED  
- **Entity Framework Core 9.0.8**: Fully configured with PostgreSQL support
- **Npgsql Provider 9.0.4**: PostgreSQL-specific EF Core provider installed
- **ApplicationDbContext**: Created with snake_case naming convention for PostgreSQL
- **Dependency Injection**: DbContext properly registered in Program.cs
- **CORS Configuration**: Configured for Angular frontend (http://localhost:4200)
- **Health Endpoints**: `/health` and `/health/database` for monitoring
- **Test Controller**: DatabaseTestController for EF Core verification
- **Development Server**: Running on https://localhost:7213 and http://localhost:5262

### Next Steps
- Connect to actual Supabase PostgreSQL instance
- Create initial database models (Teams, Players, Training, etc.)
- Set up Entity Framework migrations
- Implement authentication integration
- Create Angular components using new Tailwind setup
