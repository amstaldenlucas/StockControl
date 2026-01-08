import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  options: {
    title?: string;
    message?: string;
  };
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  isOpen,
  options,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[507px] p-6 lg:p-10"
      showCloseButton={false}
    >
      <div className="text-center">
        <h4 className="mb-2 text-2xl font-semibold">
          {options.title ?? "Tem certeza?"}
        </h4>

        <p className="text-sm text-gray-500">
          {options.message ?? "Essa ação não poderá ser desfeita."}
        </p>

        <div className="flex justify-center gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button size="sm" className="bg-red-600" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}