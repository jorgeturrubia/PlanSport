# PlanSport - Plataforma de Planificación Deportiva

## Descripción General
PlanSport es una aplicación SaaS multi-deporte diseñada para facilitar la creación, gestión y ejecución de planificaciones deportivas. Cada usuario selecciona un deporte específico y trabaja con planificaciones relacionadas con ese deporte. La plataforma permite a entrenadores y clubes crear objetivos, sesiones y realizar el control de ejecución de entrenamientos de manera eficiente.

## Problema que Resuelve
- Complejidad en la creación de planificaciones deportivas desde cero
- Falta de recursos compartidos entre entrenadores
- Gestión ineficiente de entrenamientos y objetivos deportivos
- Dificultad para organizar y estructurar sesiones coherentes
- Pérdida de tiempo en tareas administrativas que podrían automatizarse

## Usuarios Objetivo
- **Entrenadores Individuales**: Profesionales que buscan optimizar su tiempo y mejorar la calidad de sus entrenamientos
- **Clubes Deportivos**: Organizaciones que necesitan gestionar múltiples equipos y entrenadores
- **Directores Deportivos**: Responsables de validar y supervisar el rendimiento de los equipos
- **Entrenadores Novatos**: Profesionales que necesitan acceso a planificaciones probadas y validadas

## Características Principales

### 1. Marketplace de Planificaciones
- Compartir y valorar planificaciones, entrenamientos y ejercicios (1-5 estrellas)
- Búsqueda filtrada por deporte, categoría, nivel y otros criterios
- Importación rápida de planificaciones completas con objetivos y ejercicios
- Creación automática de entrenamientos con pocos clicks

### 2. Gestión Integral de Entrenamientos
- Creación de objetivos clasificados por categoría y subcategoría
- Vinculación de ejercicios con múltiples objetivos mediante tags
- Generación automática de entrenamientos basada en días de la semana, duración y frecuencia
- Ajuste dinámico de ejercicios según tiempo disponible de entrenamiento
- Vista dinámica con cronómetro para ejecución de entrenamientos

### 3. Modelos de Suscripción Flexibles
- **Gratuita**: 1 equipo, 15 entrenamientos
- **Entrenador**: Acceso completo, conceptos personalizados, entrenamientos ilimitados
- **Club**: Gestión multi-equipo, modo director, funcionalidades avanzadas

### 4. Gestión de Equipos y Jugadores
- Control de asistencia
- Datos y estadísticas de jugadores
- Clasificación por género, categoría y nivel (A, B, C)
- Asignación de permisos y roles personalizados

### 5. Análisis y Reportes
- Informes de planificación por objetivos y porcentajes
- Seguimiento de lo planificado vs. ejecutado
- Calendario de entrenamientos futuros y pasados
- Métricas de progreso y cumplimiento

## Propuesta de Valor Core
Con PlanSport, un entrenador puede tener una planificación completa con objetivos, ejercicios y entrenamientos estructurados en cuestión de minutos, aprovechando el conocimiento compartido de la comunidad y adaptándolo a sus necesidades específicas.

## Modelo de Datos Clave

### Relaciones Principales
- **Deportes**: Cada usuario trabaja con un deporte específico
- **Planificaciones**: 
  - Tienen fecha de inicio y fin
  - Especifican días de entrenamiento (ej: martes y jueves)
  - Definen duración de cada sesión
  - Pueden pertenecer a múltiples equipos (relación N:M)
- **Equipos**: Pueden tener múltiples planificaciones (relación 1:N)
- **Objetivos**: 
  - Pueden pertenecer a múltiples planificaciones (relación N:M)
  - Se clasifican por categoría y subcategoría
  - Tienen nivel de dificultad y tiempo estimado de aprendizaje
- **Ejercicios**: 
  - Pueden cumplir múltiples objetivos (relación N:M)
  - Incluyen tags descriptivos de objetivos que cumplen
  - Se ajustan en cantidad/duración según tiempo disponible
- **Entrenamientos**: 
  - Se generan automáticamente basados en:
    - Días de la semana configurados
    - Duración de cada sesión
    - Objetivos de la planificación
    - Ejercicios disponibles

## Tecnología
- **Frontend**: Angular (aplicación web moderna y responsive)
- **Autenticación**: Supabase
- **Base de datos**: Sistema multi-tenant para gestión de usuarios y datos
- **Arquitectura**: SaaS multi-usuario con aislamiento de datos