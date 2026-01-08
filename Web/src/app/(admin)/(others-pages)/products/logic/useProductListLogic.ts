import useSWR, { mutate } from "swr";
import { useState } from "react";

import { Product } from "@/models/product";
import { getProducts, deleteProduct } from "@/services/apiServices/productService";
import { toastService } from "@/services/toastService";
import { useModal } from "@/hooks/useModal";
import { useConfirm } from "@/components/confirm/useConfirm";

interface ProductListLogic {
    products: Product[] | undefined;
    error: Error | undefined;
    isLoading: boolean;
    
    handleDelete: (id: number, itemDesc: string) => void;
    
    editModalProps: {
        isOpen: boolean;
        openModal: () => void;
        closeModal: () => void;
        selectedId: number | null;
        setSelectedId: (id: number | null) => void;
    };
}


export function useProductListLogic(): ProductListLogic {
    const { data: products, error, isLoading }
        = useSWR<Product[]>("list_products",getProducts);

    const { isOpen, openModal, closeModal } = useModal();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { confirm } = useConfirm();

    function handleDelete(id: number, itemDesc: string) {
        confirm({
            title: `Excluir produto ${itemDesc}?`,
            message: "Essa ação é irreversível.",
            onConfirm: async () => {
                await deleteProduct(id);
                toastService.success(`Produto ${itemDesc} excluído com sucesso`)
                mutate("list_products"); // atualiza lista
            },
        });
    }

    return {
        products,
        error,
        isLoading,
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