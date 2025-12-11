using ControlStock.Core.Entities;

namespace ControlStock.Core.Interfaces.Repositories
{
	public interface IProductRepository : IRepositoryBase<Product>
    {
        Task<IEnumerable<Product>> GetAllWithGroupAsync();
    }
}
