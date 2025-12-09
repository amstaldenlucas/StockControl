'use client'

import Link from "next/link";
import { toastService } from "@/services/toastService";
import Clock from "@/components/Clock";
import Button from "@/components/ui/button/Button";

function handleSuccess() {
  toastService.success("Salvo com sucesso!", "O registro foi atualizado corretamente.")
}

function handleError() {
  toastService.error("Erro ao salvar", "Ocorreu um erro no servidor.");
}

export default function Toolbar() {
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

      <Clock />
    </div>
  );
}
