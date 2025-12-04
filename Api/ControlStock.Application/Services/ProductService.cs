using AutoMapper;
using ControlStock.Application.DTOs;
using ControlStock.Application.Interfaces;
using ControlStock.Core.Entities;
using ControlStock.Core.Interfaces;
using ControlStock.Core.Interfaces.Repositories;
using ControlStock.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControlStock.Application.Services
{
	public class ProductService : CrudServiceBase<Product, ProductDto>, IProductService
	{
		public ProductService(IProductRepository repository, AppDbContext context, IMapper mapper)
			: base(repository, context, mapper)
		{
		}
	}
}
