# 📋 Tasks - Módulo de Autenticación PlanSport

> Checklist detallado para la implementación completa del sistema de autenticación con Angular 20, Tailwind CSS 4.1 y backend .NET ya existente.

---

## 🎯 Resumen del Proyecto

**Objetivo**: Implementar un sistema de autenticación completo con página `/auth` que incluya login/registro por tabs, redirección automática al dashboard, manejo de tokens y experiencia de usuario optimizada.

**Tecnologías**: Angular 20 (Standalone Components), Tailwind CSS 4.1, Lucide Angular, Signals, Backend .NET ya implementado.

**Estimación Total**: 40 horas (3 sprints)

---

## 🚀 Sprint 1: Fundamentos y Autenticación Básica (16h)

### 📱 1. Configuración Base del Módulo
- [ ] **1.1** Crear estructura de carpetas del módulo auth
  - [ ] `src/app/features/auth/`
  - [ ] `src/app/features/auth/components/`
  - [ ] `src/app/features/auth/services/`
  - [ ] `src/app/features/auth/models/`
  - [ ] `src/app/features/auth/guards/`
  - [ ] `src/app/features/auth/validators/`
- [ ] **1.2** Configurar rutas de autenticación
  - [ ] Ruta `/auth` con componente principal
  - [ ] Redirección desde `/login` y `/register` a `/auth`
  - [ ] Configurar lazy loading del módulo
- [ ] **1.3** Configurar interceptores HTTP
  - [ ] Interceptor para agregar token automáticamente
  - [ ] Interceptor para manejo de errores 401/403
  - [ ] Interceptor para refresh token automático

**Tiempo estimado**: 4 horas

### 🔐 2. Modelos y Servicios Core
- [ ] **2.1** Crear interfaces TypeScript
  - [ ] `AuthUser` (basado en UserDto del backend)
  - [ ] `LoginRequest` y `LoginResponse`
  - [ ] `RegisterRequest` y `RegisterResponse`
  - [ ] `AuthState` para manejo de estado
- [ ] **2.2** Implementar AuthService
  - [ ] Métodos login(), register(), logout()
  - [ ] Método refreshToken() automático
  - [ ] Método getCurrentUser()
  - [ ] Manejo de localStorage para tokens
  - [ ] Integración con backend API existente
- [ ] **2.3** Implementar TokenService
  - [ ] Almacenamiento seguro de tokens
  - [ ] Validación de expiración
  - [ ] Limpieza automática de tokens expirados

**Tiempo estimado**: 6 horas

### 🎨 3. Componente Principal de Autenticación
- [ ] **3.1** Crear AuthPageComponent (Standalone)
  - [ ] Estructura base con tabs (Login/Registro)
  - [ ] Navegación entre tabs con estado
  - [ ] Aplicar design system (colores verdes, tipografía Inter)
  - [ ] Layout responsive optimizado para desktop
- [ ] **3.2** Implementar sistema de tabs
  - [ ] Tab activo con indicador visual
  - [ ] Transiciones suaves entre tabs
  - [ ] Mantener estado del formulario al cambiar tabs
- [ ] **3.3** Integrar con router
  - [ ] Query params para tab activo (?tab=login|register)
  - [ ] Navegación programática
  - [ ] Breadcrumbs y título dinámico

**Tiempo estimado**: 6 horas

---

## 🔑 Sprint 2: Formularios y Validación (14h)

### 📝 4. Formulario de Login
- [ ] **4.1** Crear LoginFormComponent (Standalone)
  - [ ] Reactive Forms con FormBuilder
  - [ ] Campos: email, password
  - [ ] Validaciones en tiempo real
  - [ ] Aplicar estilos del design system
- [ ] **4.2** Implementar validaciones
  - [ ] Email válido y requerido
  - [ ] Password mínimo 6 caracteres
  - [ ] Mensajes de error personalizados
  - [ ] Estados visuales (error, success, loading)
- [ ] **4.3** Funcionalidad de login
  - [ ] Integración con AuthService
  - [ ] Loading state durante petición
  - [ ] Manejo de errores del servidor
  - [ ] Redirección automática al dashboard
- [ ] **4.4** Características adicionales
  - [ ] Checkbox "Recordarme"
  - [ ] Link "¿Olvidaste tu contraseña?"
  - [ ] Mostrar/ocultar contraseña

**Tiempo estimado**: 6 horas

### 📋 5. Formulario de Registro
- [ ] **5.1** Crear RegisterFormComponent (Standalone)
  - [ ] Reactive Forms con validaciones complejas
  - [ ] Campos: fullName, email, password, confirmPassword
  - [ ] Integración con design system
- [ ] **5.2** Validaciones avanzadas
  - [ ] Nombre completo (mínimo 2 palabras)
  - [ ] Email único (validación asíncrona)
  - [ ] Password seguro (mayúscula, minúscula, número)
  - [ ] Confirmación de password coincidente
  - [ ] Términos y condiciones (checkbox requerido)
- [ ] **5.3** Funcionalidad de registro
  - [ ] Integración con AuthService
  - [ ] Manejo de errores específicos (email duplicado, etc.)
  - [ ] Confirmación de registro exitoso
  - [ ] Auto-login después del registro
- [ ] **5.4** UX mejorada
  - [ ] Indicador de fortaleza de contraseña
  - [ ] Validación en tiempo real con debounce
  - [ ] Mensajes de ayuda contextuales

**Tiempo estimado**: 8 horas

---

## 🛡️ Sprint 3: Seguridad y Experiencia Avanzada (10h)

### 🔒 6. Guards y Protección de Rutas
- [ ] **6.1** Crear AuthGuard
  - [ ] Verificar token válido
  - [ ] Redireccionar a /auth si no autenticado
  - [ ] Permitir acceso a rutas públicas
- [ ] **6.2** Crear GuestGuard
  - [ ] Redireccionar a dashboard si ya autenticado
  - [ ] Aplicar a rutas de auth
- [ ] **6.3** Implementar RoleGuard
  - [ ] Verificar roles de usuario
  - [ ] Manejo de permisos por organización
  - [ ] Redirección a página de acceso denegado

**Tiempo estimado**: 4 horas

### 🎯 7. Funcionalidades Avanzadas
- [ ] **7.1** Recuperación de contraseña
  - [ ] Modal/página para solicitar reset
  - [ ] Integración con endpoint forgot-password
  - [ ] Confirmación de email enviado
- [ ] **7.2** Manejo de tokens automático
  - [ ] Refresh token antes de expiración
  - [ ] Logout automático si refresh falla
  - [ ] Notificación de sesión expirada
- [ ] **7.3** Estados de carga y feedback
  - [ ] Skeleton loaders en formularios
  - [ ] Toasts para notificaciones
  - [ ] Animaciones de transición

**Tiempo estimado**: 4 horas

### 🔗 8. Integración con Landing Page
- [ ] **8.1** Modificar landing page
  - [ ] Agregar botones "Iniciar Sesión" y "Registrarse"
  - [ ] Links que redirijan a `/auth?tab=login` y `/auth?tab=register`
  - [ ] Mantener diseño consistente
- [ ] **8.2** Navegación global
  - [ ] Header con estado de autenticación
  - [ ] Menú de usuario autenticado
  - [ ] Logout desde cualquier página

**Tiempo estimado**: 2 horas

---

## 🧪 Testing y Calidad

### ✅ 9. Testing Unitario
- [ ] **9.1** Tests de servicios
  - [ ] AuthService: login, register, logout
  - [ ] TokenService: almacenamiento, validación
  - [ ] Guards: AuthGuard, GuestGuard
- [ ] **9.2** Tests de componentes
  - [ ] AuthPageComponent: navegación tabs
  - [ ] LoginFormComponent: validaciones, submit
  - [ ] RegisterFormComponent: validaciones complejas
- [ ] **9.3** Tests de integración
  - [ ] Flujo completo de login
  - [ ] Flujo completo de registro
  - [ ] Manejo de errores del servidor

### 🔍 10. Testing E2E
- [ ] **10.1** Cypress tests
  - [ ] Navegación a página de auth
  - [ ] Login exitoso y redirección
  - [ ] Registro exitoso y auto-login
  - [ ] Manejo de errores de validación
  - [ ] Protección de rutas

---

## 📱 Responsive y Accesibilidad

### 📐 11. Responsive Design
- [ ] **11.1** Mobile (320px - 767px)
  - [ ] Formularios stack verticalmente
  - [ ] Botones full-width
  - [ ] Espaciado optimizado para touch
- [ ] **11.2** Tablet (768px - 1023px)
  - [ ] Layout centrado con max-width
  - [ ] Formularios con padding lateral
- [ ] **11.3** Desktop (1024px+)
  - [ ] Layout optimizado como especificado
  - [ ] Hover states en botones
  - [ ] Focus states mejorados

### ♿ 12. Accesibilidad
- [ ] **12.1** Navegación por teclado
  - [ ] Tab order lógico
  - [ ] Focus visible en todos los elementos
  - [ ] Escape para cerrar modales
- [ ] **12.2** Screen readers
  - [ ] Labels apropiados en formularios
  - [ ] ARIA attributes donde necesario
  - [ ] Mensajes de error anunciados
- [ ] **12.3** Contraste y colores
  - [ ] Verificar contraste mínimo WCAG AA
  - [ ] No depender solo del color para información
  - [ ] Modo alto contraste compatible

---

## 🚀 Deployment y Optimización

### ⚡ 13. Performance
- [ ] **13.1** Lazy loading
  - [ ] Módulo auth cargado solo cuando necesario
  - [ ] Componentes con OnPush strategy
- [ ] **13.2** Bundle optimization
  - [ ] Tree shaking de librerías no usadas
  - [ ] Minificación de CSS/JS
  - [ ] Compresión gzip habilitada

### 🔧 14. Configuración de Producción
- [ ] **14.1** Variables de entorno
  - [ ] API URLs por ambiente
  - [ ] Configuración de tokens
  - [ ] Feature flags si necesario
- [ ] **14.2** Seguridad
  - [ ] CSP headers configurados
  - [ ] HTTPS enforced
  - [ ] Tokens en httpOnly cookies (si aplicable)

---

## 📊 Métricas y Monitoreo

### 📈 15. Analytics
- [ ] **15.1** Eventos de autenticación
  - [ ] Login exitoso/fallido
  - [ ] Registro exitoso/fallido
  - [ ] Tiempo en formularios
- [ ] **15.2** Métricas de UX
  - [ ] Tasa de conversión login/registro
  - [ ] Abandono en formularios
  - [ ] Errores más comunes

---

## ✅ Checklist Final de Entrega

### 🎯 Funcionalidades Core
- [ ] ✅ Página `/auth` con tabs login/registro
- [ ] ✅ Redirección automática al dashboard tras login/registro
- [ ] ✅ Notificaciones de error en caso de fallo
- [ ] ✅ Manejo de tokens existentes (acceso directo al dashboard)
- [ ] ✅ Control robusto de expiración de tokens
- [ ] ✅ Botones en landing page que redirijan a `/auth`

### 🎨 Design System
- [ ] ✅ Colores verdes suaves implementados
- [ ] ✅ Tipografía Inter aplicada
- [ ] ✅ Espaciado consistente (sistema 4px)
- [ ] ✅ Componentes responsive
- [ ] ✅ Estados interactivos (hover, focus, loading)

### 🔒 Seguridad
- [ ] ✅ Guards protegiendo rutas privadas
- [ ] ✅ Interceptores manejando tokens automáticamente
- [ ] ✅ Refresh token implementado
- [ ] ✅ Logout seguro limpiando estado

### 📱 Experiencia de Usuario
- [ ] ✅ Formularios con validación en tiempo real
- [ ] ✅ Loading states durante peticiones
- [ ] ✅ Mensajes de error claros y útiles
- [ ] ✅ Navegación intuitiva entre tabs
- [ ] ✅ Responsive design optimizado

### 🧪 Calidad
- [ ] ✅ Tests unitarios > 80% cobertura
- [ ] ✅ Tests E2E para flujos principales
- [ ] ✅ Accesibilidad WCAG AA
- [ ] ✅ Performance optimizada

---

## 📝 Notas de Implementación

### 🔧 Consideraciones Técnicas
- **Standalone Components**: Usar exclusivamente componentes standalone de Angular 20
- **Signals**: Implementar estado reactivo con Angular Signals
- **Tailwind CSS 4.1**: Usar sistema `@theme` para personalización
- **Backend Integration**: API .NET ya implementada, solo necesita integración frontend

### 🎯 Prioridades
1. **Alta**: Funcionalidades core de autenticación
2. **Media**: UX avanzada y validaciones
3. **Baja**: Analytics y optimizaciones avanzadas

### ⚠️ Riesgos y Mitigaciones
- **Riesgo**: Incompatibilidad con API backend
  - **Mitigación**: Revisar DTOs y endpoints antes de implementar
- **Riesgo**: Problemas de CORS en desarrollo
  - **Mitigación**: Configurar proxy en angular.json
- **Riesgo**: Tokens expirando inesperadamente
  - **Mitigación**: Implementar refresh automático con margen de seguridad

---

## 🎉 Criterios de Éxito

### 📊 Métricas Objetivo
- **Tiempo de carga**: < 2 segundos para página auth
- **Tasa de conversión**: > 85% completación de formularios
- **Errores de usuario**: < 5% en validaciones
- **Accesibilidad**: 100% WCAG AA compliance
- **Performance**: Lighthouse score > 90

### ✅ Validación Final
- [ ] Usuario puede registrarse exitosamente
- [ ] Usuario puede hacer login exitosamente
- [ ] Redirección automática funciona correctamente
- [ ] Tokens se manejan automáticamente
- [ ] Experiencia mobile es fluida
- [ ] Todos los tests pasan
- [ ] No hay errores de consola
- [ ] Performance es óptima

---

*📋 Checklist creado para PlanSport - Módulo de Autenticación*
*Actualizado: Enero 2025*
*Estimación total: 40 horas en 3 sprints*