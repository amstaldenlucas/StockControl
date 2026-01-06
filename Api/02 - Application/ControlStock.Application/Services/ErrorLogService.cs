using MapsterMapper;
using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;

namespace ControlStock.Application.Services
{
	public class ErrorLogService : IErrorLogService
	{
		protected readonly IErrorLogRepository _repository;
		protected readonly IMapper _mapper;

		public ErrorLogService(IErrorLogRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ErrorLogDto>> GetLastErrors(int qtd = 50)
		{
			var result = await _repository.GetLastErrors(qtd);
			return _mapper.Map<IEnumerable<ErrorLogDto>>(result);
		}

		public async Task SaveAsync(ErrorLog log)
		{
			await _repository.SaveAsync(log);
		}
	}
}
