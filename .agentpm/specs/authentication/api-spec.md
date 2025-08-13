# API Specification - Sistema de Autenticación

## Base Configuration
- **Base URL**: `http://localhost:5000/api/auth`
- **Authentication**: Bearer Token (JWT)
- **Content-Type**: `application/json`
- **API Version**: `v1`

## Endpoints

### 1. POST /api/auth/login
**Descripción**: Autentica un usuario y retorna tokens JWT

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "7f8a9b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o",
    "expiresIn": 900,
    "tokenType": "Bearer",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "fullName": "Juan Pérez",
      "role": "entrenador",
      "organizationId": "org-123",
      "metadata": {
        "lastLogin": "2024-01-12T10:30:00Z",
        "loginCount": 42
      }
    }
  }
}
```

**Response 401 Unauthorized**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email o contraseña incorrectos",
    "details": null
  }
}
```

**Response 429 Too Many Requests**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Demasiados intentos. Por favor, espera 15 minutos",
    "retryAfter": 900
  }
}
```

---

### 2. POST /api/auth/register
**Descripción**: Registra un nuevo usuario en el sistema

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!",
  "fullName": "María García",
  "organizationName": "Club Deportivo Example",
  "acceptTerms": true
}
```

**Validation Rules**:
- Email: Formato RFC 5322 válido
- Password: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 especial
- ConfirmPassword: Debe coincidir con password
- FullName: Entre 2 y 100 caracteres
- AcceptTerms: Debe ser true

**Response 201 Created**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "7f8a9b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o",
    "expiresIn": 900,
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "newuser@example.com",
      "fullName": "María García",
      "role": "entrenador",
      "emailConfirmed": false,
      "organizationId": "org-456"
    }
  }
}
```

**Response 400 Bad Request**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Error de validación",
    "details": {
      "email": ["El email ya está registrado"],
      "password": ["La contraseña debe contener al menos un carácter especial"]
    }
  }
}
```

---

### 3. POST /api/auth/refresh
**Descripción**: Renueva el access token usando el refresh token

**Request Body**:
```json
{
  "refreshToken": "7f8a9b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "new-refresh-token-here",
    "expiresIn": 900
  }
}
```

**Response 401 Unauthorized**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Refresh token inválido o expirado"
  }
}
```

---

### 4. POST /api/auth/logout
**Descripción**: Cierra la sesión del usuario e invalida los tokens

**Headers**:
```
Authorization: Bearer {accessToken}
```

**Request Body**:
```json
{
  "refreshToken": "7f8a9b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

---

### 5. GET /api/auth/verify
**Descripción**: Verifica si el token actual es válido

**Headers**:
```
Authorization: Bearer {accessToken}
```

**Response 200 OK**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "role": "entrenador"
    },
    "expiresAt": "2024-01-12T11:45:00Z"
  }
}
```

**Response 401 Unauthorized**:
```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "El token ha expirado"
  }
}
```

---

### 6. POST /api/auth/forgot-password
**Descripción**: Inicia el proceso de recuperación de contraseña

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "message": "Si el email existe, recibirás instrucciones para restablecer tu contraseña"
}
```

---

### 7. POST /api/auth/reset-password
**Descripción**: Restablece la contraseña con un token de recuperación

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePassword123!",
  "confirmPassword": "NewSecurePassword123!"
}
```

**Response 200 OK**:
```json
{
  "success": true,
  "message": "Contraseña restablecida correctamente"
}
```

---

## JWT Token Structure

### Access Token Claims
```json
{
  "sub": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "role": "entrenador",
  "organizationId": "org-123",
  "aud": "authenticated",
  "iss": "https://your-project.supabase.co/auth/v1",
  "iat": 1704194400,
  "exp": 1704195300,
  "nbf": 1704194400,
  "jti": "unique-jwt-id",
  "session_id": "session-uuid"
}
```

### Token Validation Parameters
```csharp
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidIssuer = "https://your-project.supabase.co/auth/v1",
    ValidateAudience = true,
    ValidAudience = "authenticated",
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = GetSupabasePublicKey(),
    ClockSkew = TimeSpan.FromMinutes(1)
};
```

---

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_CREDENTIALS | 401 | Email o contraseña incorrectos |
| TOKEN_EXPIRED | 401 | El token ha expirado |
| TOKEN_INVALID | 401 | Token malformado o inválido |
| INVALID_REFRESH_TOKEN | 401 | Refresh token inválido |
| USER_NOT_FOUND | 404 | Usuario no encontrado |
| EMAIL_ALREADY_EXISTS | 400 | El email ya está registrado |
| VALIDATION_ERROR | 400 | Error en validación de campos |
| RATE_LIMIT_EXCEEDED | 429 | Demasiados intentos |
| ACCOUNT_LOCKED | 403 | Cuenta bloqueada temporalmente |
| EMAIL_NOT_CONFIRMED | 403 | Email no confirmado |
| INSUFFICIENT_PERMISSIONS | 403 | Permisos insuficientes |
| INTERNAL_ERROR | 500 | Error interno del servidor |
| SUPABASE_UNAVAILABLE | 503 | Servicio de Supabase no disponible |

---

## Rate Limiting

- **Login attempts**: 5 intentos por IP cada 15 minutos
- **Register**: 3 registros por IP cada hora
- **Password reset**: 3 solicitudes por email cada hora
- **Token refresh**: 100 renovaciones por usuario cada hora
- **API calls authenticated**: 1000 requests por usuario cada hora

---

## Security Headers

Todos los endpoints incluyen:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

## CORS Configuration

```json
{
  "allowedOrigins": ["http://localhost:4200"],
  "allowedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  "allowedHeaders": ["Content-Type", "Authorization"],
  "exposedHeaders": ["X-Total-Count", "X-Page-Number"],
  "allowCredentials": true,
  "maxAge": 86400
}
```
