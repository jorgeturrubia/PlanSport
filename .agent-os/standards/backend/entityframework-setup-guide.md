# Entity Framework Core Setup Guide - SportPlanner API

This guide documents the exact steps to configure Entity Framework Core with PostgreSQL in the SportPlanner .NET API project.

## 📋 Prerequisites

- .NET 8.0 SDK
- ASP.NET Core Web API project
- Access to PostgreSQL database (local or Supabase)

## 🚀 Installation Steps

### Step 1: Install Entity Framework Core Packages

```bash
# Navigate to the API project directory
cd src/back/SportPlannerSolution/SportPlannerApi/

# Install Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore

# Install PostgreSQL provider
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Install design-time tools for migrations
dotnet add package Microsoft.EntityFrameworkCore.Design

# Install Package Manager Console tools
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### Step 2: Create ApplicationDbContext

Create `Data/ApplicationDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;

namespace SportPlannerApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // DbSets will be added here in future development
    // Example: public DbSet<Team> Teams { get; set; }
    // Example: public DbSet<Player> Players { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure PostgreSQL specific settings
        // Use snake_case naming convention for PostgreSQL
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            // Convert table names to snake_case
            entity.SetTableName(entity.GetTableName()?.ToSnakeCase());
            
            // Convert column names to snake_case
            foreach (var property in entity.GetProperties())
            {
                property.SetColumnName(property.Name.ToSnakeCase());
            }
            
            // Configure keys, foreign keys, and indexes for snake_case
            // ... (see full implementation in actual file)
        }
    }
}

// Extension method for snake_case conversion
public static class StringExtensions
{
    public static string ToSnakeCase(this string input)
    {
        // Implementation converts PascalCase to snake_case
        // ... (see full implementation in actual file)
    }
}
```

### Step 3: Configure Connection Strings

Update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=sportplanner_dev;Username=postgres;Password=your_password_here;Port=5432",
    "SupabaseConnection": "Host=your_supabase_host;Database=postgres;Username=postgres;Password=your_supabase_password;Port=5432;SSL Mode=Require"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "AllowedHosts": "*",
  "DatabaseSettings": {
    "UseSupabase": false,
    "CommandTimeout": 30
  }
}
```

Update `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=sportplanner_dev;Username=postgres;Password=dev_password;Port=5432"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "DatabaseSettings": {
    "UseSupabase": false,
    "CommandTimeout": 30
  }
}
```

### Step 4: Register DbContext in Dependency Injection

Update `Program.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using SportPlannerApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseNpgsql(connectionString, npgsqlOptions =>
    {
        npgsqlOptions.CommandTimeout(30);
    });
    
    // Enable sensitive data logging in development
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
    }
});

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ... rest of configuration
```

### Step 5: Create Database Test Controller

Create `Controllers/DatabaseTestController.cs` for testing EF Core functionality:

```csharp
[ApiController]
[Route("api/[controller]")]
public class DatabaseTestController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public DatabaseTestController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("connectivity")]
    public async Task<IActionResult> TestConnectivity()
    {
        try
        {
            var canConnect = await _context.Database.CanConnectAsync();
            return Ok(new { Status = canConnect ? "Connected" : "Failed" });
        }
        catch (Exception ex)
        {
            return StatusCode(503, new { Error = ex.Message });
        }
    }
}
```

## ✅ Verification

### Build Test
```bash
dotnet build
```
- [ ] Project builds without errors
- [ ] All EF Core packages are properly referenced

### Startup Test
```bash
dotnet run --launch-profile https
```
- [ ] Application starts without EF Core errors
- [ ] Listens on https://localhost:7213 and http://localhost:5262
- [ ] Swagger UI is accessible

### Database Connectivity Test
1. Navigate to `/health/database` endpoint
2. Should return database connection status
3. Check `/api/DatabaseTest/connectivity` for detailed EF Core tests

## 📁 File Structure

After setup, your API project should have:

```
src/back/SportPlannerSolution/SportPlannerApi/
├── Data/
│   └── ApplicationDbContext.cs     # EF Core DbContext
├── Controllers/
│   └── DatabaseTestController.cs   # Database connectivity tests
├── appsettings.json                # Connection strings
├── appsettings.Development.json    # Development configuration
├── Program.cs                      # DI configuration
└── SportPlannerApi.csproj         # Package references
```

## 🗃️ Database Migration Commands

```bash
# Create your first migration (when you add models)
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update

# List migrations
dotnet ef migrations list

# Remove last migration (if not applied to database)
dotnet ef migrations remove
```

## 🐛 Common Issues

### Issue 1: "No database provider has been configured"
**Solution**: Ensure `UseNpgsql()` is called in `Program.cs` DI configuration.

### Issue 2: Connection string not found
**Solution**: Verify connection string name matches in `GetConnectionString()` call.

### Issue 3: PostgreSQL connection fails
**Solutions**:
- Check PostgreSQL server is running
- Verify credentials in connection string
- For Supabase: ensure SSL Mode=Require is set
- Check firewall and network connectivity

### Issue 4: Snake case conversion errors
**Solution**: Ensure `ToSnakeCase()` extension method handles null values properly.

## 🎯 Best Practices for SportPlanner

1. **Connection Management**: Use connection pooling (enabled by default)
2. **Security**: Store connection strings in user secrets for production
3. **Logging**: Enable EF Core command logging in development
4. **Naming**: Use snake_case for PostgreSQL compatibility
5. **Performance**: Use async methods throughout (CanConnectAsync, etc.)
6. **Error Handling**: Implement proper exception handling for database operations

## 🔄 Next Steps

After basic setup is complete:

1. **Create Models**: Add domain models (Team, Player, Training, etc.)
2. **Configure Relationships**: Set up entity relationships in OnModelCreating
3. **Add Migrations**: Create and apply database migrations
4. **Connect to Supabase**: Update connection strings for Supabase PostgreSQL
5. **Implement Repositories**: Create repository pattern for data access
6. **Add Validation**: Implement model validation and business rules

## 📚 Additional Resources

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Npgsql Documentation](https://www.npgsql.org/efcore/)
- [ASP.NET Core Data Access](https://docs.microsoft.com/en-us/aspnet/core/data/)
- [PostgreSQL Naming Conventions](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS)

---

**Last Updated**: 2025-08-07  
**Entity Framework Version**: 9.0.8  
**Npgsql Version**: 9.0.4  
**.NET Version**: 8.0  
**Status**: ✅ Working Configuration
