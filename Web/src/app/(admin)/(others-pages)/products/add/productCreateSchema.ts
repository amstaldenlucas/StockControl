import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  
  price: z.string()
  .min(1, "O valor é obrigatório")
  .transform((v) => Number(v.replace(",", ".")))
  .refine((n) => !isNaN(n), "Informe um valor válido")
  .refine((n) => n >= 5.5, "O valor mínimo é 5.50")
  .transform((v) => String(v)),
});