# Agent OS Subagents - Formato YAML

Este directorio contiene los subagentes especializados para el sistema Agent OS, ahora migrados al formato YAML estructurado.

## Subagentes Disponibles

| Nombre | Archivo | Descripción |
|--------|---------|-------------|
| Context Fetcher | `context-fetcher.yaml` | Recupera y extrae información relevante de archivos de documentación de Agent OS. Comprueba si el contenido ya está en contexto antes de devolver. |
| Date Checker | `date-checker.yaml` | Determina y muestra la fecha actual, incluyendo el año, mes y día. Utiliza para obtener la fecha en formato YYYY-MM-DD. |
| File Creator | `file-creator.yaml` | Crea archivos, directorios y aplica plantillas para los flujos de trabajo de Agent OS. Maneja la creación por lotes de archivos con estructura y plantillas adecuadas. |
| Git Workflow | `git-workflow.yaml` | Maneja operaciones git, gestión de ramas, commits y creación de PRs para los flujos de trabajo de Agent OS. |
| Test Runner | `test-runner.yaml` | Ejecuta pruebas y analiza fallos para la tarea actual. Devuelve análisis detallados sin realizar correcciones. |

## Formato de Invocación

Los subagentes ahora utilizan un formato de invocación explícito en bloques de código:

```yaml
```invoke-agent
agent: nombre-del-agente
action: nombre-de-la-accion
params:
  param1: "valor1"
  param2: "valor2"
```
```

## Estructura del Formato YAML

Cada archivo de subagente sigue una estructura estandarizada:

1. **Metadatos del Agente**: Nombre, descripción, propósito y versión.
2. **Responsabilidades Principales**: Lista de responsabilidades clave del subagente.
3. **Sintaxis de Invocación**: Cómo invocar el subagente y qué acciones están disponibles.
4. **Proceso de Flujo de Trabajo**: Pasos detallados de cómo funciona el subagente.
5. **Formatos de Salida**: Formatos estandarizados para las respuestas del subagente.
6. **Restricciones Importantes**: Limitaciones y reglas que sigue el subagente.
7. **Ejemplos de Uso**: Ejemplos claros de cómo usar el subagente.

## Ventajas del Formato YAML

- **Estructura Clara**: Define explícitamente las capacidades y acciones del subagente.
- **Invocación Estandarizada**: Formato coherente para invocar todos los subagentes.
- **Documentación Integrada**: Incluye ejemplos y restricciones como parte del archivo.
- **Mantenimiento Simplificado**: Facilita la actualización y extensión de las capacidades.
