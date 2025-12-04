using ControlStock.Core.Entities;

namespace ControlStock.Core.Interfaces.Repositories
{
	public interface IRepositoryBase<TEntity> where TEntity : EntityBase
	{
		Task<IEnumerable<TEntity>> GetAllAsync();
		Task<TEntity?> GetByIdAsync(int id);
		Task AddAsync(TEntity entity);
		Task UpdateAsync(TEntity entity);
		Task DeleteAsync(int id);
	}
}
