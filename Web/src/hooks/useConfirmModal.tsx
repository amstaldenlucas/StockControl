
"use client";

import { useState, ReactNode } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

interface ConfirmOptions {
  title?: string;
  message?: string;
  onConfirm?: () => void | Promise<void>;
}

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  function confirmModal(opts: ConfirmOptions) {
    setOptions(opts);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  async function handleConfirm() {
    if (options.onConfirm)await options.onConfirm();
    close();
  }

  const ConfirmModal: ReactNode = (
    <Modal
      isOpen={isOpen}
      onClose={close}
      className="max-w-[507px] p-6 lg:p-10"
      showCloseButton={false}
    >
      <div className="text-center">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {options.title ?? "Tem certeza?"}
        </h4>

        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          {options.message ?? "Essa ação não poderá ser desfeita."}
        </p>

        <div className="flex items-center justify-center w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleConfirm} className="bg-red-600 hover:bg-red-800">
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );

  return { confirmModal, ConfirmModal };
}
