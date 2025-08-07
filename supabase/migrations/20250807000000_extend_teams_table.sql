-- Migration: Extend teams table with additional fields
-- Created: 2025-08-07 00:00:00
-- Description: Add description, players_count, and status fields to teams table

-- Add new columns to existing teams table
ALTER TABLE public.teams 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS players_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Add constraints for new columns
ALTER TABLE public.teams 
ADD CONSTRAINT IF NOT EXISTS teams_players_count_positive 
    CHECK (players_count >= 0);

ALTER TABLE public.teams 
ADD CONSTRAINT IF NOT EXISTS teams_status_valid 
    CHECK (status IN ('active', 'inactive'));

ALTER TABLE public.teams 
ADD CONSTRAINT IF NOT EXISTS teams_description_length 
    CHECK (description IS NULL OR LENGTH(description) <= 500);

-- Create additional index for status filtering
CREATE INDEX IF NOT EXISTS idx_teams_status ON public.teams(status);

-- Create composite index for user_id + status (common query pattern)
CREATE INDEX IF NOT EXISTS idx_teams_user_status ON public.teams(user_id, status);

-- Update comments for new columns
COMMENT ON COLUMN public.teams.description IS 'Optional team description (max 500 characters)';
COMMENT ON COLUMN public.teams.players_count IS 'Current number of players in the team (calculated field)';
COMMENT ON COLUMN public.teams.status IS 'Team status: active or inactive';

-- Create function to update players_count when players are added/removed
-- (This will be used later when players table is implemented)
CREATE OR REPLACE FUNCTION public.update_team_players_count()
RETURNS TRIGGER AS $$
BEGIN
    -- This function will be completed when players table is implemented
    -- For now, it's a placeholder that maintains the count at current value
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Update the view to include new fields
DROP VIEW IF EXISTS public.teams_with_user_info;
CREATE OR REPLACE VIEW public.teams_with_user_info AS
SELECT 
    t.*,
    up.display_name as owner_display_name,
    up.first_name,
    up.last_name
FROM public.teams t
LEFT JOIN public.user_profiles up ON t.user_id = up.user_id;

-- Grant permissions on the updated view
GRANT SELECT ON public.teams_with_user_info TO authenticated;

-- Ensure RLS policy still works with new fields
-- (The existing policies automatically cover the new columns)

-- Optional: Update existing teams to have default status 'active' if NULL
UPDATE public.teams 
SET status = 'active' 
WHERE status IS NULL;

-- Optional: Set default players_count to 0 if NULL
UPDATE public.teams 
SET players_count = 0 
WHERE players_count IS NULL;
