'use client'

import ComponentCard from "@/components/common/ComponentCard";
import BasicTable from "@/components/common/BasicTable";
import SkeletonList from "@/components/loading/SkeletonList";
import { formatDateWithLocale } from "@/utils/formatters/dateFormatter"
import { PencilIcon, TrashBinIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import ProductForm from "./add/ProductForm";
import { useProductListLogic } from "./logic/useProductListLogic"; // IMPORTANTE: O NOVO HOOK

export default function ProductList() {
    // 1. CHAMA O HOOK PARA OBTER TODA A LÓGICA E DADOS
    const { 
        products, 
        errorGetProducts, 
        isLoadingProducts,
        ConfirmModal,
        handleDelete,
        editModalProps: { isOpen, openModal, closeModal, selectedId, setSelectedId }
    } = useProductListLogic();

    let content;

    if (isLoadingProducts) {
        content = <SkeletonList numberLines={5} />;
    } else if (errorGetProducts) {
        content = (
            <div className="text-gray-500 dark:text-gray-400">
                <div className="text-2xl">Erro ao carregar produtos</div>
                <div className="text-sm">Erro: {errorGetProducts.message}</div>
            </div>
        );
    } else {
        const tableItems = products!.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            groupName: item.groupName,
            createdAtFormatted: formatDateWithLocale(item.createdAt, 'pt-BR')
        }));

        type ProductTableItem = typeof tableItems[number];
        content = (
            <BasicTable<ProductTableItem>
                headers={["Nome", "Valor", "Grupo", "Data criação", "Ações"]}
                items={tableItems}

                tableControls={(item: ProductTableItem) => (
                    <div className="flex gap-2">
                        <Button
                            className="!p-2 bg-transparent hover:bg-gray-300/30"
                            onClick={() => {
                                setSelectedId(item.id); // Lógica de estado de edição
                                openModal();
                            }}
                        >
                            <PencilIcon />
                        </Button>

                        <Button size="sm"
                            className="!p-2 bg-transparent hover:bg-gray-300/30"
                            onClick={() => handleDelete(item.id, item.name)} // Lógica de deleção
                        >
                            <TrashBinIcon className="text-red-500" />
                        </Button>
                    </div>
                )}
            />
        );
    }

    return (
        <>
            <ComponentCard title="Produtos">{content}</ComponentCard>

            {ConfirmModal} 
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-2 lg:p-6 ">
                <ProductForm productId={selectedId ?? undefined} onSuccess={closeModal} />
            </Modal>
        </>
    );
}