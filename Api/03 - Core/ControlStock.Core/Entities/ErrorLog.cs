namespace ControlStock.Core.Entities
{
	public class ErrorLog
	{
		public int Id { get; set; }
		public string Message { get; set; } = default!;
		public string StackTrace { get; set; } = default!;
		public string Path { get; set; } = default!;
		public string Method { get; set; } = default!;
		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}
