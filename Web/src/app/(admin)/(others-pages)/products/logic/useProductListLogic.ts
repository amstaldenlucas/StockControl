import useSWR, { mutate } from "swr";
import { useState } from "react";

import { Product } from "@/models/product";
import { getProducts, deleteProduct } from "@/services/apiServices/productService";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { toastService } from "@/services/toastService";
import { useModal } from "@/hooks/useModal";

interface ProductListLogic {
    products: Product[] | undefined;
    errorGetProducts: Error | undefined;
    isLoadingProducts: boolean;
    
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


export function useProductListLogic(): ProductListLogic {
    const { data: products, error: errorGetProducts, isLoading: isLoadingProducts } = useSWR<Product[]>(
        "list_products",
        getProducts
    );

    const { isOpen, openModal, closeModal } = useModal();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { confirmModal, ConfirmModal } = useConfirmModal();

    function handleDelete(id: number, itemDesc: string) {
        confirmModal({
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
        errorGetProducts,
        isLoadingProducts,
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