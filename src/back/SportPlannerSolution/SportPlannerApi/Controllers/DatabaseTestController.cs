using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportPlannerApi.Data;

namespace SportPlannerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseTestController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DatabaseTestController> _logger;

    public DatabaseTestController(ApplicationDbContext context, ILogger<DatabaseTestController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Test database connectivity
    /// </summary>
    [HttpGet("connectivity")]
    public async Task<IActionResult> TestConnectivity()
    {
        try
        {
            _logger.LogInformation("Testing database connectivity...");
            
            var canConnect = await _context.Database.CanConnectAsync();
            
            if (canConnect)
            {
                _logger.LogInformation("Database connectivity test successful");
                return Ok(new 
                {
                    Status = "Success",
                    Message = "Database connection established successfully",
                    DatabaseProvider = _context.Database.ProviderName,
                    Timestamp = DateTime.UtcNow
                });
            }
            else
            {
                _logger.LogWarning("Database connectivity test failed - cannot connect");
                return StatusCode(503, new 
                {
                    Status = "Failed",
                    Message = "Cannot connect to database",
                    Timestamp = DateTime.UtcNow
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database connectivity test failed with exception");
            return StatusCode(503, new 
            {
                Status = "Error",
                Message = "Database connectivity test failed",
                Error = ex.Message,
                Timestamp = DateTime.UtcNow
            });
        }
    }

    /// <summary>
    /// Get database information
    /// </summary>
    [HttpGet("info")]
    public async Task<IActionResult> GetDatabaseInfo()
    {
        try
        {
            _logger.LogInformation("Getting database information...");

            var databaseName = _context.Database.GetDbConnection().Database;
            var providerName = _context.Database.ProviderName;
            var connectionString = _context.Database.GetConnectionString();
            
            // Get PostgreSQL version (if connected)
            string? postgresVersion = null;
            try
            {
                if (await _context.Database.CanConnectAsync())
                {
                    var versionResult = await _context.Database.SqlQueryRaw<string>(
                        "SELECT version()").FirstOrDefaultAsync();
                    postgresVersion = versionResult?.Split(' ').Take(2).Aggregate((a, b) => $"{a} {b}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not retrieve PostgreSQL version");
                postgresVersion = "Unable to retrieve version";
            }

            return Ok(new 
            {
                DatabaseName = databaseName,
                Provider = providerName,
                PostgreSQLVersion = postgresVersion,
                ConnectionStringMasked = MaskConnectionString(connectionString),
                Timestamp = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get database information");
            return StatusCode(500, new 
            {
                Status = "Error",
                Message = "Failed to retrieve database information",
                Error = ex.Message,
                Timestamp = DateTime.UtcNow
            });
        }
    }

    /// <summary>
    /// Test Entity Framework features
    /// </summary>
    [HttpGet("ef-test")]
    public async Task<IActionResult> TestEntityFramework()
    {
        try
        {
            _logger.LogInformation("Testing Entity Framework features...");

            var results = new List<string>();

            // Test 1: Database connection
            var canConnect = await _context.Database.CanConnectAsync();
            results.Add($"Database Connection: {(canConnect ? "✅ SUCCESS" : "❌ FAILED")}");

            if (canConnect)
            {
                // Test 2: Raw SQL execution
                try
                {
                    var currentTime = await _context.Database.SqlQueryRaw<DateTime>(
                        "SELECT NOW() as Value").FirstAsync();
                    results.Add($"Raw SQL Query: ✅ SUCCESS - {currentTime:yyyy-MM-dd HH:mm:ss} UTC");
                }
                catch (Exception ex)
                {
                    results.Add($"Raw SQL Query: ❌ FAILED - {ex.Message}");
                }

                // Test 3: Database provider verification
                var isPostgreSQL = _context.Database.IsNpgsql();
                results.Add($"PostgreSQL Provider: {(isPostgreSQL ? "✅ VERIFIED" : "❌ NOT POSTGRESQL")}");
            }

            return Ok(new 
            {
                Status = "Test Completed",
                Results = results,
                OverallSuccess = canConnect,
                Timestamp = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Entity Framework test failed");
            return StatusCode(500, new 
            {
                Status = "Error",
                Message = "Entity Framework test failed",
                Error = ex.Message,
                Timestamp = DateTime.UtcNow
            });
        }
    }

    private static string MaskConnectionString(string? connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
            return "N/A";

        // Simple masking - hide password
        return connectionString
            .Replace("Password=dev_password", "Password=***")
            .Replace("Password=your_password_here", "Password=***")
            .Replace("Password=your_supabase_password", "Password=***");
    }
}