using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;

namespace ControlStock.Data.Repositories
{
	public class ProductGroupRepository : RepositoryBase<ProductGroup>, IProductGroupRepository
	{
		public ProductGroupRepository(AppDbContext context) : base(context)
		{
		}
	}
}
