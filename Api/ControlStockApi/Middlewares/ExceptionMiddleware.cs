using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStockApi.Exceptions;
using System.Text.Json;

namespace ControlStockApi.Middlewares
{
	public class ExceptionMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<ExceptionMiddleware> _logger;
		private readonly IServiceScopeFactory _scopeFactory;

		public ExceptionMiddleware(
			RequestDelegate next,
			ILogger<ExceptionMiddleware> logger,
			IServiceScopeFactory scopeFactory)
		{
			_next = next;
			_logger = logger;
			_scopeFactory = scopeFactory;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, ex.Message);

				_ = Task.Run(() => SaveErrorAsync(ex, context));
				await HandleExceptionAsync(context, ex);
			}
		}

		private async Task SaveErrorAsync(Exception ex, HttpContext context)
		{
			using var scope = _scopeFactory.CreateScope();
			var repo = scope.ServiceProvider.GetRequiredService<IErrorLogService>();

			var log = new ErrorLog
			{
				Message = ex.Message,
				StackTrace = ex.StackTrace ?? "",
				Path = context.Request.Path,
				Method = context.Request.Method
			};

			await repo.SaveAsync(log);
		}

		private static Task HandleExceptionAsync(HttpContext context, Exception ex)
		{
			context.Response.ContentType = "application/json";

			context.Response.StatusCode = ex switch
			{
				ArgumentException => StatusCodes.Status400BadRequest,
				KeyNotFoundException => StatusCodes.Status404NotFound,
				UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
				_ => StatusCodes.Status500InternalServerError
			};

			var response = new ResponseException(context.Response.StatusCode, ex.Message);

			return context.Response.WriteAsync(
				JsonSerializer.Serialize(response)
			);
		}
	}
}
