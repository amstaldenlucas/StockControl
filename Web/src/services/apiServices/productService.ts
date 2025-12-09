import { Product, ProductCreate } from "@/models/product";
import { baseService } from "./baseService";

export function getProducts() {
  return baseService<Product[]>("/Product/GetAll", "GET");
}

// export function obterProdutoPorId(id: number) {
//   return baseService<Produto>(`/Product/GetById/${id}`, "GET");
// }

export function createProduct(produto: ProductCreate) {
  const newObj = {...produto, price: Number(produto.price)};
  console.log('Objeto para criar: ', JSON.stringify(newObj));
  return baseService<Product, unknown>("/Product", "POST", newObj);
}

// export function atualizarProduto(id: number, produto: Produto) {
//   return baseService<Produto, Produto>(`/Product/Update/${id}`, "PUT", produto);
// }

// export function excluirProduto(id: number) {
//   return baseService<void>(`/Product/Delete/${id}`, "DELETE");
// }
