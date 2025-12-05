namespace ControlStock.Core.Entities
{
	public class RefreshToken : EntityBase
	{
		public string Token { get; set; } = null!;

		public DateTime ExpirationUtcDate { get; set; }

		public bool IsRevoked { get; set; }

	}
}
