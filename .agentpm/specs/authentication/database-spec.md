# Database Specification - Sistema de Autenticación

## Schema Overview
El sistema de autenticación utiliza Supabase Auth como proveedor principal, con tablas adicionales en PostgreSQL para metadata y auditoría.

## Supabase Auth Tables (Managed)

### auth.users
Tabla gestionada por Supabase que almacena usuarios principales.
```sql
-- Esta tabla es gestionada por Supabase, no modificar directamente
-- Campos principales accesibles:
id                  UUID PRIMARY KEY
email               VARCHAR(255) UNIQUE NOT NULL
encrypted_password  TEXT
email_confirmed_at  TIMESTAMPTZ
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()
last_sign_in_at     TIMESTAMPTZ
raw_app_meta_data   JSONB
raw_user_meta_data  JSONB
is_super_admin      BOOLEAN DEFAULT FALSE
role                TEXT
```

### auth.sessions
Sesiones activas de usuarios.
```sql
-- Gestionada por Supabase
id            UUID PRIMARY KEY
user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE
created_at    TIMESTAMPTZ DEFAULT NOW()
updated_at    TIMESTAMPTZ DEFAULT NOW()
factor_id     UUID
aal           aal_level
not_after     TIMESTAMPTZ
```

### auth.refresh_tokens
Tokens de renovación.
```sql
-- Gestionada por Supabase
id          SERIAL PRIMARY KEY
token       VARCHAR(255) UNIQUE
user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE
revoked     BOOLEAN DEFAULT FALSE
created_at  TIMESTAMPTZ DEFAULT NOW()
updated_at  TIMESTAMPTZ DEFAULT NOW()
parent      VARCHAR(255)
session_id  UUID REFERENCES auth.sessions(id) ON DELETE CASCADE
```

## Custom Application Tables

### public.profiles
Perfil extendido del usuario con información adicional.
```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    organization_id UUID REFERENCES public.organizations(id),
    role VARCHAR(50) DEFAULT 'entrenador',
    avatar_url TEXT,
    phone VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'Europe/Madrid',
    language VARCHAR(5) DEFAULT 'es',
    notification_preferences JSONB DEFAULT '{"email": true, "push": false}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
```

### public.organizations
Organizaciones/Clubes deportivos.
```sql
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,
    max_teams INTEGER DEFAULT 1,
    max_users INTEGER DEFAULT 5,
    settings JSONB DEFAULT '{}',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE UNIQUE INDEX idx_organizations_slug ON public.organizations(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_organizations_subscription ON public.organizations(subscription_type);

-- RLS Policies
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Organization members can view their organization
CREATE POLICY "Members can view organization" ON public.organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM public.profiles WHERE id = auth.uid()
        )
    );
```

### public.auth_logs
Registro de eventos de autenticación para auditoría.
```sql
CREATE TABLE public.auth_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL, -- login, logout, register, refresh, password_reset
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_auth_logs_user_id ON public.auth_logs(user_id);
CREATE INDEX idx_auth_logs_event_type ON public.auth_logs(event_type);
CREATE INDEX idx_auth_logs_created_at ON public.auth_logs(created_at DESC);

-- Partitioning by month for performance
CREATE TABLE public.auth_logs_2024_01 PARTITION OF public.auth_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### public.login_attempts
Control de intentos de login para rate limiting.
```sql
CREATE TABLE public.login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255),
    ip_address INET NOT NULL,
    attempt_count INTEGER DEFAULT 1,
    last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    blocked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_login_attempts_email ON public.login_attempts(email);
CREATE INDEX idx_login_attempts_ip ON public.login_attempts(ip_address);
CREATE INDEX idx_login_attempts_blocked ON public.login_attempts(blocked_until) WHERE blocked_until IS NOT NULL;

-- Cleanup old records (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts()
RETURNS void AS $$
BEGIN
    DELETE FROM public.login_attempts 
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;
```

### public.api_tokens
Tokens de API para integraciones (opcional).
```sql
CREATE TABLE public.api_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    token_hash VARCHAR(255) UNIQUE NOT NULL, -- SHA256 hash del token
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    scopes TEXT[] DEFAULT ARRAY['read'],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_api_tokens_user_id ON public.api_tokens(user_id);
CREATE INDEX idx_api_tokens_hash ON public.api_tokens(token_hash);
CREATE INDEX idx_api_tokens_expires ON public.api_tokens(expires_at) WHERE is_active = TRUE;
```

## Functions & Triggers

### Auto-create profile on user signup
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, metadata)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data, '{}'::jsonb)
    );
    
    -- Log the registration
    INSERT INTO public.auth_logs (user_id, event_type, metadata)
    VALUES (NEW.id, 'register', NEW.raw_user_meta_data);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Update timestamps
```sql
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
    
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

### Log authentication events
```sql
CREATE OR REPLACE FUNCTION public.log_auth_event(
    p_user_id UUID,
    p_event_type VARCHAR(50),
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_success BOOLEAN DEFAULT TRUE,
    p_error_message TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO public.auth_logs (
        user_id, event_type, ip_address, user_agent, 
        success, error_message, metadata
    )
    VALUES (
        p_user_id, p_event_type, p_ip_address, p_user_agent,
        p_success, p_error_message, p_metadata
    )
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Check login attempts (Rate Limiting)
```sql
CREATE OR REPLACE FUNCTION public.check_login_attempts(
    p_email VARCHAR(255),
    p_ip_address INET
)
RETURNS TABLE(
    is_blocked BOOLEAN,
    remaining_attempts INTEGER,
    blocked_until TIMESTAMPTZ
) AS $$
DECLARE
    v_attempts RECORD;
    v_max_attempts INTEGER := 5;
    v_block_duration INTERVAL := '15 minutes';
BEGIN
    -- Get or create attempt record
    SELECT * INTO v_attempts
    FROM public.login_attempts
    WHERE (email = p_email OR ip_address = p_ip_address)
      AND last_attempt_at > NOW() - v_block_duration
    ORDER BY last_attempt_at DESC
    LIMIT 1;
    
    -- Check if blocked
    IF v_attempts.blocked_until IS NOT NULL AND v_attempts.blocked_until > NOW() THEN
        RETURN QUERY SELECT 
            TRUE::BOOLEAN,
            0::INTEGER,
            v_attempts.blocked_until;
        RETURN;
    END IF;
    
    -- Check attempts
    IF v_attempts.attempt_count >= v_max_attempts THEN
        -- Block the user/IP
        UPDATE public.login_attempts
        SET blocked_until = NOW() + v_block_duration
        WHERE id = v_attempts.id;
        
        RETURN QUERY SELECT 
            TRUE::BOOLEAN,
            0::INTEGER,
            (NOW() + v_block_duration)::TIMESTAMPTZ;
    ELSE
        RETURN QUERY SELECT 
            FALSE::BOOLEAN,
            (v_max_attempts - COALESCE(v_attempts.attempt_count, 0))::INTEGER,
            NULL::TIMESTAMPTZ;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Indexes Summary

```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_auth_logs_user_date 
    ON public.auth_logs(user_id, created_at DESC);
    
CREATE INDEX CONCURRENTLY idx_profiles_search 
    ON public.profiles USING gin(to_tsvector('spanish', full_name));
    
CREATE INDEX CONCURRENTLY idx_organizations_active 
    ON public.organizations(subscription_expires_at) 
    WHERE deleted_at IS NULL;
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all custom tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- API Tokens policies
CREATE POLICY "Users can manage own tokens"
    ON public.api_tokens FOR ALL
    USING (auth.uid() = user_id);

-- Auth logs policies (admin only)
CREATE POLICY "Only admins can view auth logs"
    ON public.auth_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

## Migration Scripts

### Initial Setup
```sql
-- Run this after Supabase project creation
BEGIN;

-- Create custom tables
-- [Include all CREATE TABLE statements above]

-- Create functions and triggers
-- [Include all functions above]

-- Set up RLS
-- [Include all policies above]

-- Initial data
INSERT INTO public.organizations (name, slug, subscription_type)
VALUES ('Demo Organization', 'demo', 'free');

COMMIT;
```

### Rollback Script
```sql
BEGIN;

-- Drop policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
-- [Continue with all policies]

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
-- [Continue with all triggers]

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at();
-- [Continue with all functions]

-- Drop tables
DROP TABLE IF EXISTS public.api_tokens CASCADE;
DROP TABLE IF EXISTS public.login_attempts CASCADE;
DROP TABLE IF EXISTS public.auth_logs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

COMMIT;
```

## Performance Considerations

1. **Partitioning**: auth_logs table is partitioned by month
2. **Indexes**: Covering indexes on frequently queried columns
3. **Vacuum**: Regular VACUUM ANALYZE on high-write tables
4. **Connection Pooling**: Use PgBouncer for connection management
5. **Read Replicas**: Consider for read-heavy operations

## Security Notes

1. Never store plain text passwords
2. API tokens are hashed using SHA256
3. RLS enabled on all public tables
4. Sensitive operations use SECURITY DEFINER functions
5. IP-based rate limiting for login attempts
6. Audit logs for all authentication events
