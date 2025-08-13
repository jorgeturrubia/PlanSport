# Progress Tracker - authentication

## Estado: EN_PROGRESO
## Última actualización: 2025-08-13

### ✅ Tareas Completadas
- [x] TASK-1.1: Setup .NET Project (commit: N/A - initial setup)
- [x] TASK-1.2: Configure JWT Authentication (commit: N/A)
- [x] TASK-1.3: Create Auth Controller (commit: N/A)
- [x] TASK-1.4: Implement Auth Service (commit: N/A)
- [x] TASK-1.5: Setup Rate Limiting (commit: N/A)
- [x] TASK-1.6: Add Logging & Auditing (commit: N/A)

### 🔄 En Progreso
- [ ] Phase 2: Frontend Angular

### ⏳ Pendientes
- [ ] Phase 3: Database Setup
- [ ] Phase 4: Integration & Testing
- [ ] Phase 5: Documentation & Polish

### 🐛 Issues Encontrados
- **Issue #1**: `run_shell_command` tool does not support un-registered sub-directory paths.
  - **Solución**: Used `--project` flag for `dotnet` commands to target specific project files from the root.
  - **Estado**: Resuelto ✅
- **Issue #2**: `dotnet add` command failed due to .NET version mismatch.
  - **Solución**: Specified exact compatible versions for each NuGet package.
  - **Estado**: Resuelto ✅

### 📝 Notas de Implementación
- Utilized the existing `.NET 8` project as a foundation.
- Added required NuGet packages for the entire authentication feature.
- Configured `appsettings.json` with placeholder values for Supabase and JWT.
- Implemented JWT validation in `Program.cs` using a symmetric key (`SymmetricSecurityKey`) from `appsettings.json` for initial setup simplicity.
- **TODO**: Refactor to use an asymmetric key by fetching the public key from the Supabase JWKS endpoint, which is more secure.
- Added a basic CORS policy for `http://localhost:4200`.
- Created `AuthController` with placeholder endpoints and request DTOs.
- Created `IAuthService` and `SupabaseAuthService` with actual Supabase client calls for login, register, refresh, and logout.
- Registered services and injected `IAuthService` into `AuthController`.
- Configured in-memory rate limiting using `AspNetCoreRateLimit`.
- Configured Serilog for structured logging to console and file.
