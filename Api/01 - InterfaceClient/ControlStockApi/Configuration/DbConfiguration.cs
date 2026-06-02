using ControlStock.Core.Interfaces;
using ControlStock.Data;
using Microsoft.EntityFrameworkCore;

namespace ControlStockApi.Configuration
{
	public static class DbConfiguration
	{
		public static async Task InitializeDatabase(WebApplication app)
		{
			using var scope = app.Services.CreateScope();
			{
				await ApplyMigrations(scope);
				await WarmUpDatabase(scope);
				await SeedDatabase(scope);
			}
		}

		private static async Task ApplyMigrations(IServiceScope scope)
		{
			var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
			await db.Database.MigrateAsync();
		}

		private static async Task WarmUpDatabase(IServiceScope scope)
		{
			var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

			await context.Database.CanConnectAsync();
			// await context.Produtos.AnyAsync(); // opcional: força query real
		}

		private static async Task SeedDatabase(IServiceScope scope)
		{
			var seeder = scope.ServiceProvider.GetRequiredService<IDatabaseSeeder>();
			await seeder.SeedAsync();
		}
	}
}
