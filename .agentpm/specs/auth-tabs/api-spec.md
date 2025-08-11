# API Specification - Auth Tabs Component

## Nota Importante
**Esta especificación es para referencia futura. En esta fase solo se implementará la parte visual del componente, sin conexión al backend.**

## Endpoints Futuros

### 1. Login
**Endpoint:** `POST /api/v1/auth/login`
**Descripción:** Autenticar usuario existente

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "sport": "string",
      "role": "string"
    },
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string",
      "expiresIn": 3600
    }
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Credenciales inválidas"
  }
}
```

**Validaciones:**
- Email: formato válido, requerido
- Password: requerido, mínimo 8 caracteres

---

### 2. Register
**Endpoint:** `POST /api/v1/auth/register`
**Descripción:** Registrar nuevo usuario

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "sport": "string",
  "acceptTerms": true
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "sport": "string",
      "subscription": "free"
    },
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string",
      "expiresIn": 3600
    }
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "El email ya está registrado"
  }
}
```

**Validaciones:**
- Name: requerido, mínimo 2 caracteres
- Email: formato válido, único en BD
- Password: mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 especial
- ConfirmPassword: debe coincidir con password
- Sport: debe existir en catálogo
- AcceptTerms: debe ser true

---

### 3. Refresh Token
**Endpoint:** `POST /api/v1/auth/refresh`
**Descripción:** Renovar token de acceso

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 3600
  }
}
```

---

### 4. Forgot Password
**Endpoint:** `POST /api/v1/auth/forgot-password`
**Descripción:** Solicitar reset de contraseña

**Request Body:**
```json
{
  "email": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Si el email existe, recibirás instrucciones para resetear tu contraseña"
}
```

---

## DTOs Backend (.NET)

### LoginRequest
```csharp
public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [MinLength(8)]
    public string Password { get; set; }
    
    public bool RememberMe { get; set; }
}
```

### RegisterRequest
```csharp
public class RegisterRequest
{
    [Required]
    [MinLength(2)]
    public string Name { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
    public string Password { get; set; }
    
    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; }
    
    [Required]
    public string Sport { get; set; }
    
    [Required]
    [Range(typeof(bool), "true", "true")]
    public bool AcceptTerms { get; set; }
}
```

### AuthResponse
```csharp
public class AuthResponse
{
    public UserDto User { get; set; }
    public TokenDto Tokens { get; set; }
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Sport { get; set; }
    public string Role { get; set; }
    public string Subscription { get; set; }
}

public class TokenDto
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public int ExpiresIn { get; set; }
}
```

---

## Integración con Supabase (Futura)

### Configuración
```typescript
// environment.ts
export const environment = {
  supabase: {
    url: process.env['SUPABASE_URL'],
    anonKey: process.env['SUPABASE_ANON_KEY']
  }
};
```

### Auth Service Methods
```typescript
// Métodos que se implementarán en el futuro
interface IAuthService {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  register(userData: RegisterData): Observable<AuthResponse>;
  logout(): Observable<void>;
  refreshToken(): Observable<TokenResponse>;
  forgotPassword(email: string): Observable<void>;
  resetPassword(token: string, newPassword: string): Observable<void>;
  getCurrentUser(): Observable<User | null>;
  isAuthenticated(): Observable<boolean>;
}
```

---

## Headers de Seguridad

### Request Headers
```
Content-Type: application/json
Accept: application/json
X-Request-Id: [UUID]
```

### Response Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Authenticated Request Headers
```
Authorization: Bearer [JWT_TOKEN]
```

---

## Rate Limiting (Futuro)
- Login: 5 intentos por minuto por IP
- Register: 3 registros por hora por IP
- Forgot Password: 3 solicitudes por hora por email

---

## Códigos de Error

| Código | Descripción | HTTP Status |
|--------|-------------|-------------|
| INVALID_CREDENTIALS | Credenciales incorrectas | 401 |
| EMAIL_EXISTS | Email ya registrado | 400 |
| INVALID_TOKEN | Token inválido o expirado | 401 |
| RATE_LIMIT_EXCEEDED | Límite de intentos excedido | 429 |
| VALIDATION_ERROR | Error de validación | 400 |
| SERVER_ERROR | Error interno del servidor | 500 |

---

## Notas de Implementación

1. **Seguridad:**
   - Hashear contraseñas con BCrypt (factor 10)
   - Tokens JWT con expiración corta (1 hora)
   - Refresh tokens con expiración larga (7 días)
   - HTTPS obligatorio en producción

2. **Validación:**
   - Validar en frontend y backend
   - Mensajes genéricos para evitar enumeración
   - Sanitizar todas las entradas

3. **Logging:**
   - Log de intentos fallidos de login
   - Log de registros exitosos
   - No loguear contraseñas ni tokens

4. **Performance:**
   - Cache de validación de tokens
   - Índices en email para búsquedas rápidas
