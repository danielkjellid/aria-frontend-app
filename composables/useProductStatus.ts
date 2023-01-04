import { ProductStatusEnum } from '~~/@types'

const useProductStatus = () =>
  Object.entries(
    Object.fromEntries(
      Object.entries(ProductStatusEnum).filter(([key, _val]) => Number.isNaN(Number(key)))
    )
  ).map(([name, value]) => ({ name, value: value.toString() }))

export default useProductStatus
