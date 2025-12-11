using ControlStock.Core.Interfaces;
using ControlStockApi.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ResponseException), StatusCodes.Status500InternalServerError)]
	public abstract class BaseController<TDto> : ControllerBase where TDto : class
	{
		protected readonly ICrudService<TDto> _service;

		protected BaseController(ICrudService<TDto> service)
		{
			_service = service;
		}

		[HttpGet("GetAll")]
		public virtual async Task<ActionResult<IEnumerable<TDto>>> GetAll()
		{
			await Task.Delay(1000);
			var result = await _service.GetAllAsync();
			return Ok(result);
		}

		[HttpGet("{id}")]
		public virtual async Task<ActionResult<TDto>> GetById(int id)
		{
			await Task.Delay(1000);
			var result = await _service.GetByIdAsync(id);
			if (result == null)
				return NotFound();

			return Ok(result);
		}

		[HttpPost]
		public virtual async Task<ActionResult<TDto>> Create([FromBody] TDto dto)
		{
			var result = await _service.CreateAsync(dto);
			return Ok(result);
		}

		[HttpPut("{id}")]
		public virtual async Task<ActionResult<TDto>> Update(int id, [FromBody] TDto dto)
		{
			var result = await _service.UpdateAsync(id, dto);
			var newDto = await _service.GetByIdAsync(id);
			return Ok(newDto);
		}

		[HttpDelete("{id}")]
		public virtual async Task<ActionResult<bool>> Delete(int id)
		{
			await _service.DeleteAsync(id);
			return Ok();
		}
	}
}