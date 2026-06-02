'use client';

import ComponentCard from '@/components/common/ComponentCard';
import SkeletonForm from "@/components/loading/SkeletonForm";

import { useProductFormLogic } from "../hooks/useProductFormLogic";
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from "@/components/form/FormSelect";

// import { useMask } from '@react-input/mask';
// import { maskCpf } from '@/utils/maskConfigs'
import { FormNumberInput } from '@/components/form/FormNumberInput';

interface ProductFormProps {
    productId?: number;
    onSuccess?: () => void;
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {

    // const inputRef = useMask(maskCpf);

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

    if (isLoadingData) return <SkeletonForm />;
    if (error) return <p>Erro ao carregar produto.</p>;

    return (
        <ComponentCard title="Produto">
            <form onSubmit={onSubmit}>
                <div className="space-y-4"
                >
                    <FormInput form={form}
                        label='Nome'
                        name='name'
                    />

                    {/* <FormInput form={form}
                        label='Valor'
                        name='price'
                    /> */}

                    <FormNumberInput
                        label="Preço"
                        name="price"
                        // mode='integer'
                        form={form}
                    />


                    <FormSelect form={form}
                        label="Grupo do Produto"
                        name="productGroupId"
                        options={groups}
                    />

                    {/* <label>Mascara CPF</label>
                    <input type='text' ref={inputRef}></input> */}
                
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