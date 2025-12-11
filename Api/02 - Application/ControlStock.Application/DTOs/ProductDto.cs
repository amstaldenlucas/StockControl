namespace ControlStock.Application.DTOs
{
	public record ProductDto(string Name, decimal Price,
		int Id, bool IsDeleted, DateTime CreatedAt, DateTime LastUpdate,
		 int? ProductGroupId, string? GroupName = "");
}
