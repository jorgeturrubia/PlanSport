# User Stories - Landing Page

## US-001: Visualización de la página principal
**Como** visitante
**Quiero** ver una página de inicio atractiva y profesional
**Para** entender rápidamente qué es PlanSport y sus beneficios

### Criterios de Aceptación
- [ ] Se muestra el logo/nombre de PlanSport en el header
- [ ] El header es sticky y se mantiene visible al hacer scroll
- [ ] Se presenta una sección hero con mensaje principal y CTA
- [ ] Los textos son claros y legibles
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] La página carga en menos de 3 segundos
- [ ] El diseño es responsive en móvil, tablet y desktop

### Notas Técnicas
- Implementar lazy loading para imágenes
- Optimizar assets para performance
- **Iconos a usar**: `faFutbol`, `faBasketballBall`, `faSwimmer` para deportes

---

## US-002: Navegación entre secciones
**Como** visitante
**Quiero** navegar fácilmente entre las diferentes secciones
**Para** explorar toda la información disponible

### Criterios de Aceptación
- [ ] El menú muestra enlaces a: Características, Marketplace, Suscripciones
- [ ] Al hacer click en un enlace, scroll suave a la sección correspondiente
- [ ] La sección activa se resalta en el menú
- [ ] En móvil, menú hamburguesa funcional
- [ ] **Contraste de colores cumple WCAG AA en estados hover/active**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Navegación por teclado completamente funcional
- [ ] Indicador visual de foco en todos los enlaces

### Notas Técnicas
- Usar IntersectionObserver para detectar sección activa
- Implementar scroll-behavior: smooth
- **Iconos a usar**: `faBars` (menú móvil), `faTimes` (cerrar menú)

---

## US-003: Visualización de características
**Como** visitante
**Quiero** ver las características principales de PlanSport
**Para** evaluar si la plataforma satisface mis necesidades

### Criterios de Aceptación
- [ ] Se muestran al menos 6 características principales
- [ ] Cada característica tiene icono, título y descripción
- [ ] Las características están organizadas en grid responsive
- [ ] Animaciones sutiles al entrar en viewport
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Textos concisos y claros en español

### Notas Técnicas
- Usar Angular Animations con trigger en scroll
- Grid de 3 columnas en desktop, 2 en tablet, 1 en móvil
- **Iconos a usar**: `faCheck`, `faRocket`, `faUsers`, `faChartLine`, `faCalendarAlt`, `faTasks`

---

## US-004: Preview del Marketplace
**Como** visitante
**Quiero** ver una preview del marketplace de planificaciones
**Para** entender el valor de la comunidad y recursos compartidos

### Criterios de Aceptación
- [ ] Se muestra una sección destacando el marketplace
- [ ] Incluye estadísticas clave (ej: "500+ planificaciones")
- [ ] Muestra ejemplos o mockups de planificaciones
- [ ] Sistema de valoración con estrellas visible
- [ ] CTA para "Explorar Marketplace" (requiere registro)
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**

### Notas Técnicas
- Mostrar cards de ejemplo con datos simulados
- **Iconos a usar**: `faStar` (valoraciones), `faDownload` (descargas), `faShare` (compartir)

---

## US-005: Visualización de planes de suscripción
**Como** visitante
**Quiero** ver los diferentes planes de suscripción disponibles
**Para** evaluar costos y elegir el plan adecuado

### Criterios de Aceptación
- [ ] Se muestran 3 planes: Gratuito, Entrenador, Club
- [ ] Cada plan muestra precio, características y limitaciones
- [ ] Plan recomendado está destacado visualmente
- [ ] Tabla comparativa clara y legible
- [ ] CTA específico para cada plan
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Los precios son claros y sin letra pequeña engañosa

### Notas Técnicas
- Destacar plan "Entrenador" como más popular
- Usar cards o tabla comparativa responsive
- **Iconos a usar**: `faCrown` (planes premium), `faCheckCircle` (características incluidas), `faTimes` (no incluido)

---

## US-006: Acceso a autenticación
**Como** visitante
**Quiero** acceder fácilmente a las opciones de login y registro
**Para** comenzar a usar la plataforma

### Criterios de Aceptación
- [ ] Botones de "Iniciar Sesión" y "Registrarse" visibles en header
- [ ] Los botones mantienen visibilidad en scroll (sticky header)
- [ ] Botón de registro más prominente (color primario)
- [ ] Redirección correcta a /login y /register
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Los botones son claramente clickeables
- [ ] Estados hover/focus bien definidos

### Notas Técnicas
- Usar RouterLink para navegación SPA
- Botón registro con color primario, login con outline
- **Iconos a usar**: `faSignInAlt` (login), `faUserPlus` (registro)

---

## US-007: Footer informativo
**Como** visitante
**Quiero** encontrar información adicional y enlaces útiles
**Para** conocer más sobre la empresa y políticas

### Criterios de Aceptación
- [ ] Footer con secciones: Producto, Empresa, Legal, Contacto
- [ ] Enlaces a redes sociales
- [ ] Copyright y año actual
- [ ] Enlaces a términos y privacidad
- [ ] Información de contacto
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Footer responsive en todos los dispositivos

### Notas Técnicas
- Usar grid para organización del footer
- **Iconos a usar**: Iconos de redes sociales de Font Awesome brands

---

## US-008: Menú móvil responsive
**Como** visitante en dispositivo móvil
**Quiero** tener un menú hamburguesa funcional
**Para** navegar cómodamente en pantallas pequeñas

### Criterios de Aceptación
- [ ] Menú hamburguesa visible en pantallas < 768px
- [ ] Al tocar, se despliega menú lateral o fullscreen
- [ ] Overlay oscuro detrás del menú
- [ ] Botón de cerrar (X) visible
- [ ] Menú se cierra al seleccionar una opción
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Animación suave de apertura/cierre
- [ ] Focus trap dentro del menú abierto

### Notas Técnicas
- Implementar con Angular Animations
- Prevenir scroll del body cuando menú está abierto
- **Iconos a usar**: `faBars` (abrir), `faTimes` (cerrar)