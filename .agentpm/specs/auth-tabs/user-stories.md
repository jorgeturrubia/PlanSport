# User Stories - Auth Tabs Component

## US-001: Visualizar Página de Autenticación
**Como** usuario no autenticado
**Quiero** acceder a la página de autenticación
**Para** poder iniciar sesión o registrarme en PlanSport

### Criterios de Aceptación
- [ ] La página muestra dos tabs claramente diferenciados: "Iniciar Sesión" y "Registrarse"
- [ ] El tab de "Iniciar Sesión" está activo por defecto
- [ ] Los tabs tienen un diseño visual claro con estado activo/inactivo
- [ ] El logo de PlanSport es visible en la parte superior
- [ ] **Contraste de colores cumple WCAG AA (4.5:1)**
- [ ] **Iconos descriptivos con aria-labels apropiados**
- [ ] La página es completamente responsive (mobile, tablet, desktop)

### Notas Técnicas
- Usar Angular signals para el estado del tab activo
- **Iconos a usar**: `faSignInAlt` para login, `faUserPlus` para registro
- Implementar con componentes standalone

---

## US-002: Cambiar Entre Tabs
**Como** usuario no autenticado
**Quiero** poder cambiar entre los tabs de login y registro
**Para** acceder a la funcionalidad que necesito

### Criterios de Aceptación
- [ ] Al hacer click en un tab, este se activa y muestra su contenido
- [ ] El tab activo tiene un indicador visual claro (subrayado o color diferente)
- [ ] La transición entre tabs es suave y animada
- [ ] Se puede navegar entre tabs usando el teclado (Tab + Enter o Arrow keys)
- [ ] El cambio de tab actualiza la URL (/auth/login o /auth/register)
- [ ] **El focus se mantiene visible al navegar con teclado**
- [ ] **Los tabs tienen rol ARIA apropiado (tablist, tab, tabpanel)**

### Notas Técnicas
- Usar Angular Router para gestionar las sub-rutas
- Animaciones con Angular Animations respetando prefers-reduced-motion
- Signal para trackear el tab activo

---

## US-003: Formulario de Login Visual
**Como** usuario registrado
**Quiero** ver un formulario de login completo
**Para** entender qué información necesito proporcionar

### Criterios de Aceptación
- [ ] Campo de email con placeholder "Correo electrónico"
- [ ] Campo de contraseña con placeholder "Contraseña"
- [ ] Botón de "Iniciar Sesión" claramente visible
- [ ] Opción de "Mostrar/Ocultar contraseña" con icono de ojo
- [ ] Link de "¿Olvidaste tu contraseña?" (solo visual)
- [ ] Checkbox "Recordarme" (opcional)
- [ ] **Todos los campos tienen labels asociados (visible o aria-label)**
- [ ] **Iconos con aria-hidden="true" cuando son decorativos**
- [ ] **Contraste adecuado en todos los elementos del formulario**
- [ ] Validación visual en tiempo real (solo formato, no funcional)

### Notas Técnicas
- Reactive Forms con validadores básicos (email, required)
- **Iconos a usar**: `faEnvelope` (email), `faLock` (password), `faEye`/`faEyeSlash` (toggle)
- Estados visuales para campos válidos/inválidos

---

## US-004: Formulario de Registro Visual
**Como** usuario nuevo
**Quiero** ver un formulario de registro completo
**Para** entender qué información necesito proporcionar para crear una cuenta

### Criterios de Aceptación
- [ ] Campo de nombre completo con placeholder "Nombre completo"
- [ ] Campo de email con placeholder "Correo electrónico"
- [ ] Campo de contraseña con placeholder "Contraseña"
- [ ] Campo de confirmar contraseña con placeholder "Confirmar contraseña"
- [ ] Selector de deporte principal (dropdown con deportes disponibles)
- [ ] Checkbox de términos y condiciones con link (solo visual)
- [ ] Botón de "Crear Cuenta" claramente visible
- [ ] Indicador de fortaleza de contraseña (visual)
- [ ] **Todos los campos tienen labels descriptivos**
- [ ] **Mensajes de ayuda para requisitos de contraseña**
- [ ] **Contraste WCAG AA en todos los textos**

### Notas Técnicas
- Validación visual de coincidencia de contraseñas
- **Iconos a usar**: `faUser` (nombre), `faEnvelope` (email), `faLock` (password), `faFutbol` (deporte)
- Indicador de fortaleza con colores accesibles

---

## US-005: Validación Visual de Formularios
**Como** usuario
**Quiero** recibir feedback visual al llenar los formularios
**Para** saber si estoy ingresando la información correctamente

### Criterios de Aceptación
- [ ] Los campos muestran borde verde cuando son válidos
- [ ] Los campos muestran borde rojo cuando son inválidos (después de tocarlos)
- [ ] Mensajes de error aparecen debajo de cada campo inválido
- [ ] Los mensajes de error son descriptivos y en español
- [ ] Icono de check aparece en campos válidos
- [ ] Icono de error aparece en campos inválidos
- [ ] **Mensajes de error con contraste mínimo 4.5:1**
- [ ] **Iconos de validación con aria-labels descriptivos**
- [ ] **Los errores se anuncian a screen readers**

### Notas Técnicas
- Mensajes de error del archivo angular.tech.yaml
- **Iconos a usar**: `faCheck` (válido), `faExclamationTriangle` (error)
- Colores de validación: verde #059669 (4.5:1), rojo #DC2626 (4.6:1)

---

## US-006: Diseño Responsive
**Como** usuario
**Quiero** poder usar la página de autenticación en cualquier dispositivo
**Para** acceder a PlanSport desde donde esté

### Criterios de Aceptación
- [ ] En móvil: formulario ocupa todo el ancho con padding lateral
- [ ] En tablet: formulario centrado con ancho máximo de 480px
- [ ] En desktop: diseño split-screen con imagen/ilustración a un lado
- [ ] Los tabs se mantienen usables en todas las resoluciones
- [ ] El texto es legible en todos los tamaños (mínimo 14px)
- [ ] Los botones tienen tamaño mínimo de 44x44px para touch
- [ ] **Focus visible se adapta al tamaño de pantalla**
- [ ] **Imágenes decorativas tienen alt="" o aria-hidden="true"**

### Notas Técnicas
- Usar Tailwind CSS breakpoints (sm, md, lg, xl)
- Considerar orientación landscape en móviles
- Test en dispositivos reales o Chrome DevTools

---

## US-007: Estados de Carga (Preparación)
**Como** desarrollador
**Quiero** tener preparados los estados de carga
**Para** implementarlos fácilmente cuando se conecte el backend

### Criterios de Aceptación
- [ ] Botones de submit muestran estado disabled mientras "cargan"
- [ ] Spinner aparece en el botón durante la "carga"
- [ ] Los campos se deshabilitan durante la "carga"
- [ ] Mensaje de "Procesando..." es visible
- [ ] **Spinner tiene aria-label="Cargando"**
- [ ] **Estados de carga mantienen el contraste adecuado**
- [ ] Se puede simular el estado de carga para testing

### Notas Técnicas
- Signal para isLoading state
- **Icono a usar**: `faSpinner` con animación spin
- Preparar método simulateLoading() para demos
