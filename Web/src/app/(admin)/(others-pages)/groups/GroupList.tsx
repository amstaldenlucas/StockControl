'use client'

import SkeletonList from "@/components/loading/SkeletonList";
import { useGroupListLogic } from "./logic/useGroupListLogic";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTable from "@/components/common/BasicTable";
import Button from "@/components/ui/button/Button";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { formatDateWithLocale } from "@/utils/formatters/dateFormatter";
import { Modal } from "@/components/ui/modal";

export default function GroupList() {

    const {
        groups,
        error,
        isLoading,
        ConfirmModal,
        handleDelete,
        editModalProps: { isOpen, openModal, closeModal, selectedId, setSelectedId }

    } = useGroupListLogic();

    let content;

    if (isLoading) content = <SkeletonList/>
    else if (error) content  = content = (
            <div className="text-gray-500 dark:text-gray-400">
                <div className="text-2xl">Erro ao carregar produtos</div>
                <div className="text-sm">Erro: {error.message}</div>
            </div>
        );
    else {

        const tableItems = groups!.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            createdAtFormatted: formatDateWithLocale(item.createdAt, 'pt-BR')
        }));
        
        type ProductTableItem = typeof tableItems[number];
        content = (
            <BasicTable<ProductTableItem>
                headers={["Nome", "Descrição", "Data criação", "Ações"]}
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
            <ComponentCard title="Grupos">{content}</ComponentCard>

            {ConfirmModal} 
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-2 lg:p-6 ">
                <div>Edit/create modal {selectedId}</div>
                {/* <ProductForm productId={selectedId ?? undefined} onSuccess={closeModal} /> */}
            </Modal>
        </>
    )
}