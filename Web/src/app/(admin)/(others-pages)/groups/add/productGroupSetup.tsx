import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const productGroupSchema = z.object({
  
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional().or(z.literal("")),
});

export type FormInput = z.input<typeof productGroupSchema>;
export type FormOutput = z.output<typeof productGroupSchema>;

export function CreateProductGroupForm() {
  return useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(productGroupSchema),
  });
}