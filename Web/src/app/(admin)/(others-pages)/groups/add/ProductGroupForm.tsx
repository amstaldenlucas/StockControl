'use client';

import ComponentCard from '@/components/common/ComponentCard';
import SkeletonForm from "@/components/loading/SkeletonForm";

import { FormInput } from '@/components/form/FormInput';
import { useProductFormLogic } from '../logic/useGroupFormLogic'
interface ProductGroupFormProps {
    groupId?: number;
    onSuccess?: () => void;
}

export default function ProductGroupForm({ groupId, onSuccess }: ProductGroupFormProps) {
    
    const { 
            form, 
            isLoadingData, 
            isSubmitting, 
            error, 
            serverError, 
            success, 
            onSubmit 
        } = useProductFormLogic({ groupId, onSuccess });
    

    if (isLoadingData) return <SkeletonForm />;
    if (error) return <p>Erro ao carregar grupo.</p>;

    return (
        <ComponentCard title="Grupo">
            <form onSubmit={onSubmit}>
                <div className="space-y-4"
                >
                    <FormInput form={form}
                        label='Nome'
                        name='name'
                    />

                    <FormInput form={form}
                        label='Descrição'
                        name='description'
                    />

                
                    {serverError && <p className="text-red-600 text-sm mt-2">{serverError}</p>}
                    {success && <p className="text-green-600 text-sm mt-2">Grupo cadastrado!</p>}

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