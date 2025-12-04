using ControlStock.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public abstract class BaseController<TDto> : ControllerBase
	where TDto : class
	{
		protected readonly ICrudService<TDto> _service;

		protected BaseController(ICrudService<TDto> service)
		{
			_service = service;
		}

		[HttpPost]
		public virtual async Task<IActionResult> Create([FromBody] TDto dto)
		{
			var result = await _service.CreateAsync(dto);
			return Ok(result);
		}

		[HttpGet("{id}")]
		public virtual async Task<IActionResult> GetById(int id)
		{
			var result = await _service.GetByIdAsync(id);
			if (result == null)
				return NotFound();

			return Ok(result);
		}

		[HttpGet]
		public virtual async Task<IActionResult> GetAll()
		{
			var result = await _service.GetAllAsync();
			return Ok(result);
		}

		[HttpPut("{id}")]
		public virtual async Task<IActionResult> Update(int id, [FromBody] TDto dto)
		{
			var result = await _service.UpdateAsync(id, dto);
			return Ok(result);
		}

		[HttpDelete("{id}")]
		public virtual async Task<IActionResult> Delete(int id)
		{
			await _service.DeleteAsync(id);
			return NoContent();
		}
	}
}