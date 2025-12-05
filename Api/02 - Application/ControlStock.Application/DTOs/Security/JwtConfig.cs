namespace ControlStock.Application.DTOs.Security
{
	public record JwtConfig(
		string Key,
		string Issuer,
		string Audience,
		int ExpirationInMinutes,
		int RefreshTokenExpirationDays
		);
}
