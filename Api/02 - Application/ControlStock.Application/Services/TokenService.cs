using ControlStock.Application.DTOs.Security;
using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStock.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ControlStock.Application.Services
{
	public class TokenService : ITokenService
	{
		private readonly JwtConfig _config;
		private readonly AppDbContext _context;

		public TokenService(JwtConfig config, AppDbContext context)
		{
			_config = config;
			_context = context;
		}

		public async Task<TokenResponse> GenerateTokenAsync()
		{
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, "system"),
				new Claim(JwtRegisteredClaimNames.UniqueName, "api-client")
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Key));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _config.Issuer,
				audience: _config.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(_config.ExpirationInMinutes),
				signingCredentials: creds
			);

			var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

			var refreshToken = new RefreshToken
			{
				Token = Guid.NewGuid().ToString(),
				ExpirationUtcDate = DateTime.UtcNow.AddDays(_config.RefreshTokenExpirationDays),
				IsRevoked = false,
			};

			_context.RefreshTokens.Add(refreshToken);
			await _context.SaveChangesAsync();

			return new TokenResponse(accessToken, refreshToken.Token);
		}
	}
}
