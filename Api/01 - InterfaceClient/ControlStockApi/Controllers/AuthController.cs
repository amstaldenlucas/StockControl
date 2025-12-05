using ControlStock.Application.DTOs.Security;
using ControlStock.Application.Interfaces;
using ControlStock.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControlStockApi.Controllers
{
	[ApiController]
	[Route("api/auth")]
	public class AuthController : ControllerBase
	{
		private readonly AuthCredentials _authCredentials;
		private readonly ITokenService _tokenService;
		private readonly AppDbContext _context;

		public AuthController(AuthCredentials authCredentials, ITokenService tokenService, AppDbContext context)
		{
			_authCredentials = authCredentials;
			_tokenService = tokenService;
			_context = context;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginBySecretRequest request)
		{
			var apiSecret = _authCredentials.ApiSecret;

			if (request.Secret != apiSecret)
				return Unauthorized("Secret inválido");

			var token = await _tokenService.GenerateTokenAsync();

			return Ok(new TokenResponse(token.AccessToken, token.RefreshToken));
		}

		[HttpPost("refresh")]
		public async Task<IActionResult> Refresh(RefreshRequest request)
		{
			var refresh = await _context.RefreshTokens
				.FirstOrDefaultAsync(x =>
					x.Token == request.RefreshToken &&
					!x.IsRevoked &&
					x.ExpirationUtcDate > DateTime.UtcNow
				);

			if (refresh == null)
				return Unauthorized("Refresh token inválido");

			refresh.IsRevoked = true;

			var token = await _tokenService.GenerateTokenAsync();
			await _context.SaveChangesAsync();

			return Ok(new TokenResponse(token.AccessToken, token.RefreshToken));
		}
	}
}
