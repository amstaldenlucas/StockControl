using ControlStock.Application.DTOs;
using ControlStock.Core.Entities;

namespace ControlStock.Application.Interfaces
{
	public interface IErrorLogService
	{
		Task SaveAsync(ErrorLog log);
		Task<IEnumerable<ErrorLogDto>> GetLastErrors(int qtd = 50);
	}
}
