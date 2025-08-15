# API Specification - Sistema de Temas

## Endpoints

### 1. Get User Preferences
**Endpoint:** `GET /api/user/preferences`
**Descripción:** Obtiene las preferencias del usuario actual, incluyendo el tema
**Autenticación:** Requerida

#### Request
```http
GET /api/user/preferences
Authorization: Bearer {token}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "theme": "light" | "dark" | "system",
    "language": "es",
    "notifications": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Response Error (401)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "No autorizado"
  }
}
```

---

### 2. Update Theme Preference
**Endpoint:** `PUT /api/user/preferences/theme`
**Descripción:** Actualiza la preferencia de tema del usuario
**Autenticación:** Requerida

#### Request
```http
PUT /api/user/preferences/theme
Authorization: Bearer {token}
Content-Type: application/json

{
  "theme": "dark"
}
```

#### Request Body Schema
```typescript
interface UpdateThemeRequest {
  theme: 'light' | 'dark' | 'system';
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_THEME",
    "message": "Tema inválido. Valores permitidos: light, dark, system"
  }
}
```

---

## DTOs

### UserPreferencesDto
```csharp
namespace SportPlanner.Api.Dtos
{
    public class UserPreferencesDto
    {
        public Guid UserId { get; set; }
        public string Theme { get; set; } = "system";
        public string Language { get; set; } = "es";
        public bool Notifications { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
```

### UpdateThemeDto
```csharp
namespace SportPlanner.Api.Dtos
{
    public class UpdateThemeDto
    {
        [Required]
        [RegularExpression("^(light|dark|system)$", 
            ErrorMessage = "Tema debe ser 'light', 'dark' o 'system'")]
        public string Theme { get; set; }
    }
}
```

---

## Service Implementation

### IUserPreferencesService
```csharp
namespace SportPlanner.Api.Services
{
    public interface IUserPreferencesService
    {
        Task<UserPreferencesDto> GetPreferencesAsync(Guid userId);
        Task<UserPreferencesDto> UpdateThemeAsync(Guid userId, string theme);
        Task<UserPreferencesDto> CreateDefaultPreferencesAsync(Guid userId);
    }
}
```

### UserPreferencesService
```csharp
namespace SportPlanner.Api.Services
{
    public class UserPreferencesService : IUserPreferencesService
    {
        private readonly ISupabaseClient _supabase;
        private readonly ILogger<UserPreferencesService> _logger;

        public UserPreferencesService(
            ISupabaseClient supabase,
            ILogger<UserPreferencesService> logger)
        {
            _supabase = supabase;
            _logger = logger;
        }

        public async Task<UserPreferencesDto> GetPreferencesAsync(Guid userId)
        {
            try
            {
                var response = await _supabase
                    .From<UserPreferences>()
                    .Where(x => x.UserId == userId)
                    .Single();

                if (response == null)
                {
                    return await CreateDefaultPreferencesAsync(userId);
                }

                return MapToDto(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user preferences for {UserId}", userId);
                throw;
            }
        }

        public async Task<UserPreferencesDto> UpdateThemeAsync(Guid userId, string theme)
        {
            try
            {
                var preferences = await GetPreferencesAsync(userId);
                preferences.Theme = theme;
                preferences.UpdatedAt = DateTime.UtcNow;

                var response = await _supabase
                    .From<UserPreferences>()
                    .Update(preferences)
                    .Where(x => x.UserId == userId)
                    .Single();

                return MapToDto(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating theme for {UserId}", userId);
                throw;
            }
        }

        public async Task<UserPreferencesDto> CreateDefaultPreferencesAsync(Guid userId)
        {
            var preferences = new UserPreferences
            {
                UserId = userId,
                Theme = "system",
                Language = "es",
                Notifications = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var response = await _supabase
                .From<UserPreferences>()
                .Insert(preferences)
                .Single();

            return MapToDto(response);
        }

        private UserPreferencesDto MapToDto(UserPreferences entity)
        {
            return new UserPreferencesDto
            {
                UserId = entity.UserId,
                Theme = entity.Theme,
                Language = entity.Language,
                Notifications = entity.Notifications,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }
    }
}
```

---

## Controller Implementation

### UserPreferencesController
```csharp
namespace SportPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserPreferencesController : ControllerBase
    {
        private readonly IUserPreferencesService _preferencesService;
        private readonly IAuthService _authService;

        public UserPreferencesController(
            IUserPreferencesService preferencesService,
            IAuthService authService)
        {
            _preferencesService = preferencesService;
            _authService = authService;
        }

        [HttpGet("preferences")]
        public async Task<ActionResult<ApiResponse<UserPreferencesDto>>> GetPreferences()
        {
            try
            {
                var userId = _authService.GetCurrentUserId();
                var preferences = await _preferencesService.GetPreferencesAsync(userId);
                
                return Ok(new ApiResponse<UserPreferencesDto>
                {
                    Success = true,
                    Data = preferences
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<UserPreferencesDto>
                {
                    Success = false,
                    Error = new ApiError
                    {
                        Code = "SERVER_ERROR",
                        Message = "Error al obtener preferencias"
                    }
                });
            }
        }

        [HttpPut("preferences/theme")]
        public async Task<ActionResult<ApiResponse<UpdateThemeResponse>>> UpdateTheme(
            [FromBody] UpdateThemeDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<UpdateThemeResponse>
                {
                    Success = false,
                    Error = new ApiError
                    {
                        Code = "INVALID_THEME",
                        Message = "Tema inválido. Valores permitidos: light, dark, system"
                    }
                });
            }

            try
            {
                var userId = _authService.GetCurrentUserId();
                var updated = await _preferencesService.UpdateThemeAsync(userId, request.Theme);
                
                return Ok(new ApiResponse<UpdateThemeResponse>
                {
                    Success = true,
                    Data = new UpdateThemeResponse
                    {
                        Theme = updated.Theme,
                        UpdatedAt = updated.UpdatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<UpdateThemeResponse>
                {
                    Success = false,
                    Error = new ApiError
                    {
                        Code = "SERVER_ERROR",
                        Message = "Error al actualizar tema"
                    }
                });
            }
        }
    }
}
```

---

## Database Schema

### User Preferences Table
```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme VARCHAR(10) DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    language VARCHAR(5) DEFAULT 'es',
    notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Índice para búsquedas rápidas por usuario
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

---

## Integration with Frontend

### Angular Service Integration
```typescript
// En AuthService o UserService
export class UserService {
  private readonly http = inject(HttpClient);
  
  getPreferences(): Observable<UserPreferencesDto> {
    return this.http.get<ApiResponse<UserPreferencesDto>>('/api/user/preferences')
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }
  
  updateTheme(theme: 'light' | 'dark' | 'system'): Observable<UpdateThemeResponse> {
    return this.http.put<ApiResponse<UpdateThemeResponse>>(
      '/api/user/preferences/theme',
      { theme }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
}
```

### Sincronización con ThemeService
```typescript
// En ThemeService
export class ThemeService {
  private readonly userService = inject(UserService);
  
  syncWithBackend(): void {
    // Al cambiar tema localmente, sincronizar con backend
    effect(() => {
      const theme = this.theme();
      if (this.isAuthenticated()) {
        this.userService.updateTheme(theme).subscribe({
          next: () => console.log('Tema sincronizado con servidor'),
          error: (err) => console.error('Error sincronizando tema:', err)
        });
      }
    });
  }
  
  loadUserPreferences(): void {
    // Al iniciar sesión, cargar preferencias del usuario
    this.userService.getPreferences().subscribe({
      next: (preferences) => {
        this.setTheme(preferences.theme as Theme, false);
      },
      error: (err) => {
        console.error('Error cargando preferencias:', err);
        // Usar defaults locales si falla
      }
    });
  }
}
```

---

## Testing

### Unit Tests
```csharp
[TestClass]
public class UserPreferencesServiceTests
{
    [TestMethod]
    public async Task UpdateTheme_ValidTheme_ReturnsUpdatedPreferences()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var theme = "dark";
        
        // Act
        var result = await _service.UpdateThemeAsync(userId, theme);
        
        // Assert
        Assert.AreEqual(theme, result.Theme);
        Assert.IsTrue(result.UpdatedAt > DateTime.UtcNow.AddSeconds(-5));
    }
    
    [TestMethod]
    public async Task UpdateTheme_InvalidTheme_ThrowsValidationException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var invalidTheme = "invalid";
        
        // Act & Assert
        await Assert.ThrowsExceptionAsync<ValidationException>(
            () => _service.UpdateThemeAsync(userId, invalidTheme)
        );
    }
}
```

### Integration Tests
```csharp
[TestClass]
public class UserPreferencesControllerTests : IntegrationTestBase
{
    [TestMethod]
    public async Task GetPreferences_AuthenticatedUser_ReturnsPreferences()
    {
        // Arrange
        var client = CreateAuthenticatedClient();
        
        // Act
        var response = await client.GetAsync("/api/user/preferences");
        
        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<ApiResponse<UserPreferencesDto>>(content);
        
        Assert.IsTrue(result.Success);
        Assert.IsNotNull(result.Data);
    }
}
```

---

## Notas de Implementación

1. **Opcional**: Esta API es opcional. El sistema de temas puede funcionar solo con localStorage
2. **Sincronización**: Si se implementa, sincronizar después del login
3. **Cache**: Considerar cachear preferencias en frontend para reducir llamadas
4. **Defaults**: Siempre tener defaults locales como fallback
5. **Performance**: La API no debe bloquear el cambio de tema local
