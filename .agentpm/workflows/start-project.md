# Workflow: Iniciar Proyecto Nuevo

## Pre-requisitos
- Tener la carpeta `.agentpm` copiada en la raíz del proyecto
- Estar en la raíz del proyecto (donde está src/, package.json, etc.)

## Paso 1: Verificar Instalación
```bash
# Verificar que estás en la raíz correcta
pwd

# Verificar que .agentpm existe
ls -la .agentpm/

# Verificar estructura
ls .agentpm/agents/
ls .agentpm/system/
```

## Paso 2: Leer Orchestrator
```bash
# Entender el sistema
cat .agentpm/orchestrator.md
```

## Paso 3: Activar Documentation Agent
```bash
# Leer el prompt del agente
cat .agentpm/agents/documentation/agent.md
```

### Proceso de Documentación:
1. El agente detectará tu tipo de proyecto (Angular, .NET, etc.)
2. Te hará preguntas sobre:
   - Información del producto
   - Stack tecnológico
   - Preferencias de diseño
3. Generará 3 archivos en `.agentpm/project/`:
   - `product.yaml` - Información del negocio
   - `stack.yaml` - Stack técnico
   - `design.yaml` - Sistema de diseño

## Paso 4: Verificar Documentación Generada
```bash
# Verificar que se crearon los archivos
ls .agentpm/project/

# Revisar contenido
cat .agentpm/project/product.yaml
cat .agentpm/project/stack.yaml
cat .agentpm/project/design.yaml
```

## Paso 5: Commit Inicial
```bash
# Agregar archivos de documentación
git add .agentpm/project/

# Commit
git commit -m "docs: initial project documentation with AgentPM"

# Push
git push origin main
```

## ✅ Proyecto Documentado

Tu proyecto ahora tiene:
- Documentación completa del negocio
- Stack tecnológico definido
- Sistema de diseño especificado

## Próximos Pasos

Ahora puedes:
1. **Crear una feature**: Ver `add-feature.md`
2. **Revisar el estado**: `cat .agentpm/orchestrator.md` y elegir opción 4
3. **Comenzar desarrollo**: Si ya tienes specs, activar Developer Agent

## Troubleshooting

### Si el agente no detecta tu proyecto:
```bash
# Para Angular
ls angular.json package.json

# Para .NET
ls *.csproj *.sln

# Para Node.js
ls package.json
```

### Si faltan archivos:
```bash
# Verificar que todos los agentes están
ls .agentpm/agents/documentation/
ls .agentpm/agents/specification/
ls .agentpm/agents/development/
```

### Si necesitas reiniciar:
```bash
# Borrar documentación actual
rm -rf .agentpm/project/*.yaml

# Volver a empezar
cat .agentpm/agents/documentation/agent.md
```

## 📝 Notas

- La documentación es la base de todo el sistema
- Sin documentación, no puedes crear especificaciones
- Los archivos YAML son la fuente de verdad
- Siempre commitea la documentación al repositorio
