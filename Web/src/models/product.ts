export interface Product {
  id: number
  name: string
  price: number
  createdAt: Date
}

export interface ProductCreate {
  name: string
  price: string
}