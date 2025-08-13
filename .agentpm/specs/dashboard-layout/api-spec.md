# API Specification - Dashboard Layout

## Base Configuration
```yaml
base_url: http://localhost:5000/api/v1
auth_header: Authorization
auth_prefix: Bearer
```

## Endpoints

### 1. Get User Profile
**Endpoint:** `GET /auth/profile`
**Description:** Obtiene la información del usuario autenticado actual
**Authentication:** Required

**Headers:**
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@example.com",
    "name": "Alejandro Ruiz García",
    "firstName": "Alejandro",
    "lastName": "Ruiz García",
    "role": "director",
    "avatar": null,
    "organizationId": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response 401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token inválido o expirado"
  }
}
```

---

### 2. Logout
**Endpoint:** `POST /auth/logout`
**Description:** Cierra la sesión del usuario actual
**Authentication:** Required

**Headers:**
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "optional_refresh_token"
}
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

**Response 401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token inválido"
  }
}
```

---

### 3. Refresh Token
**Endpoint:** `POST /auth/refresh`
**Description:** Renueva el token de acceso usando el refresh token
**Authentication:** Not required (uses refresh token)

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "refreshToken": "new_refresh_token",
    "expiresIn": 3600
  }
}
```

**Response 401 Unauthorized:**
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

### 4. Get Navigation Menu (Optional)
**Endpoint:** `GET /navigation/menu`
**Description:** Obtiene la estructura del menú según el rol del usuario
**Authentication:** Required

**Headers:**
```http
Authorization: Bearer {jwt_token}
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "home",
      "label": "Inicio",
      "icon": "home",
      "route": "/dashboard",
      "order": 1
    },
    {
      "id": "teams",
      "label": "Equipos",
      "icon": "users",
      "route": "/teams",
      "order": 2
    },
    {
      "id": "planning",
      "label": "Planificaciones",
      "icon": "calendar",
      "route": "/planning",
      "order": 3
    },
    {
      "id": "reports",
      "label": "Reportes",
      "icon": "chart",
      "route": "/reports",
      "order": 8,
      "roles": ["admin", "director"]
    }
  ]
}
```

## DTOs

### UserDto
```csharp
public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; }
    public string? Avatar { get; set; }
    public Guid OrganizationId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### LoginResponseDto
```csharp
public class LoginResponseDto
{
    public UserDto User { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public int ExpiresIn { get; set; }
}
```

### RefreshTokenRequestDto
```csharp
public class RefreshTokenRequestDto
{
    public string RefreshToken { get; set; }
}
```

### NavigationItemDto
```csharp
public class NavigationItemDto
{
    public string Id { get; set; }
    public string Label { get; set; }
    public string Icon { get; set; }
    public string Route { get; set; }
    public int Order { get; set; }
    public List<string>? Roles { get; set; }
    public List<NavigationItemDto>? Children { get; set; }
}
```

## Error Codes
```yaml
errors:
  UNAUTHORIZED: "No autorizado"
  TOKEN_EXPIRED: "Token expirado"
  INVALID_TOKEN: "Token inválido"
  INVALID_REFRESH_TOKEN: "Refresh token inválido"
  SESSION_NOT_FOUND: "Sesión no encontrada"
  USER_NOT_FOUND: "Usuario no encontrado"
```

## Headers Configuration
```yaml
required_headers:
  - Authorization: "Bearer {token}"
  - Content-Type: "application/json"
  - Accept: "application/json"
  
optional_headers:
  - X-Request-ID: "uuid"
  - Accept-Language: "es-ES"
```

## Rate Limiting
```yaml
rate_limits:
  /auth/profile: 60 requests per minute
  /auth/logout: 10 requests per minute
  /auth/refresh: 20 requests per minute
  /navigation/menu: 30 requests per minute
```