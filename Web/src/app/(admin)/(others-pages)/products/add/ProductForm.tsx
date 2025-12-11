'use client';

import Label from '@/components/form/Label';
import { ChevronDownIcon } from "@/icons";
import ComponentCard from '@/components/common/ComponentCard';

import { FormSchema } from "./productFormSetup";
import SkeletonForm from "@/components/loading/SkeletonForm";
import { useProductFormLogic } from "../logic/useProductFormLogic";

interface ProductFormProps {
    productId?: number;
    onSuccess?: () => void;
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
    const { 
        form, 
        groups, 
        isLoadingData, 
        isSubmitting, 
        error, 
        serverError, 
        success, 
        onSubmit 
    } = useProductFormLogic({ productId, onSuccess });

    const { register, formState: { errors } } = form;

    if (isLoadingData) return <SkeletonForm />;
    if (error) return <p>Erro ao carregar produto.</p>;

    function createInput(labelName: string, propName: keyof FormSchema) {
        return (
             <div>
                 <Label>{labelName}</Label>
                 <input
                     className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 mt-1.5 text-xs bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                     type="text"
                     {...register(propName)}
                 />
                 {errors[propName] && (
                     <p className="text-red-500 text-sm">{errors[propName]?.message?.toString()}</p>
                 )}
             </div>
        );
    }

    function createInputSelect(labelName: string, propName: keyof FormSchema, items: {id: number | string, value: string}[]) {
        return (
            <div>
                 <label className="block mb-1">{labelName}</label>
                 <div className="relative">
                 <select
                     {...register(propName)}
                     className="h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                 >
                     <option value="">Selecione...</option>
                     {items.map((item, i) => <option key={i} value={item.id}>{item.value}</option>)}
                 </select>
                 <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon/>
                 </span>
                 {errors[propName] && (
                     <p className="text-red-500 text-sm">
                         {errors[propName]?.message?.toString()}
                     </p>
                 )}
                 </div>
            </div>
        )
    }


    return (
        <ComponentCard title="Produto">
            <form onSubmit={onSubmit}>
                <div className="space-y-4">
                    {createInput("Nome", "name")}
                    {createInput("Valor", "price")}

                    {createInputSelect(
                        "Grupo do Produto",
                        "productGroupId",
                        groups
                    )}
                
                    {serverError && <p className="text-red-600 text-sm mt-2">{serverError}</p>}
                    {success && <p className="text-green-600 text-sm mt-2">Produto cadastrado!</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </ComponentCard>
    );
}