# 📦 Instalación de AgentPM v1.3

## Requisitos Previos

- Git instalado
- Terminal/PowerShell
- Proyecto existente o carpeta para nuevo proyecto

## Instalación Paso a Paso

### 1. Copiar AgentPM a tu Proyecto

#### Opción A: Desde este repositorio
```bash
# Navegar a tu proyecto
cd /ruta/a/tu/proyecto

# Copiar la carpeta .agentpm
cp -r /ruta/a/agentos/.agentpm/v1.3 ./.agentpm

# O en Windows PowerShell
Copy-Item -Path "C:\Proyectos\agentos\.agentpm\v1.3" -Destination ".\.agentpm" -Recurse
```

#### Opción B: Clonar y copiar
```bash
# Clonar el repo de AgentPM (cuando esté disponible)
git clone https://github.com/[usuario]/agentpm-templates.git /tmp/agentpm

# Copiar a tu proyecto
cp -r /tmp/agentpm/v1.3 /tu/proyecto/.agentpm
```

### 2. Verificar Instalación

```bash
# Verificar estructura
ls -la .agentpm/

# Debe mostrar:
# - orchestrator.md
# - agents/
# - system/
# - workflows/
# - project/
# - specs/
# - progress/
# - logs/
```

### 3. Configurar Git

```bash
# Agregar a .gitignore (archivos locales)
echo "# AgentPM - Local files" >> .gitignore
echo ".agentpm/progress/current.yaml" >> .gitignore
echo ".agentpm/logs/" >> .gitignore
echo "" >> .gitignore

# Agregar AgentPM al repo
git add .agentpm/
git commit -m "chore: add AgentPM v1.3 project management system"
```

### 4. Primer Uso

```bash
# Leer el punto de entrada
cat .agentpm/orchestrator.md

# O en Windows
type .agentpm\orchestrator.md
```

## 🚀 Quick Start

### Para Proyecto Nuevo

1. **Crear estructura base** (si es necesario):
```bash
# Para Angular
ng new mi-proyecto
cd mi-proyecto

# Para .NET
dotnet new webapi -n MiProyecto
cd MiProyecto

# Para Node.js
npm init -y
```

2. **Instalar AgentPM**:
```bash
# Copiar .agentpm como se indica arriba
```

3. **Documentar proyecto**:
```bash
cat .agentpm/orchestrator.md
# Seguir opción 1: Documentar proyecto
```

### Para Proyecto Existente

1. **Instalar AgentPM** en la raíz del proyecto

2. **Documentar el proyecto actual**:
```bash
cat .agentpm/agents/documentation/agent.md
```

3. **Crear primera feature**:
```bash
cat .agentpm/agents/specification/agent.md
```

## 🔧 Configuración Opcional

### Alias Útiles (Bash/Zsh)

Agregar a `~/.bashrc` o `~/.zshrc`:

```bash
# AgentPM aliases
alias apm-status='cat .agentpm/progress/current.yaml'
alias apm-log='cat .agentpm/logs/$(date +%Y-%m-%d).md'
alias apm-help='cat .agentpm/orchestrator.md'
alias apm-doc='cat .agentpm/agents/documentation/agent.md'
alias apm-spec='cat .agentpm/agents/specification/agent.md'
alias apm-dev='cat .agentpm/agents/development/agent.md'
```

### Alias para PowerShell

Agregar a tu perfil de PowerShell:

```powershell
# AgentPM aliases
function apm-status { Get-Content .agentpm\progress\current.yaml }
function apm-log { Get-Content ".agentpm\logs\$(Get-Date -Format yyyy-MM-dd).md" }
function apm-help { Get-Content .agentpm\orchestrator.md }
function apm-doc { Get-Content .agentpm\agents\documentation\agent.md }
function apm-spec { Get-Content .agentpm\agents\specification\agent.md }
function apm-dev { Get-Content .agentpm\agents\development\agent.md }
```

## 📂 Estructura de Carpetas Esperada

Después de la instalación:

```
tu-proyecto/
├── src/                    # Tu código fuente
├── tests/                  # Tus tests
├── package.json            # O .csproj, requirements.txt, etc.
├── .gitignore             # Con las exclusiones de AgentPM
├── README.md              # Tu README
└── .agentpm/              # 📦 AgentPM
    ├── orchestrator.md    # Punto de entrada
    ├── agents/            # Agentes especializados
    ├── project/           # Docs del proyecto (se generará)
    ├── specs/             # Especificaciones (se generará)
    ├── progress/          # Tracking (local)
    ├── logs/              # Logs diarios (local)
    ├── system/            # Core del sistema
    └── workflows/         # Flujos de trabajo
```

## ✅ Verificación Final

Ejecutar estos comandos para verificar que todo está correcto:

```bash
# 1. Verificar estructura
ls -la .agentpm/agents/
# Debe mostrar: documentation/, specification/, development/

# 2. Verificar orchestrator
head -n 10 .agentpm/orchestrator.md
# Debe mostrar: "# AgentPM Orchestrator..."

# 3. Verificar workflows
ls .agentpm/workflows/
# Debe mostrar: start-project.md, add-feature.md

# 4. Verificar sistema
ls .agentpm/system/
# Debe mostrar: conventions/, patterns/, templates/

# 5. Test de escritura
touch .agentpm/progress/test.txt && rm .agentpm/progress/test.txt
# No debe dar error
```

## 🆘 Troubleshooting

### Error: "No such file or directory"
```bash
# Verificar que estás en la raíz del proyecto
pwd

# Crear carpetas faltantes
mkdir -p .agentpm/progress .agentpm/logs .agentpm/project .agentpm/specs
```

### Error: "Permission denied"
```bash
# Dar permisos de escritura
chmod -R 755 .agentpm/
```

### En Windows: "Cannot find path"
```powershell
# Usar rutas de Windows
Get-Content .\.agentpm\orchestrator.md

# O usar WSL
wsl cat .agentpm/orchestrator.md
```

## 🎯 Siguiente Paso

Una vez instalado, el flujo típico es:

1. **Documentar** → `cat .agentpm/agents/documentation/agent.md`
2. **Especificar** → `cat .agentpm/agents/specification/agent.md`
3. **Desarrollar** → `cat .agentpm/agents/development/agent.md`

## 📚 Recursos

- [README Principal](README.md)
- [Workflow: Iniciar Proyecto](workflows/start-project.md)
- [Workflow: Agregar Feature](workflows/add-feature.md)

## 💡 Tips

1. **Siempre empieza con el Orchestrator** - Es tu guía principal
2. **Documenta antes de codificar** - La documentación es la base
3. **Un agente a la vez** - No mezcles agentes
4. **Commits frecuentes** - Mantén tu trabajo seguro
5. **Revisa logs diarios** - Para tracking efectivo

---

**¡AgentPM v1.3 instalado exitosamente!** 🎉

Ahora puedes empezar con:
```bash
cat .agentpm/orchestrator.md
```
