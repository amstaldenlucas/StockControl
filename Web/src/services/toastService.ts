'use client'

import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const defaultConfig = {
  closeButton: true,
  duration: 4000
}

const toastStyles: Record<ToastType, React.CSSProperties & { [key: string]: string }> = {
  success: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
  },
    warning: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
  },
  error: {
    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
    '--normal-text': 'var(--destructive)',
    '--normal-border': 'var(--destructive)',
  },
  info: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
    '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
    '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
  },
};

export const toastService = class ToastServiceStatic {
  private static getToastAction(action?: (event: React.MouseEvent<HTMLButtonElement>) => void) {
    return {
      label: 'Fechar',
      onClick: action ? action : () => toast.dismiss(),
    };
  }

  static success(title: string, description?: string) {
    toast.success(title, { ...defaultConfig, description: description, style: toastStyles.success });
  }

  static error(title: string, description?: string) {
    toast.error(title, { ...defaultConfig, description: description, style: toastStyles.error });
  }

  static warning(title: string, description?: string) {
    toast.warning(title, { ...defaultConfig, description: description, style: toastStyles.warning });
  }

  static info(title: string, description?: string) {
    toast(title, { ...defaultConfig, description: description, style: toastStyles.info });
  }

}