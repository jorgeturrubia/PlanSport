# Agent OS - Estándares y Mejores Prácticas

Este directorio contiene los estándares y mejores prácticas para el desarrollo de proyectos usando Agent OS, ahora en formato YAML estructurado.

## Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| `best-practices.yaml` | Mejores prácticas generales de desarrollo para proyectos Agent OS |
| `code-style.yaml` | Guía de estilo de código global con reglas generales de formato |
| `tech-stack.yaml` | Stack tecnológico predeterminado para proyectos Agent OS |

## Estilos de Código Específicos

La carpeta `code-style/` contiene guías de estilo específicas por lenguaje:

| Archivo | Descripción |
|---------|-------------|
| `css-style.yaml` | Reglas de estilo para CSS y TailwindCSS |
| `html-style.yaml` | Reglas de formato y estructura para HTML |
| `javascript-style.yaml` | Estándares y mejores prácticas para JavaScript |

## Uso del Formato YAML

El formato YAML proporciona una estructura clara y jerárquica para definir estándares:

```yaml
css_best_practices:
  - id: "specificity"
    rule: "Keep selector specificity low"
    example: "Prefer .button over .navbar .content .button"
  
  - id: "class_naming"
    rule: "Use kebab-case for class names"
    example: "user-profile, nav-item, btn-primary"
```

## Ventajas del Formato YAML

1. **Estructura Jerárquica**: Organiza los estándares en categorías y subcategorías claras.
2. **Validación**: Permite la validación automática de la estructura.
3. **Legibilidad**: Formato legible tanto por humanos como por máquinas.
4. **Extensibilidad**: Facilita la adición de nuevos estándares o categorías.
5. **Consulta**: Permite consultas específicas a secciones concretas.

## Personalización por Proyecto

Estos estándares sirven como base global y pueden ser sobreescritos en cada proyecto específico mediante los archivos correspondientes en la carpeta `.agent-os/product/`.
