using ControlStock.Application.DTOs;
using ControlStock.Core.Entities;
using Mapster;

namespace ControlStock.Application.Mapping
{
	public class MappingRegister : IRegister
	{
		public void Register(TypeAdapterConfig config)
		{
			/*
			CreateMap<ErrorLog, ErrorLogDto>().ReverseMap();

			CreateMap<Product, ProductDto>()
				.ForMember(dest => dest.GroupName,
					opt => opt.MapFrom(src => src.Group.Name))
			.ReverseMap()
			.ForMember(dest => dest.Group, opt => opt.Ignore());

			*/

			config.NewConfig<ErrorLog, ErrorLogDto>();
			config.NewConfig<ErrorLogDto, ErrorLog>();

			config.NewConfig<ProductGroup, ProductGroupDto>();
			config.NewConfig<ProductGroupDto, ProductGroup>();


			config.NewConfig<Product, ProductDto>()
				.Map(dest => dest.GroupName, src => src.Group.Name);

			config.NewConfig<ProductDto, Product>()
				.Ignore(dest => dest.Group);

		}
	}
}
