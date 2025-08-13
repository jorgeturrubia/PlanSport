-- Supabase Authentication Database Schema
-- Run this script in your local Supabase database

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table that extends Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    organization_id UUID,
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

-- Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
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

-- Create auth_logs table for auditing
CREATE TABLE IF NOT EXISTS public.auth_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create login_attempts table for rate limiting
CREATE TABLE IF NOT EXISTS public.login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255),
    ip_address INET NOT NULL,
    attempt_count INTEGER DEFAULT 1,
    last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    blocked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_organizations_subscription ON public.organizations(subscription_type);
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON public.auth_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_event_type ON public.auth_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON public.auth_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON public.login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON public.login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_attempts_blocked ON public.login_attempts(blocked_until) WHERE blocked_until IS NOT NULL;

-- Function to handle new user registration
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

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to log authentication events
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

-- Function to check login attempts for rate limiting
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

-- Function to cleanup old login attempts
CREATE OR REPLACE FUNCTION public.cleanup_old_login_attempts()
RETURNS void AS $$
BEGIN
    DELETE FROM public.login_attempts 
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
    
DROP TRIGGER IF EXISTS update_organizations_updated_at ON public.organizations;
CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for organizations
CREATE POLICY "Members can view organization" ON public.organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM public.profiles WHERE id = auth.uid()
        )
    );

-- RLS Policies for auth_logs (admin only)
CREATE POLICY "Only admins can view auth logs" ON public.auth_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Insert initial test data (optional, remove in production)
INSERT INTO public.organizations (name, slug, subscription_type)
VALUES ('Demo Organization', 'demo', 'free')
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.organizations TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_auth_event TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_login_attempts TO anon;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database setup completed successfully!';
END $$;
