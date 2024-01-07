using App.Domain.Models;

namespace App.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> AuthenticationAsync(AuthenticationRequest request);
    }
}
