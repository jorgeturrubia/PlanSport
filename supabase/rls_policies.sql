-- Row Level Security Policies for SportAgentoos
-- This file documents all RLS policies for security auditing

-- ============================================================================
-- SUBSCRIPTIONS TABLE RLS POLICIES
-- ============================================================================

-- Enable RLS on subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
    ON public.subscriptions 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy: Users can only insert their own subscriptions
CREATE POLICY "Users can insert their own subscriptions" 
    ON public.subscriptions 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own subscriptions
CREATE POLICY "Users can update their own subscriptions" 
    ON public.subscriptions 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own subscriptions
CREATE POLICY "Users can delete their own subscriptions" 
    ON public.subscriptions 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================================
-- USER_PROFILES TABLE RLS POLICIES
-- ============================================================================

-- Enable RLS on user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
    ON public.user_profiles 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy: Users can only insert their own profile
CREATE POLICY "Users can insert their own profile" 
    ON public.user_profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update their own profile" 
    ON public.user_profiles 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own profile
CREATE POLICY "Users can delete their own profile" 
    ON public.user_profiles 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================================
-- VIEW RLS POLICIES
-- ============================================================================

-- Policy for user_profile_with_subscription view
ALTER VIEW public.user_profile_with_subscription SET (security_barrier = true);
CREATE POLICY "Users can view their own profile with subscription" 
    ON public.user_profile_with_subscription
    FOR SELECT 
    USING (auth.uid() = user_id);

-- ============================================================================
-- TEAMS TABLE RLS POLICIES  
-- ============================================================================

-- Enable RLS on teams table (if not already enabled)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own teams
CREATE POLICY "Users can view their own teams" 
    ON public.teams 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own teams
CREATE POLICY "Users can insert their own teams" 
    ON public.teams 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own teams
CREATE POLICY "Users can update their own teams" 
    ON public.teams 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own teams
CREATE POLICY "Users can delete their own teams" 
    ON public.teams 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Policy for teams_with_user_info view
ALTER VIEW public.teams_with_user_info SET (security_barrier = true);
CREATE POLICY "Users can view their own teams with user info" 
    ON public.teams_with_user_info
    FOR SELECT 
    USING (auth.uid() = user_id);

-- ============================================================================
-- FUTURE POLICIES (for reference)
-- ============================================================================

-- When adding new tables, ensure to follow these patterns:
-- 1. Enable RLS: ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
-- 2. Create policies for each operation (SELECT, INSERT, UPDATE, DELETE)
-- 3. Use auth.uid() = user_id pattern for user-owned data
-- 4. Consider admin roles if needed with additional policies
-- 5. Test policies with different user contexts

-- Example admin policy (when admin functionality is added):
-- CREATE POLICY "Admins can view all subscriptions" 
--     ON public.subscriptions 
--     FOR SELECT 
--     USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- SECURITY NOTES
-- ============================================================================

-- 1. All tables with user_id should have RLS enabled
-- 2. Always use auth.uid() for current user identification
-- 3. WITH CHECK ensures INSERT/UPDATE constraints
-- 4. USING ensures SELECT/UPDATE/DELETE constraints
-- 5. Views with user data should have security_barrier = true
-- 6. Test policies thoroughly before production deployment
