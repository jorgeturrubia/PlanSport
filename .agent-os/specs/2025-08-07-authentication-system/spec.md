# Authentication System Specification

## Overview

Implementar un sistema completo de autenticación para SportAgentoos que permita a los usuarios registrarse, iniciar sesión y acceder a un dashboard protegido, utilizando Supabase como proveedor de autenticación y gestión de tokens JWT con refresh automático.

## User Stories

### Historia 1: Navegación desde Landing Page

Como usuario visitante, quiero hacer clic en los botones "Login" o "Register" desde la página principal, para ser dirigido a una página de autenticación unificada donde pueda elegir entre iniciar sesión o registrarme.

**Flujo detallado:**
1. Usuario está en la landing page
2. Usuario hace clic en botón "Login" o "Register"
3. Sistema navega a `/auth`
4. Se muestra página con tabs para Login/Register
5. Tab activo depende del botón clickeado

### Historia 2: Registro de Usuario

Como nuevo usuario, quiero registrarme con email y contraseña en la plataforma, para que el sistema me autentique automáticamente y me dirija al dashboard mostrando mi nombre de usuario.

**Flujo detallado:**
1. Usuario completa formulario de registro (email, password, confirm password, nombre)
2. Sistema valida datos y llama a Supabase Auth
3. Si registro exitoso: auto-login y redirect a `/dashboard`
4. Dashboard muestra mensaje de bienvenida con nombre del usuario
5. Si error: mostrar mensaje de error específico

### Historia 3: Inicio de Sesión

Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder al dashboard y ver mi información personalizada con mi nombre de usuario.

**Flujo detallado:**
1. Usuario completa formulario de login (email, password)
2. Sistema valida credenciales con Supabase Auth
3. Si login exitoso: redirect a `/dashboard`
4. Dashboard muestra información del usuario logueado
5. Si error: mostrar mensaje de error específico

## Spec Scope

1. **Página de Autenticación** - Componente con tabs para Login/Register con formularios reactivos y validación
2. **Servicio de Autenticación** - Integración completa con Supabase Auth para login, register y gestión de sesiones
3. **Dashboard Protegido** - Página simple que muestra información del usuario autenticado
4. **Gestión de Tokens** - Manejo automático de JWT tokens, refresh tokens y persistencia en localStorage
5. **Guards de Navegación** - Protección de rutas que requieren autenticación y redirección automática

## Out of Scope

- Recuperación de contraseñas (reset password)
- Autenticación con redes sociales (Google, Facebook, etc.)
- Verificación de email
- Perfiles de usuario avanzados
- Roles y permisos granulares
- Multi-factor authentication (MFA)

## Expected Deliverable

1. **Sistema de autenticación funcional** - Usuarios pueden registrarse, hacer login y acceder al dashboard
2. **Navegación protegida** - Rutas protegidas redirigen al login si no hay autenticación válida
3. **Persistencia de sesión** - Los usuarios permanecen logueados entre sesiones del navegador
4. **UI/UX consistente** - Interfaz integrada con Angular Material siguiendo el diseño de la landing page