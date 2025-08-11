# Database Specification - Landing Page

## Overview
La landing page es una feature principalmente frontend que no requiere cambios en la base de datos en su fase inicial. Sin embargo, documentamos aquí las tablas relacionadas que podrían ser utilizadas en futuras iteraciones.

## Tablas Existentes Relacionadas

### users
Tabla existente que se utilizará cuando los usuarios se registren desde la landing.

```sql
-- Tabla ya existe, no requiere modificaciones
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE
);
```

### subscriptions
Tabla existente para los planes de suscripción mostrados en la landing.

```sql
-- Tabla ya existe, no requiere modificaciones
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('free', 'trainer', 'club')),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Nuevas Tablas para Fase 2

### landing_analytics
Para tracking de conversiones y análisis de comportamiento.

```sql
CREATE TABLE landing_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    section_name VARCHAR(100),
    cta_clicked VARCHAR(100),
    time_on_page INTEGER, -- segundos
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para análisis
CREATE INDEX idx_landing_analytics_event_type ON landing_analytics(event_type);
CREATE INDEX idx_landing_analytics_section ON landing_analytics(section_name);
CREATE INDEX idx_landing_analytics_created_at ON landing_analytics(created_at);
CREATE INDEX idx_landing_analytics_session ON landing_analytics(session_id);
```

### landing_content
Para contenido dinámico de la landing (CMS básico).

```sql
CREATE TABLE landing_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section VARCHAR(50) NOT NULL,
    content_key VARCHAR(100) NOT NULL,
    content_value TEXT,
    content_type VARCHAR(20) DEFAULT 'text', -- text, html, json
    language VARCHAR(5) DEFAULT 'es',
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    UNIQUE(section, content_key, language)
);

-- Índices
CREATE INDEX idx_landing_content_section ON landing_content(section);
CREATE INDEX idx_landing_content_active ON landing_content(is_active);
CREATE INDEX idx_landing_content_language ON landing_content(language);
```

### contact_submissions
Para formulario de contacto futuro.

```sql
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    source VARCHAR(50) DEFAULT 'landing',
    status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, resolved
    assigned_to UUID REFERENCES users(id),
    notes TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP WITH TIME ZONE
);

-- Índices
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_email ON contact_submissions(email);
```

### newsletter_subscribers
Para suscripciones al newsletter.

```sql
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, unsubscribed
    confirmation_token VARCHAR(255) UNIQUE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source VARCHAR(50) DEFAULT 'landing',
    tags JSONB DEFAULT '[]'::jsonb,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_confirmed ON newsletter_subscribers(confirmed_at);
```

### featured_plannings
Para mostrar planificaciones destacadas en el marketplace preview.

```sql
CREATE TABLE featured_plannings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    planning_id UUID NOT NULL, -- Referencia a marketplace_plannings
    position INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    clicks INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    UNIQUE(position) WHERE is_active = TRUE
);

-- Índices
CREATE INDEX idx_featured_active ON featured_plannings(is_active);
CREATE INDEX idx_featured_position ON featured_plannings(position);
CREATE INDEX idx_featured_dates ON featured_plannings(start_date, end_date);
```

## Migraciones

### Fase 1 - Landing Estática (Actual)
```sql
-- No requiere migraciones
-- La landing usa las tablas existentes solo para redirección a auth
```

### Fase 2 - Contenido Dinámico
```sql
-- Migration: 2024_01_add_landing_tables.sql

-- 1. Crear tabla de analytics
CREATE TABLE IF NOT EXISTS landing_analytics (...); -- como arriba

-- 2. Crear tabla de contenido
CREATE TABLE IF NOT EXISTS landing_content (...); -- como arriba

-- 3. Insertar contenido inicial
INSERT INTO landing_content (section, content_key, content_value, order_index) VALUES
('hero', 'title', 'Planifica entrenamientos profesionales en minutos', 1),
('hero', 'subtitle', 'Accede a cientos de planificaciones probadas...', 2),
('features', 'feature_1_title', 'Inicio Rápido', 1),
('features', 'feature_1_desc', 'Crea tu primera planificación...', 2),
-- ... más contenido
;
```

### Fase 3 - Formularios y Newsletter
```sql
-- Migration: 2024_02_add_contact_tables.sql

-- 1. Crear tabla de contacto
CREATE TABLE IF NOT EXISTS contact_submissions (...); -- como arriba

-- 2. Crear tabla de newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (...); -- como arriba

-- 3. Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_landing_content_updated_at 
    BEFORE UPDATE ON landing_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_updated_at 
    BEFORE UPDATE ON newsletter_subscribers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## Vistas y Funciones

### Vista de estadísticas de landing
```sql
CREATE OR REPLACE VIEW landing_stats AS
SELECT 
    COUNT(DISTINCT session_id) as unique_visitors,
    COUNT(*) as total_events,
    AVG(time_on_page) as avg_time_on_page,
    COUNT(CASE WHEN event_type = 'cta_click' THEN 1 END) as total_cta_clicks,
    COUNT(CASE WHEN cta_clicked = 'register' THEN 1 END) as register_clicks,
    COUNT(CASE WHEN cta_clicked = 'login' THEN 1 END) as login_clicks,
    DATE(created_at) as date
FROM landing_analytics
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Función para obtener contenido de landing
```sql
CREATE OR REPLACE FUNCTION get_landing_content(
    p_section VARCHAR DEFAULT NULL,
    p_language VARCHAR DEFAULT 'es'
)
RETURNS TABLE (
    section VARCHAR,
    content_key VARCHAR,
    content_value TEXT,
    order_index INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        lc.section,
        lc.content_key,
        lc.content_value,
        lc.order_index
    FROM landing_content lc
    WHERE 
        lc.is_active = TRUE
        AND lc.language = p_language
        AND (p_section IS NULL OR lc.section = p_section)
    ORDER BY lc.section, lc.order_index;
END;
$$ LANGUAGE plpgsql;
```

## Índices de Performance

```sql
-- Para búsquedas rápidas de contenido
CREATE INDEX idx_landing_content_lookup 
    ON landing_content(section, content_key, language) 
    WHERE is_active = TRUE;

-- Para análisis de conversión
CREATE INDEX idx_analytics_conversion 
    ON landing_analytics(event_type, created_at) 
    WHERE event_type IN ('register_click', 'login_click', 'plan_selected');

-- Para gestión de contactos
CREATE INDEX idx_contact_pending 
    ON contact_submissions(status, created_at) 
    WHERE status = 'pending';
```

## Políticas de Retención

```sql
-- Eliminar analytics antiguos (>90 días)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS void AS $$
BEGIN
    DELETE FROM landing_analytics 
    WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Programar con pg_cron o similar
-- SELECT cron.schedule('cleanup-analytics', '0 2 * * *', 'SELECT cleanup_old_analytics();');
```

## Seguridad

### Row Level Security (RLS)
```sql
-- Habilitar RLS en tablas sensibles
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Política para admin
CREATE POLICY admin_all ON contact_submissions
    FOR ALL
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM users WHERE role = 'admin'
    ));

-- Política para usuarios normales (solo crear)
CREATE POLICY user_insert ON contact_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
```

## Notas de Implementación

1. **Fase 1 (Actual)**: No requiere cambios en BD, landing completamente estática
2. **Fase 2**: Implementar tablas de analytics y contenido dinámico
3. **Fase 3**: Agregar formularios de contacto y newsletter
4. **Fase 4**: Implementar A/B testing con variantes de contenido

## Consideraciones de Performance

- Usar cache (Redis) para contenido de landing que cambia poco
- Implementar paginación en vistas administrativas
- Considerar particionamiento para tabla de analytics por fecha
- Usar JSONB para metadata flexible sin esquema fijo