import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const productSchema = z.object({
  
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional().or(z.literal("")),

  // price: z
  //   .string()
  //   .min(1, "O valor é obrigatório")
  //   .transform((v) => Number(v.replace(",", ".")))
  //   .refine((n) => !isNaN(n), "Informe um valor válido")
  //   .refine((n) => n >= 5.5, "O valor mínimo é 5.50"),

  price: z
    .number({error: "O valor é obrigatório"})
    .min(5.5, "O valor mínimo é 5.50"),

  productGroupId: z
    .string()
    .min(1, "O campo é obrigatório")
    .transform((v) => Number(v))
    .refine((n) => !isNaN(n), "Informe um grupo válido"),
});



export type FormInput = z.input<typeof productSchema>;
export type FormOutput = z.output<typeof productSchema>;

export function CreateProductForm() {
  return useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(productSchema),
  });
}