"use client";

import useSWR, { mutate } from "swr";
import { getProductById, createProduct, updateProduct } from "@/services/apiServices/productService";
import { getProductGroups } from "@/services/apiServices/productGroupService";
import { CreateProductForm, FormSchema } from "./productFormSetup";
import { useState, useEffect } from "react";
import { toastService } from "@/services/toastService";
import { useRouter } from "next/navigation";
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import { ChevronDownIcon } from "@/icons";
import SkeletonForm from "@/components/loading/SkeletonForm";

interface ProductFormProps {
  productId?: number;
  onSuccess?: () => void;
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
  const form = CreateProductForm();
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = form;

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const { data: groups } = useSWR("product_groups", getProductGroups);

  const { data: product, error, isLoading } = useSWR(
    productId ? ["product", productId] : null,
    () => getProductById(productId!));

  useEffect(() => {
    if (!product) return;

    const values: FormSchema = {
      name: product.name,
      price: String(product.price),
      productGroupId: String(product.productGroupId)
    };

    reset(values);
  }, [product, reset]);

  const onSubmit = async (data: FormSchema) => {
    setServerError(null);
    setSuccess(false);

    try {
      if (productId) {
        await updateProduct(productId, data);
        toastService.success("Produto atualizado com sucesso!");

        mutate("list_products");
        onSuccess?.();
      } else {
        await createProduct(data);
        toastService.success("Produto cadastrado com sucesso!");
      }

      router.push("/products");

      setSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar o produto";
      toastService.error(msg);
      setServerError(msg);
    }
  };

  if (isLoading) return <SkeletonForm />;
  if (error) return <p>Erro ao carregar produto.</p>;

  return (
    <ComponentCard title="Produto">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-4">
            {createInput("Nome", "name")}
            {createInput("Valor", "price")}

            {createInputSelect(
                "Grupo do Produto",
                "productGroupId",
                groups?.map(g => ({ id: g.id, value: g.name })) ?? []
            )}
          
            {serverError && <p className="text-red-600 text-sm mt-2">{serverError}</p>}
            {success && <p className="text-green-600 text-sm mt-2">Produto cadastrado!</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
    </ComponentCard>
  );

  function createInput(labelName: string, propName: keyof FormSchema) {
    return (
      <div>
        <Label>{labelName}</Label>
        <input
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 mt-1.5 text-xs bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
          type="text"
          {...register(propName)}
        />
        {errors[propName] && (
          <p className="text-red-500 text-sm">{errors[propName]?.message?.toString()}</p>
        )}
      </div>
    );
  }

  function createInputSelect(labelName: string, propName: keyof FormSchema, items: {id: number | string, value: string}[]) {
    return (
      <div>
        <label className="block mb-1">{labelName}</label>
        <div className="relative">
        <select
          {...register(propName)}
          className="h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        >
          <option value="">Selecione...</option>
          {items.map((item, i) => <option key={i} value={item.id}>{item.value}</option>)}
        </select>
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
        {errors[propName] && (
          <p className="text-red-500 text-sm">
            {errors[propName]?.message?.toString()}
          </p>
        )}
        </div>
      </div>
    )
  }
}
