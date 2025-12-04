using ControlStock.Application.DTOs;
using ControlStock.Core.Interfaces;

namespace ControlStock.Application.Interfaces
{
	public interface IProductService : ICrudService<ProductDto>
	{
	}
}
