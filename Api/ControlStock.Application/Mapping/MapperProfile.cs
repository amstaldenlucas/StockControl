using AutoMapper;
using ControlStock.Application.DTOs;
using ControlStock.Core.Entities;

namespace ControlStock.Application.Mapping
{
	public class MapperProfile : Profile
	{
		public MapperProfile()
		{
			CreateMap<Product, ProductDto>().ReverseMap();
		}
	}
}
