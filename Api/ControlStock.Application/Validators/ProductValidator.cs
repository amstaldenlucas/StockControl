using ControlStock.Application.DTOs;
using FluentValidation;

namespace ControlStock.Application.Validators
{
	public class ProductValidator : AbstractValidator<ProductDto>
	{
		public ProductValidator()
		{
			RuleFor(x => x.Name)
				.NotEmpty()
				.WithMessage("O nome é obrigatório.");
		}
	}
}
