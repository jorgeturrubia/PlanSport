# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Frontend: Angular 20 app at src/front/SportPlanner
- Backend: ASP.NET Core 8 API at src/back/SportPlanner/SportPlanner.Api

Common commands

Frontend (Angular)
- Install deps (uses package-lock.json):
  - cd src/front/SportPlanner
  - npm ci
- Start dev server (served at http://localhost:4200):
  - npm start
  - Notes: Proxies are not defined here; API base URL is controlled by src/front/SportPlanner/src/environments. Default dev API URL is https://localhost:7061
- Build (production by default per angular.json):
  - npm run build
  - Development build:
    - npx ng build --configuration development
- Unit tests (Karma/Jasmine):
  - npm test
  - Run a single spec file:
    - npx ng test --include src/app/<path>/<file>.spec.ts

Backend (ASP.NET Core)
- Restore, build, run API (https profile exposes https://localhost:7061 and http://localhost:5251):
  - cd src/back/SportPlanner/SportPlanner.Api
  - dotnet restore
  - dotnet build
  - dotnet run --launch-profile https
  - Alternate (http only): dotnet run --launch-profile http
- Swagger UI (enabled in Development):
  - https://localhost:7061/swagger

Linting/formatting
- No explicit lint target is configured in angular.json and no lint npm script exists. The project includes a Prettier configuration for HTML in package.json but no script. If needed for formatting only:
  - npx prettier --write "src/front/SportPlanner/src/**/*.html"

High-level architecture and integration

Frontend (Angular 20, standalone components)
- App location: src/front/SportPlanner/src
- Key areas
  - Core layer (src/app/core)
    - AuthService manages auth state using signals; stores tokens in localStorage; schedules refresh; builds API URLs from environment.apiUrl (src/environments)
    - token.interceptor attaches Bearer tokens to all requests except Auth endpoints and logs out on 401; redirects 403 to /unauthorized
    - auth.guard waits for initial auth initialization, preserves intended route in redirectUrl, and forces navigation to /auth/login if unauthenticated
  - Features (src/app/features)
    - auth feature contains forms and flows for login/register/forgot/reset/verify, and profile management (models define DTOs aligned with backend contracts)
    - landing and dashboard provide public landing and authenticated area scaffolding
  - Layout/shared provide navbar/sidebar and reusable UI
- Configuration
  - environment.ts (dev): apiUrl https://localhost:7061; also contains Supabase values for the front (if used client-side)
  - angular.json default build configuration is production; development build disables optimization and enables source maps

Backend (ASP.NET Core 8 Web API)
- Project: src/back/SportPlanner/SportPlanner.Api
- Core services and middleware
  - Serilog configured via appsettings for console and rolling file logs (logs/log-*.txt)
  - GlobalExceptionMiddleware centralizes exception handling
  - Rate limiting via AspNetCoreRateLimit, rules driven by appsettings (e.g., stricter limits on POST /api/auth/* endpoints)
  - CORS policy "DefaultPolicy" driven by appsettings.Cors (defaults allow http://localhost:4200)
  - Authentication/Authorization
    - JWT Bearer auth configured using Supabase:JwtSecret; issuer/audience from appsettings.Jwt
  - Swagger with Bearer security definition enabled in Development
- Auth domain
  - IAuthService with SupabaseAuthService implementation (Supabase client is initialized singleton)
  - Endpoints in Controllers/AuthController.cs
    - POST /api/auth/login, /register, /refresh, /forgot-password, /reset-password, /verify-email
    - GET /api/auth/verify
    - GET/PUT /api/auth/profile (authorized)
    - PUT /api/auth/change-password (authorized)
- Configuration sources
  - appsettings.json and appsettings.Development.json contain Serilog, CORS, rate-limiting, JWT, and Supabase settings
  - Program.cs fails fast if Supabase URL/keys are missing; override via environment variables if not using appsettings
    - Example variables: Supabase__Url, Supabase__AnonKey, Supabase__JwtSecret, Jwt__Issuer, Jwt__Audience
- Hosting
  - launchSettings.json defines https (7061) and http (5251) profiles; Development environment enables Swagger

Frontend-backend contract highlights
- Base URLs
  - Frontend uses environment.apiUrl and targets /api/Auth routes (capital A), aligning with backend route [Route("api/[controller]")] and class name AuthController
- Auth flow
  - Login/Register return accessToken, refreshToken, expiresIn, and user object; frontend stores tokens and schedules refresh ~1 minute before expiry
  - Interceptor skips auth endpoints when adding Authorization header, attaches Bearer token otherwise
  - 401 triggers logout and redirect to login; 403 redirects to /unauthorized

Development workflows
- Run both stacks locally
  - Terminal 1 (frontend):
    - cd src/front/SportPlanner
    - npm ci && npm start
  - Terminal 2 (backend):
    - cd src/back/SportPlanner/SportPlanner.Api
    - dotnet restore && dotnet run --launch-profile https
  - Navigate to http://localhost:4200; CORS is preconfigured to allow this origin
- Run a specific frontend spec
  - npx ng test --include src/app/features/landing/components/hero-section/hero-section.spec.ts

Repository docs and notes
- Frontend README (src/front/SportPlanner/README.md) includes standard Angular CLI quickstarts for serve/build/test
- Backend includes supabase-readme.md with links to Supabase C# docs; use those when extending Supabase integration

AgentPM Orchestrator (.agentpm/)
- Purpose: Entry-point orchestrator to drive documentation, specification, and development flows for the project
- Location: .agentpm/ (paths are relative to repo root)
- Quick inspection
  - pwd
  - ls -la
  - cat .agentpm/project/product.yaml 2>/dev/null || echo "No hay documentación aún"
- Flows
  - Documentar proyecto (Documentation Agent)
    - cat .agentpm/agents/documentation/agent.md
    - Produces: .agentpm/project/{product.yaml, stack.yaml, design.yaml}
  - Crear especificación para [feature] (Specification Agent)
    - Pre-req: .agentpm/project/product.yaml exists
    - cat .agentpm/agents/specification/agent.md
    - Output: .agentpm/specs/[feature]/{spec.yaml, tasks.yaml}
  - Desarrollar [feature] (Developer Agent)
    - Pre-req: specs in .agentpm/specs/
    - cat .agentpm/agents/development/agent.md
    - Tracking: .agentpm/progress/{current.yaml, completed.yaml} and .agentpm/logs/[date].md
  - Estado actual
    - cat .agentpm/progress/current.yaml
    - cat .agentpm/progress/completed.yaml
    - cat .agentpm/logs/$(date +%Y-%m-%d).md

Conventions and gotchas specific to this repo
- Route casing: Frontend and interceptor intentionally use "/api/Auth/..." (capital A) to match controller routing; be consistent to avoid mismatches
- Default Angular build target is production; use --configuration development while iterating to enable source maps and faster builds
- Secrets/config: While appsettings files include Supabase keys for development, prefer overriding via environment variables when running outside local dev
