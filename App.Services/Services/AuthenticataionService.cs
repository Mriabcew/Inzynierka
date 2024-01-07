using App.Domain.Models;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace App.Services.Services
{
    public class AuthenticataionService : IAuthenticationService
    {
        private readonly JSONWebTokensSettings _jwtSettings;
        private readonly IUserService _userService;

        public AuthenticataionService(IOptions<JSONWebTokensSettings> jwtSettings, IUserService userService)
        {
            _jwtSettings = jwtSettings.Value;
            _userService = userService;
        }

        public async Task<AuthenticationResponse> AuthenticationAsync(AuthenticationRequest request)
        {
            var user = await _userService.GetByEmailOrUsername(request.EmailOrUsername);
            JwtSecurityToken jwtSecurityToken = await GenerateToken(user);

            AuthenticationResponse response = new AuthenticationResponse()
            {
                Id = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Email = user.Email,
                Username = user.Username
            };

            return response;
        }

        private async Task<JwtSecurityToken> GenerateToken(UserDTO user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("uid", user.Id.ToString())
        };

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;

        }
    }
}
