using ControlStock.Data;
using Microsoft.EntityFrameworkCore;

namespace ControlStockApi.Configuration
{
	public static class DbConfiguration
	{
		public static void InitializeDatabase(WebApplication app)
		{
			using var scope = app.Services.CreateScope();
			{
				ApplyMigrations(scope);
				WarmUpDatabase(scope);
			}
		}

		private static void ApplyMigrations(IServiceScope scope)
		{
			var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
			db.Database.Migrate();
		}

		private static void WarmUpDatabase(IServiceScope scope)
		{
			var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

			context.Database.CanConnect();
			// await context.Produtos.AnyAsync(); // opcional: força query real
		}
	}
}
