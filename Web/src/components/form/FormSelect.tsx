"use client";

import {
  FieldValues,
  Path,
  UseFormReturn
} from "react-hook-form";
import Label from "@/components/form/Label";
import { ChevronDownIcon } from "@/icons";

interface FormInputProps<TInput extends FieldValues, TOutput extends FieldValues = TInput> {
    label: string;
    name: Path<TInput>;
    form: UseFormReturn<TInput, unknown, TOutput>;
    options: {id: number | string, value: string}[];
}

export function FormSelect<TInput extends FieldValues, TOutput extends FieldValues = TInput>({
    form,
  label,
  name,
  options
}: FormInputProps<TInput, TOutput>) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
        <Label className="block mb-1">{label}</Label>
        <div className="relative">
        <select
            {...register(name)}
            className="h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        >
            <option value="">Selecione...</option>
            {options.map((item, i) => <option key={i} value={item.id}>{item.value}</option>)}
        </select>
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon/>
        </span>
        {errors[name] && (
            <p className="text-red-500 text-sm">
                {errors[name]?.message?.toString()}
            </p>
        )}
        </div>
</div>
  );
}
