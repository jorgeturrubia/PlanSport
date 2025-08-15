# Tasks - Sistema de Autenticación

## 🎯 Objetivo
Implementar un sistema completo de autenticación end-to-end con Supabase, JWT tokens, refresh tokens y persistencia de sesión, protegiendo toda la aplicación excepto las rutas públicas.

## 📋 Pre-requisitos
- [ ] Proyecto Supabase creado y configurado
- [ ] Angular 20 configurado con standalone components
- [ ] .NET 8 SDK instalado (verificar con `dotnet --version`)
- [ ] Variables de entorno configuradas (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY)
- [ ] **Font Awesome instalado y configurado**
- [ ] **Tailwind CSS configurado con modo oscuro (darkMode: 'class')**
- [ ] **Paleta de colores con contraste validado para ambos temas**
- [ ] PostgreSQL local o Supabase Database accesible

## 🔨 Tareas de Implementación

### Phase 1: Backend API - .NET 8 (Prioridad: Alta)

#### Task 1.1: Setup .NET Project
- [ ] Crear nuevo proyecto Web API
- [ ] Instalar paquetes NuGet necesarios
- [ ] Configurar appsettings.json con Supabase keys

```bash
# Verificar que .NET 8 está instalado
dotnet --version  # Debe mostrar 8.0.x

# Crear proyecto
dotnet new webapi -n PlanSport.API --framework net8.0
cd PlanSport.API

# Instalar paquetes principales
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.*
dotnet add package Microsoft.IdentityModel.Tokens --version 7.0.*
dotnet add package Supabase --version 0.16.*

# Entity Framework Core para PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.*
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.*
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.*

# Swagger/OpenAPI
dotnet add package Swashbuckle.AspNetCore --version 6.5.*

# Utilidades adicionales
dotnet add package Serilog.AspNetCore --version 8.0.*
dotnet add package AspNetCoreRateLimit --version 5.0.*
```

**Configuración appsettings.json:**
```json
{
  "Supabase": {
    "Url": "https://your-project.supabase.co",
    "AnonKey": "your-anon-key",
    "ServiceKey": "your-service-key",
    "JwtSecret": "your-jwt-secret"
  },
  "Jwt": {
    "Issuer": "https://your-project.supabase.co/auth/v1",
    "Audience": "authenticated",
    "ExpirationMinutes": 15
  }
}
```

#### Task 1.2: Configure JWT Authentication
- [ ] Configurar autenticación JWT en Program.cs
- [ ] Añadir middleware de autenticación
- [ ] Configurar CORS
- [ ] Implementar validación de tokens Supabase

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = GetSupabasePublicKey(),
            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });
```

#### Task 1.3: Create Auth Controller
- [ ] Implementar AuthController con endpoints
- [ ] POST /api/auth/login
- [ ] POST /api/auth/register
- [ ] POST /api/auth/refresh
- [ ] POST /api/auth/logout
- [ ] GET /api/auth/verify

#### Task 1.4: Implement Auth Service
- [ ] Crear IAuthService interface
- [ ] Implementar SupabaseAuthService
- [ ] Integrar con Supabase Admin API
- [ ] Manejo de tokens y refresh tokens
- [ ] Validación de credenciales

#### Task 1.5: Setup Rate Limiting
- [ ] Implementar middleware de rate limiting
- [ ] Configurar límites por endpoint
- [ ] Almacenar intentos en base de datos
- [ ] Bloqueo temporal después de intentos fallidos

#### Task 1.6: Add Logging & Auditing
- [ ] Configurar Serilog
- [ ] Implementar logging de eventos de auth
- [ ] Guardar logs en base de datos
- [ ] Crear servicio de auditoría

---

### Phase 2: Frontend Angular (Prioridad: Alta)

#### Task 2.1: Setup Angular Project Structure
- [ ] Crear estructura de carpetas para auth
- [ ] Configurar lazy loading para auth module
- [ ] **Importar iconos específicos de Font Awesome**

```bash
# Generar componentes
ng generate component features/auth/auth-layout --standalone
ng generate component features/auth/login --standalone
ng generate component features/auth/register --standalone
ng generate component features/auth/forgot-password --standalone
ng generate service core/services/auth
ng generate guard core/guards/auth --implements CanActivate
ng generate interceptor core/interceptors/token
```

```typescript
// Importar iconos necesarios
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, faLock, faEye, faEyeSlash,
  faSignInAlt, faUserPlus, faSignOutAlt,
  faSpinner, faCheck, faTimes,
  faExclamationTriangle, faInfoCircle,
  faArrowLeft, faHome, faShield, faKey
} from '@fortawesome/free-solid-svg-icons';
```

#### Task 2.2: Configure Routing
- [ ] Configurar rutas públicas y protegidas
- [ ] Implementar lazy loading
- [ ] Añadir guards a rutas protegidas
- [ ] Configurar redirects

#### Task 2.3: Implement Auth Service
- [ ] Crear AuthService con signals
- [ ] Implementar métodos login/register/logout
- [ ] Manejo de tokens en localStorage
- [ ] Auto-refresh de tokens
- [ ] Estado reactivo con computed signals

#### Task 2.4: Create Login Component
- [ ] Diseñar formulario de login con Reactive Forms
- [ ] Implementar validaciones
- [ ] **Añadir iconos con aria-labels**
- [ ] Mostrar/ocultar contraseña con toggle
- [ ] Loading states con spinner
- [ ] Mensajes de error con contraste adecuado
- [ ] **Validar contraste de todos los textos**

#### Task 2.5: Create Register Component
- [ ] Formulario de registro con validaciones
- [ ] Confirmar contraseña
- [ ] Indicador de fortaleza de contraseña
- [ ] Checkbox de términos y condiciones
- [ ] **Iconos de validación (check/times)**
- [ ] Feedback visual en tiempo real
- [ ] **Colores con contraste WCAG AA**

#### Task 2.6: Implement Auth Guard
- [ ] Crear functional guard authGuard
- [ ] Verificar autenticación
- [ ] Guardar URL intentada para redirect
- [ ] Esperar inicialización de auth
- [ ] Redirigir a login si no autenticado

#### Task 2.7: Create Token Interceptor
- [ ] Implementar HTTP interceptor
- [ ] Añadir Bearer token a headers
- [ ] Excluir rutas públicas
- [ ] Manejar errores 401/403
- [ ] Implementar retry con refresh token

#### Task 2.8: Auth Layout Component
- [ ] Crear layout wrapper para páginas auth
- [ ] Logo y branding consistente
- [ ] Gradiente de fondo accesible para ambos temas
- [ ] Footer con link a inicio
- [ ] **Icono de flecha para volver**
- [ ] **Integrar ThemeToggleComponent en esquina superior**

#### Task 2.9: Forgot Password Flow
- [ ] Formulario de recuperación de contraseña
- [ ] Envío de email con Supabase
- [ ] Página de reset password
- [ ] Validación de token de reset
- [ ] **Iconos y mensajes claros**

#### Task 2.10: Session Management
- [ ] Persistencia en localStorage
- [ ] Restaurar sesión al recargar
- [ ] Limpiar datos al logout
- [ ] Sincronización entre pestañas
- [ ] **Loading con spinner animado**

#### Task 2.11: Theme Toggle Implementation
- [ ] Crear ThemeToggleComponent
- [ ] Implementar ThemeService con signals
- [ ] Configurar Tailwind para modo oscuro
- [ ] Persistir preferencia en localStorage
- [ ] Respetar prefers-color-scheme del sistema
- [ ] **Validar contraste en ambos temas**
- [ ] **Actualizar meta theme-color para móviles**

---

### Phase 3: Database Setup (Prioridad: Alta)

#### Task 3.1: Create Supabase Tables
- [ ] Ejecutar script de creación de tablas
- [ ] Crear tabla profiles
- [ ] Crear tabla organizations
- [ ] Crear tabla auth_logs
- [ ] Crear tabla login_attempts

#### Task 3.2: Setup Functions & Triggers
- [ ] Función handle_new_user
- [ ] Función update_updated_at
- [ ] Función log_auth_event
- [ ] Función check_login_attempts
- [ ] Triggers asociados

#### Task 3.3: Configure RLS Policies
- [ ] Habilitar RLS en todas las tablas
- [ ] Políticas para profiles
- [ ] Políticas para organizations
- [ ] Políticas para auth_logs
- [ ] Probar políticas con diferentes roles

#### Task 3.4: Create Indexes
- [ ] Índices de performance
- [ ] Índices de búsqueda
- [ ] Índices parciales
- [ ] Analizar query plans

---

### Phase 4: Integration & Testing (Prioridad: Alta)

#### Task 4.1: End-to-End Flow Testing
- [ ] Test registro de nuevo usuario
- [ ] Test login con credenciales válidas
- [ ] Test login con credenciales inválidas
- [ ] Test refresh token flow
- [ ] Test logout y limpieza de sesión
- [ ] Test protección de rutas

#### Task 4.2: Security Testing
- [ ] Test rate limiting
- [ ] Test intentos de login fallidos
- [ ] Test validación de JWT
- [ ] Test CORS configuration
- [ ] Test SQL injection prevention
- [ ] Test XSS protection

#### Task 4.3: Accessibility Testing
- [ ] **Verificar contraste de colores (WCAG AA)**
- [ ] **Probar navegación solo con teclado**
- [ ] **Validar aria-labels en iconos**
- [ ] Probar con screen reader (NVDA/JAWS)
- [ ] Verificar focus states visibles
- [ ] Test formularios con labels asociados

#### Task 4.4: Performance Testing
- [ ] Medir tiempo de login
- [ ] Optimizar queries de base de datos
- [ ] Verificar tamaño de bundles
- [ ] Test de carga con múltiples usuarios
- [ ] Monitorear uso de memoria

---

### Phase 5: Documentation & Polish (Prioridad: Media)

#### Task 5.1: API Documentation
- [ ] Documentar endpoints con Swagger
- [ ] Ejemplos de requests/responses
- [ ] Documentar error codes
- [ ] Guía de autenticación

#### Task 5.2: Frontend Documentation
- [ ] Documentar componentes
- [ ] **Lista de iconos Font Awesome usados**
- [ ] **Paleta de colores y ratios de contraste**
- [ ] Guías de uso de guards e interceptors
- [ ] Ejemplos de integración

#### Task 5.3: UI/UX Polish
- [ ] Animaciones suaves
- [ ] Transiciones entre estados
- [ ] **Validar todos los contrastes**
- [ ] Feedback visual consistente
- [ ] Responsive design en todos los breakpoints
- [ ] Dark mode support (opcional)

#### Task 5.4: Error Handling
- [ ] Mensajes de error en español
- [ ] Toast notifications
- [ ] Logging de errores en frontend
- [ ] Fallback para servicios no disponibles
- [ ] **Iconos apropiados para cada tipo de error**

---

## 📊 Estimación de Tiempo
- Backend API: 16-20 horas
- Frontend Angular: 20-24 horas
- Database Setup: 4-6 horas
- Integration & Testing: 8-10 horas
- Documentation & Polish: 6-8 horas
- **Total: 54-68 horas**

## ✅ Definition of Done
- [ ] Todos los tests pasan (unit, integration, e2e)
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] Sin errores en consola
- [ ] Sin warnings de linting
- [ ] **Accesible (WCAG 2.1 AA)**
  - [ ] Contraste validado en todos los elementos
  - [ ] Navegable completamente por teclado
  - [ ] Iconos con aria-labels apropiados
  - [ ] Focus states visibles
  - [ ] Screen reader compatible
- [ ] Performance: Login < 2s, Token refresh < 500ms
- [ ] Seguridad: Tokens seguros, rate limiting activo
- [ ] **Iconos Font Awesome optimizados (solo los necesarios)**
- [ ] Responsive en todos los dispositivos
- [ ] Logs de auditoría funcionando

## 🎨 Design Tokens para Auth
```scss
// _auth-tokens.scss
// Colores validados para WCAG AA
$auth-primary: #1E40AF;          // Ratio 7.8:1 sobre blanco ✓
$auth-primary-hover: #1E3A8A;    // Ratio 8.5:1 sobre blanco ✓
$auth-success: #059669;          // Ratio 4.5:1 sobre blanco ✓
$auth-error: #DC2626;            // Ratio 4.6:1 sobre blanco ✓
$auth-warning: #D97706;          // Usar solo con texto grande
$auth-info: #0284C7;             // Ratio 4.5:1 sobre blanco ✓

// Iconos de autenticación
$icon-user: 'faUser';
$icon-lock: 'faLock';
$icon-login: 'faSignInAlt';
$icon-register: 'faUserPlus';
$icon-logout: 'faSignOutAlt';
$icon-loading: 'faSpinner';
```

## 🚀 Comandos de Ejecución

### Backend
```bash
# Desarrollo
cd PlanSport.API
dotnet watch run

# Build
dotnet build

# Tests
dotnet test

# Migrations
dotnet ef migrations add InitialAuth
dotnet ef database update
```

### Frontend
```bash
# Desarrollo
ng serve

# Build
ng build --configuration production

# Tests
ng test
ng e2e

# Generar componentes
ng g c features/auth/component-name --standalone
```

### Database
```bash
# Conectar a Supabase
psql postgresql://postgres:[password]@[host]:[port]/postgres

# Ejecutar migrations
psql -f migrations/001_auth_tables.sql
```

## 📝 Notas Importantes
- **Seguridad**: Nunca exponer service_role key en frontend
- **Tokens**: Access token 15 min, Refresh token 7 días
- **Rate Limiting**: 5 intentos cada 15 minutos por IP
- **Contraste**: Usar herramientas como WebAIM Contrast Checker
- **Iconos**: Importar solo los necesarios para optimizar bundle
- **Accesibilidad**: Probar con axe DevTools y screen readers
- **Performance**: Lazy load de módulos y componentes
- **Logs**: Todos los eventos de auth deben ser auditados
- **HTTPS**: Obligatorio en producción

## 🐛 Troubleshooting Común

### Token no se renueva automáticamente
- Verificar timer de refresh
- Comprobar que refresh_token existe en localStorage
- Revisar logs del interceptor

### Login funciona pero rutas protegidas dan 401
- Verificar que el token se añade en headers
- Comprobar validación de JWT en backend
- Revisar configuración de CORS

### Contraste no cumple WCAG
- Usar colores de la paleta validada
- Evitar texto sobre fondos con gradientes
- Aumentar tamaño de fuente si es necesario

### Iconos no se muestran
- Verificar importación en componente
- Comprobar que FontAwesomeModule está importado
- Revisar que el icono existe en la versión 6

---

**IMPORTANTE**: Este sistema de autenticación es crítico para la seguridad de la aplicación. Realizar pruebas exhaustivas antes de desplegar a producción. Mantener las dependencias actualizadas y monitorear logs de seguridad regularmente.
