'use client'

import useSWR from "swr";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTable from "@/components/common/BasicTable";
import LoadingProducts from "./LoadingProducts";
import { getProducts } from "@/services/apiServices/productService";
import { Product } from "@/models/product";

export default function ProductList() {
  console.log('render plist')
  const { data: products, error, isLoading } = useSWR<Product[]>(
    "list_products",
    getProducts
  );

  const cardTitle = "Produtos";

  let content;

  if (isLoading) {
    content = <LoadingProducts />;
  } else if (error) {
    content = (
      <div className="text-gray-500 dark:text-gray-400">
        <div className="text-2xl">Erro ao carregar produtos</div>
        <div className="text-sm">Erro: {error.message}</div>
      </div>
    );
  } else {
    const tableItems = products!.map((item) => ({
      name: item.name,
      price: item.price,
    }));

    content = <BasicTable headers={["Nome", "Valor"]} items={tableItems} />;
  }

  return <ComponentCard title={cardTitle}>{content}</ComponentCard>;
}