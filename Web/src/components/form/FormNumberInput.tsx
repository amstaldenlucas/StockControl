"use client";

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import Label from "@/components/form/Label";

type PriceMode = "cents" | "integer";

interface FormNumberInputProps<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput
> {
  label: string;
  name: Path<TInput>;
  form: UseFormReturn<TInput, unknown, TOutput>;
  mode?: PriceMode;
}

export function FormNumberInput<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput
>({
  label,
  name,
  form,
  mode = "cents",
}: FormNumberInputProps<TInput, TOutput>) {
  const inputRef = useRef<HTMLInputElement>(null);

  function formatValue(value: number) {
    if (mode === "integer") {
      return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 0,
      }).format(value);
    }

    // cents
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function parseValue(raw: string) {
    const onlyNumbers = raw.replace(/\D/g, "");
    if (!onlyNumbers) return 0;

    if (mode === "integer") {
      return Number(onlyNumbers);
    }

    // cents
    return Number(onlyNumbers) / 100;
  }

  function forceCursorToEnd() {
    const input = inputRef.current;
    if (!input) return;
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const safeValue =
          typeof field.value === "number" ? field.value : 0;

        return (
          <div>
            <Label>{label}</Label>

            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              // className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm text-right"
              className="text-right h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 mt-1.5 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              placeholder={mode === "integer" ? "0" : "0,00"}
              value={formatValue(safeValue)}
              onFocus={forceCursorToEnd}
              onClick={forceCursorToEnd}
              onChange={(e) => {
                const parsed = parseValue(e.target.value);
                field.onChange(parsed);
              }}
            />

            {fieldState.error && (
              <p className="text-red-500 text-sm">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}