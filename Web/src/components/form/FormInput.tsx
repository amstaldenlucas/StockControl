"use client";

import {
  FieldValues,
  Path,
  UseFormReturn
} from "react-hook-form";
import Label from "@/components/form/Label";

interface FormInputProps<TForm extends FieldValues> {
  label: string;
  name: Path<TForm>;
  form: UseFormReturn<TForm>;
}

export function FormInput<TForm extends FieldValues>({
  label,
  name,
  form,
}: FormInputProps<TForm>) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      <Label>{label}</Label>

      <input
        type="text"
        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 mt-1.5 text-xs bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
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
