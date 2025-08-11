# 🚀 SportPlanner - Requerimientos e Instalación de Dependencias

## 📋 Estado Actual de los Proyectos

### ✅ Proyecto Angular (Frontend)
- **Ubicación**: `src/front/SportPlanner`
- **Estado**: Proyecto base creado con Angular 20.x
- **Dependencias básicas**: Instaladas

### ✅ Proyecto .NET (Backend)
- **Ubicación**: `src/back/SportPlanner`
- **Estado**: Proyecto WebAPI creado con .NET 8.0
- **Dependencias básicas**: Solo Swagger instalado

---

## 🎯 Frontend - Angular (SportPlanner)

### ⚡ Instalación Rápida con Script

```powershell
# Navegar al proyecto Angular
cd src/front/SportPlanner

# Ejecutar script de instalación (YA CREADO)
.\install-dependencies.ps1
```

### 📦 Dependencias a Instalar (Manual)

```bash
# Navegar al proyecto Angular
cd src/front/SportPlanner

# 1. UI & Styling - Tailwind CSS v4 (Next Generation)
npm install tailwindcss @tailwindcss/postcss postcss --force

# 2. Font Awesome (Iconos)
npm install @fortawesome/fontawesome-free @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons

# 3. Supabase (Autenticación y Base de Datos)
npm install @supabase/supabase-js

# 4. Angular CDK (Componentes avanzados)
npm install @angular/cdk

# 5. Angular Animations
npm install @angular/animations

# 6. Charts & Visualización
npm install chart.js ng2-charts

# 7. Utilidades de Fecha
npm install date-fns

# 8. Desarrollo - Linting & Formatting
npm install --save-dev eslint prettier @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser

# 9. Git Hooks
npm install --save-dev husky lint-staged

# 10. Testing E2E
npm install --save-dev @playwright/test
```

### ⚙️ Configuración de Tailwind CSS v4

#### ✅ Archivos Ya Configurados:

1. **`.postcssrc.json`** (✅ YA CREADO en `src/front/SportPlanner/.postcssrc.json`):
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

2. **`src/styles.css`** (✅ YA CONFIGURADO con Tailwind v4):
```css
/* SportPlanner Global Styles */

/* Tailwind CSS v4 */
@import "tailwindcss";

/* Font Awesome Icons (descomentarlo después de instalar) */
/* @import '@fortawesome/fontawesome-free/css/all.css'; */

/* Variables CSS personalizadas */
:root {
  --color-primary: #3B82F6;
  --color-secondary: #10B981;
  --color-destructive: #EF4444;
  --color-warning: #F59E0B;
  --color-muted: #64748B;
}
```

3. **Script de Instalación** (✅ YA CREADO en `src/front/SportPlanner/install-dependencies.ps1`):
   - Instala todas las dependencias de una vez
   - Ejecutar con: `.\install-dependencies.ps1`

4. **Opcional: Crear archivo `tailwind.config.js`** (solo si necesitas personalización avanzada):
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        destructive: '#EF4444',
        warning: '#F59E0B',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 📝 Notas Importantes sobre Tailwind CSS v4:

- ✅ **Configuración Simplificada**: No necesitas `tailwind.config.js` a menos que requieras personalización avanzada
- ✅ **PostCSS Simplificado**: Usa `@tailwindcss/postcss` en lugar de múltiples plugins
- ✅ **Import Único**: Solo necesitas `@import "tailwindcss";` en lugar de tres imports separados
- ✅ **Variables CSS**: Las variables personalizadas ya están configuradas en `src/styles.css`
- ✅ **Instalación con --force**: Necesario para resolver conflictos de dependencias con Angular 20

### 🔧 Configuración de Font Awesome

En `src/app/app.config.ts`:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Otros providers...
  ]
};
```

### 🔐 Configuración de Variables de Entorno

1. **Crear `src/environments/environment.ts`**:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

2. **Crear `src/environments/environment.prod.ts`**:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.sportplanner.com/api',
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

### 📝 Scripts de NPM a agregar en `package.json`:

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve --port 4200",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "test:coverage": "ng test --code-coverage",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,css,scss}\"",
    "prepare": "husky install",
    "pre-commit": "lint-staged"
  }
}
```

---

## 🎯 Backend - .NET 8 (SportPlanner.Api)

### 📦 Paquetes NuGet a Instalar

```bash
# Navegar al proyecto .NET
cd src/back/SportPlanner/SportPlanner.Api

# 1. Entity Framework Core con PostgreSQL
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.10
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.11
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.11

# 2. Autenticación JWT
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.11
dotnet add package System.IdentityModel.Tokens.Jwt --version 8.0.2

# 3. AutoMapper (Mapeo de objetos)
dotnet add package AutoMapper --version 13.0.1
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 13.0.1

# 4. FluentValidation (Validaciones)
dotnet add package FluentValidation --version 11.11.0
dotnet add package FluentValidation.AspNetCore --version 11.3.0

# 5. MediatR (Patrón CQRS)
dotnet add package MediatR --version 12.4.1

# 6. Serilog (Logging avanzado)
dotnet add package Serilog.AspNetCore --version 8.0.3
dotnet add package Serilog.Sinks.Console --version 6.0.0
dotnet add package Serilog.Sinks.File --version 6.0.0
dotnet add package Serilog.Sinks.PostgreSQL --version 2.3.0

# 7. Polly (Resiliencia y reintentos)
dotnet add package Microsoft.Extensions.Http.Polly --version 8.0.11

# 8. Health Checks
dotnet add package AspNetCore.HealthChecks.NpgSql --version 8.0.2
dotnet add package AspNetCore.HealthChecks.UI.Client --version 8.0.1

# 9. API Versioning
dotnet add package Microsoft.AspNetCore.Mvc.Versioning --version 5.1.0
dotnet add package Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer --version 5.1.0

# 10. CORS
# Ya incluido en .NET 8

# 11. Rate Limiting
dotnet add package AspNetCoreRateLimit --version 5.0.0

# 12. Cache
dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis --version 8.0.11

# 13. Testing
dotnet add package xunit --version 2.9.2
dotnet add package xunit.runner.visualstudio --version 2.8.2
dotnet add package Moq --version 4.20.72
dotnet add package FluentAssertions --version 6.12.2
dotnet add package Microsoft.AspNetCore.Mvc.Testing --version 8.0.11
```

### 🏗️ Estructura de Proyectos Recomendada (Clean Architecture)

```bash
# Crear proyectos adicionales para Clean Architecture
cd src/back/SportPlanner

# Domain Layer (Entidades y lógica de negocio)
dotnet new classlib -n SportPlanner.Domain -f net8.0

# Application Layer (Casos de uso, DTOs, Interfaces)
dotnet new classlib -n SportPlanner.Application -f net8.0

# Infrastructure Layer (Implementaciones, BD, Servicios externos)
dotnet new classlib -n SportPlanner.Infrastructure -f net8.0

# Agregar proyectos a la solución
dotnet sln add SportPlanner.Domain/SportPlanner.Domain.csproj
dotnet sln add SportPlanner.Application/SportPlanner.Application.csproj
dotnet sln add SportPlanner.Infrastructure/SportPlanner.Infrastructure.csproj

# Agregar referencias entre proyectos
cd SportPlanner.Application
dotnet add reference ../SportPlanner.Domain/SportPlanner.Domain.csproj

cd ../SportPlanner.Infrastructure
dotnet add reference ../SportPlanner.Domain/SportPlanner.Domain.csproj
dotnet add reference ../SportPlanner.Application/SportPlanner.Application.csproj

cd ../SportPlanner.Api
dotnet add reference ../SportPlanner.Application/SportPlanner.Application.csproj
dotnet add reference ../SportPlanner.Infrastructure/SportPlanner.Infrastructure.csproj
```

### ⚙️ Configuración del Program.cs

```csharp
using Serilog;
using SportPlanner.Application;
using SportPlanner.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File("logs/sportplanner-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);
    
    // Add Serilog
    builder.Host.UseSerilog();
    
    // Add services to the container
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    
    // Add CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAngular",
            builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
    });
    
    // Add Authentication
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
        });
    
    // Add DbContext
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    
    // Add AutoMapper
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    
    // Add MediatR
    builder.Services.AddMediatR(cfg => 
        cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
    
    // Add FluentValidation
    builder.Services.AddFluentValidationAutoValidation();
    
    // Add Health Checks
    builder.Services.AddHealthChecks()
        .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection"));
    
    // Add API Versioning
    builder.Services.AddApiVersioning();
    builder.Services.AddVersionedApiExplorer();
    
    var app = builder.Build();
    
    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    
    app.UseHttpsRedirection();
    app.UseCors("AllowAngular");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.MapHealthChecks("/health");
    
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```

### 📝 Configuración de appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=sportplanner;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Key": "YOUR_SECRET_KEY_HERE_MIN_32_CHARACTERS_LONG!!!",
    "Issuer": "SportPlannerAPI",
    "Audience": "SportPlannerClient",
    "ExpirationMinutes": 60
  },
  "AllowedHosts": "*"
}
```

---

## 🐘 Base de Datos PostgreSQL

### Instalación local con Docker:

```bash
# Crear y ejecutar contenedor PostgreSQL
docker run --name sportplanner-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=SportPlanner2024! \
  -e POSTGRES_DB=sportplanner \
  -p 5432:5432 \
  -d postgres:16-alpine

# Verificar que está corriendo
docker ps

# Conectar a la base de datos
docker exec -it sportplanner-db psql -U postgres -d sportplanner
```

### O usar Supabase (recomendado para desarrollo):
1. Crear cuenta en https://supabase.com
2. Crear nuevo proyecto
3. Obtener connection string y credenciales

---

## 🚀 Comandos de Inicio Rápido

### Frontend (Angular):
```powershell
cd src/front/SportPlanner

# Opción 1: Usar el script de instalación (recomendado)
.\install-dependencies.ps1

# Opción 2: Instalación manual
npm install

# Iniciar el proyecto
npm start
# Navegador: http://localhost:4200
```

### Backend (.NET):
```bash
cd src/back/SportPlanner/SportPlanner.Api
dotnet restore
dotnet build
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

---

## ✅ Checklist de Verificación

### Angular:
- [ ] Node.js v22.16.0 o superior instalado
- [ ] Angular CLI v20 instalado (`npm install -g @angular/cli`)
- [ ] Todas las dependencias npm instaladas
- [x] Tailwind CSS v4 configurado (`.postcssrc.json` y `styles.css` listos)
- [x] Script de instalación creado (`install-dependencies.ps1`)
- [ ] Font Awesome configurado (descomentar en `styles.css` después de instalar)
- [ ] Variables de entorno configuradas

### .NET:
- [ ] .NET SDK 8.0 instalado
- [ ] Todos los paquetes NuGet instalados
- [ ] PostgreSQL corriendo (Docker o Supabase)
- [ ] Connection string configurado
- [ ] JWT secret configurado

### Herramientas de Desarrollo:
- [ ] Visual Studio Code o Visual Studio 2022
- [ ] Extensiones recomendadas instaladas
- [ ] Git configurado
- [ ] Docker Desktop (opcional)

---

## 📚 Próximos Pasos

1. **Configurar la base de datos**:
   - Crear las migraciones iniciales con Entity Framework
   - Ejecutar las migraciones

2. **Implementar autenticación**:
   - Configurar Supabase en Angular
   - Implementar JWT en .NET

3. **Crear las entidades del dominio**:
   - Teams, Players, Planning, Objectives, etc.

4. **Implementar los primeros endpoints**:
   - CRUD básico para Teams
   - Autenticación y registro

5. **Crear los primeros componentes Angular**:
   - Layout principal
   - Login/Register
   - Dashboard

---

## 🆘 Troubleshooting

### Error: "Cannot find module '@angular/animations'"
```bash
npm install @angular/animations
```

### Error: "The framework 'Microsoft.NETCore.App', version '8.0.0' was not found"
```bash
# Instalar .NET 8 SDK desde:
# https://dotnet.microsoft.com/download/dotnet/8.0
```

### Error: "CORS policy blocking requests"
- Verificar que el puerto del frontend en CORS policy coincida
- Asegurarse de que `AllowCredentials()` está configurado si usas cookies

### Error: "PostgreSQL connection refused"
- Verificar que PostgreSQL está corriendo
- Verificar el connection string
- Verificar firewall/antivirus

---

## 📞 Soporte

Para cualquier problema durante la instalación, verificar:
1. Logs en la consola
2. Versiones de Node.js y .NET
3. Permisos de carpetas
4. Puertos disponibles (4200, 5000, 5432)
