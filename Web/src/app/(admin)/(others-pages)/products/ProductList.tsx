'use client'

import useSWR, { mutate } from "swr";

import ComponentCard from "@/components/common/ComponentCard";
import BasicTable from "@/components/common/BasicTable";
import SkeletonList from "@/components/loading/SkeletonList";
import { getProducts, deleteProduct } from "@/services/apiServices/productService";
import { Product } from "@/models/product";
import { formatDateWithLocale } from "@/utils/dateFormatter"
import { PencilIcon, TrashBinIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import ProductForm from "./add/ProductForm";
import { useState } from "react";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { toastService } from "@/services/toastService";

export default function ProductList() {
  const { data: products, error, isLoading } = useSWR<Product[]>(
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

  let content;

  if (isLoading) {
    content = <SkeletonList numberLines={5} />;
  } else if (error) {
    content = (
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl">Erro ao carregar produtos</div>
        <div className="text-sm">Erro: {error.message}</div>
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
                setSelectedId(item.id);
                openModal();
              }}
            >
              <PencilIcon />
            </Button>

            {<Button size="sm"
              className="!p-2 bg-transparent hover:bg-gray-300/30"
              onClick={() => handleDelete(item.id, item.name)}>
              <TrashBinIcon className="text-red-500" />
            </Button>}
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
        {/* Quando selectedId existe → edição */}
        <ProductForm productId={selectedId ?? undefined} onSuccess={closeModal}  />
      </Modal>
    </>
  );
}
