using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;

namespace ControlStockApi.Controllers
{
	public class ProductGroupController : BaseController<ProductGroupDto>
	{
		public ProductGroupController(IProductGroupService service) : base(service)
		{
		}
	}
}
