# Database Specification - Sistema de Temas

## Descripción General
Esquema de base de datos opcional para persistir preferencias de tema de usuario en el servidor. Esto permite sincronizar preferencias entre dispositivos y mantener consistencia.

**NOTA**: Esta implementación es OPCIONAL. El sistema de temas puede funcionar completamente con localStorage en el frontend.

## Tablas

### 1. user_preferences
**Descripción:** Almacena las preferencias de usuario incluyendo tema
**Relaciones:** 
- One-to-One con auth.users (Supabase Auth)

#### Esquema
```sql
CREATE TABLE user_preferences (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Preferencias de tema
    theme VARCHAR(10) DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    
    -- Otras preferencias (extensible)
    language VARCHAR(5) DEFAULT 'es',
    notifications BOOLEAN DEFAULT true,
    sidebar_collapsed BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id)
);

-- Comentarios
COMMENT ON TABLE user_preferences IS 'Preferencias de usuario incluyendo tema y configuración de UI';
COMMENT ON COLUMN user_preferences.theme IS 'Tema de la aplicación: light, dark o system';
COMMENT ON COLUMN user_preferences.language IS 'Idioma preferido del usuario';
COMMENT ON COLUMN user_preferences.notifications IS 'Si el usuario quiere recibir notificaciones';
COMMENT ON COLUMN user_preferences.sidebar_collapsed IS 'Estado del sidebar (colapsado o expandido)';
```

#### Índices
```sql
-- Índice para búsquedas rápidas por usuario
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Índice para estadísticas de uso de temas (opcional)
CREATE INDEX idx_user_preferences_theme ON user_preferences(theme);
```

#### Triggers
```sql
-- Trigger para actualizar updated_at automáticamente
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

## Row Level Security (RLS)

### Políticas de Seguridad
```sql
-- Habilitar RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias preferencias
CREATE POLICY "Users can view own preferences" 
    ON user_preferences 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propias preferencias
CREATE POLICY "Users can update own preferences" 
    ON user_preferences 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar sus propias preferencias
CREATE POLICY "Users can insert own preferences" 
    ON user_preferences 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propias preferencias
CREATE POLICY "Users can delete own preferences" 
    ON user_preferences 
    FOR DELETE 
    USING (auth.uid() = user_id);
```

---

## Funciones y Procedimientos

### 1. get_or_create_user_preferences
```sql
CREATE OR REPLACE FUNCTION get_or_create_user_preferences(p_user_id UUID)
RETURNS user_preferences AS $$
DECLARE
    v_preferences user_preferences;
BEGIN
    -- Intentar obtener preferencias existentes
    SELECT * INTO v_preferences
    FROM user_preferences
    WHERE user_id = p_user_id;
    
    -- Si no existen, crear con valores por defecto
    IF NOT FOUND THEN
        INSERT INTO user_preferences (user_id)
        VALUES (p_user_id)
        RETURNING * INTO v_preferences;
    END IF;
    
    RETURN v_preferences;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. update_theme_preference
```sql
CREATE OR REPLACE FUNCTION update_theme_preference(
    p_user_id UUID,
    p_theme VARCHAR(10)
)
RETURNS user_preferences AS $$
DECLARE
    v_preferences user_preferences;
BEGIN
    -- Validar tema
    IF p_theme NOT IN ('light', 'dark', 'system') THEN
        RAISE EXCEPTION 'Invalid theme value: %', p_theme;
    END IF;
    
    -- Actualizar o crear preferencias
    INSERT INTO user_preferences (user_id, theme)
    VALUES (p_user_id, p_theme)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        theme = EXCLUDED.theme,
        updated_at = NOW()
    RETURNING * INTO v_preferences;
    
    RETURN v_preferences;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. get_theme_statistics
```sql
CREATE OR REPLACE FUNCTION get_theme_statistics()
RETURNS TABLE (
    theme VARCHAR(10),
    user_count BIGINT,
    percentage NUMERIC(5,2)
) AS $$
BEGIN
    RETURN QUERY
    WITH theme_counts AS (
        SELECT 
            theme,
            COUNT(*) as count
        FROM user_preferences
        GROUP BY theme
    ),
    total AS (
        SELECT SUM(count) as total_users
        FROM theme_counts
    )
    SELECT 
        tc.theme,
        tc.count as user_count,
        ROUND((tc.count::NUMERIC / t.total_users * 100), 2) as percentage
    FROM theme_counts tc
    CROSS JOIN total t
    ORDER BY tc.count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Migraciones

### Migration Up
```sql
-- V1__Create_user_preferences_table.sql

BEGIN;

-- Crear tabla
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme VARCHAR(10) DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    language VARCHAR(5) DEFAULT 'es',
    notifications BOOLEAN DEFAULT true,
    sidebar_collapsed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_theme ON user_preferences(theme);

-- Crear función para trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Users can view own preferences" 
    ON user_preferences FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" 
    ON user_preferences FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" 
    ON user_preferences FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences" 
    ON user_preferences FOR DELETE 
    USING (auth.uid() = user_id);

-- Crear funciones helper
CREATE OR REPLACE FUNCTION get_or_create_user_preferences(p_user_id UUID)
RETURNS user_preferences AS $$
DECLARE
    v_preferences user_preferences;
BEGIN
    SELECT * INTO v_preferences
    FROM user_preferences
    WHERE user_id = p_user_id;
    
    IF NOT FOUND THEN
        INSERT INTO user_preferences (user_id)
        VALUES (p_user_id)
        RETURNING * INTO v_preferences;
    END IF;
    
    RETURN v_preferences;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
```

### Migration Down
```sql
-- V1__Create_user_preferences_table_rollback.sql

BEGIN;

-- Eliminar políticas RLS
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can delete own preferences" ON user_preferences;

-- Eliminar funciones
DROP FUNCTION IF EXISTS get_or_create_user_preferences(UUID);
DROP FUNCTION IF EXISTS update_theme_preference(UUID, VARCHAR);
DROP FUNCTION IF EXISTS get_theme_statistics();

-- Eliminar trigger
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;

-- Eliminar función del trigger
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Eliminar índices
DROP INDEX IF EXISTS idx_user_preferences_user_id;
DROP INDEX IF EXISTS idx_user_preferences_theme;

-- Eliminar tabla
DROP TABLE IF EXISTS user_preferences;

COMMIT;
```

---

## Seed Data

### Datos de Prueba
```sql
-- Seed para desarrollo/testing
INSERT INTO user_preferences (user_id, theme, language, notifications, sidebar_collapsed)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'light', 'es', true, false),
    ('22222222-2222-2222-2222-222222222222', 'dark', 'es', true, true),
    ('33333333-3333-3333-3333-333333333333', 'system', 'en', false, false)
ON CONFLICT (user_id) DO NOTHING;
```

---

## Queries de Ejemplo

### Obtener preferencias de un usuario
```sql
-- Usando función helper
SELECT * FROM get_or_create_user_preferences('user-uuid-here');

-- Query directa
SELECT * FROM user_preferences WHERE user_id = 'user-uuid-here';
```

### Actualizar tema
```sql
-- Usando función helper
SELECT * FROM update_theme_preference('user-uuid-here', 'dark');

-- Update directo
UPDATE user_preferences 
SET theme = 'dark' 
WHERE user_id = 'user-uuid-here';
```

### Estadísticas de uso de temas
```sql
-- Distribución de temas
SELECT * FROM get_theme_statistics();

-- Usuarios por tema
SELECT 
    theme,
    COUNT(*) as users,
    ARRAY_AGG(user_id) as user_ids
FROM user_preferences
GROUP BY theme
ORDER BY users DESC;
```

---

## Consideraciones de Performance

### Optimizaciones
1. **Índice en user_id**: Búsquedas O(log n) por usuario
2. **Caché en Frontend**: Reducir llamadas a DB
3. **Función get_or_create**: Evita round-trips
4. **RLS optimizado**: Usa auth.uid() directamente

### Estimaciones de Tamaño
```sql
-- Tamaño estimado por registro
-- UUID (16 bytes) + VARCHAR(10) + VARCHAR(5) + 3 BOOLEAN + 2 TIMESTAMP = ~60 bytes

-- Para 10,000 usuarios
-- 10,000 * 60 bytes = ~600 KB

-- Para 100,000 usuarios  
-- 100,000 * 60 bytes = ~6 MB

-- Para 1,000,000 usuarios
-- 1,000,000 * 60 bytes = ~60 MB
```

---

## Monitoreo y Métricas

### Queries de Monitoreo
```sql
-- Usuarios sin preferencias
SELECT COUNT(*) 
FROM auth.users u
LEFT JOIN user_preferences p ON u.id = p.user_id
WHERE p.id IS NULL;

-- Actividad reciente de cambios de tema
SELECT 
    DATE(updated_at) as date,
    COUNT(*) as theme_changes
FROM user_preferences
WHERE updated_at > created_at
GROUP BY DATE(updated_at)
ORDER BY date DESC
LIMIT 30;

-- Temas más populares por mes
SELECT 
    DATE_TRUNC('month', created_at) as month,
    theme,
    COUNT(*) as count
FROM user_preferences
GROUP BY month, theme
ORDER BY month DESC, count DESC;
```

---

## Backup y Recuperación

### Backup
```bash
# Backup solo de la tabla user_preferences
pg_dump -h localhost -U postgres -d sportplanner \
  -t user_preferences \
  -f user_preferences_backup.sql

# Backup con datos
pg_dump -h localhost -U postgres -d sportplanner \
  -t user_preferences \
  --data-only \
  -f user_preferences_data.sql
```

### Restore
```bash
# Restaurar estructura y datos
psql -h localhost -U postgres -d sportplanner \
  -f user_preferences_backup.sql
```

---

## Notas de Implementación

1. **Opcional**: Este esquema es completamente opcional
2. **Fallback**: Siempre usar localStorage como fallback
3. **Sincronización**: Solo sincronizar después del login
4. **Cache**: Implementar cache agresivo en frontend
5. **Defaults**: Los defaults deben coincidir con frontend
6. **Migración**: Considerar migrar preferencias de localStorage existentes
