using AutoMapper;
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces;
using ControlStock.Core.Interfaces.Repositories;
using ControlStock.Data;

namespace ControlStock.Application.Services
{
	public abstract class CrudServiceBase<TEntity, TDto> : ICrudService<TDto> where TEntity : EntityBase where TDto : class
	{
		protected readonly IRepositoryBase<TEntity> _repository;
		protected readonly AppDbContext _context;
		protected readonly IMapper _mapper;

		protected CrudServiceBase(IRepositoryBase<TEntity> repository, AppDbContext context, IMapper mapper)
		{
			_repository = repository;
			_context = context;
			_mapper = mapper;
		}

		public virtual async Task<TDto> CreateAsync(TDto dto)
		{
			var entity = _mapper.Map<TEntity>(dto);

			await _repository.AddAsync(entity);
			await _context.SaveChangesAsync();

			return _mapper.Map<TDto>(entity);
		}

		public virtual async Task<TDto?> GetByIdAsync(int id)
		{
			var entity = await _repository.GetByIdAsync(id);
			return _mapper.Map<TDto>(entity);
		}

		public virtual async Task<IEnumerable<TDto>> GetAllAsync()
		{
			var entities = await _repository.GetAllAsync();
			return _mapper.Map<List<TDto>>(entities);
		}

		public async Task<bool> UpdateAsync(int id, TDto dto)
		{
			var entity = _mapper.Map<TEntity>(dto);

			await _repository.UpdateAsync(entity);
			await _context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			await _repository.DeleteAsync(id);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
