using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;

namespace ControlStockApi.Controllers
{
	public class ProductController : BaseController<ProductDto>
	{
		private readonly IProductService _productService;

		public ProductController(IProductService productService) : base(productService)
		{
			_productService = productService;
		}
	}
}
