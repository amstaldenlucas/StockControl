namespace ControlStock.Application.DTOs
{
	public record ProductDto(string Name, decimal Price, int ProductGroupId,
		int Id, bool IsDeleted, DateTime CreatedAt, DateTime LastUpdate);
}
