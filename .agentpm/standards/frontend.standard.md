---
id: frontend-standard
title: Frontend Standard (Angular)
status: active
last_updated: 2025-08-08T08:13:21Z
owner: frontend
---

# Frontend Standard (Angular 20)

Convenciones esenciales
- Standalone components, signals y control-flow (@if/@for).
- Estructura por features: `src/app/features/{dominio}/...`.
- Estilos: Tailwind v4 + utilitarios SCSS por componente si es necesario. Tokens en `tailwind.config.js`.
- Cliente API: generado desde OpenAPI y envuelto en `ApiService` con interceptors (auth, retry, errores).
- i18n: `@angular/localize` con extracción en CI.
- Testing: unit con Jest/Vitest + testing-library; e2e con Playwright.

Estructura mínima sugerida
- `src/app/features/` por dominio (dashboard, auth, settings).
- `src/app/shared/` para utilidades, componentes y pipes reutilizables.
- `src/app/api/` para cliente generado y adaptadores.

Reglas de estilo
- Orden de imports consistente; evitar wildcard.
- Señales como estado de componente; stores por feature si el estado crece.
- Accesibilidad: roles/aria, focus management y contraste mínimo AA.

Cambios recientes
- 2025-08-08: Estándar inicial creado a partir de agentpm.yaml.
