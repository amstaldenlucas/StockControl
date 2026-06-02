"use client"; // Obrigatório para usar hooks de navegação

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BtnVoltar() {
  const pathname = usePathname(); // Pega a URL atual, ex: "/dashboard/configuracoes/perfil"

  // Remove o último segmento da URL
  const segmentos = pathname.split("/").filter(Boolean);
  segmentos.pop(); // Remove "perfil"
  
  // Monta a nova URL. Se estiver na home, volta para "/"
  const urlPai = "/" + segmentos.join("/"); 

  return (
    <Link
        className="bg-gray-600 text-white px-2 py-1 mr-4 rounded hover:bg-gray-700"
        href={urlPai}
    >Voltar</Link>
  );
}