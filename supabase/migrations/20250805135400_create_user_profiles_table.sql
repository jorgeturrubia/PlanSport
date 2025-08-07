-- Migration: Create user_profiles table
-- Created: 2025-08-05 13:54:00
-- Description: Create table for extended user profile information

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(150),
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'es',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_onboarding ON public.user_profiles(onboarding_completed);
CREATE INDEX IF NOT EXISTS idx_user_profiles_display_name ON public.user_profiles(display_name);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" 
    ON public.user_profiles 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
    ON public.user_profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
    ON public.user_profiles 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
    ON public.user_profiles 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Add comments for documentation
COMMENT ON TABLE public.user_profiles IS 'Extended user profile information and preferences';
COMMENT ON COLUMN public.user_profiles.user_id IS 'Reference to auth.users table';
COMMENT ON COLUMN public.user_profiles.onboarding_completed IS 'Whether user has completed initial onboarding flow';
COMMENT ON COLUMN public.user_profiles.display_name IS 'User display name for UI';
COMMENT ON COLUMN public.user_profiles.timezone IS 'User timezone for scheduling features';
COMMENT ON COLUMN public.user_profiles.language IS 'User preferred language (ISO 639-1 code)';

-- Create view for user profile with subscription info (for easier queries)
CREATE OR REPLACE VIEW public.user_profile_with_subscription AS
SELECT 
    up.*,
    s.plan_type,
    s.status as subscription_status,
    s.created_at as subscription_created_at
FROM public.user_profiles up
LEFT JOIN public.subscriptions s ON up.user_id = s.user_id AND s.status = 'active';

-- Grant permissions on the view
GRANT SELECT ON public.user_profile_with_subscription TO authenticated;

-- Add RLS policy for the view
ALTER VIEW public.user_profile_with_subscription SET (security_barrier = true);
CREATE POLICY "Users can view their own profile with subscription" 
    ON public.user_profile_with_subscription
    FOR SELECT 
    USING (auth.uid() = user_id);
