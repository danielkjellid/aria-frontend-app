import { KitchenListOutput } from '~~/@types/generated/dist'
import { defineStore } from 'pinia'

const useKitchensStore = defineStore('kitchens', {
  state: () => ({
    kitchens: [], // All kitchens
  }),
  actions: {
    async fetchKitchens() {
      this.kitchens = await performGet<KitchenListOutput[]>('kitchens/')
    },
  },
  getters: {
    getKitchens: (state) => state.kitchens,
  },
})

export default useKitchensStore
