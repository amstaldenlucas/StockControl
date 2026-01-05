"use client";

import {
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import Label from "@/components/form/Label";

interface FormInputProps<TInput extends FieldValues, TOutput extends FieldValues = TInput> {
  label: string;
  name: Path<TInput>;
  form: UseFormReturn<TInput, unknown, TOutput>;
}

export function FormInput<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput
>({
  label,
  name,
  form,
}: FormInputProps<TInput, TOutput>) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      <Label>{label}</Label>

      <input
        type="text"
        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 mt-1.5 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        {...register(name)}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}