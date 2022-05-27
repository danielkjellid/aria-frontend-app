import { defineStore } from 'pinia'
import { performGet } from '~~/composables/performGet'

const useCategoriesStore = defineStore('categories', {
  state: () => {
    return { navbarCategories: null }
  },
  actions: {
    async fetchNavbarCategories() {
      try {
        const categories = await performGet('categories/')
        this.categories = categories
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default useCategoriesStore
