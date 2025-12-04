
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data.Repositories
{
	public class ErrorLogRepository : IErrorLogRepository
	{
		private readonly AppDbContext _context;

		public ErrorLogRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<ErrorLog>> GetLastErrors(int qtd = 50)
		{
			return await _context.ErrorLogs
				.OrderByDescending(x => x.CreatedAt)
				.Take(qtd)
				.ToArrayAsync();
		}

		public async Task SaveAsync(ErrorLog log)
		{
			_context.ErrorLogs.Add(log);
			await _context.SaveChangesAsync();
		}
	}
}
