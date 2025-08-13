# User Stories - Sistema de Temas

## US-001: Ver Landing Page en Tema Dark por Defecto
**Como** visitante no autenticado
**Quiero** ver la landing page en modo oscuro por defecto
**Para** tener una experiencia visual moderna y atractiva

### Criterios de Aceptación
- [ ] La landing page se muestra en tema dark al acceder sin preferencia previa
- [ ] Los colores tienen contraste adecuado en modo dark (WCAG AA)
- [ ] Las imágenes y gráficos se adaptan al tema dark
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] El tema se aplica sin parpadeos (FOUC prevention)

### Notas Técnicas
- Aplicar clase `dark` al elemento `<html>` en rutas públicas
- Usar CSS variables de Tailwind v4 con @theme
- **Iconos a usar**: faMoon para indicador visual

---

## US-002: Ver Páginas de Autenticación en Tema Dark
**Como** usuario no autenticado
**Quiero** ver las páginas de login/registro en modo oscuro
**Para** mantener consistencia visual con la landing page

### Criterios de Aceptación
- [ ] Login muestra tema dark por defecto
- [ ] Registro muestra tema dark por defecto
- [ ] Recuperar contraseña muestra tema dark por defecto
- [ ] Los formularios son legibles en tema dark
- [ ] **Contraste en campos de formulario >= 4.5:1**
- [ ] **Focus states visibles en tema dark**

### Notas Técnicas
- Rutas /auth/* aplican tema dark automáticamente
- Validar contraste en estados hover/focus
- **Iconos a usar**: faUser, faLock, faEnvelope

---

## US-003: Ver Dashboard en Tema Light por Defecto
**Como** usuario autenticado sin preferencia guardada
**Quiero** ver el dashboard en modo light por defecto
**Para** tener mejor legibilidad durante el trabajo diario

### Criterios de Aceptación
- [ ] Dashboard se muestra en tema light al primer acceso
- [ ] Todas las secciones del dashboard usan tema light
- [ ] Gráficos y tablas son legibles en tema light
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Transición suave si vengo de página dark**

### Notas Técnicas
- Aplicar tema light por defecto en rutas protegidas
- Guardar preferencia cuando el usuario la cambie
- **Iconos a usar**: faSun para indicador visual

---

## US-004: Cambiar Tema con Toggle en Navbar
**Como** usuario autenticado
**Quiero** cambiar entre tema light y dark desde el navbar
**Para** personalizar mi experiencia según mi preferencia

### Criterios de Aceptación
- [ ] Toggle visible en navbar para usuarios autenticados
- [ ] Click cambia entre light/dark instantáneamente
- [ ] Animación suave de transición (300ms)
- [ ] Estado del toggle refleja tema actual
- [ ] **Toggle accesible por teclado (Space/Enter)**
- [ ] **Aria-label describe acción del toggle**
- [ ] **Respeta prefers-reduced-motion**

### Notas Técnicas
- Componente ThemeToggleComponent standalone
- Usar Angular signals para estado reactivo
- localStorage para persistencia
- **Iconos a usar**: faSun (light), faMoon (dark)

---

## US-005: Persistir Preferencia de Tema
**Como** usuario
**Quiero** que mi preferencia de tema se guarde
**Para** no tener que cambiarla cada vez que accedo

### Criterios de Aceptación
- [ ] Preferencia se guarda en localStorage
- [ ] Preferencia se aplica al recargar página
- [ ] Preferencia se mantiene al cerrar/abrir navegador
- [ ] Preferencia se aplica en todas las páginas
- [ ] Si no hay preferencia, usar default según contexto

### Notas Técnicas
- Key en localStorage: 'theme-preference'
- Valores: 'light', 'dark', 'system'
- ThemeService gestiona persistencia

---

## US-006: Respetar Preferencia del Sistema
**Como** usuario con preferencia de sistema operativo
**Quiero** que la app respete mi configuración de OS
**Para** tener consistencia con mi entorno

### Criterios de Aceptación
- [ ] Si no hay preferencia guardada, detectar prefers-color-scheme
- [ ] Opción "Sistema" en futuras iteraciones del toggle
- [ ] Actualizar automáticamente si cambia preferencia de OS
- [ ] **Indicador visual de modo "sistema"**

### Notas Técnicas
- window.matchMedia('(prefers-color-scheme: dark)')
- addEventListener para cambios de preferencia
- **Iconos a usar**: faDesktop para modo sistema

---

## US-007: Transiciones Suaves entre Temas
**Como** usuario
**Quiero** transiciones suaves al cambiar de tema
**Para** evitar cambios bruscos que cansen la vista

### Criterios de Aceptación
- [ ] Transición de colores en 300ms
- [ ] No hay parpadeos o FOUC
- [ ] Transición respeta prefers-reduced-motion
- [ ] Elementos mantienen su posición durante transición
- [ ] **Contraste se mantiene legible durante transición**

### Notas Técnicas
- CSS transitions en propiedades de color
- transition-property: background-color, color, border-color
- transition-duration: 300ms
- transition-timing-function: ease-in-out

---

## US-008: Accesibilidad del Sistema de Temas
**Como** usuario con necesidades de accesibilidad
**Quiero** que el sistema de temas sea completamente accesible
**Para** poder usar la aplicación sin barreras

### Criterios de Aceptación
- [ ] **Todos los textos cumplen WCAG AA en ambos temas**
- [ ] **Toggle navegable por teclado**
- [ ] **Anuncio de cambio de tema para screen readers**
- [ ] **Focus trap no se pierde al cambiar tema**
- [ ] **Sin dependencia solo de color para información**
- [ ] **Textos legibles sin CSS**

### Notas Técnicas
- aria-live="polite" para anunciar cambios
- role="switch" para toggle
- aria-checked para estado
- Validar con axe DevTools
- **Iconos con aria-hidden="true" cuando son decorativos**

---

## US-009: Optimización de Rendimiento
**Como** usuario
**Quiero** que el cambio de tema sea instantáneo
**Para** no experimentar delays en mi trabajo

### Criterios de Aceptación
- [ ] Cambio de tema < 100ms
- [ ] Sin recarga de página
- [ ] Sin re-renderizado innecesario
- [ ] CSS variables precargadas
- [ ] Bundle size mínimo para tema

### Notas Técnicas
- Usar CSS variables nativas
- ChangeDetectionStrategy.OnPush
- Lazy load de assets específicos de tema
- Tree shaking de estilos no usados
