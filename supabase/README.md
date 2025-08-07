# SportAgentoos Database Setup

This directory contains all database-related files for SportAgentoos including migrations, seed data, and testing.

## 📁 Directory Structure

```
supabase/
├── migrations/           # Database schema migrations
├── seed.sql             # Development seed data
├── rls_policies.sql     # Row Level Security documentation
└── README.md           # This file
```

## 🚀 Setup Instructions

### Prerequisites

1. **Supabase Account**: Ensure you have a Supabase project set up
2. **Environment Variables**: Configure your Supabase URL and anon key in the Angular environment files
3. **Database Access**: Admin access to run migrations

### Migration Order

Execute migrations in the following order:

1. `20250805135300_create_subscriptions_table.sql`
2. `20250805135400_create_user_profiles_table.sql`

### Development Setup

1. **Run Migrations**:
   ```sql
   -- Execute each migration file in order in your Supabase SQL Editor
   ```

2. **Apply Seed Data** (Development Only):
   ```sql
   -- Run seed.sql in your Supabase SQL Editor for testing data
   ```

3. **Verify Setup**:
   ```sql
   -- Check tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name IN ('subscriptions', 'user_profiles');
   
   -- Check RLS is enabled
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename IN ('subscriptions', 'user_profiles');
   
   -- Test the view
   SELECT * FROM user_profile_with_subscription LIMIT 1;
   ```

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **subscriptions**: Users can only access their own subscription data
- **user_profiles**: Users can only access their own profile data
- **Views**: Security barrier enabled for all user data views

### Authentication Integration

- Foreign key relationships with `auth.users` table
- Automatic profile creation on user signup via database triggers
- Cascade deletes when users are removed

## 🧪 Testing

### Manual Tests

Run these queries to verify the database setup:

```sql
-- Test 1: Verify table structure
\d+ subscriptions
\d+ user_profiles

-- Test 2: Test constraints
INSERT INTO subscriptions (user_id, plan_type) 
VALUES (gen_random_uuid(), 'invalid'); -- Should fail

-- Test 3: Test RLS (must be run as authenticated user)
SELECT * FROM subscriptions; -- Should only show user's data

-- Test 4: Test triggers
INSERT INTO subscriptions (user_id, plan_type) 
VALUES (gen_random_uuid(), 'free');
-- Check updated_at is set

-- Test 5: Test view
SELECT * FROM user_profile_with_subscription;
```

### Automated Tests

The test suite in `src/tests/database/models.test.sql` includes:

- Table constraint validation
- Foreign key relationship testing
- RLS policy verification
- Trigger functionality testing
- Data integrity checks

## 📊 Database Schema

### Tables

#### `subscriptions`
- Tracks user subscription plans (free, coach, club)
- Enforces one active subscription per user
- Includes audit timestamps

#### `user_profiles`
- Extended user information beyond Supabase auth
- Onboarding completion tracking
- User preferences (timezone, language)
- Auto-created via database trigger

#### `user_profile_with_subscription` (View)
- Combined view of user profile and active subscription
- Optimized for frontend queries
- RLS protected

### Relationships

```
auth.users (Supabase)
    ↓ (1:1)
user_profiles
    ↓ (1:many)
subscriptions
```

## 🔧 Maintenance

### Adding New Tables

When adding new tables:

1. Create migration file with timestamp prefix
2. Enable RLS: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
3. Create appropriate RLS policies
4. Add to seed data if needed
5. Update this documentation

### Updating Existing Tables

1. Create new migration file (never edit existing ones)
2. Use `ALTER TABLE` statements
3. Update RLS policies if needed
4. Test thoroughly before production

## 🚨 Production Notes

- **Never run seed.sql in production**
- **Always test migrations in staging first**
- **Monitor RLS policy performance**
- **Regular backups are essential**
- **Keep migration files in version control**

## 📞 Support

For database-related issues:
1. Check Supabase dashboard for errors
2. Verify RLS policies are correctly applied
3. Check migration execution logs
4. Review foreign key constraints
