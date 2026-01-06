using MapsterMapper;
using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;
using ControlStock.Data;

namespace ControlStock.Application.Services
{
	public class ProductGroupService : CrudServiceBase<ProductGroup, ProductGroupDto>, IProductGroupService
	{
        public ProductGroupService(IProductGroupRepository repository, AppDbContext context, IMapper mapper)
			: base(repository, context, mapper)
        {
        }
    }
}
