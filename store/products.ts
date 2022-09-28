import { ProductStatus, SizeListInternalOutput, VariantListInternalOutput } from '~~/@types'

import { defineStore } from 'pinia'
import { internalUrls } from '~~/endpoints'
import performGet from '~~/composables/performGet'

const useProductsStore = defineStore('products', {
  state: () => ({
    statuses: Object.values(ProductStatus),
    variants: [] as VariantListInternalOutput[],
    sizes: [] as SizeListInternalOutput[],
  }),
  actions: {
    async fetchVariants() {
      try {
        this.variants = await performGet<VariantListInternalOutput[]>(
          internalUrls.products.variants.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    addVariantToState(variant: VariantListInternalOutput) {
      this.variants.unshift(variant)
      return this.variants
    },
    async getVariants() {
      if (!this.variants || !this.variants.length) {
        await this.fetchVariants()
        return this.variants
      }

      return this.variants
    },
  },
  getters: {},
})

export default useProductsStore
