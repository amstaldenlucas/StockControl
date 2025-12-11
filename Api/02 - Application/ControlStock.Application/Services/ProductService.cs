using AutoMapper;
using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces.Repositories;
using ControlStock.Data;

namespace ControlStock.Application.Services
{
	public class ProductService : CrudServiceBase<Product, ProductDto>, IProductService
	{
		private readonly IProductRepository _productRepository;
		public ProductService(IProductRepository repository, AppDbContext context, IMapper mapper)
			: base(repository, context, mapper)
        {
            _productRepository = repository;
        }

        public async Task<IEnumerable<ProductDto>> GetAllWithGroupAsync()
        {
            var data = await _productRepository.GetAllWithGroupAsync();
			return _mapper.Map<IEnumerable<ProductDto>>(data);
        }
    }
}
