import ProductList from "./ProductList";
import { Metadata } from "next";
import Toolbar from "./toolbar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Produtos" />
        <Toolbar/>
        <ProductList />
    </div>
  );
}