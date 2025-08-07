# Analyze Product

## Description
Analyze your product's codebase and install Agent OS

## Command Structure
```yaml
---
command: analyze-product
version: 2.0
strict_mode: true
---
```

## Instructions Reference
Refer to the instructions located in `instructions/core/analyze-product.yaml`

## Process Overview
```mermaid
graph TD
    A[Inicio] --> B[Análisis de Codebase]
    B --> C[Detección de Tecnologías]
    C --> D[Checkpoint #1]
    D --> E[Instalación de Agent OS]
    E --> F[Configuración]
    F --> G[Generación de Documentación]
    G --> H{¿Validación OK?}
    H -->|No| I[Corregir Problemas]
    I --> G
    H -->|Sí| J[Fin exitoso]
```

## Expected Outcome
Agent OS framework installed and configured for your existing product with analysis report.
