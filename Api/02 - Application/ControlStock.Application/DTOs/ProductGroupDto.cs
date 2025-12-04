namespace ControlStock.Application.DTOs
{
	public record ProductGroupDto(string Name, string? Description,
		int Id, bool IsDeleted, DateTime CreatedAt, DateTime LastUpdate);
}
