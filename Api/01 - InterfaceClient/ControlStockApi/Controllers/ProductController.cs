using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlStockApi.Controllers
{
	public class ProductController : BaseController<ProductDto>
	{
		public ProductController(IProductService service) : base(service)
		{
		}
	}
}
