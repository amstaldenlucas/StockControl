'use client'

import Link from "next/link";
import { toastService } from "@/services/toastService";
import Clock from "@/components/Clock";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

function handleSuccess() {
  toastService.success("Salvo com sucesso!", "O registro foi atualizado corretamente.")
}

function handleError() {
  toastService.error("Erro ao salvar", "Ocorreu um erro no servidor.");
}


export default function Toolbar() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    
    <div className="pb-5 flex flex-row justify-between w-full">
      <Link
        href="/products/add"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Novo Produto
      </Link>

       <Button onClick={handleSuccess}>Toast success</Button>
       <Button onClick={handleError}>Toast error</Button>

       <Button onClick={openModal}>Open modal teste</Button>

      <Clock />
      <Modal
              isOpen={isOpen}
              onClose={closeModal}
              className="max-w-[700px] p-6 lg:p-10"
            >
              <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                <div>
                  <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                    {"Edit Event"}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Plan your next big moment: schedule or edit an event to stay on
                    track
                  </p>
                </div>
                <div className="mt-8">
                  
                  <div className="mt-6">
                    <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Event Color
                    </label>
                    
                  </div>
      
                  <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Enter Start Date
                    </label>
                    <div className="relative">
                      <input
                        id="event-start-date"
                        type="date"
                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
      
                  <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Enter End Date
                    </label>
                    <div className="relative">
                      <input
                        id="event-end-date"
                        type="date"
                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                  >
                  </button>
                </div>
              </div>
            </Modal>
    </div>
  );
}
