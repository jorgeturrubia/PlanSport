-- Database Seed Data for SportAgentoos Development and Testing
-- This file provides sample data for local development and testing

-- Note: This seed data is for development only
-- In production, user data will be created through the application flow

-- ============================================================================
-- SEED DATA SETUP
-- ============================================================================

-- Create some test users (this would normally be done through Supabase Auth)
-- These are example UUIDs for testing - in real usage, Supabase generates these
-- INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at)
-- VALUES 
--   ('11111111-1111-1111-1111-111111111111', 'coach@test.com', '$2a$10$test', NOW(), NOW()),
--   ('22222222-2222-2222-2222-222222222222', 'club@test.com', '$2a$10$test', NOW(), NOW()),
--   ('33333333-3333-3333-3333-333333333333', 'free@test.com', '$2a$10$test', NOW(), NOW());

-- ============================================================================
-- USER PROFILES SEED DATA
-- ============================================================================

-- Seed user profiles (would be auto-created by trigger in real usage)
INSERT INTO public.user_profiles (user_id, display_name, first_name, last_name, onboarding_completed, timezone, language)
VALUES 
  -- Coach user profile
  ('11111111-1111-1111-1111-111111111111', 'Carlos Entrenador', 'Carlos', 'Entrenador', true, 'Europe/Madrid', 'es'),
  -- Club admin profile  
  ('22222222-2222-2222-2222-222222222222', 'María Directora', 'María', 'Directora', true, 'Europe/Madrid', 'es'),
  -- Free user profile (new user, not completed onboarding)
  ('33333333-3333-3333-3333-333333333333', 'Juan Nuevo', 'Juan', 'Nuevo', false, 'Europe/Madrid', 'es');

-- ============================================================================
-- SUBSCRIPTIONS SEED DATA
-- ============================================================================

-- Seed subscription data
INSERT INTO public.subscriptions (user_id, plan_type, status)
VALUES 
  -- Coach subscription (active)
  ('11111111-1111-1111-1111-111111111111', 'coach', 'active'),
  -- Club subscription (active)
  ('22222222-2222-2222-2222-222222222222', 'club', 'active'),
  -- Free subscription (active)
  ('33333333-3333-3333-3333-333333333333', 'free', 'active');

-- Add an expired subscription example
INSERT INTO public.subscriptions (user_id, plan_type, status, created_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'free', 'expired', NOW() - INTERVAL '6 months');

-- ============================================================================
-- TESTING SCENARIOS DATA
-- ============================================================================

-- Additional test users for different scenarios
INSERT INTO public.user_profiles (user_id, display_name, onboarding_completed)
VALUES 
  -- User with no subscription (testing edge case)
  ('44444444-4444-4444-4444-444444444444', 'Sin Suscripción', false),
  -- User with cancelled subscription
  ('55555555-5555-5555-5555-555555555555', 'Usuario Cancelado', true);

-- Add cancelled subscription
INSERT INTO public.subscriptions (user_id, plan_type, status)
VALUES 
  ('55555555-5555-5555-5555-555555555555', 'coach', 'cancelled');

-- ============================================================================
-- TEAMS SEED DATA
-- ============================================================================

-- Seed teams data for testing team management functionality (with new fields)
INSERT INTO public.teams (user_id, name, category, level, color, description, players_count, status)
VALUES 
  -- Teams for coach user (Carlos Entrenador)
  ('11111111-1111-1111-1111-111111111111', 'Leones FC', 'Fútbol', 'Juvenil', '#FF5722', 'Equipo juvenil de fútbol para competencias regionales', 18, 'active'),
  ('11111111-1111-1111-1111-111111111111', 'Águilas Basket', 'Baloncesto', 'Cadete', '#2196F3', 'Equipo de baloncesto cadete con enfoque en desarrollo técnico', 12, 'active'),
  ('11111111-1111-1111-1111-111111111111', 'Tigres Volley', 'Voleibol', 'Senior', '#4CAF50', 'Equipo senior de voleibol femenino competitivo', 14, 'active'),
  ('11111111-1111-1111-1111-111111111111', 'Delfines Natación', 'Natación', 'Infantil', '#00BCD4', 'Equipo infantil de natación para iniciación deportiva', 25, 'active'),
  
  -- Teams for club admin (María Directora)
  ('22222222-2222-2222-2222-222222222222', 'Club Atlético Madrid', 'Fútbol', 'Profesional', '#DC143C', 'Equipo profesional de primera división', 25, 'active'),
  ('22222222-2222-2222-2222-222222222222', 'Madrid Basket', 'Baloncesto', 'Profesional', '#FFA500', 'Equipo profesional de baloncesto ACB', 15, 'active'),
  ('22222222-2222-2222-2222-222222222222', 'Madrid Tenis', 'Tenis', 'Amateur', '#9C27B0', 'Club de tenis amateur para torneos locales', 8, 'active'),
  
  -- Teams for free user (Juan Nuevo) - limited teams due to free plan
  ('33333333-3333-3333-3333-333333333333', 'Mi Primer Equipo', 'Fútbol', 'Aficionado', '#607D8B', 'Mi primer equipo de fútbol amateur', 11, 'active'),
  
  -- Additional teams for testing different scenarios
  ('11111111-1111-1111-1111-111111111111', 'Zorros Handball', 'Balonmano', 'Juvenil', '#FF9800', 'Equipo juvenil de balonmano en desarrollo', 16, 'active'),
  ('22222222-2222-2222-2222-222222222222', 'Madrid Rugby', 'Rugby', 'Senior', '#795548', 'Equipo de rugby senior para competencias nacionales', 20, 'inactive'),
  
  -- Additional test teams with different statuses
  ('11111111-1111-1111-1111-111111111111', 'Veteranos FC', 'Fútbol', 'Veteranos', '#8BC34A', 'Equipo de veteranos para partidos amistosos', 15, 'inactive'),
  ('22222222-2222-2222-2222-222222222222', 'Padel Club', 'Padel', 'Intermedio', '#E91E63', NULL, 4, 'active');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- These queries can be used to verify the seed data was inserted correctly

-- Count users by subscription type
-- SELECT 
--   s.plan_type,
--   s.status,
--   COUNT(*) as user_count
-- FROM public.subscriptions s
-- GROUP BY s.plan_type, s.status
-- ORDER BY s.plan_type, s.status;

-- View user profiles with their subscriptions
-- SELECT 
--   up.display_name,
--   up.onboarding_completed,
--   s.plan_type,
--   s.status as subscription_status
-- FROM public.user_profiles up
-- LEFT JOIN public.subscriptions s ON up.user_id = s.user_id AND s.status = 'active'
-- ORDER BY up.display_name;

-- Test the combined view
-- SELECT * FROM public.user_profile_with_subscription
-- ORDER BY display_name;

-- View teams by user
-- SELECT 
--   t.name,
--   t.category,
--   t.level,
--   t.color,
--   up.display_name as owner
-- FROM public.teams t
-- JOIN public.user_profiles up ON t.user_id = up.user_id
-- ORDER BY up.display_name, t.name;

-- Count teams by category
-- SELECT 
--   category,
--   COUNT(*) as team_count
-- FROM public.teams
-- GROUP BY category
-- ORDER BY team_count DESC;

-- Test teams with user info view
-- SELECT * FROM public.teams_with_user_info
-- ORDER BY owner_display_name, name;

-- ============================================================================
-- CLEANUP (for testing)
-- ============================================================================

-- Uncomment these lines to clean up seed data if needed during testing
-- DELETE FROM public.subscriptions WHERE user_id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222', 
--   '33333333-3333-3333-3333-333333333333',
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );
-- 
-- DELETE FROM public.teams WHERE user_id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222',
--   '33333333-3333-3333-3333-333333333333',
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );
-- 
-- DELETE FROM public.user_profiles WHERE user_id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222',
--   '33333333-3333-3333-3333-333333333333', 
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );
