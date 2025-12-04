using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Repositories
{
	public class ProductRepository : RepositoryBase<Product>, IProductRepository
	{
		public ProductRepository(AppDbContext context) : base(context)
		{
		}

		public async Task<bool> NomeJaExisteAsync(string nome)
		{
			return await _context.Products.AnyAsync(x => x.Name == nome);
		}
	}
}
