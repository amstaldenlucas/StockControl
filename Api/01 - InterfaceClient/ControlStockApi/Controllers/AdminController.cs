using ControlStock.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AdminController : ControllerBase
	{
		private readonly IAdminService _service;

		public AdminController(IAdminService service)
		{
			_service = service;
		}

		[HttpPost("reset-database{password}")]
		public async Task<IActionResult> ResetDatabase(string password)
		{
			if (password?.Equals("_AbC") != true)
				return BadRequest("Incorrect password");

			await _service.ResetDatabase();
			return Ok("Banco resetado e seed executado com sucesso.");
		}
	}
}
