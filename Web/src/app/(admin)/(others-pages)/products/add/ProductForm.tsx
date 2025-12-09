"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCreateSchema } from "./productCreateSchema";
import { createProduct } from "@/services/apiServices/productService";
import { z } from "zod";
import { useState } from "react";
import { toastService } from "@/services/toastService";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof productCreateSchema>;

export default function CreateProductForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(productCreateSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setSuccess(false);

    try {
      await createProduct(data);
      router.push("/products");
      toastService.success("Produto cadastrado com sucesso!");

      setSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar o produto";
      toastService.error(msg);
      setServerError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 rounded-lg border dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold">Cadastrar Produto</h2>

      {createInput("Nome", "name")}
      {createInput("Valor", "price")}

      {serverError && <p className="text-red-600 text-sm mt-2">{serverError}</p>}
      {success && <p className="text-green-600 text-sm mt-2">Produto cadastrado!</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );

  function createInput(labelName: string, propName: keyof FormData) {
    return (
      <div>
        <label className="block mb-1">{labelName}</label>
        <input
          type="text"
          {...register(propName)}
          className="w-full rounded border p-2 dark:bg-neutral-900 dark:border-gray-700" />
        {errors[propName] && (
          <p className="text-red-500 text-sm">{errors[propName]?.message?.toString()}</p>
        )}
      </div>
    );
  }
}

