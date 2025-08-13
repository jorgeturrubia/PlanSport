using SportPlanner.Api.Controllers;
using SportPlanner.Api.Dtos;
using System.Threading.Tasks;

namespace SportPlanner.Api.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(AuthController.LoginRequest request);
        Task<AuthResponseDto?> RegisterAsync(AuthController.RegisterRequest request);
        Task<AuthResponseDto?> RefreshAsync(AuthController.RefreshRequest request);
        Task LogoutAsync(AuthController.LogoutRequest request);
    }
}
