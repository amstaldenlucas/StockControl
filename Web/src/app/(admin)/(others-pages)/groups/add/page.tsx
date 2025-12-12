import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductGroupForm from "./ProductGroupForm";

export default function page() {
    return (
        <>
            <PageBreadcrumb pageTitle="Novo Grupo" />
            <ProductGroupForm />
        </>
    )
}