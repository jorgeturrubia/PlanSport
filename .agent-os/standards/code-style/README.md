# Code Style Standards - SportAgentoos

This directory contains the coding standards and style guides for the SportAgentoos project. These standards ensure consistency, maintainability, and quality across the entire codebase.

## 📋 Available Style Guides

### Backend Development
- **[.NET 8 + Supabase](./dotnet-8-supabase.yaml)** - Complete coding standards for ASP.NET Core 8.0 backend development with Supabase integration
  - Project structure and naming conventions
  - Dependency injection patterns
  - Controller and service standards
  - Supabase integration best practices
  - Authentication and authorization
  - Testing standards
  - Error handling and logging

### Frontend Development
- **[Angular 20 + Supabase + TailwindCSS 4](./angular-20-supabase-tailwind.yaml)** - Comprehensive standards for Angular 20 frontend development
  - Component architecture and structure
  - Supabase client integration
  - TailwindCSS 4 design system
  - Guards and interceptors
  - Testing standards
  - Performance optimization
  - Responsive design patterns

## 🎯 Quick Reference

### Key Principles
1. **Multi-Tenant First** - All code must respect organization-level data isolation
2. **Security by Default** - Authentication and authorization are required by default
3. **Performance Optimized** - Use OnPush change detection, lazy loading, and proper caching
4. **Type Safety** - Leverage TypeScript and C# strong typing throughout
5. **Consistent Design** - Follow established design system and component patterns

### Technology-Specific Guidelines

#### .NET 8 Backend
- Use `PascalCase` for classes, methods, and properties
- Implement proper dependency injection patterns
- Always include organization filtering for multi-tenancy
- Use structured logging with proper context
- Implement comprehensive error handling

#### Angular 20 Frontend
- Use `camelCase` for properties and methods, `kebab-case` for files
- Leverage Angular signals for reactive state management
- Implement OnPush change detection strategy
- Use functional guards and interceptors
- Follow component lifecycle best practices

#### TailwindCSS 4
- Use design system classes defined in global styles
- Follow mobile-first responsive design approach
- Maintain consistent spacing and typography scale
- Leverage component classes for reusable patterns

## 📊 Code Quality Metrics

- **Test Coverage**: Minimum 80% for business logic
- **Bundle Size**: Keep individual chunks under 250KB
- **Performance**: Core Web Vitals must meet "Good" thresholds
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: All security vulnerabilities addressed

## 🔄 Style Guide Updates

These style guides are living documents and should be updated as:
- New patterns emerge in the codebase
- Technology versions are upgraded
- Best practices evolve
- Team feedback is incorporated

For questions or suggestions about these standards, please refer to the team lead or create an issue in the project repository.

---

**Last Updated**: 2025-08-06  
**Version**: 1.0  
**Applies To**: SportAgentoos v1.0+
