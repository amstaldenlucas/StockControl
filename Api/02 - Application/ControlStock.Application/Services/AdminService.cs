using ControlStock.Application.Interfaces;
using ControlStock.Core.Interfaces;
using ControlStock.Data;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Application.Services
{
	public class AdminService : IAdminService
	{
		private readonly AppDbContext _context;
		private readonly IDatabaseSeeder _seeder;

		public AdminService(AppDbContext context, IDatabaseSeeder seeder)
		{
			_context = context;
			_seeder = seeder;
		}

		public async Task<bool> ResetDatabase()
		{
			try
			{
				await _context.Database.EnsureDeletedAsync();
				await _context.Database.MigrateAsync();
				await _seeder.SeedAsync();

				return true;
			}
			catch (Exception ex)
			{
				throw;
			}
		}
	}
}
