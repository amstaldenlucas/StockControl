import { ProductGroup, ProductGroupForm } from "@/models/productGroup";
import { baseService } from "./baseService";

export function getProductGroups() {
  return baseService<ProductGroup[]>("/ProductGroup/GetAll", "GET");
}

export function getProductGroupById(id: number) {
  return baseService<ProductGroup>(`/ProductGroup/${id}`, "GET");
}

export function createProductGroup(data: ProductGroupForm) {
  return baseService<ProductGroup, unknown>("/ProductGroup", "POST", data);
}

export function updateProductGroup(id: unknown, data: ProductGroupForm) {
  return baseService<ProductGroup, unknown>(`/ProductGroup/${id}`, "PUT", data);
}

// export function excluirProduto(id: number) {
//   return baseService<void>(`/ProductGroup/Delete/${id}`, "DELETE");
// }
