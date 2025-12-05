using ControlStock.Application.DTOs.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ControlStockApi.Configuration
{
	public static class TokenConfiguration
	{
		public static IServiceCollection ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
		{
			var jwtConfig = SetIocJwtConfigAndReturn(services, configuration);
			
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = jwtConfig.Issuer,
					ValidAudience = jwtConfig.Audience,
					IssuerSigningKey = new SymmetricSecurityKey(
						Encoding.UTF8.GetBytes(jwtConfig.Key)
					)
				};
			});

			services.AddAuthorization();

			return services;
		}

		public static JwtConfig SetIocJwtConfigAndReturn(IServiceCollection services, IConfiguration configuration)
		{
			var jwtConfig = configuration
				.GetSection("JwtConfig")
				.Get<JwtConfig>();

			if (jwtConfig is null)
				throw new ArgumentNullException("JwtConfig not found.");

			var auth = configuration
				.GetSection("Auth")
				.Get<AuthCredentials>();

			if (auth is null)
				throw new ArgumentNullException("Auth config not found.");

			services.AddSingleton(jwtConfig);
			services.AddSingleton(auth);
			return jwtConfig;
		}
	}
}
