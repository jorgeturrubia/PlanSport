# API Specification - Landing Page

## Overview
La landing page inicial no requiere endpoints de API específicos ya que maneja contenido estático. Sin embargo, documentamos aquí los endpoints relacionados que serán utilizados cuando el usuario interactúe con los CTAs.

## Endpoints Relacionados

### Autenticación (Existentes)
Estos endpoints ya existen y serán utilizados cuando el usuario haga click en los botones de login/registro:

#### Login
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "string",
    "refreshToken": "string",
    "user": {
      "id": "uuid",
      "email": "string",
      "role": "string"
    }
  }
}
```

#### Register
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "acceptTerms": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Usuario registrado exitosamente. Por favor verifica tu email."
  }
}
```

## Futuros Endpoints (Fase 2)

Para una versión futura de la landing page con contenido dinámico:

### Get Landing Stats
```http
GET /api/v1/public/stats
```

**Descripción:** Obtiene estadísticas públicas para mostrar en la landing

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1500,
    "totalPlannings": 500,
    "totalExercises": 2000,
    "averageRating": 4.5
  }
}
```

### Get Featured Plannings
```http
GET /api/v1/public/marketplace/featured
```

**Descripción:** Obtiene planificaciones destacadas para preview del marketplace

**Query Parameters:**
- `limit` (optional): Número de items (default: 3)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Planificación Fútbol Sub-15",
      "sport": "Fútbol",
      "rating": 4.8,
      "downloads": 150,
      "author": "Juan Pérez",
      "thumbnail": "url"
    }
  ]
}
```

### Get Subscription Plans
```http
GET /api/v1/public/subscriptions/plans
```

**Descripción:** Obtiene información actualizada de planes de suscripción

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "free",
      "name": "Gratuito",
      "price": 0,
      "currency": "EUR",
      "features": [
        "1 equipo",
        "15 entrenamientos",
        "Acceso básico al marketplace"
      ],
      "limitations": [
        "Sin exportación",
        "Sin personalización avanzada"
      ]
    },
    {
      "id": "trainer",
      "name": "Entrenador",
      "price": 9.99,
      "currency": "EUR",
      "period": "month",
      "featured": true,
      "features": [
        "Equipos ilimitados",
        "Entrenamientos ilimitados",
        "Acceso completo al marketplace",
        "Exportación PDF",
        "Soporte prioritario"
      ]
    },
    {
      "id": "club",
      "name": "Club",
      "price": 29.99,
      "currency": "EUR",
      "period": "month",
      "features": [
        "Todo lo del plan Entrenador",
        "Gestión multi-entrenador",
        "Modo director",
        "Reportes avanzados",
        "API access",
        "Soporte dedicado"
      ]
    }
  ]
}
```

### Submit Contact Form
```http
POST /api/v1/public/contact
```

**Descripción:** Envía formulario de contacto desde la landing

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "recaptchaToken": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Mensaje enviado exitosamente. Te contactaremos pronto."
  }
}
```

## Error Responses

Todos los endpoints siguen el mismo formato de error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensaje de error en español",
    "details": {}
  }
}
```

### Códigos de Error Comunes
- `VALIDATION_ERROR`: Error de validación en los datos enviados
- `UNAUTHORIZED`: No autorizado
- `NOT_FOUND`: Recurso no encontrado
- `RATE_LIMIT`: Límite de requests excedido
- `SERVER_ERROR`: Error interno del servidor

## Headers Requeridos

Para endpoints públicos:
```http
Content-Type: application/json
Accept: application/json
X-Requested-With: XMLHttpRequest
```

Para endpoints autenticados (post-login):
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Requested-With: XMLHttpRequest
```

## Rate Limiting

Endpoints públicos:
- 60 requests por minuto por IP
- 1000 requests por hora por IP

Endpoints autenticados:
- 120 requests por minuto por usuario
- 5000 requests por hora por usuario

## CORS Configuration

Para desarrollo:
```json
{
  "AllowedOrigins": ["http://localhost:4200"],
  "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  "AllowedHeaders": ["*"],
  "AllowCredentials": true
}
```

Para producción:
```json
{
  "AllowedOrigins": ["https://plansport.com", "https://www.plansport.com"],
  "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  "AllowedHeaders": ["Content-Type", "Authorization", "X-Requested-With"],
  "AllowCredentials": true
}
```

## Notas de Implementación

1. **Fase 1 (Actual)**: Landing page completamente estática, sin llamadas a API
2. **Fase 2**: Agregar endpoints públicos para contenido dinámico
3. **Fase 3**: Implementar formulario de contacto con validación reCAPTCHA
4. **Fase 4**: Analytics y tracking de conversiones

## Seguridad

- Todos los endpoints públicos deben tener rate limiting
- Implementar reCAPTCHA en formularios públicos
- Sanitizar todos los inputs
- Usar HTTPS en producción
- Implementar CSP headers