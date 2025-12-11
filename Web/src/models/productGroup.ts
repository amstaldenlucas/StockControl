export interface ProductGroup {
  id: number
  name: string
  description?: string | undefined
  createdAt: Date
}

export interface ProductGroupForm {
  name: string
  description?: string | undefined
}