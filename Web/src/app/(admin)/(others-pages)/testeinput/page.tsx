'use client'

import { useRef, useState } from "react";

export default function Page() {
  const [value, setValue] = useState(0); // valor em centavos
  const inputRef = useRef<HTMLInputElement>(null);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }

  function forceCursorToEnd() {
    const input = inputRef.current;

    if (!input) return;
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }

  const handleFocus = () => {
      forceCursorToEnd()
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setValue(Number(onlyNumbers));
  }

  
  return (
    <div>

      <input
        ref={inputRef}
        type="text"
        value={formatCurrency(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        onClick={handleFocus}
        inputMode="numeric"
        className="border p-2 rounded w-full text-right"
        placeholder="0,00"
      />

        <label>Value: {value}</label>
      </div>
  );
}
