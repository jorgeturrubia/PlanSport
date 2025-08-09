---
id: checklists
title: Checklists
status: active
last_updated: 2025-08-08T08:13:21Z
owner: qa
---

# Checklists (PR y Release)

PR Web API
- [ ] Lint y tests pasan (frontend/backend).
- [ ] OpenAPI actualizado y publicado. Cliente TS regenerado.
- [ ] Errores usan `problem+json`; manejo uniforme en frontend.
- [ ] Seguridad: CORS por entorno; headers (HSTS, X-CTO, CSP).
- [ ] Docs actualizadas: spec de la feature (si aplica) y `Cambios recientes` en estándares.

Release
- [ ] Version etiquetada y changelog.
- [ ] Migraciones DB aplicadas y plan de rollback.
- [ ] Healthchecks y observabilidad verificados.
