using ControlStock.Application.DTOs;
using FluentValidation;

namespace ControlStock.Application.Validators
{
	public class ProductGroupValidator : AbstractValidator<ProductGroupDto>
	{
		public ProductGroupValidator()
		{
			RuleFor(x => x.Name)
				.NotEmpty()
				.WithMessage("O nome é obrigatório.");
		}
	}
}
