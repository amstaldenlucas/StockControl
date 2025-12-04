namespace ControlStock.Application.DTOs
{
	public record ErrorLogDto(int Id, string Message, string StackTrace, string Path, string Method, DateTime CreatedAt);
}
