"use client";

import { createContext, useContext, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

interface ConfirmOptions {
  title?: string;
  message?: string;
  onConfirm?: () => void | Promise<void>;
}

interface ConfirmContextData {
  confirm: (options: ConfirmOptions) => void;
}

export const ConfirmContext = createContext<ConfirmContextData | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  function confirm(opts: ConfirmOptions) {
    setOptions(opts);
    setIsOpen(true);
  }

  async function handleConfirm() {
    if (options.onConfirm) await options.onConfirm();
    setIsOpen(false);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <ConfirmModal
        isOpen={isOpen}
        options={options}
        onConfirm={handleConfirm}
        onClose={close}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm deve estar dentro do ConfirmProvider");
  return ctx;
}
