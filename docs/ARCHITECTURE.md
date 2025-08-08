# Arquitectura - Sport Planner

## Stack
- Frontend: Angular 20 (standalone, signals), Tailwind CSS v4
- Backend: .NET 8 Web API
- DB: Supabase Postgres

## Principios
- Multi-tenant por organización
- Seguridad por roles (Admin, Director, Entrenador, Invitado)
- Clean Architecture en backend (capas: API, Application, Domain, Infrastructure)
- Lazy loading por feature en frontend
- Diseño con tokens CSS (oklch) y tema inline Tailwind v4

## Frontend
- Estructura por features (pages/*)
- Componentes standalone, changeDetection OnPush, signals para estado local
- Control flow moderno (@if, @for)

## Backend
- API REST con versionado, Swagger y validaciones
- Autenticación con Supabase Auth (JWT)
- Multi-tenant mediante OrganizationId en claims y filtros

## Integración
- Contrato OpenAPI en src/back/SportPlannerApi/swagger/v1/swagger.json

## Observabilidad
- Logging con Serilog
- Correlación de peticiones

