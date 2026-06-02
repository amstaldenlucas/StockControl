'use client'

import ComponentCard from "@/components/common/ComponentCard";
import BasicTable from "@/components/common/BasicTable";
import SkeletonList from "@/components/loading/SkeletonList";
import { formatDateWithLocale } from "@/utils/formatters/dateFormatter"
import { PencilIcon, TrashBinIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import ProductForm from "../components/ProductForm";
import { useProductListLogic } from "../hooks/useProductListLogic"; // IMPORTANTE: O NOVO HOOK
import DataState from "@/components/common/DataState";

export default function ProductList() {
    // 1. CHAMA O HOOK PARA OBTER TODA A LÓGICA E DADOS
    const { 
        products, 
        error, 
        isLoading,
        handleDelete,
        editModalProps: { isOpen, openModal, closeModal, selectedId, setSelectedId }
    } = useProductListLogic();

    const tableItems = products?.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        groupName: item.groupName,
        createdAtFormatted: formatDateWithLocale(item.createdAt, 'pt-BR')
    })) ?? [];

    type ProductTableItem = typeof tableItems[number];

    return (
        <>
            <ComponentCard title="Produtos">
                <DataState loading={<SkeletonList numberLines={5} />}
                    isLoading={isLoading}
                    error={error}
                >
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
                </DataState>
            </ComponentCard>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-2 lg:p-6 ">
                <ProductForm productId={selectedId ?? undefined} onSuccess={closeModal} />
            </Modal>
        </>
    );
}