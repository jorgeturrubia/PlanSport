# Workflow: Agregar Nueva Feature

## Pre-requisitos
- Proyecto ya documentado (archivos en `.agentpm/project/`)
- Estar en la raíz del proyecto

## Paso 1: Verificar Documentación
```bash
# Verificar que existe documentación
ls .agentpm/project/
# Debe mostrar: product.yaml, stack.yaml, design.yaml

# Si no existe, primero ejecutar:
cat .agentpm/workflows/start-project.md
```

## Paso 2: Activar Specification Agent
```bash
# Leer el prompt del agente
cat .agentpm/agents/specification/agent.md
```

### Proceso de Especificación:
1. El agente leerá tu documentación base
2. Te pedirá describir la feature (ejemplo: "gestión de usuarios")
3. Consultará documentación externa con fetch
4. Analizará tu proyecto actual
5. Generará en `.agentpm/specs/[feature]/`:
   - `spec.yaml` - Especificación técnica
   - `tasks.yaml` - Tareas a ejecutar

## Paso 3: Describir la Feature

Ejemplos de descripciones claras:
- ✅ "Necesito gestión de usuarios con login, registro y perfil"
- ✅ "Quiero un dashboard con gráficas de ventas y métricas"
- ✅ "Implementar carrito de compras con checkout"

Ejemplos de descripciones vagas (evitar):
- ❌ "Hacer la parte de usuarios"
- ❌ "Un dashboard"
- ❌ "Lo del carrito"

## Paso 4: Revisar Especificación Generada
```bash
# Ver qué features existen
ls .agentpm/specs/

# Revisar la especificación
cat .agentpm/specs/[feature-name]/spec.yaml

# Revisar las tareas
cat .agentpm/specs/[feature-name]/tasks.yaml

# Verificar puntos críticos
grep "routing" .agentpm/specs/[feature-name]/spec.yaml
grep "critical" .agentpm/specs/[feature-name]/tasks.yaml
```

## Paso 5: Validar Especificación

### Checklist de Validación:
- [ ] ¿Las entidades tienen todos los campos necesarios?
- [ ] ¿Los endpoints cubren todos los casos de uso?
- [ ] ¿Los componentes tienen las rutas especificadas?
- [ ] ¿Hay una tarea para actualizar app.routes.ts?
- [ ] ¿El diseño hereda de design.yaml?
- [ ] ¿Las estimaciones de tiempo son realistas?

## Paso 6: Commit de Especificación
```bash
# Agregar especificación
git add .agentpm/specs/

# Commit
git commit -m "spec: add [feature-name] specification"

# Push
git push origin main
```

## Paso 7: Iniciar Desarrollo
```bash
# Activar Developer Agent
cat .agentpm/agents/development/agent.md
```

El Developer Agent:
1. Creará branch `feature/[name]`
2. Ejecutará las tareas de `tasks.yaml`
3. Mantendrá tracking en `.agentpm/progress/`
4. Generará logs diarios en `.agentpm/logs/`

## 📊 Monitoreo Durante Desarrollo

### Ver progreso actual:
```bash
cat .agentpm/progress/current.yaml
```

### Ver tareas completadas:
```bash
cat .agentpm/progress/completed.yaml
```

### Ver log del día:
```bash
cat .agentpm/logs/$(date +%Y-%m-%d).md
```

## 🔄 Flujo Completo

```
1. Specification Agent → Genera specs
                          ↓
2. Developer Agent → Lee specs
                     ↓
3. Crea branch → feature/[name]
                 ↓
4. Ejecuta tareas → Una por una
                    ↓
5. Tracking → Progress actualizado
              ↓
6. Daily log → Resumen del día
               ↓
7. Git push → Branch actualizada
```

## ⚠️ Puntos Críticos para Angular

### SIEMPRE verificar:
1. **Rutas actualizadas**:
```bash
grep "[component-name]" ../src/app/app.routes.ts
```

2. **Lazy loading configurado**:
```bash
grep "loadComponent" ../src/app/app.routes.ts
```

3. **Componentes standalone**:
```bash
grep "standalone: true" ../src/app/features/*/
```

## ⚠️ Puntos Críticos para .NET

### SIEMPRE verificar:
1. **Servicios registrados**:
```bash
grep "AddScoped\|AddTransient" ../Program.cs
```

2. **Migrations creadas**:
```bash
dotnet ef migrations list
```

3. **AutoMapper configurado**:
```bash
grep "CreateMap" ../Mappings/
```

## Troubleshooting

### Si el Specification Agent no encuentra documentación:
```bash
# Verificar que existen los archivos
ls .agentpm/project/*.yaml

# Si no existen, documentar primero
cat .agentpm/agents/documentation/agent.md
```

### Si las tareas no se ejecutan:
```bash
# Verificar branch actual
git branch --show-current

# Verificar spec existe
ls .agentpm/specs/[feature]/

# Reiniciar Developer Agent
cat .agentpm/agents/development/agent.md
```

### Si hay conflictos en git:
```bash
# Guardar cambios locales
git stash

# Actualizar main
git checkout main
git pull origin main

# Volver a feature
git checkout feature/[name]
git rebase main

# Recuperar cambios
git stash pop
```

## 📝 Mejores Prácticas

1. **Una feature a la vez** - No mezclar múltiples features
2. **Specs claras** - Mejor invertir tiempo en buenas specs
3. **Commits frecuentes** - Commit después de cada tarea
4. **Review diario** - Revisar el log al final del día
5. **Tests primero** - Escribir tests antes del código cuando sea posible

## ✅ Feature Completa

Una feature está completa cuando:
- Todas las tareas en `tasks.yaml` están en estado `completed`
- Test coverage > 80%
- Todos los componentes están en las rutas
- El log diario muestra 100% completado
- No hay errores en build
- PR creado y listo para review
