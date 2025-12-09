'use client'

import { useState, useEffect } from 'react';

const Clock = () => {
  // Estado para armazenar a string da data e hora formatada
  const [dataHora, setDataHora] = useState('');

  useEffect(() => {
    // Função para obter e formatar a data e hora
    const atualizarDataHora = () => {
      const agora = new Date();
      
      // Opções de formatação para garantir o formato 'dd/MM/yyyy HH:mm:ss' 24h
      const opcoes = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Força o formato 24h
      };

      // Obtém a string formatada
      // 'pt-BR' é usado para garantir o formato DD/MM/YYYY
      const formato = agora.toLocaleString('pt-BR', opcoes);
      
      setDataHora(formato);
    };

    // Chama a função imediatamente para a exibição inicial
    atualizarDataHora();

    // Configura um intervalo para atualizar a cada 1000ms (1 segundo)
    const intervaloId = setInterval(atualizarDataHora, 1000);

    // Função de limpeza: limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervaloId);
  }, []); // O array de dependências vazio garante que o useEffect rode apenas na montagem

  return (
    <div className="text-xl font-semibold text-gray-800 dark:text-white/90">
      {dataHora}
    </div>
  );
};

export default Clock;