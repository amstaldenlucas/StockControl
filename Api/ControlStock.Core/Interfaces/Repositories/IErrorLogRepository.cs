using ControlStock.Core.Entities;

namespace ControlStock.Core.Interfaces.Repositories
{
	public interface IErrorLogRepository
	{
		Task SaveAsync(ErrorLog log);
		Task<IEnumerable<ErrorLog>> GetLastErrors(int qtd = 50);
	}
}
