  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";


  export const productSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    
    description: z
      .string()
      .optional()
      .or(z.literal("")), // permite string vazia

    price: z.string()
      .min(1, "O valor é obrigatório")
      .transform((v) => Number(v.replace(",", ".")))
      .refine((n) => !isNaN(n), "Informe um valor válido")
      .refine((n) => n >= 5.5, "O valor mínimo é 5.50")
      .transform((v) => String(v)),

    productGroupId: z.string()
      .min(1, "O campo é obrigatório")
      .transform((v) => Number(v.replace(",", ".")))
      .refine((n) => !isNaN(n), "Informe um grupo válido")
      .transform((v) => String(v)),
    
  });

  export type FormSchema = z.infer<typeof productSchema>;

  export function CreateProductForm() {
    return useForm<FormSchema>({
      resolver: zodResolver(productSchema),
    });
  }
