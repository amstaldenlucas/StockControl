using ControlStock.Data;
using Microsoft.EntityFrameworkCore;

namespace ControlStockApi.Configuration
{
	public static class DbConfiguration
	{
		public static void ApplyMigrations(WebApplication app)
		{
			using (var scope = app.Services.CreateScope())
			{
				var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
				db.Database.Migrate();
			}
		}
	}
}
