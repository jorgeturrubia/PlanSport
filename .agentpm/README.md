# Agent-PM OneFile OS

Un sistema minimalista y profesional para orquestar stack, estándares y especificaciones con un único contrato (`agentpm.yaml`). Inspirado en la simplicidad tipo Stripe: 10–15 líneas definen QUÉ, CON QUÉ y CÓMO. Todo lo demás se genera y mantiene de forma guiada por agentes (LLM).

---

## Objetivos
- Programar rápido y con menos errores, respetando buenas prácticas.
- Elegir tecnologías/estilos/temas con 1 línea de configuración.
- Documentación mínima suficiente, siempre en los mismos sitios.
- Estándares vivos y recomendaciones que mejoran con el tiempo sin romper tu flujo.

---

## Concepto clave: OneFile OS
- Punto único de verdad: `.agentpm/agentpm.yaml`
- Agente "Tech Curator" lee ese contrato + kits y materializa:
  - `tech/stack.md` (mapa de stack)
  - `standards/*.standard.md` (cómo implementar)
  - `standards/checklists.md` (DoD operable)
  - `decisions/decisions.active.md` (decisiones vigentes)
- Agente "Product Spec" crea `product/specs/.../spec.md` para cada feature.
- Agente "Compliance Validator" comprueba que PR/Release cumplen las checklists.

---

## Estructura de directorios

```
.agentpm/
  agentpm.yaml                # Contrato mínimo (10–15 líneas)
  README.md                   # Este documento
  tech/
    stack.md                  # Resumen del stack vigente
  standards/
    frontend.standard.md      # Convenciones esenciales frontend
    backend.standard.md       # Convenciones esenciales backend
    checklists.md             # Checklists PR/Release
  decisions/
    decisions.active.md       # Decisiones vigentes (corto)
  product/
    specs/                    # Specs de features (se crean a demanda)
  profiles/
    README.md                 # El Curator genera tech.profile.json aquí
  kits/
    db/                       # Presets de bases de datos (postgres, supabase, ...)
    style/                    # Presets de estilos (tailwind, scss)
    theme/                    # Presets de paletas (default, dark)
  proposals/                  # Propuestas de mejora (no aplican sin aprobación)
  templates/
    spec.template.md          # Plantilla de especificación de feature
    adr.template.md           # Plantilla de decisión arquitectónica
```

---

## Guía de inicio rápido (3 pasos)

**1) Edita `agentpm.yaml` (elige stack/estilo/tema/checklist)**

```yaml
agent: v1
product: "Agent OS"
stack:
  frontend: angular@20
  backend: dotnet@8
  db: supabase-postgres
frontend_style: tailwind@4
theme: default
standards: minimal   # minimal | strict
openapi: src/back/SportPlannerApi/swagger/v1/swagger.json
checklist: web-api   # web-api | web-app | lib
```

**2) Materializa (Tech Curator)**
- Genera/actualiza: `tech/stack.md`, `standards/*`, `decisions/decisions.active.md` y `profiles/tech.profile.json`.
- Si hay recomendaciones nuevas, crea `proposals/*` con diffs y justificación.

**3) Especifica una feature (Product Spec)**
- Crea `product/specs/AAAA-MM-DD-nombre/spec.md` usando `templates/spec.template.md`.
- Opcional: genera `tasks.md` con plan ejecutable.

---

## Instalación (conceptual)

No hay build/instalación pesada. Solo:
- Tener este directorio `.agentpm` en tu repo.
- Editar `agentpm.yaml`.
- Invocar a los agentes (Curator, Product, Validator) desde tu flujo (CLI/acciones personalizadas/LLM).

**Sugerencia (scripts opcionales):**
- `npm run agent:curate` → dispara Curator
- `npm run agent:spec` → crea spec desde plantilla
- `npm run agent:validate` → ejecuta Validator (lint, openapi, checklists)

---

## Uso típico

- **Cambiar stack o estilo:** edita 1 línea en `agentpm.yaml` (p. ej., tailwind → scss, theme default → dark).
- **Curator** regenera estándares/checklists y perfila decisiones en `profiles/tech.profile.json`.
- **Product Spec** crea una spec de feature clara y accionable.
- **Implementas** siguiendo `standards/*` y cierras PR cumpliendo `standards/checklists.md`.

---

## Extensión con kits (presets)

Los kits son JSONs declarativos que afinan el stack sin modificar el contrato simple.

- **Ruta:** `.agentpm/kits/{categoria}/{kit}.json`
- **Ejemplos incluidos:**
  - `kits/db/postgres.json`, `kits/db/supabase.json`
  - `kits/style/tailwind.json`, `kits/style/scss.json`
  - `kits/theme/default.json`, `kits/theme/dark.json`

**Cuándo añadir kits:**
- Base de datos nueva (mongodb, mssql, prisma)
- Estilo/tema/UI nuevo (css-modules, material, shadcn)
- Autenticación (auth0, azure-ad)
- Observabilidad (opentelemetry), testing (vitest/xunit), infra (docker-compose/k8s), i18n, analytics, payments (stripe), etc.

**Ejemplo de kit:**
```json
// .agentpm/kits/api/openapi-ts.json
{
  "generator": "openapi-typescript",
  "output": "src/app/api",
  "httpClient": "fetch",
  "transformers": ["nullables", "dates"]
}
```

**El Curator leerá este kit y:**
- Ajustará estándares (sección de cliente API).
- Sugerirá scripts en package.json (p. ej., `api:gen`).
- Actualizará checklists ("OpenAPI actualizado y cliente regenerado").

---

## Referencia del contrato (agentpm.yaml)

**Campos soportados (MVP):**
- `agent`: versión del esquema (ej. v1)
- `product`: nombre del producto
- `stack.frontend`: (ej. angular@20)
- `stack.backend`: (ej. dotnet@8)
- `stack.db`: (ej. supabase-postgres | postgres | mongodb)
- `frontend_style`: (tailwind@4 | scss)
- `theme`: (default | dark | {custom})
- `standards`: (minimal | strict)
- `openapi`: ruta/patrón al JSON
- `checklist`: (web-api | web-app | lib)

**Futuros campos (opcionales):**
- `extras.kits`: lista explícita de kits adicionales a aplicar
- `compatibility`: restricciones de versiones

---

## Perfiles y decisiones

- `profiles/tech.profile.json`: decisiones resueltas máquina-a-máquina (generado por Curator).
- `decisions/decisions.active.md`: lista humana de decisiones vigentes con consecuencias breves.
- `proposals/*`: propuestas de mejora (no se aplican sin tu aprobación).

---

## Checklists (calidad operable)

En `standards/checklists.md` encontrarás listas breves para PR y Release. Ejemplos:
- **PR Web API:** lint/tests, OpenAPI actualizado + cliente TS, errores `problem+json`, CORS/headers, doc mínima al día.
- **Release:** tag + changelog, migraciones + rollback, healthchecks/observabilidad.

---

## Plantillas

- `templates/spec.template.md`: especificación de feature (Contexto, Alcance, Criterios, Interfaces, Riesgos, Validación).
- `templates/adr.template.md`: decisiones arquitectónicas (Contexto, Decisión, Consecuencias, Alternativas).

---

## Ejemplos de flujo

**1) Cambiar de tema:**
- Edita `theme: dark` en `agentpm.yaml`.
- Ejecuta Curator → actualizará estándares que referencian tokens/tema y propondrá ajustes CSS/Tailwind.

**2) Cambiar de estilo:**
- Edita `frontend_style: scss`.
- Curator actualiza `frontend.standard.md` (desactiva Tailwind, añade 7-1 SCSS si el kit lo define) y checklists.

**3) Cambiar de DB:**
- Edita `stack.db: postgres` o añade un kit `kits/db/mongodb.json` y referencia futura en `extras.kits`.
- Curator actualiza `backend.standard.md` (ORM/ODM, naming, migraciones) y propone cambios.

---

## Buenas prácticas al extender

- Mantén los kits pequeños y declarativos; evita lógica.
- Versiona kits sensibles: `{ "name": "tailwind", "version": 4 }`.
- Añade una línea `about` si el kit no es obvio.
- No sustituyas estándares vigentes sin pasar por `proposals/`.

---

## FAQ

- **¿Necesito kits para Angular 20 + .NET 8 + Supabase?** No. Ya están cubiertos (hay kits de db/estilo/tema opcionales).
- **¿Qué pasa si falta `agentpm.yaml`?** Usa `README.md` como fallback y las rutas por convención; preferible siempre crear el YAML.
- **¿Puedo usarlo en varios repos?** Sí. Copia `.agentpm` y ajusta `agentpm.yaml` por repo.

---

## Roadmap (sugerido)

- `extras.kits` en `agentpm.yaml` para activar kits adicionales por contrato.
- CLI ligera para Curator/Product/Validator.
- Validadores automáticos de PR (lint, doc mínima, OpenAPI, i18n, a11y).

---

## Licencia

Uso interno. Adapta a tus necesidades.