using AutoMapper;
using ControlStock.Application.DTOs;
using ControlStock.Core.Entities;

namespace ControlStock.Application.Mapping
{
	public class MapperProfile : Profile
	{
		public MapperProfile()
		{
			CreateMap<ErrorLog, ErrorLogDto>().ReverseMap();
			CreateMap<Product, ProductDto>().ReverseMap();
			CreateMap<ProductGroup, ProductGroupDto>().ReverseMap();
		}
	}
}
