import ProductForm from "../components/ProductForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function NewProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Produto" />
      <ProductForm />
    </div>
  );
}
