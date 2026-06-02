import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductGroupForm from "../components/ProductGroupForm";

export default function page() {
    return (
        <>
            <PageBreadcrumb pageTitle="Novo Grupo" />
            <ProductGroupForm />
        </>
    )
}