import { defineStore } from 'pinia'
import { performGet } from '~~/composables/performGet'

const useCategoriesStore = defineStore('categories', {
  state: () => ({
    parentCategories: null,
    navbarCategories: null,
  }),
  actions: {
    async fetchNavbarCategories() {
      try {
        this.navbarCategories = await performGet('categories/')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchParentCategories() {
      try {
        this.parentCategories = await performGet('categories/parents/')
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default useCategoriesStore
