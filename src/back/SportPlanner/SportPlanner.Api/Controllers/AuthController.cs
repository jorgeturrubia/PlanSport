
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportPlanner.Api.Services;
using System.Threading.Tasks;

namespace SportPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // DTOs for requests
        public record LoginRequest(string Email, string Password);
        public record RegisterRequest(string Email, string Password, string ConfirmPassword, string FullName, string OrganizationName, bool AcceptTerms);
        public record RefreshRequest(string RefreshToken);
        public record LogoutRequest(string RefreshToken);

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            if (result == null)
            {
                return BadRequest(new { message = "Registration failed" });
            }
            return Created("api/auth/register", result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var result = await _authService.RefreshAsync(request);
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid refresh token" });
            }
            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            await _authService.LogoutAsync(request);
            return Ok(new { message = "Logged out successfully" });
        }

        [Authorize]
        [HttpGet("verify")]
        public IActionResult Verify()
        {
            return Ok(new { message = "Token is valid", User = User.Identity?.Name });
        }
    }
}
