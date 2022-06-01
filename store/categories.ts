import {
  CategoryChildrenListOutput,
  CategoryDetailOutput,
  CategoryListOutput,
  CategoryParentListOutput,
} from '~~/@types/generated/dist'

import { defineStore } from 'pinia'
import performGet from '~~/composables/performGet'

const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [], // Categories, but unknown level (could either be parent or child)
    parentCategories: [], // Only top level categories
    navbarCategories: [], // Categories used for navigation
    childCategories: [], // Only sub categories
    categoryProducts: [], // Products belonging to a sub category
  }),
  actions: {
    async fetchNavbarCategories() {
      try {
        this.navbarCategories = await performGet<CategoryListOutput[]>('categories/')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchParentCategories() {
      try {
        this.parentCategories = await performGet<CategoryParentListOutput[]>('categories/parents/')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchChildCategories(parentSlug: string) {
      try {
        const childCategories = await performGet<CategoryChildrenListOutput[]>(
          `categories/category/${parentSlug}/children/`
        )

        if (childCategories.length > 0) {
          const payload = { parentSlug, children: childCategories }

          const index = this.childCategories.findIndex(
            (category) => category.parentSlug === parentSlug
          )

          // Check if object with parent slug already exist, and replace it if it
          // does, if not, push the item to the array.
          if (index === -1) {
            this.childCategories.push(payload)
          } else {
            this.childCategories[index] = payload
          }
        } else {
          // TODO: handle error
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCategory(slug: string) {
      try {
        const category = await performGet<CategoryDetailOutput>(`categories/category/${slug}/`)

        const index = this.categories.findIndex((c) => c.slug === slug)

        // Check if object with parent slug already exist, and replace it if it
        // does, if not, push the item to the array.
        if (index === -1) {
          this.categories.push(category)
        } else {
          this.categories[index] = category
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCategoryProducts(slug: string) {
      try {
        const products = await performGet<CategoryDetailOutput[]>(
          `categories/category/${slug}/products/`
        )

        if (products.length > 0) {
          const payload = { categorySlug: slug, products }

          const index = this.categoryProducts.findIndex(
            (categoryProduct) => categoryProduct.categorySlug === slug
          )

          // Check if object with parent slug already exist, and replace it if it
          // does, if not, push the item to the array.
          if (index === -1) {
            this.categoryProducts.push(payload)
          } else {
            this.categoryProducts[index] = payload
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    getCategory: (state) => (slug: string) =>
      state.categories.find((category) => category.slug === slug),
    getChildCategories: (state) => (parentSlug: string) =>
      state.childCategories.find((category) => category.parentSlug === parentSlug),
    getCategoryProducts: (state) => (slug: string) =>
      state.categoryProducts.find((categoryProduct) => categoryProduct.categorySlug === slug),
  },
})

export default useCategoriesStore
