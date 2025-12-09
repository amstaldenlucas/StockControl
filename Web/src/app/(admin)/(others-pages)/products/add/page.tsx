import CreateProductForm from "./ProductForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function NewProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Produto" />
      <CreateProductForm />
    </div>
  );
}
