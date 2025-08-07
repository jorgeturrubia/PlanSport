using Microsoft.EntityFrameworkCore;
using SportPlannerApi.Data;
using SportPlannerApi.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure Settings
builder.Services.Configure<SupabaseSettings>(builder.Configuration.GetSection(SupabaseSettings.SectionName));
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection(DatabaseSettings.SectionName));

// Configure Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var databaseSettings = builder.Configuration.GetSection(DatabaseSettings.SectionName).Get<DatabaseSettings>();
    
    // Choose connection string based on configuration
    string connectionStringKey = databaseSettings?.UseSupabase == true 
        ? "DefaultConnection" // Using Supabase in development without SSL for now
        : "DefaultConnection";
        
    var connectionString = builder.Configuration.GetConnectionString(connectionStringKey);
    
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException($"Connection string '{connectionStringKey}' not found.");
    }
    
    options.UseNpgsql(connectionString, npgsqlOptions =>
    {
        npgsqlOptions.CommandTimeout(databaseSettings?.CommandTimeout ?? 30);
    });
    
    // Enable sensitive data logging in development
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
        options.LogTo(Console.WriteLine, LogLevel.Information);
    }
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowAngularDev");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Add a health check endpoint
app.MapGet("/health", () => new { Status = "Healthy", Timestamp = DateTime.UtcNow });

// Add database connectivity test endpoint
app.MapGet("/health/database", async (ApplicationDbContext context) =>
{
    try
    {
        await context.Database.CanConnectAsync();
        return Results.Ok(new { 
            Status = "Database Connected", 
            Provider = context.Database.ProviderName,
            Timestamp = DateTime.UtcNow 
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            title: "Database Connection Failed",
            statusCode: 503
        );
    }
});

// Add Supabase configuration endpoint
app.MapGet("/health/supabase", (IConfiguration config) =>
{
    var supabaseSettings = config.GetSection(SupabaseSettings.SectionName).Get<SupabaseSettings>();
    var databaseSettings = config.GetSection(DatabaseSettings.SectionName).Get<DatabaseSettings>();
    
    return Results.Ok(new {
        SupabaseConfigured = !string.IsNullOrEmpty(supabaseSettings?.Url),
        UseSupabase = databaseSettings?.UseSupabase ?? false,
        SupabaseUrl = supabaseSettings?.Url ?? "Not configured",
        HasSupabaseKey = !string.IsNullOrEmpty(supabaseSettings?.Key),
        Timestamp = DateTime.UtcNow
    });
});

app.Run();
