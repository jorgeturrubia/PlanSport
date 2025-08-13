# Feature: Sistema de Autenticación con Supabase

## Descripción
Sistema completo de autenticación end-to-end utilizando Supabase como proveedor de identidad, con JWT Bearer tokens, refresh tokens, y persistencia en localStorage. El sistema garantiza que solo las páginas de inicio y autenticación sean de acceso público, mientras que el resto de la aplicación requiere autenticación válida.

## Objetivos de Negocio
- Proteger toda la aplicación excepto landing y auth
- Implementar autenticación segura con JWT
- Mantener sesiones persistentes con refresh tokens
- Reducir fricción en el login con auto-refresh
- Cumplir con estándares de seguridad OAuth 2.0

## Entidades del Dominio
- **User**: Usuario autenticado con perfil y roles
- **Session**: Sesión activa con tokens JWT
- **AuthToken**: Token JWT con claims y expiración
- **RefreshToken**: Token para renovar sesión

## Componentes del Sistema

### Backend (.NET 8 API)
- Endpoints: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/verify`
- Servicios: AuthService, TokenService, SupabaseService
- Middleware: JwtAuthenticationMiddleware
- Validaciones: JWT Bearer token validation
- Integración: Supabase Admin SDK

### Frontend (Angular 20)
- Componentes: LoginComponent, RegisterComponent, AuthLayoutComponent
- Servicios: AuthService, TokenInterceptor, AuthGuard
- Guards: AuthGuard (CanActivate), PublicGuard
- Interceptors: TokenInterceptor (añade Bearer), ErrorInterceptor (401/403)
- **Iconos Font Awesome**: 
  - `faUser` (usuario)
  - `faLock` (contraseña) 
  - `faSignInAlt` (login)
  - `faUserPlus` (registro)
  - `faSpinner` (loading)
  - `faCheck` (éxito)
  - `faExclamationTriangle` (error)
  - `faSun` (modo claro)
  - `faMoon` (modo oscuro)

## Dependencias
- Supabase Auth para gestión de identidad
- JWT para tokens de acceso
- localStorage para persistencia client-side
- RxJS para manejo de estado reactivo

## Consideraciones de Seguridad
- Tokens JWT con expiración corta (15 min)
- Refresh tokens con expiración larga (7 días)
- HTTPS obligatorio en producción
- Validación de tokens en cada request
- Protección contra CSRF con SameSite cookies
- Rate limiting en endpoints de auth
- Sanitización de inputs

## Consideraciones de Accesibilidad
- Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- Navegación por teclado en formularios
- Screen reader compatible con aria-labels
- Mensajes de error descriptivos
- Focus visible en todos los campos
- Skip links en formularios largos
- **Modo oscuro/claro con contraste validado en ambos temas**
- **Persistencia de preferencia de tema en localStorage**
- **Respeto a prefers-color-scheme del sistema**
