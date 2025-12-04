using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using ControlStockApi.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[ProducesResponseType(typeof(ErrorLogDto), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ResponseException), StatusCodes.Status500InternalServerError)]
	public class ErrorLogController : ControllerBase
	{
		private readonly IErrorLogService _service;

		public ErrorLogController(IErrorLogService service)
		{
			_service = service;
		}

		[HttpGet("GetLastErrors{qtdError}")]
		public async Task<IActionResult> GetLastErrors(int qtdError = 50)
		{
			return Ok(await _service.GetLastErrors(qtdError));
		}
	}
}
