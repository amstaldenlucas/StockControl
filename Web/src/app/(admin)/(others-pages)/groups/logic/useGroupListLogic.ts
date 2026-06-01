import useSWR, { mutate } from "swr"

import { ProductGroup } from "@/models/productGroup"
import { getProductGroups, deleteProductGroups } from "@/services/apiServices/productGroupService";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { toastService } from "@/services/toastService";

interface ProductListLogic {
    groups: ProductGroup[] | undefined;
    error: Error | undefined;
    isLoading: boolean;
    ConfirmModal: React.ReactNode;
    handleDelete: (id: number, itemDesc: string) => void;
    
    editModalProps: {
        isOpen: boolean;
        openModal: () => void;
        closeModal: () => void;
        selectedId: number | null;
        setSelectedId: (id: number | null) => void;
    };
}

const swrListName = "list_groups";

export function useGroupListLogic(): ProductListLogic {

    const { data: groups, error } = useSWR<ProductGroup[]>(
        swrListName,
        getProductGroups
    );

    const { isOpen, openModal, closeModal } = useModal();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { confirmModal, ConfirmModal } = useConfirmModal();


    
    function handleDelete(id: number, itemDesc: string) {
        confirmModal({
            title: `Excluir grupo ${itemDesc}?`,
            message: "Essa ação é irreversível.",
            onConfirm: () => {
                deleteProductGroups(id)
                    ?.then(() => {
                        mutate(swrListName);
                        toastService.success(`Produto ${itemDesc} excluído com sucesso`)
                    })
                    .catch(error  => {
                        console.error('api error:  ',  error)
                        toastService.error(`Excluir ${itemDesc}`, error.error)
                    })
            },
        });
    }

    return {
        groups,
        error,
        isLoading: !groups && !error,
        ConfirmModal,
        handleDelete,
        editModalProps: {
            isOpen,
            openModal,
            closeModal,
            selectedId,
            setSelectedId
        }
    };
}