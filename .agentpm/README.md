# 🚀 AgentPM v1.3 - Project Management System for LLM Agents

## ¿Qué es AgentPM?

AgentPM es un sistema declarativo de gestión de proyectos diseñado para trabajar con LLMs (Language Models). Proporciona una estructura robusta y determinística para documentar, especificar y desarrollar proyectos de software con consistencia y calidad.

## 🎯 Características Principales

- **Sistema de 3 Agentes Especializados**: Documentation, Specification, Developer
- **100% Declarativo**: Sin código programático, solo Markdown y YAML
- **Portátil**: Se copia a cualquier proyecto y funciona
- **Tracking Detallado**: Seguimiento de progreso en tiempo real
- **Git-Friendly**: Todo es texto versionable
- **Robusto**: Arquitectura alemana, sin ambigüedades

## 📦 Instalación

1. **Copiar la carpeta `.agentpm` a tu proyecto:**
```bash
cp -r /path/to/.agentpm /your/project/
cd /your/project/
```

2. **Verificar instalación:**
```bash
ls .agentpm/
cat .agentpm/orchestrator.md
```

3. **Configurar .gitignore:**
```bash
echo ".agentpm/progress/current.yaml" >> .gitignore
echo ".agentpm/logs/" >> .gitignore
```

## 🔄 Flujo de Trabajo

```
1. Documentation → Genera contexto del proyecto
       ↓
2. Specification → Crea specs técnicas de features
       ↓
3. Development → Ejecuta las especificaciones
       ↓
4. Tracking → Mantiene progreso actualizado
```

## 📁 Estructura

```
.agentpm/
├── orchestrator.md         # Punto de entrada principal
├── agents/                 # Prompts de los agentes
│   ├── documentation/      # Agente documentador
│   ├── specification/      # Agente especificador
│   └── development/        # Agente desarrollador
├── project/               # Documentación del proyecto (generada)
│   ├── product.yaml       # Info del negocio
│   ├── stack.yaml         # Stack técnico
│   └── design.yaml        # Sistema de diseño
├── specs/                 # Especificaciones de features (generadas)
│   └── [feature]/
│       ├── spec.yaml      # Especificación técnica
│       └── tasks.yaml     # Tareas a ejecutar
├── progress/              # Tracking del progreso (local)
│   ├── current.yaml       # Estado actual
│   └── completed.yaml     # Tareas completadas
├── logs/                  # Logs diarios (local)
│   └── [date].md          # Log del día
├── system/                # Sistema core
│   ├── conventions/       # Convenciones del proyecto
│   ├── patterns/          # Patrones de código
│   └── templates/         # Templates base
└── workflows/             # Flujos de trabajo
    ├── start-project.md   # Iniciar proyecto
    └── add-feature.md     # Agregar feature
```

## 🚀 Inicio Rápido

### 1. Documentar tu Proyecto
```bash
# Leer el orchestrator
cat .agentpm/orchestrator.md

# Activar Documentation Agent
cat .agentpm/agents/documentation/agent.md
```

### 2. Crear una Feature
```bash
# Activar Specification Agent
cat .agentpm/agents/specification/agent.md

# Describir tu feature
# El agente generará specs en .agentpm/specs/
```

### 3. Desarrollar
```bash
# Activar Developer Agent
cat .agentpm/agents/development/agent.md

# El agente ejecutará las tareas
# Mantendrá tracking en .agentpm/progress/
```

### 4. Monitorear Progreso
```bash
# Ver estado actual
cat .agentpm/progress/current.yaml

# Ver log del día
cat .agentpm/logs/$(date +%Y-%m-%d).md
```

## 🎨 Estilos de Diseño Soportados

- **Minimalista**: Clean, simple, pocos colores
- **Profesional**: Corporativo, confiable
- **Moderno**: Gradientes, micro-interacciones
- **Premium**: Animaciones elaboradas, experiencia rica

## 🛠️ Stacks Soportados

### Frontend
- Angular 18+ (con Signals)
- React
- Vue
- Svelte

### Backend
- .NET 8+ (Clean Architecture)
- Node.js (Express/NestJS)
- Python (Django/FastAPI)
- Java (Spring Boot)

### Databases
- PostgreSQL (Supabase)
- MySQL
- MongoDB
- Firebase

## 📝 Convenciones

- **Commits**: `type(scope): description`
- **Branches**: `feature/[name]`, `fix/[name]`, `chore/[name]`
- **Components**: PascalCase
- **Files**: kebab-case
- **Tests**: Mínimo 80% coverage

## ⚠️ Puntos Críticos

### Para Angular
- ✅ Siempre actualizar `app.routes.ts`
- ✅ Componentes standalone
- ✅ Change Detection OnPush
- ✅ Lazy loading para rutas

### Para .NET
- ✅ Servicios registrados en DI
- ✅ Async/await everywhere
- ✅ Repository pattern
- ✅ FluentValidation

## 🐛 Troubleshooting

### El agente no encuentra archivos
```bash
# Verificar que estás en la raíz del proyecto
pwd

# Verificar estructura
ls .agentpm/
```

### No se generan especificaciones
```bash
# Verificar documentación existe
ls .agentpm/project/*.yaml

# Si no existe, documentar primero
cat .agentpm/agents/documentation/agent.md
```

### Progress no se actualiza
```bash
# Verificar permisos de escritura
touch .agentpm/progress/test.yaml
rm .agentpm/progress/test.yaml
```

## 📚 Documentación Adicional

- [Workflow: Iniciar Proyecto](workflows/start-project.md)
- [Workflow: Agregar Feature](workflows/add-feature.md)
- [Convenciones](system/conventions/conventions.yaml)
- [Patrones](system/patterns/patterns.yaml)

## 🤝 Mejores Prácticas

1. **Documentar primero**: Siempre empieza con Documentation Agent
2. **Specs claras**: Invierte tiempo en buenas especificaciones
3. **Una feature a la vez**: No mezcles múltiples features
4. **Commits frecuentes**: Commit después de cada tarea
5. **Review diario**: Revisa el log al final del día

## 📊 Métricas de Calidad

- Test Coverage: >80%
- Complejidad Ciclomática: <10
- Duplicación de Código: <5%
- Tiempo de Build: <30s
- Lighthouse Score: >90

## 🔒 Seguridad

- No guardes secrets en `.agentpm/`
- Los archivos de progress son locales (no commitear)
- Usa variables de entorno para configuración sensible

## 🎯 Filosofía

> "La calidad no es negociable. Cada línea de código debe ser production-ready desde el día 1."

AgentPM sigue los principios de:
- **Determinismo**: Mismo input = mismo output
- **Transparencia**: Todo es visible y auditable
- **Robustez**: Sin ambigüedades ni magia
- **Escalabilidad**: Fácil agregar nuevas features

## 📈 Roadmap

- [ ] v1.4: Soporte para microservicios
- [ ] v1.5: Integración con CI/CD
- [ ] v2.0: Dashboard web de monitoreo

## 📄 Licencia

MIT License - Úsalo como quieras

## 💡 Contribuir

Para mejorar AgentPM:
1. Documenta nuevos patrones en `system/patterns/`
2. Agrega workflows en `workflows/`
3. Mejora los prompts de los agentes

---

**AgentPM v1.3** - Built with ❤️ for developers who value quality
