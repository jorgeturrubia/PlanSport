# Database Specification - Auth Tabs Component

## Nota Importante
**Esta especificación es para referencia futura. En esta fase solo se implementará la parte visual del componente, sin conexión a base de datos.**

## Tablas Relacionadas

### 1. users
**Descripción:** Tabla principal de usuarios del sistema

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    sport_id UUID REFERENCES sports(id),
    role VARCHAR(50) DEFAULT 'entrenador',
    subscription_type VARCHAR(50) DEFAULT 'free',
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_sport_id ON users(sport_id);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_is_active ON users(is_active);
```

### 2. auth_tokens
**Descripción:** Tokens de autenticación y refresh

```sql
CREATE TABLE auth_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    token_type VARCHAR(50) NOT NULL, -- 'access' | 'refresh' | 'reset_password'
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Índices
CREATE INDEX idx_auth_tokens_user_id ON auth_tokens(user_id);
CREATE INDEX idx_auth_tokens_token_hash ON auth_tokens(token_hash);
CREATE INDEX idx_auth_tokens_expires_at ON auth_tokens(expires_at);
CREATE INDEX idx_auth_tokens_type ON auth_tokens(token_type);
```

### 3. auth_attempts
**Descripción:** Registro de intentos de autenticación para seguridad

```sql
CREATE TABLE auth_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    attempt_type VARCHAR(50) NOT NULL, -- 'login' | 'register' | 'reset_password'
    success BOOLEAN NOT NULL,
    error_code VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_auth_attempts_email ON auth_attempts(email);
CREATE INDEX idx_auth_attempts_ip ON auth_attempts(ip_address);
CREATE INDEX idx_auth_attempts_created_at ON auth_attempts(created_at);
```

### 4. user_preferences
**Descripción:** Preferencias de usuario incluyendo "remember me"

```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    remember_me BOOLEAN DEFAULT FALSE,
    language VARCHAR(10) DEFAULT 'es',
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice único
CREATE UNIQUE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
```

### 5. password_reset_requests
**Descripción:** Solicitudes de reset de contraseña

```sql
CREATE TABLE password_reset_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET
);

-- Índices
CREATE INDEX idx_password_reset_user_id ON password_reset_requests(user_id);
CREATE INDEX idx_password_reset_token ON password_reset_requests(token_hash);
CREATE INDEX idx_password_reset_expires ON password_reset_requests(expires_at);
```

### 6. sports (Catálogo)
**Descripción:** Catálogo de deportes disponibles

```sql
CREATE TABLE sports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(50), -- Font Awesome icon name
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales
INSERT INTO sports (name, code, icon, order_index) VALUES
('Fútbol', 'futbol', 'faFutbol', 1),
('Basketball', 'basketball', 'faBasketballBall', 2),
('Natación', 'natacion', 'faSwimmer', 3),
('Atletismo', 'atletismo', 'faRunning', 4),
('Gimnasio', 'gimnasio', 'faDumbbell', 5);
```

## Migraciones

### Migration V1__Initial_Auth_Schema.sql
```sql
-- Crear extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tablas en orden de dependencias
-- 1. Sports (sin dependencias)
-- 2. Users (depende de sports)
-- 3. Auth_tokens (depende de users)
-- 4. Auth_attempts (sin dependencias de FK)
-- 5. User_preferences (depende de users)
-- 6. Password_reset_requests (depende de users)
```

## Stored Procedures / Functions

### 1. Función para validar intentos de login
```sql
CREATE OR REPLACE FUNCTION check_login_attempts(
    p_email VARCHAR,
    p_ip_address INET
) RETURNS INTEGER AS $$
DECLARE
    v_attempts INTEGER;
BEGIN
    -- Contar intentos fallidos en los últimos 5 minutos
    SELECT COUNT(*)
    INTO v_attempts
    FROM auth_attempts
    WHERE email = p_email
      AND ip_address = p_ip_address
      AND success = FALSE
      AND created_at > NOW() - INTERVAL '5 minutes';
    
    RETURN v_attempts;
END;
$$ LANGUAGE plpgsql;
```

### 2. Función para limpiar tokens expirados
```sql
CREATE OR REPLACE FUNCTION cleanup_expired_tokens() 
RETURNS void AS $$
BEGIN
    DELETE FROM auth_tokens 
    WHERE expires_at < NOW() 
      AND revoked_at IS NULL;
    
    DELETE FROM password_reset_requests 
    WHERE expires_at < NOW() 
      AND used_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear job para ejecutar cada hora
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('cleanup-tokens', '0 * * * *', 'SELECT cleanup_expired_tokens();');
```

### 3. Trigger para actualizar updated_at
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Índices de Performance

```sql
-- Índices compuestos para queries comunes
CREATE INDEX idx_users_email_password ON users(email, password_hash) WHERE is_active = TRUE;
CREATE INDEX idx_auth_tokens_user_type ON auth_tokens(user_id, token_type) WHERE revoked_at IS NULL;
CREATE INDEX idx_auth_attempts_email_time ON auth_attempts(email, created_at DESC);
```

## Políticas de Seguridad (Row Level Security - Supabase)

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Política para users: solo el propio usuario puede ver sus datos
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Política para user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = user_id);
```

## Consideraciones de Performance

1. **Índices:** Todos los campos usados en WHERE, JOIN y ORDER BY tienen índices
2. **Particionamiento:** Considerar particionar auth_attempts por fecha si crece mucho
3. **Vacuum:** Configurar autovacuum agresivo para tablas con muchos DELETE (tokens)
4. **Cache:** Implementar Redis para cachear validaciones de tokens

## Backup y Recovery

```sql
-- Backup diario de tablas críticas
pg_dump -t users -t auth_tokens -t user_preferences > auth_backup_$(date +%Y%m%d).sql

-- Punto de recuperación
SELECT pg_create_restore_point('before_auth_deployment');
```

## Monitoreo

### Queries para monitorear
```sql
-- Usuarios registrados por día
SELECT DATE(created_at), COUNT(*) 
FROM users 
GROUP BY DATE(created_at) 
ORDER BY DATE(created_at) DESC;

-- Intentos de login fallidos
SELECT email, COUNT(*) as failed_attempts
FROM auth_attempts
WHERE success = FALSE
  AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY email
HAVING COUNT(*) > 3;

-- Tokens activos por tipo
SELECT token_type, COUNT(*)
FROM auth_tokens
WHERE expires_at > NOW()
  AND revoked_at IS NULL
GROUP BY token_type;
```

## Notas de Implementación Futura

1. **Encriptación:** Todos los hashes deben usar BCrypt con factor 10
2. **Soft Delete:** Implementar soft delete en users (campo deleted_at)
3. **Auditoría:** Crear tabla de auditoría para cambios sensibles
4. **2FA:** Preparar estructura para autenticación de dos factores
5. **OAuth:** Estructura para proveedores externos (Google, Facebook)
6. **Rate Limiting:** Implementar en base de datos o cache layer
7. **GDPR:** Implementar funciones para exportar/eliminar datos de usuario
