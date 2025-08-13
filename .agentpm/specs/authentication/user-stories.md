# User Stories - Sistema de Autenticación

## US-001: Login de Usuario
**Como** usuario registrado
**Quiero** iniciar sesión con mi email y contraseña
**Para** acceder a las funcionalidades protegidas de la aplicación

### Criterios de Aceptación
- [ ] Puedo ingresar mi email y contraseña en el formulario
- [ ] El botón de login muestra un spinner mientras procesa
- [ ] Si las credenciales son correctas, soy redirigido al dashboard
- [ ] Si las credenciales son incorrectas, veo un mensaje de error claro
- [ ] El token JWT se guarda en localStorage
- [ ] Se establece el refresh token para renovación automática
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Navegación completa por teclado
- [ ] Los campos tienen validación en tiempo real

### Notas Técnicas
- Endpoint: POST `/api/auth/login`
- Respuesta incluye: access_token, refresh_token, expires_in, user
- **Iconos a usar**: `faUser` para email, `faLock` para password, `faSignInAlt` en botón
- Validación de email formato RFC 5322
- Mínimo 8 caracteres para contraseña

---

## US-002: Registro de Usuario
**Como** visitante
**Quiero** crear una cuenta nueva
**Para** empezar a usar la aplicación

### Criterios de Aceptación
- [ ] Puedo ingresar email, contraseña y confirmar contraseña
- [ ] Las contraseñas deben coincidir
- [ ] La contraseña debe cumplir requisitos de seguridad
- [ ] Recibo un email de confirmación (opcional según config)
- [ ] Veo mensajes de validación en tiempo real
- [ ] Después del registro exitoso, inicio sesión automáticamente
- [ ] **Contraste de colores cumple WCAG AA**
- [ ] **Iconos descriptivos con aria-labels**
- [ ] Indicador de fortaleza de contraseña visible
- [ ] Términos y condiciones con checkbox accesible

### Notas Técnicas
- Endpoint: POST `/api/auth/register`
- Validación de contraseña: mínimo 8 caracteres, 1 mayúscula, 1 número, 1 especial
- **Iconos a usar**: `faUserPlus` en botón, `faCheck` para validaciones correctas, `faTimes` para errores
- Integración con Supabase Auth signUp

---

## US-003: Renovación Automática de Token
**Como** usuario autenticado
**Quiero** que mi sesión se renueve automáticamente
**Para** no tener que hacer login constantemente

### Criterios de Aceptación
- [ ] Mi sesión se renueva automáticamente antes de expirar
- [ ] No veo interrupciones mientras navego
- [ ] Si el refresh token expira, soy redirigido al login
- [ ] El proceso es transparente para el usuario
- [ ] Se mantiene el estado de la aplicación durante la renovación
- [ ] Los requests en cola esperan la renovación

### Notas Técnicas
- Endpoint: POST `/api/auth/refresh`
- Se ejecuta 1 minuto antes de la expiración del access token
- Usa el refresh_token almacenado en localStorage
- Implementar retry logic con exponential backoff

---

## US-004: Logout de Usuario
**Como** usuario autenticado
**Quiero** cerrar sesión de forma segura
**Para** proteger mi cuenta cuando termino de usar la aplicación

### Criterios de Aceptación
- [ ] Puedo cerrar sesión desde cualquier página
- [ ] Se eliminan todos los tokens del localStorage
- [ ] Soy redirigido a la página de login
- [ ] Se invalida el token en el backend
- [ ] Se limpian todos los datos en memoria
- [ ] **Icono de logout visible y accesible**

### Notas Técnicas
- Endpoint: POST `/api/auth/logout`
- Limpia: access_token, refresh_token, user data
- **Iconos a usar**: `faSignOutAlt` para logout
- Confirmar logout en acciones críticas

---

## US-005: Protección de Rutas
**Como** sistema
**Quiero** proteger todas las rutas excepto landing y auth
**Para** garantizar que solo usuarios autenticados accedan al contenido

### Criterios de Aceptación
- [ ] Las rutas públicas son: '/', '/login', '/register', '/forgot-password'
- [ ] Todas las demás rutas requieren autenticación
- [ ] Si intento acceder sin token, soy redirigido al login
- [ ] Se guarda la ruta intentada para redirigir después del login
- [ ] El guard verifica la validez del token
- [ ] Se muestra un loading mientras se verifica la autenticación

### Notas Técnicas
- Implementar AuthGuard con CanActivate
- Implementar PublicGuard para rutas públicas
- Verificación de token en cada navegación
- **Iconos a usar**: `faSpinner` durante verificación

---

## US-006: Interceptor de Autenticación
**Como** sistema
**Quiero** añadir automáticamente el token a todas las peticiones
**Para** autenticar las llamadas al API sin código repetitivo

### Criterios de Aceptación
- [ ] Todas las peticiones HTTP incluyen el header Authorization
- [ ] El formato es: "Bearer {token}"
- [ ] Si recibo 401, intento renovar el token
- [ ] Si la renovación falla, redirijo al login
- [ ] Las peticiones a rutas públicas no incluyen el token
- [ ] Se manejan errores 403 (Forbidden) apropiadamente

### Notas Técnicas
- Implementar HttpInterceptor
- Excluir rutas: /api/auth/login, /api/auth/register
- Implementar cola de requests durante renovación
- Manejar errores de red gracefully

---

## US-007: Persistencia de Sesión
**Como** usuario
**Quiero** mantener mi sesión al recargar la página
**Para** no tener que hacer login cada vez que actualizo

### Criterios de Aceptación
- [ ] Al recargar, verifico si hay token válido en localStorage
- [ ] Si el token es válido, restauro la sesión
- [ ] Si el token expiró pero hay refresh token, intento renovar
- [ ] Se muestra un splash screen durante la verificación
- [ ] El estado del usuario se restaura completamente
- [ ] **Loading con icono animado durante verificación**

### Notas Técnicas
- Verificar en APP_INITIALIZER de Angular
- Endpoint: GET `/api/auth/verify`
- **Iconos a usar**: `faSpinner` con animación spin
- Timeout de 5 segundos para verificación

---

## US-008: Manejo de Errores de Autenticación
**Como** usuario
**Quiero** ver mensajes claros cuando hay problemas de autenticación
**Para** entender qué está pasando y cómo solucionarlo

### Criterios de Aceptación
- [ ] Veo mensajes específicos para cada tipo de error
- [ ] Los mensajes están en español
- [ ] Los errores se muestran con iconos apropiados
- [ ] Hay acciones sugeridas para cada error
- [ ] **Contraste de colores cumple WCAG AA en mensajes de error**
- [ ] **Iconos con aria-labels descriptivos**
- [ ] Los mensajes son anunciados por screen readers

### Notas Técnicas
- Errores comunes: credenciales inválidas, sesión expirada, cuenta bloqueada
- **Iconos a usar**: `faExclamationTriangle` para warnings, `faTimes` para errores
- Toast notifications con auto-dismiss
- Log de errores para debugging

---

## US-009: Validación de Token en Backend
**Como** API backend
**Quiero** validar cada token JWT recibido
**Para** asegurar que solo requests autorizados sean procesados

### Criterios de Aceptación
- [ ] Valido la firma del JWT con la clave pública de Supabase
- [ ] Verifico que el token no haya expirado
- [ ] Verifico el issuer y audience
- [ ] Extraigo los claims del usuario
- [ ] Rechazo tokens malformados con 401
- [ ] Implemento rate limiting por IP

### Notas Técnicas
- Usar Microsoft.IdentityModel.Tokens
- Validar contra JWKS de Supabase
- Cache de claves públicas por 10 minutos
- Configurar en Program.cs con AddAuthentication

---

## US-010: Integración con Supabase
**Como** sistema
**Quiero** usar Supabase como proveedor de identidad
**Para** delegar la gestión de usuarios a un servicio especializado

### Criterios de Aceptación
- [ ] El backend se comunica con Supabase Admin API
- [ ] Se sincronizan usuarios entre Supabase y base de datos local
- [ ] Se manejan webhooks de Supabase para eventos
- [ ] Se respetan los roles y permisos de Supabase
- [ ] Se implementa fallback si Supabase no responde

### Notas Técnicas
- Usar Supabase.NET SDK
- Configurar service_role key en backend
- Implementar circuit breaker para resiliencia
- Sincronización de metadata de usuarios
