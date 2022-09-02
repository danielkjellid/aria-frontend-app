import { KitchenListOutput } from '~~/@types'
import { defineStore } from 'pinia'
import { publicUrls } from '~~/endpoints'

const useKitchensStore = defineStore('kitchens', {
  state: () => ({
    kitchens: [], // All kitchens
  }),
  actions: {
    async fetchKitchens() {
      this.kitchens = await performGet<KitchenListOutput[]>(publicUrls.kitchens.list())
    },
  },
  getters: {
    getKitchens: (state) => state.kitchens,
  },
})

export default useKitchensStore
