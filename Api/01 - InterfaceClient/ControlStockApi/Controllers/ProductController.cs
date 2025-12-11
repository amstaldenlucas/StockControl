using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	public class ProductController : BaseController<ProductDto>
	{
		private readonly IProductService _productService;

		public ProductController(IProductService service) : base(service)
        {
            _productService = service;
        }

		[HttpGet("GetAllWithGroup")]
		public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllWithGroupAsync()
		{
			var result = await _productService.GetAllWithGroupAsync();
			return Ok(result);
		}
	}
}
