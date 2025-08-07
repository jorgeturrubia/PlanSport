-- Migration: Create teams table
-- Created: 2025-08-06 20:00:00
-- Description: Create teams table with RLS and basic CRUD operations for team management

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(30) NOT NULL,
    color VARCHAR(7) NOT NULL CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT teams_name_not_empty CHECK (LENGTH(TRIM(name)) > 0),
    CONSTRAINT teams_category_not_empty CHECK (LENGTH(TRIM(category)) > 0),
    CONSTRAINT teams_level_not_empty CHECK (LENGTH(TRIM(level)) > 0)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_teams_user_id ON public.teams(user_id);
CREATE INDEX IF NOT EXISTS idx_teams_category ON public.teams(category);
CREATE INDEX IF NOT EXISTS idx_teams_name_search ON public.teams USING GIN(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON public.teams(created_at DESC);

-- Create trigger to automatically update updated_at timestamp
-- (Reusing existing function from previous migrations)
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own teams" 
    ON public.teams 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own teams" 
    ON public.teams 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own teams" 
    ON public.teams 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own teams" 
    ON public.teams 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.teams TO authenticated;
GRANT SELECT ON public.teams TO anon;

-- Add comments for documentation
COMMENT ON TABLE public.teams IS 'Teams managed by coaches with sport categories and skill levels';
COMMENT ON COLUMN public.teams.name IS 'Team name (1-100 characters)';
COMMENT ON COLUMN public.teams.category IS 'Sport category (1-50 characters)';
COMMENT ON COLUMN public.teams.level IS 'Skill level (1-30 characters)';
COMMENT ON COLUMN public.teams.color IS 'Team color for visual identification (hex format #FFFFFF)';
COMMENT ON COLUMN public.teams.user_id IS 'Reference to auth.users table';

-- Optional: Create view for teams with user info (for admin/debugging purposes)
CREATE OR REPLACE VIEW public.teams_with_user_info AS
SELECT 
    t.*,
    up.display_name as owner_display_name,
    up.first_name,
    up.last_name
FROM public.teams t
LEFT JOIN public.user_profiles up ON t.user_id = up.user_id;

-- Grant permissions on the view
GRANT SELECT ON public.teams_with_user_info TO authenticated;

-- Add RLS policy for the view (inherits teams table policies)
ALTER VIEW public.teams_with_user_info SET (security_barrier = true);
CREATE POLICY "Users can view their own teams with user info" 
    ON public.teams_with_user_info
    FOR SELECT 
    USING (auth.uid() = user_id);
