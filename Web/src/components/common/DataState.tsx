import React from "react";

interface DataStateProps {
  isLoading: boolean;
  error?: Error | null;

  loading?: React.ReactNode;
  errorFallback?: React.ReactNode;

  children: React.ReactNode;
}

export default function DataState({
  isLoading,
  error,
  loading,
  errorFallback,
  children,
}: DataStateProps) {
  if (isLoading) {
    return <>{loading ?? null}</>;
  }

  if (error) {
    return (
      <>
        {errorFallback ?? (
          <div className="text-gray-500 dark:text-gray-400">
            <div className="text-2xl">Erro ao carregar dados</div>
            <div className="text-sm">Erro: {error.message}</div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}