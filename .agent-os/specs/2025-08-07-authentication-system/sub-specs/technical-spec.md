# Technical Specification - Authentication System

## Technical Requirements

### Frontend Components
- **AuthComponent**: Página principal con tabs Material para Login/Register
- **LoginFormComponent**: Formulario reactivo para inicio de sesión
- **RegisterFormComponent**: Formulario reactivo para registro de usuarios
- **DashboardComponent**: Página protegida que muestra información del usuario

### Services
- **AuthService**: Servicio principal para integración con Supabase Auth
- **TokenService**: Gestión de JWT tokens y refresh automático
- **UserService**: Manejo de información del usuario autenticado

### Guards y Interceptors
- **AuthGuard**: Guard para proteger rutas que requieren autenticación
- **AuthInterceptor**: Interceptor HTTP para agregar tokens automáticamente
- **TokenInterceptor**: Interceptor para refresh automático de tokens expirados

### Routing
- `/auth` - Página de autenticación (pública)
- `/dashboard` - Dashboard protegido (requiere auth)
- Redirección automática desde `/` a `/auth` si no autenticado

## Technology Stack

### Angular Dependencies
- **@angular/material**: Tabs, Forms, Buttons, Cards
- **@angular/forms**: ReactiveFormsModule para formularios
- **@angular/router**: Navegación y guards
- **@supabase/supabase-js**: Cliente oficial de Supabase
- **rxjs**: Manejo de estados y observables

### Supabase Configuration
- **Authentication Provider**: Supabase Auth
- **Token Management**: JWT con refresh automático
- **User Profiles**: Tabla custom para información adicional
- **Row Level Security**: Configuración básica para multi-tenant

## Data Models

### User Profile (Supabase)
```typescript
interface UserProfile {
  id: string; // UUID from auth.users
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}
```

### Auth State
```typescript
interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}
```

## Security Considerations

- **Token Storage**: JWT en localStorage con expiración automática
- **Route Protection**: AuthGuard en todas las rutas protegidas
- **CSRF Protection**: Tokens incluidos en headers HTTP
- **Input Validation**: Validación client-side y server-side
- **Error Handling**: Mensajes de error seguros sin exposición de datos

## Performance Optimizations

- **Lazy Loading**: Módulos de auth y dashboard cargados bajo demanda
- **Token Refresh**: Refresh automático antes de expiración
- **State Management**: RxJS BehaviorSubject para estado reactivo
- **Form Validation**: Validación asíncrona para email único

## Testing Strategy

- **Unit Tests**: Servicios, componentes y guards
- **Integration Tests**: Flujo completo de auth
- **E2E Tests**: Navegación y formularios
- **Mock Services**: Supabase mocks para testing