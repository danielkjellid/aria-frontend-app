import { CategoryListOutput, KitchenListOutput, ProductListOutput } from '~~/@types'
import { IncomingMessage, ServerResponse } from 'http'

import performGet from '~~/composables/performGet'
import { publicUrls } from '~~/endpoints'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
  }

  const fetchCategoriesAndProductRoutes = async () => {
    const routes = []

    const categories = await performGet<CategoryListOutput[]>(publicUrls.categories.list())

    categories.forEach((parentCategory) => {
      routes.push(`/categories/${parentCategory.slug}/`)

      parentCategory.children.forEach((child) => {
        routes.push(`/categories/${parentCategory.slug}/${child.slug}/`)
      })
    })

    return routes
  }

  const fetchProducts = async () => {
    const routes = []

    const products = await performGet<ProductListOutput[]>(publicUrls.products.list())

    products.forEach((product) => {
      routes.push(`/products/${product.slug}/`)
    })

    return routes
  }

  const fetchKitchenRoutes = async () => {
    const routes = []

    const kitchens = await performGet<KitchenListOutput[]>(publicUrls.kitchens.list())

    kitchens.forEach((kitchen) => {
      routes.push(`/kitchens/${kitchen.slug}/`)
    })

    return routes
  }

  return [
    ...(await fetchCategoriesAndProductRoutes()),
    ...(await fetchProducts()),
    ...(await fetchKitchenRoutes()),
  ]
}
