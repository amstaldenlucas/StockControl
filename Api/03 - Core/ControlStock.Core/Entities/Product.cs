namespace ControlStock.Core.Entities
{
	public class Product : EntityBase
	{
		public string Name { get; set; } = null!;
		public decimal Price { get; set; }
		public int ProductGroupId { get; set; }
		public ProductGroup? Group { get; set; }
	}
}
