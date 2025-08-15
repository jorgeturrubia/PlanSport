# User Stories - Dashboard Layout

## US-001: Visualización de información del usuario
**Como** usuario autenticado
**Quiero** ver mi nombre y rol en la barra de navegación
**Para** confirmar mi identidad y nivel de acceso

### Criterios de Aceptación
- [ ] El nombre completo del usuario se muestra en el navbar
- [ ] El rol del usuario se muestra debajo del nombre
- [ ] Las iniciales del usuario se muestran en un avatar circular
- [ ] En móviles, la información se muestra en el dropdown
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**

### Notas Técnicas
- Usar signals para el estado del usuario
- Computed para generar las iniciales automáticamente
- **Iconos a usar**: faUserCircle para el avatar, faChevronDown para el dropdown

---

## US-002: Navegación mediante sidebar
**Como** usuario
**Quiero** tener un menú lateral con todas las opciones disponibles
**Para** navegar fácilmente entre las diferentes secciones

### Criterios de Aceptación
- [ ] El sidebar muestra todas las opciones de navegación
- [ ] Cada opción tiene un icono representativo
- [ ] La opción activa está claramente destacada
- [ ] El sidebar es responsive (se oculta en móviles)
- [ ] Se puede abrir/cerrar con el botón de menú
- [ ] Los items del menú respetan los roles del usuario
- [ ] **Navegación completa por teclado**
- [ ] **Focus states visibles en todos los elementos**

### Notas Técnicas
- RouterLinkActive para destacar la ruta actual
- **Iconos específicos**:
  - faHome para Inicio
  - faUsers para Equipos
  - faCalendarAlt para Planificaciones
  - faStopwatch para Entrenamientos
  - faTrophy para Objetivos
  - faDumbbell para Ejercicios
  - faStore para Marketplace
  - faChartLine para Reportes

---

## US-003: Dropdown de perfil de usuario
**Como** usuario
**Quiero** tener un menú desplegable con opciones de perfil
**Para** acceder rápidamente a mi configuración y cerrar sesión

### Criterios de Aceptación
- [ ] Al hacer clic en el avatar se abre un dropdown
- [ ] El dropdown muestra opciones: Mi Perfil, Configuración, Cerrar Sesión
- [ ] Cada opción tiene un icono descriptivo
- [ ] El dropdown se cierra al hacer clic fuera
- [ ] La flecha del dropdown rota al abrir/cerrar
- [ ] **Animaciones suaves respetando prefers-reduced-motion**
- [ ] **Contraste adecuado en todos los estados**

### Notas Técnicas
- Signal para controlar el estado abierto/cerrado
- Backdrop invisible para cerrar al hacer clic fuera
- **Iconos**: faUser (perfil), faCog (configuración), faSignOutAlt (logout)

---

## US-004: Cerrar sesión (Logout)
**Como** usuario autenticado
**Quiero** poder cerrar mi sesión de forma segura
**Para** proteger mi cuenta cuando no esté usando la aplicación

### Criterios de Aceptación
- [ ] Al hacer clic en "Cerrar Sesión" se limpia la sesión
- [ ] Se elimina toda la información del localStorage
- [ ] Se redirige automáticamente a /login
- [ ] El botón de logout está claramente identificado en rojo
- [ ] No se puede acceder al dashboard sin autenticación
- [ ] **Confirmación visual del logout exitoso**

### Notas Técnicas
- AuthService.logout() limpia tokens y usuario
- Router.navigate(['/login']) para redirección
- **Icono**: faSignOutAlt en color rojo

---

## US-005: Responsive Design
**Como** usuario
**Quiero** que el dashboard funcione en cualquier dispositivo
**Para** poder acceder desde móvil, tablet o desktop

### Criterios de Aceptación
- [ ] En móviles el sidebar se oculta por defecto
- [ ] El botón de menú aparece solo en móviles/tablets
- [ ] El sidebar se superpone al contenido en móviles
- [ ] La información del usuario se adapta al tamaño de pantalla
- [ ] Todos los elementos son accesibles con touch
- [ ] **Tamaños mínimos de touch targets (44x44px)**

### Notas Técnicas
- Breakpoints: móvil (<640px), tablet (640-1024px), desktop (>1024px)
- Signal para detectar si es móvil
- **Icono**: faBars para el menú hamburguesa

---

## US-006: Visualización de iniciales del usuario
**Como** usuario
**Quiero** ver mis iniciales en el avatar cuando no tengo foto
**Para** tener una representación visual personalizada

### Criterios de Aceptación
- [ ] Se muestran las primeras dos letras del nombre completo
- [ ] Si hay nombre y apellido, se usa la primera letra de cada uno
- [ ] Las iniciales aparecen en mayúsculas
- [ ] El avatar tiene un color de fondo consistente
- [ ] El avatar aparece tanto en navbar como en sidebar
- [ ] **Contraste de texto blanco sobre fondo azul > 4.5:1**

### Notas Técnicas
- Computed signal para generar iniciales
- Fondo azul primario (#3B82F6) con texto blanco
- Círculo de 36x36px en navbar, 40x40px en sidebar

---

## US-007: Mockeo temporal del rol
**Como** desarrollador
**Quiero** poder simular diferentes roles de usuario
**Para** probar las funcionalidades según permisos

### Criterios de Aceptación
- [ ] El rol se muestra correctamente bajo el nombre
- [ ] Se puede cambiar el rol para testing (solo desarrollo)
- [ ] Los roles disponibles son: Admin, Director Técnico, Entrenador
- [ ] El menú se actualiza según el rol activo
- [ ] Los permisos se aplican correctamente

### Notas Técnicas
- Método mockChangeRole() en AuthService
- Enum UserRole con los tres roles
- Mostrar "Director Técnico" por defecto