using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	public class ProductController : BaseController<ProductDto>
	{
		private readonly IProductService _productService;

		public ProductController(IProductService productService) : base(productService)
		{
			_productService = productService;
		}

		public override async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
		{
			return await base.GetAll();
		}
	}
}
