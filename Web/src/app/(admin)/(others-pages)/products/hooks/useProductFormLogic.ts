import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toastService } from "@/services/toastService";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "@/services/apiServices/productService";
import { getProductGroups } from "@/services/apiServices/productGroupService";

import {
  CreateProductForm,
  FormInput,
  FormOutput,
} from "../schema/productFormSetup";

import { ProductGroup } from "@/models/productGroup";

// Define o que o hook irá retornar
interface ProductFormLogic {
  form: ReturnType<typeof CreateProductForm>;
  groups: { id: number | string; value: string }[];
  isLoadingData: boolean;
  isSubmitting: boolean;
  error: Error | undefined;
  serverError: string | null;
  success: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface UseProductFormLogicProps {
  productId?: number;
  onSuccess?: () => void;
}

export function useProductFormLogic({
  productId,
  onSuccess,
}: UseProductFormLogicProps): ProductFormLogic {
  const form = CreateProductForm();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { data: groupsData } = useSWR<ProductGroup[]>(
    "product_groups",
    getProductGroups
  );

  const groups = groupsData?.map((g) => ({ id: g.id, value: g.name })) ?? [];

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    productId ? ["product", productId] : null,
    () => getProductById(productId!)
  );

  useEffect(() => {
    if (!product) return;

    const values: FormInput = {
      name: product.name,
      price: product.price,
      productGroupId: String(product.productGroupId),
    };

    reset(values);
  }, [product, reset]);

  const onSubmit = async (data: FormOutput) => {
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
        router.push("/products");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro ao salvar o produto";
      toastService.error(msg);
      setServerError(msg);
    }
  };

  return {
    form,
    groups,
    isLoadingData: isLoading,
    isSubmitting,
    error,
    serverError,
    success,
    onSubmit: handleSubmit(onSubmit),
  };
}
