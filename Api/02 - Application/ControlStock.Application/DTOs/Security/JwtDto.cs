namespace ControlStock.Application.DTOs.Security
{
	public record LoginBySecretRequest(string Secret);
	public record RefreshRequest(string RefreshToken);
	public record TokenResponse(string AccessToken, string RefreshToken);
}
