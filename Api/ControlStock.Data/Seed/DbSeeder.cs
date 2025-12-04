using ControlStock.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Seed
{
	public static class DbSeeder
	{
		public static async Task SeedAsync(AppDbContext context)
		{
			if (!context.ProductGroups.Any())
			{
				context.ProductGroups.AddRange(
					new ProductGroup { Name = "Grupo A", Description = "Desc grupo A"},
					new ProductGroup { Name = "Grupo B", Description = "Desc grupo B" }
				);
			}

			await context.SaveChangesAsync();
			var groups = await context.ProductGroups.ToArrayAsync();

			if (!context.Products.Any())
			{
				context.Products.AddRange(
					new Product { Name = "Notebook", Price = 1551.27M, ProductGroupId = groups[0].Id },
					new Product { Name = "Mouse", Price = 57.80M, ProductGroupId = groups[1].Id }
				);
			}

			await context.SaveChangesAsync();
		}
	}
}
