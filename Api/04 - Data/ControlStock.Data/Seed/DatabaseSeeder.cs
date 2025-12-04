using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Seed
{
	public class DatabaseSeeder : IDatabaseSeeder
	{
		private readonly AppDbContext _context;

		public DatabaseSeeder(AppDbContext context)
		{
			_context = context;
		}

		public async Task SeedAsync()
		{
			if (!_context.ProductGroups.Any())
			{
				_context.ProductGroups.AddRange(
					new ProductGroup { Name = "Grupo A", Description = "Desc grupo A"},
					new ProductGroup { Name = "Grupo B", Description = "Desc grupo B" }
				);
			}

			await _context.SaveChangesAsync();
			var groups = await _context.ProductGroups.ToArrayAsync();

			if (!_context.Products.Any())
			{
				_context.Products.AddRange(
					new Product { Name = "Notebook", Price = 1551.27M, ProductGroupId = groups[0].Id },
					new Product { Name = "Mouse", Price = 57.80M, ProductGroupId = groups[1].Id }
				);
			}

			await _context.SaveChangesAsync();
		}
	}
}
