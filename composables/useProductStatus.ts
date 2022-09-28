import { ProductStatusEnum } from '~~/@types'

const useProductStatus = () =>
  Object.fromEntries(
    Object.entries(ProductStatusEnum).filter(([key, _val]) => Number.isNaN(Number(key)))
  )

export default useProductStatus
