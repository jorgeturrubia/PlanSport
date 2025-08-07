-- Migration: Create subscriptions table
-- Created: 2025-08-05 13:53:00
-- Description: Create table to track user subscription plans and status

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('free', 'coach', 'club')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one active subscription per user
    UNIQUE(user_id, status) DEFERRABLE INITIALLY DEFERRED
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_type ON public.subscriptions(plan_type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON public.subscriptions(created_at);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own subscriptions" 
    ON public.subscriptions 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" 
    ON public.subscriptions 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
    ON public.subscriptions 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions" 
    ON public.subscriptions 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.subscriptions TO authenticated;
GRANT SELECT ON public.subscriptions TO anon;

-- Add comments for documentation
COMMENT ON TABLE public.subscriptions IS 'User subscription plans and status tracking';
COMMENT ON COLUMN public.subscriptions.plan_type IS 'Subscription plan: free, coach, or club';
COMMENT ON COLUMN public.subscriptions.status IS 'Subscription status: active, cancelled, or expired';
COMMENT ON COLUMN public.subscriptions.user_id IS 'Reference to auth.users table';
