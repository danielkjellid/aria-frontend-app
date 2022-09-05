import {
  CategoryChildrenListOutput,
  CategoryDetailOutput,
  CategoryListOutput,
  CategoryParentListOutput,
} from '~~/@types'

import { defineStore } from 'pinia'
import performGet from '~~/composables/performGet'
import { publicUrls } from '~~/endpoints'

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
        this.navbarCategories = await performGet<CategoryListOutput[]>(publicUrls.categories.list())
      } catch (error) {
        console.log(error)
      }
    },
    async fetchParentCategories() {
      try {
        this.parentCategories = await performGet<CategoryParentListOutput[]>(
          publicUrls.categories.parentList()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async fetchChildCategories(parentSlug: string) {
      try {
        const childCategories = await performGet<CategoryChildrenListOutput[]>(
          publicUrls.categories.childrenList(parentSlug)
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
        const category = await performGet<CategoryDetailOutput>(publicUrls.categories.detail(slug))

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
  },
  getters: {
    getCategory: (state) => (slug: string) =>
      state.categories.find((category) => category.slug === slug),
    getChildCategories: (state) => (parentSlug: string) =>
      state.childCategories.find((category) => category.parentSlug === parentSlug),
  },
})

export default useCategoriesStore
