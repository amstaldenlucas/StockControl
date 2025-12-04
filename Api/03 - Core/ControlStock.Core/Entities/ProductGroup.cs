namespace ControlStock.Core.Entities
{
	public class ProductGroup : EntityBase
	{
		public string Name { get; set; } = null!;
		public string? Description { get; set; }
		public IEnumerable<Product>? Products { get; set; }
	}
}
