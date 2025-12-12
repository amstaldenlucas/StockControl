using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces;
using ControlStock.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Repositories
{
	public class ProductGroupRepository : RepositoryBase<ProductGroup>, IProductGroupRepository
	{
		public ProductGroupRepository(AppDbContext context) : base(context)
		{
		}

        protected override async Task<CheckDeleteItem> CanDeleteItemAsync(int id)
        {
            var blockDeleteItem = true;

			blockDeleteItem = await _context.Products
				.AnyAsync(x => x.ProductGroupId == id);

			return new CheckDeleteItem(!blockDeleteItem, "O grupo está atrelado à pelo menos 1 produto.");
        }
    }
}
