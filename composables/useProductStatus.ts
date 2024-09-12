import { ProductStatusEnum } from '~~/@types'

export interface Status {
  name: string
  value: string
}

const useProductStatus = (): Status[] =>
  Object.entries(
    Object.fromEntries(
      Object.entries(ProductStatusEnum).filter(([key, _val]) => Number.isNaN(Number(key)))
    )
  ).map(([name, value]) => ({ name, value: value.toString() }))

export default useProductStatus
