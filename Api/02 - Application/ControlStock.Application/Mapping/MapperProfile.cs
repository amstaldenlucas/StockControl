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
			
			CreateMap<Product, ProductDto>()
				.ForMember(dest => dest.GroupName,
					opt => opt.MapFrom(src => src.Group.Name))
			.ReverseMap()
			.ForMember(dest => dest.Group, opt => opt.Ignore());


			CreateMap<ProductGroup, ProductGroupDto>().ReverseMap();
		}
	}
}
