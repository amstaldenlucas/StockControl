using ControlStock.Application.Interfaces;
using ControlStock.Application.Mapping;
using ControlStock.Application.Services;
using ControlStock.Core.Interfaces;
using ControlStock.Core.Interfaces.Repositories;
using ControlStock.Data;
using ControlStock.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ControlStock.Infra.IoC
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, string contentRootPath)
		{
			var sqliteFolder = Path.Combine(contentRootPath, "SqliteDatabaseFiles");
			if (!Path.Exists(sqliteFolder))
				Directory.CreateDirectory(sqliteFolder);

			services.AddDbContext<AppDbContext>(options =>
				options.UseSqlite(configuration.GetConnectionString("Sqlite"))
			);

			return services;
		}

		public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddAutoMapper(typeof(MapperProfile).Assembly);
			AddDbServices(services);

			services.AddScoped<IErrorLogService, ErrorLogService>();
			services.AddScoped<IProductService, ProductService>();
			services.AddScoped<IProductGroupService, ProductGroupService>();

			return services;
		}

		private static IServiceCollection AddDbServices(this IServiceCollection services)
		{
			services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));

			services.AddScoped<IErrorLogRepository, ErrorLogRepository>();
			services.AddScoped<IProductRepository, ProductRepository>();
			services.AddScoped<IProductGroupRepository, ProductGroupRepository>();

			return services;
		}
	}
}
