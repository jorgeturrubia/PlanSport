using Microsoft.Extensions.Logging;
using SportPlanner.Api.Controllers;
using SportPlanner.Api.Dtos;
using SportPlanner.Api.Exceptions;
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
                    _logger.LogWarning("Login failed for {Email} - invalid credentials", request.Email);
                    throw new InvalidCredentialsException();
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
            catch (InvalidCredentialsException)
            {
                // Re-throw known exceptions
                throw;
            }
            catch (Supabase.Gotrue.Exceptions.GotrueException ex) when (ex.Message.Contains("Invalid login credentials"))
            {
                _logger.LogWarning("Invalid login credentials for {Email}", request.Email);
                throw new InvalidCredentialsException();
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error logging in user {Email}", request.Email);
                throw new AuthException("LOGIN_ERROR", "Error during login", "Error al iniciar sesión");
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
                    _logger.LogWarning("Registration failed for {Email} - user or access token null", request.Email);
                    throw new AuthException("REGISTRATION_FAILED", "Registration failed", "Error en el registro");
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
            catch (Supabase.Gotrue.Exceptions.GotrueException ex) when (ex.Message.Contains("User already registered"))
            {
                _logger.LogWarning("User already exists: {Email}", request.Email);
                throw new UserAlreadyExistsException(request.Email);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error registering user {Email}", request.Email);
                throw new AuthException("REGISTRATION_ERROR", "Error during registration", "Error en el registro");
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

        public async Task<bool> ForgotPasswordAsync(string email)
        {
            _logger.LogInformation("Forgot password attempt for {Email}", email);
            try
            {
                await _supabaseClient.Auth.ResetPasswordForEmail(email);
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error sending password reset email to {Email}", email);
                return false;
            }
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            _logger.LogInformation("Reset password attempt with token");
            try
            {
                // In Supabase, we need to use the token to update the user's password
                // This typically involves using the token to identify the user and set a new password
                await _supabaseClient.Auth.UpdateUser(new Supabase.Gotrue.UserAttributes
                {
                    Password = newPassword
                }, token);
                return true;
            }
            catch (Supabase.Gotrue.Exceptions.GotrueException ex) when (ex.Message.Contains("Invalid token") || ex.Message.Contains("expired"))
            {
                _logger.LogWarning("Invalid or expired token for password reset");
                throw new InvalidTokenException();
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error resetting password with token");
                throw new AuthException("PASSWORD_RESET_ERROR", "Error resetting password", "Error al restablecer la contraseña");
            }
        }

        public async Task<bool> SendEmailVerificationAsync()
        {
            _logger.LogInformation("Send email verification attempt");
            try
            {
                // In Supabase, we can send a verification email to the current user
                await _supabaseClient.Auth.SendVerificationEmail();
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error sending verification email");
                return false;
            }
        }

        public async Task<bool> VerifyEmailAsync(string token)
        {
            _logger.LogInformation("Verify email attempt with token");
            try
            {
                // In Supabase, we need to use the token to verify the user's email
                await _supabaseClient.Auth.VerifyEmail(token);
                return true;
            }
            catch (Supabase.Gotrue.Exceptions.GotrueException ex) when (ex.Message.Contains("Invalid token") || ex.Message.Contains("expired"))
            {
                _logger.LogWarning("Invalid or expired token for email verification");
                throw new InvalidTokenException();
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error verifying email with token");
                throw new AuthException("EMAIL_VERIFICATION_ERROR", "Error verifying email", "Error verificando el email");
            }
        }

        public async Task<ProfileDto?> GetProfileAsync()
        {
            _logger.LogInformation("Get profile attempt");
            try
            {
                var session = _supabaseClient.Auth.CurrentSession;
                if (session?.User == null)
                {
                    return null;
                }

                return new ProfileDto
                {
                    Id = session.User.Id,
                    Email = session.User.Email ?? string.Empty,
                    FullName = session.User.UserMetadata.ContainsKey("full_name") ? session.User.UserMetadata["full_name"].ToString() ?? string.Empty : string.Empty,
                    Role = "user", // This would typically come from custom claims or a profiles table
                    OrganizationId = string.Empty, // This would typically come from custom claims or a profiles table
                    EmailConfirmed = session.User.EmailConfirmedAt.HasValue,
                    Metadata = session.User.UserMetadata
                };
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error getting profile");
                return null;
            }
        }

        public async Task<ProfileDto?> UpdateProfileAsync(UpdateProfileDto profile)
        {
            _logger.LogInformation("Update profile attempt");
            try
            {
                var session = _supabaseClient.Auth.CurrentSession;
                if (session?.User == null)
                {
                    return null;
                }

                // Update user metadata with new full name
                var userAttributes = new Supabase.Gotrue.UserAttributes
                {
                    Data = new System.Collections.Generic.Dictionary<string, object>
                    {
                        { "full_name", profile.FullName }
                    }
                };

                // Merge with existing metadata if it exists
                if (profile.Metadata != null)
                {
                    var metadataDict = profile.Metadata as System.Collections.Generic.Dictionary<string, object>;
                    if (metadataDict != null)
                    {
                        foreach (var kvp in metadataDict)
                        {
                            userAttributes.Data[kvp.Key] = kvp.Value;
                        }
                    }
                }

                var updatedUser = await _supabaseClient.Auth.UpdateUser(userAttributes);

                return new ProfileDto
                {
                    Id = updatedUser.Id,
                    Email = updatedUser.Email ?? string.Empty,
                    FullName = profile.FullName,
                    Role = "user", // This would typically come from custom claims or a profiles table
                    OrganizationId = string.Empty, // This would typically come from custom claims or a profiles table
                    EmailConfirmed = updatedUser.EmailConfirmedAt.HasValue,
                    Metadata = updatedUser.UserMetadata
                };
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error updating profile");
                return null;
            }
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordDto changePassword)
        {
            _logger.LogInformation("Change password attempt");
            try
            {
                var session = _supabaseClient.Auth.CurrentSession;
                if (session?.User == null)
                {
                    return false;
                }

                // First, verify the current password by signing in
                var user = await _supabaseClient.Auth.SignIn(session.User.Email ?? string.Empty, changePassword.CurrentPassword);
                if (user == null)
                {
                    return false;
                }

                // Update the password
                var userAttributes = new Supabase.Gotrue.UserAttributes
                {
                    Password = changePassword.NewPassword
                };

                await _supabaseClient.Auth.UpdateUser(userAttributes);
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error changing password");
                return false;
            }
        }
    }
}
