# Especificación del Producto - Aplicación de Planificación Deportiva

## 1. Visión General del Producto

### Descripción
Aplicación multi-tenant para la gestión integral de planificaciones deportivas que facilita la creación de objetivos, sesiones y control de ejecución de entrenamientos. La plataforma permite a los entrenadores compartir y valorar planificaciones, entrenamientos y ejercicios, creando un marketplace de conocimiento deportivo.

### Propuesta de Valor Principal
Con muy pocos clicks, un entrenador puede tener una planificación completa con objetivos, ejercicios y todos sus entrenamientos configurados automáticamente según el perfil de su equipo (deporte, categoría, nivel, días de entrenamiento).

## 2. Modelo de Suscripción y Planes

### 2.1 Planes Disponibles

#### Plan Gratuito (0€)
- **Límites**: 
  - 1 equipo máximo
  - 15 entrenamientos máximo
  - Sin usuarios adicionales
- **Funcionalidades**: Básicas de planificación

#### Plan Entrenador
- **Características**:
  - Entrenamientos ilimitados
  - Conceptos personalizados
  - Itinerarios personalizados
  - Licencia para 1 entrenador
  - Acceso completo a funcionalidades de entrenador

#### Plan Club
- **Características**:
  - Gestión de múltiples equipos
  - Múltiples usuarios/entrenadores
  - Modo director para validación
  - Gestión avanzada de roles y permisos
  - Panel de administración completo

### 2.2 Reglas de Suscripción
- Un usuario puede tener simultáneamente:
  - 1 suscripción gratuita
  - 1 suscripción de pago (máximo)
- Los usuarios invitados no pagan suscripción pero tienen acceso limitado según los permisos asignados

## 3. Sistema de Roles y Permisos

### 3.1 Roles Principales

#### Administrador (Titular de la suscripción)
- **Permisos completos**:
  - Gestión de usuarios (crear, editar, eliminar, deshabilitar)
  - Gestión de equipos
  - Configuración de la organización
  - Asignación de roles y permisos
  - Acceso a facturación

#### Director
- **Permisos de supervisión**:
  - Validación de entrenamientos
  - Visualización de todos los equipos asignados
  - Informes y estadísticas globales
  - No puede gestionar usuarios ni facturación

#### Entrenador
- **Permisos operativos**:
  - Gestión completa de equipos asignados
  - Creación/edición de planificaciones
  - Gestión de entrenamientos
  - Acceso al marketplace

#### Usuario Invitado/Asistente
- **Permisos limitados**:
  - Solo visualización de equipos asignados
  - Sin capacidad de edición
  - Acceso según permisos específicos

### 3.2 Matriz de Permisos Granulares

Para cada usuario se podrán configurar:

| Recurso | Visualizar | Crear | Editar | Eliminar |
|---------|------------|-------|--------|---------|
| Equipos | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Planificaciones | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Entrenamientos | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Ejercicios | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Conceptos | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Informes | ✓/✗ | - | - | - |

### 3.3 Gestión de Usuarios

#### Proceso de Alta de Usuarios
1. **Administrador crea invitación**:
   - Define email del usuario
   - Asigna rol base
   - Configura permisos específicos
   - Asigna equipos permitidos

2. **Notificación al usuario**:
   - Email con enlace de activación
   - Instrucciones de acceso
   - Resumen de permisos asignados

3. **Activación de cuenta**:
   - Usuario completa registro
   - Vinculación con organización
   - Acceso inmediato según permisos

#### Estados de Usuario
- **Activo**: Acceso completo según permisos
- **Pendiente**: Invitado pero no activado
- **Deshabilitado**: Sin acceso temporal
- **Eliminado**: Registro histórico sin acceso

## 4. Flujos de Usuario

### 4.1 Onboarding - Plan Gratuito
1. Registro con Supabase Auth
2. Selección de plan (gratuito 0€)
3. Card central: "Crear Equipo"
4. Configuración básica del equipo
5. Inicio de planificación

### 4.2 Onboarding - Planes de Pago
1. Registro con Supabase Auth
2. Selección de plan (Entrenador/Club)
3. Proceso de pago
4. Creación de club/organización
5. Creación de equipos
6. (Plan Club) Invitación de usuarios adicionales

### 4.3 Flujo Rápido de Planificación
1. Crear equipo → Definir características
2. Sistema sugiere itinerarios del marketplace
3. Selección de itinerario
4. Auto-generación de:
   - Objetivos/conceptos
   - Sesiones de entrenamiento
   - Calendario completo
5. Personalización opcional

## 5. Estructura de Datos y Relaciones

### 5.1 Entidades Principales

#### Organizaciones/Clubes
- Información básica
- Plan de suscripción
- Configuración global
- **Relación**: 1 organización → N equipos

#### Equipos
- **Atributos**:
  - Género (masculino/femenino)
  - Categoría (por edad)
  - Nivel (A, B, C)
  - Estado (activo/oculto)
- **Relaciones**:
  - N equipos ← 1 organización
  - N equipos ↔ N planificaciones
  - N equipos ↔ N usuarios

#### Planificaciones
- **Atributos**:
  - Fecha inicio/fin
  - Días de entrenamiento
  - Horarios
  - Tipo de pista (completa/partida)
  - Visibilidad marketplace
- **Contenido**:
  - Conceptos directos o
  - Itinerarios (conjuntos de conceptos)

#### Conceptos/Objetivos
- **Estructura**:
  - Nombre
  - Categoría (ej: Técnica Individual)
  - Subcategoría (ej: Bote)
  - Nivel de dificultad
  - Tiempo estimado de aprendizaje
- **Tipos**:
  - Sistema (predefinidos)
  - Personalizados (por usuario)

#### Ejercicios
- **Vinculación**: N ejercicios ↔ N conceptos
- **Tipos**:
  - Sistema
  - Personalizados
  - Marketplace

#### Sesiones de Entrenamiento
- Fecha y lugar
- Ejercicios seleccionados
- Conceptos a trabajar
- Estado (planificado/ejecutado/cancelado)

## 6. Funcionalidades Clave

### 6.1 Marketplace de Planificaciones
- **Búsqueda y filtros**:
  - Por deporte
  - Por categoría
  - Por nivel
  - Por días de entrenamiento
- **Sistema de valoración**: 1-5 estrellas
- **Compartir**: Planificaciones propias
- **Importar**: Con un click

### 6.2 Vista Dinámica de Entrenamiento
- Navegación paso a paso
- Vista de ejercicio: anterior | actual | siguiente
- Cronómetro integrado
- Control de progreso en tiempo real

### 6.3 Sistema de Informes
- **Análisis de planificación**:
  - Distribución de objetivos (%)
  - Estado: planificado vs ejecutado vs pendiente
- **Calendario**:
  - Vista de entrenamientos futuros (editables)
  - Histórico de entrenamientos pasados (solo lectura)
- **Métricas por equipo y entrenador**

### 6.4 Gestión de Visibilidad
- Bit de ocultación para equipos/planificaciones
- Archivo histórico sin eliminación
- Filtros de visualización personalizables

## 7. Reglas de Negocio

### 7.1 Coherencia en Sesiones
- Los conceptos de cada sesión deben tener coherencia pedagógica
- Sistema de recomendaciones basado en:
  - Progresión de dificultad
  - Tiempo de aprendizaje
  - Nivel del equipo

### 7.2 Restricciones por Nivel
- Equipos nivel C: ejercicios básicos
- Equipos nivel B: ejercicios intermedios
- Equipos nivel A: ejercicios complejos

### 7.3 Aislamiento Multi-tenant
- Completa separación de datos entre organizaciones
- Conceptos/ejercicios personalizados no compartidos (excepto marketplace)
- Gestión independiente de usuarios por organización

## 8. Aspectos Técnicos

### 8.1 Autenticación
- Implementación con Supabase Auth
- SSO para organizaciones (opcional)
- 2FA recomendado para administradores

### 8.2 Notificaciones
- Email para invitaciones de usuario
- Recordatorios de entrenamientos
- Alertas de cambios en planificación

### 8.3 Seguridad y Privacidad
- Encriptación de datos sensibles
- Logs de auditoría para acciones críticas
- Cumplimiento GDPR
- Backup automático de datos

## 9. Prioridades de Desarrollo

### Fase 1 - MVP
1. Autenticación y planes básicos
2. Gestión de equipos
3. Creación manual de planificaciones
4. Sesiones básicas

### Fase 2 - Automatización
1. Marketplace básico
2. Auto-generación de entrenamientos
3. Sistema de roles básico
4. Informes simples

### Fase 3 - Escalabilidad
1. Gestión avanzada de usuarios y permisos
2. Vista dinámica de entrenamiento
3. Sistema completo de informes
4. Optimización del marketplace

### Fase 4 - Mejoras
1. App móvil
2. Integraciones externas
3. IA para recomendaciones
4. Analytics avanzado
