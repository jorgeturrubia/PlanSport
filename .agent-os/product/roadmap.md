# Product Roadmap

## Phase 0: Already Completed

The following features have been implemented:

- [x] **Landing Page** - Marketing website with hero section, features overview, and subscription plans
- [x] **Authentication System** - Complete user registration, login, JWT token management with Supabase
- [x] **Dashboard Layout** - Main application layout with navigation, theme toggle, and user menu
- [x] **Basic Team Management** - CRUD operations for teams with sport types, categories, and color coding
- [x] **Role-based Access Control** - Guards and routing for authenticated vs guest users
- [x] **Responsive Design** - Mobile-first design with Tailwind CSS
- [x] **Error Handling** - Centralized error management and user feedback
- [x] **State Management** - Signal-based reactive state for auth and teams

## Phase 1: Subscription System & Core User Management

**Goal:** Implement subscription management and user role system
**Success Criteria:** Users can purchase subscriptions and access features based on their plan

### Features

- [ ] **Subscription Management** - Integration with payment system for Gratuita, Entrenador, Club plans `L`
- [ ] **User Role System** - Admin, Director, Entrenador roles with permission-based access `M`
- [ ] **Club/Organization Management** - Create and manage clubs with multiple teams `L`
- [ ] **Team Assignment System** - Assign users to specific teams with role-based permissions `M`
- [ ] **Subscription Limits Enforcement** - Restrict features based on subscription plan (team count, training count) `M`
- [ ] **User Invitation System** - Club admins can invite users without requiring subscription `L`

### Dependencies

- Supabase database schema for subscriptions, organizations, and user-team relationships
- Payment gateway integration (Stripe recommended)

## Phase 2: Concepts & Exercise Management

**Goal:** Build the core content management system for training concepts and exercises
**Success Criteria:** Users can create, categorize, and manage training concepts and exercises

### Features

- [ ] **Concept Management** - Create and organize training objectives by category/subcategory `L`
- [ ] **Exercise Library** - CRUD operations for exercises linked to concepts `L`
- [ ] **Difficulty & Time Estimation** - Classify exercises by difficulty level and learning time `M`
- [ ] **Personal vs Shared Content** - Distinguish between custom user content and application defaults `M`
- [ ] **Exercise-Concept Linking** - Many-to-many relationship between exercises and concepts `M`
- [ ] **Content Categorization** - Técnica individual, táctica, física categories with subcategories `S`

### Dependencies

- Core concept taxonomy definition
- Database schema for concepts, exercises, and relationships

## Phase 3: Planning System & Itineraries

**Goal:** Implement the core planning functionality with automated training generation
**Success Criteria:** Users can create complete training plans and auto-generate sessions

### Features

- [ ] **Training Plan Creation** - Define plans with start/end dates, training days, and hours `L`
- [ ] **Itinerary System** - Create reusable concept sequences for rapid plan setup `L`
- [ ] **Automated Training Generation** - Generate all training sessions based on plan parameters `XL`
- [ ] **Plan-Team Assignment** - Assign plans to teams with many-to-many relationships `M`
- [ ] **Training Schedule Management** - Calendar view with session management `L`
- [ ] **Plan Templates** - Save and reuse successful planning configurations `M`

### Dependencies

- Completed concept and exercise management
- Algorithm for intelligent training session generation

## Phase 4: Marketplace & Community Features

**Goal:** Build the collaborative marketplace for sharing and rating content
**Success Criteria:** Users can discover, import, and rate shared plans and exercises

### Features

- [ ] **Content Marketplace** - Browse and search shared plans, exercises, and itineraries `XL`
- [ ] **Rating & Review System** - 5-star rating system with comments and feedback `L`
- [ ] **Advanced Search & Filters** - Filter by sport, category, difficulty, rating, age group `L`
- [ ] **Content Import System** - One-click import of marketplace content to personal library `M`
- [ ] **Content Publishing** - Publish personal content to marketplace with privacy controls `M`
- [ ] **Community Moderation** - Report inappropriate content and admin moderation tools `L`

### Dependencies

- Robust content categorization system
- Content approval and moderation workflows

## Phase 5: Training Execution & Analytics

**Goal:** Provide real-time training execution tools and comprehensive analytics
**Success Criteria:** Coaches can execute training sessions and track progress effectively

### Features

- [ ] **Dynamic Training View** - Step-by-step session execution with timer and navigation `L`
- [ ] **Session Completion Tracking** - Mark concepts as trained and track progress `M`
- [ ] **Progress Analytics** - Reports on planned vs executed training, concept coverage `L`
- [ ] **Training Calendar** - Visual calendar with past/future sessions and modification controls `M`
- [ ] **Hide/Archive System** - Hide old plans and teams without deletion `S`
- [ ] **Export & Reporting** - Generate training reports in PDF/Excel formats `M`

### Dependencies

- Completed planning system
- Session execution tracking infrastructure

## Phase 6: Advanced Features & Enterprise

**Goal:** Add advanced functionality for professional and enterprise users
**Success Criteria:** Platform supports complex organizational structures and advanced analytics

### Features

- [ ] **Advanced Analytics Dashboard** - Detailed insights on team performance and progress trends `XL`
- [ ] **Multi-season Management** - Manage training plans across multiple seasons `L`
- [ ] **Advanced Role Management** - Custom roles and granular permissions `L`
- [ ] **API & Integrations** - Open API for third-party integrations `XL`
- [ ] **Mobile App** - Native mobile application for iOS/Android `XL`
- [ ] **Offline Mode** - Sync capabilities for offline training execution `L`
- [ ] **Advanced Notifications** - Email/push notifications for training reminders and updates `M`

### Dependencies

- Stable core platform
- Mobile development team or framework decision