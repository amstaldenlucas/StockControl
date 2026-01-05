export interface Product {
  id: number
  name: string
  groupName?: string | undefined
  price: number
  productGroupId: number
  createdAt: Date
}

export interface ProductForm {
  name: string
  description?: string | undefined
  price: number
  productGroupId: number
}