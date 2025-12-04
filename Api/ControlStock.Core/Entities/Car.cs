namespace ControlStock.Core.Entities
{
	public class Car : EntityBase
	{
		public string Name { get; set; } = null!;
		public decimal Price { get; set; }
		public string Color { get; set; } = null!;
		public int Year { get; set; }
		public int ModelYear { get; set; }
	}
}
