using ControlStock.Application.DTOs;
using ControlStock.Core.Interfaces;

namespace ControlStockApi.Controllers
{
	public class ProductGroupController : BaseController<ProductGroupDto>
	{
		public ProductGroupController(ICrudService<ProductGroupDto> service) : base(service)
		{
		}
	}
}
