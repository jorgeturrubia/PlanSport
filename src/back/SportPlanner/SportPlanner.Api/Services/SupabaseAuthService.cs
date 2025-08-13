using Microsoft.Extensions.Logging;
using SportPlanner.Api.Controllers;
using SportPlanner.Api.Dtos;
using Supabase;
using System.Threading.Tasks;

namespace SportPlanner.Api.Services
{
    public class SupabaseAuthService : IAuthService
    {
        private readonly ILogger<SupabaseAuthService> _logger;
        private readonly Client _supabaseClient;

        public SupabaseAuthService(ILogger<SupabaseAuthService> logger, Client supabaseClient)
        {
            _logger = logger;
            _supabaseClient = supabaseClient;
        }

        public async Task<AuthResponseDto?> LoginAsync(AuthController.LoginRequest request)
        {
            _logger.LogInformation("Login attempt for {Email}", request.Email);
            try
            {
                var session = await _supabaseClient.Auth.SignIn(request.Email, request.Password);
                if (session?.User == null || session.AccessToken == null)
                {
                    return null;
                }

                return new AuthResponseDto
                {
                    AccessToken = session.AccessToken,
                    RefreshToken = session.RefreshToken,
                    ExpiresIn = session.ExpiresIn ?? 3600,
                    User = new UserDto
                    {
                        Id = session.User.Id,
                        Email = session.User.Email,
                        FullName = session.User.UserMetadata.ContainsKey("full_name") ? session.User.UserMetadata["full_name"].ToString() : string.Empty,
                        // Role and OrganizationId would be custom claims or from a profiles table
                    }
                };
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error logging in user {Email}", request.Email);
                return null;
            }
        }

        public async Task<AuthResponseDto?> RegisterAsync(AuthController.RegisterRequest request)
        {
            _logger.LogInformation("Register attempt for {Email}", request.Email);
            try
            {
                var session = await _supabaseClient.Auth.SignUp(request.Email, request.Password, new Supabase.Gotrue.SignUpOptions
                {
                    Data = new System.Collections.Generic.Dictionary<string, object>
                    {
                        { "full_name", request.FullName }
                    }
                });

                if (session?.User == null || session.AccessToken == null)
                {
                    return null;
                }

                return new AuthResponseDto
                {
                    AccessToken = session.AccessToken,
                    RefreshToken = session.RefreshToken,
                    ExpiresIn = session.ExpiresIn ?? 3600,
                    User = new UserDto
                    {
                        Id = session.User.Id,
                        Email = session.User.Email,
                        FullName = request.FullName,
                    }
                };
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error registering user {Email}", request.Email);
                return null;
            }
        }

        public async Task<AuthResponseDto?> RefreshAsync(AuthController.RefreshRequest request)
        {
            _logger.LogInformation("Refresh attempt");
            try
            {
                var session = await _supabaseClient.Auth.RefreshSession(request.RefreshToken);
                if (session?.User == null || session.AccessToken == null)
                {
                    return null;
                }

                return new AuthResponseDto
                {
                    AccessToken = session.AccessToken,
                    RefreshToken = session.RefreshToken,
                    ExpiresIn = session.ExpiresIn ?? 3600
                };
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error refreshing token");
                return null;
            }
        }

        public async Task LogoutAsync(AuthController.LogoutRequest request)
        {
            _logger.LogInformation("Logout attempt");
            try
            {
                await _supabaseClient.Auth.SignOut();
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error logging out");
            }
        }
    }
}
