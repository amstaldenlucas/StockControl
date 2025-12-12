using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Repositories
{
	public abstract class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : EntityBase
	{
		private protected AppDbContext _context;
		private protected DbSet<TEntity> _dbSet;

		public RepositoryBase(AppDbContext context)
		{
			_context = context;
			_dbSet = context.Set<TEntity>();
		}

		public async Task<IEnumerable<TEntity>> GetAllAsync()
			=> await _dbSet.ToListAsync();

		public async Task<TEntity?> GetByIdAsync(int id)
			=> await _dbSet.FindAsync(id);

		public async Task AddAsync(TEntity entity)
			=> await _dbSet.AddAsync(entity);

		public Task UpdateAsync(TEntity entity)
		{
			_dbSet.Update(entity);
			_context.Entry(entity).Property(e => e.CreatedAt).IsModified = false;
			_context.Entry(entity).Property(e => e.IsDeleted).IsModified = false;

			return Task.CompletedTask;
		}

		public virtual async Task DeleteAsync(int id)
		{
			var entity = await GetByIdAsync(id);

			if (entity is null)
            	return;

			var checkDeleteItem = await CanDeleteItemAsync(id);
			if (!checkDeleteItem.IsValid)
				throw new InvalidOperationException($"Este item não pode ser excluído. {checkDeleteItem.ErrorMessage}".Trim());

			if (entity is EntityBase baseEntity)
			{
				baseEntity.IsDeleted = true;
				baseEntity.LastUpdate = DateTime.UtcNow;
				_dbSet.Update(entity);
			}
		}

		protected abstract Task<CheckDeleteItem> CanDeleteItemAsync(int id);
	}
}
