# Create Spec

## Description
Create a detailed spec for a new feature with technical specifications and task breakdown

## Command Structure
```yaml
---
command: create-spec
version: 2.0
strict_mode: true
---
```

## Instructions Reference
Refer to the instructions located in `instructions/core/create-spec.yaml`

## Process Overview
```mermaid
graph TD
    A[Inicio] --> B{¿Inputs completos?}
    B -->|No| C[Solicitar inputs]
    C --> B
    B -->|Sí| D[Checkpoint #1]
    D --> E{¿Contexto existe?}
    E -->|Sí| F[Saltar lectura]
    E -->|No| G[Leer contexto]
    F --> H[Crear estructura]
    G --> H
    H --> I[Checkpoint #2]
    I --> J[Generar archivos]
    J --> K{¿Validación OK?}
    K -->|No| L[Mostrar errores]
    L --> M[Reintentar]
    M --> J
    K -->|Sí| N[Fin exitoso]
```

## Generated Files
- `spec.md` - Complete feature specification
- `spec-lite.md` - Condensed summary for AI context
- `technical-spec.md` - Technical implementation details
- `tasks.md` - Implementation task breakdown
- Additional sub-specs as needed (database, API, etc.)

## Expected Outcome
Complete feature specification ready for development implementation.
