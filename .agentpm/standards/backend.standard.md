---
id: backend-standard
title: Backend Standard (.NET 8)
status: active
last_updated: 2025-08-08T08:13:21Z
owner: backend
---

# Backend Standard (.NET 8)

Convenciones esenciales
- API versioning: `/api/v{version}` con ASP.NET API Versioning.
- Endpoints: Minimal APIs o MVC según caso; validación con FluentValidation.
- Datos: EF Core + Npgsql; migraciones por bounded context; `snake_case` en PostgreSQL.
- Seguridad: Validar JWT de Supabase; CORS por entorno; security headers (HSTS, X-CTO, CSP).
- Observabilidad: OpenTelemetry (traces, metrics, logs) con export OTLP.

Estructura mínima sugerida
- `src/back/{Solution}/{Project}.Api` y `{Project}.Domain`/`{Project}.Infrastructure`.
- `/swagger/v1/swagger.json` publicado y versionado en CI.

Errores y contratos
- Respuestas de error `application/problem+json` uniformes.
- Mapeos DTO <-> dominio con Mapster/AutoMapper.

Cambios recientes
- 2025-08-08: Estándar inicial creado a partir de agentpm.yaml.
