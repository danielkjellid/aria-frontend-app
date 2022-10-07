interface ProductOptionSize {
  height?: string | number
  width?: string | number
  depth?: string | number
  circumference?: string | number
}

export interface ProductOption {
  status: string
  price: number
  size: ProductOptionSize
  variantId: number
}
