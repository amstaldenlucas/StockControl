namespace ControlStock.Application.DTOs
{
	public record DtoBase(int Id, bool IsDeleted, DateTime CreatedAt, DateTime LastUpdate);
}
