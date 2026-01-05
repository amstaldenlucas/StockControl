import { Product, ProductForm } from "@/models/product";
import { baseService } from "./baseService";

export function getProducts() {
  return baseService<Product[]>("/Product/GetAllWithGroup", "GET");
}

export function getProductById(id: number) {
  return baseService<Product>(`/Product/${id}`, "GET");
}

export function createProduct(data: ProductForm) {
  // const newData = {
  //   ...data,
  //   price: Number(data.price),
  //   productGroupId: Number(data.productGroupId)
  // };

  return baseService<Product, unknown>("/Product", "POST", data);
}

export function updateProduct(id: unknown, data: ProductForm) {
  // const newData = {
  //   ...data,
  //   price: Number(data.price),
  //   productGroupId: Number(data.productGroupId)
  // };
  return baseService<Product, unknown>(`/Product/${id}`, "PUT", data);
}

export function deleteProduct(id: number) {
  return baseService<void>(`/Product/${id}`, "DELETE");
}
