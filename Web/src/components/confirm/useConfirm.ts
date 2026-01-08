"use client";

import { useContext } from "react";
import { ConfirmContext } from "./ConfirmProvider";

export interface ConfirmOptions {
  title?: string;
  message?: string;
  onConfirm?: () => void | Promise<void>;
}

interface UseConfirmResult {
  confirm: (options: ConfirmOptions) => void;
}

/**
 * Hook para disparar um modal de confirmação global
 * Deve ser usado dentro do ConfirmProvider
 */
export function useConfirm(): UseConfirmResult {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm deve ser usado dentro de um ConfirmProvider");
  }

  return context;
}