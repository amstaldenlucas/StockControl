using ControlStock.Application.DTOs.Security;

namespace ControlStock.Application.Interfaces
{
	public interface ITokenService
	{
		Task<TokenResponse> GenerateTokenAsync();
	}
}
