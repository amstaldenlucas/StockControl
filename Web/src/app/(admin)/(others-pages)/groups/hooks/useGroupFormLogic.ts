import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toastService } from "@/services/toastService";
import {
  getProductGroupById,
  createProductGroup,
  updateProductGroup,
} from "@/services/apiServices/productGroupService";

import {
  CreateProductGroupForm,
  FormInput,
  FormOutput,
} from "../schema/productGroupSetup";


// Define o que o hook irá retornar
interface GroupFormLogic {
  form: ReturnType<typeof CreateProductGroupForm>;
  isLoadingData: boolean;
  isSubmitting: boolean;
  error: Error | undefined;
  serverError: string | null;
  success: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface UseGroupFormLogicProps {
  groupId?: number;
  onSuccess?: () => void;
}

export function useProductFormLogic({
  groupId,
  onSuccess,
}: UseGroupFormLogicProps): GroupFormLogic {
  const form = CreateProductGroupForm();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    data: group,
    error,
    isLoading,
  } = useSWR(
    groupId ? ["group", groupId] : null,
    () => getProductGroupById(groupId!)
  );

  useEffect(() => {
    if (!group) return;

    const values: FormInput = {
      name: group.name,
      description: group.description,
    };

    reset(values);
  }, [group, reset]);

  const onSubmit = async (data: FormOutput) => {
    setServerError(null);
    setSuccess(false);

    try {
      if (groupId) {
        await updateProductGroup(groupId, data);
        toastService.success("Grupo atualizado com sucesso!");
        mutate("list_groups");
        onSuccess?.();
      } else {
        await createProductGroup(data);
        toastService.success("Grupo cadastrado com sucesso!");
        router.push("/groups");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro ao salvar o gupo";
      toastService.error(msg);
      setServerError(msg);
    }
  };

  return {
    form,
    isLoadingData: isLoading,
    isSubmitting,
    error,
    serverError,
    success,
    onSubmit: handleSubmit(onSubmit),
  };
}
