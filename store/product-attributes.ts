import {
  ColorListInternalOutput,
  ShapeListInternalOutput,
  SizeListInternalOutput,
  VariantListInternalOutput,
} from '~~/@types'

import { defineStore } from 'pinia'
import { internalUrls } from '~~/endpoints'

const useProductAttributesStore = defineStore('productAttributes', {
  state: () => ({
    variants: [] as VariantListInternalOutput[],
    sizes: [] as SizeListInternalOutput[],
    colors: [] as ColorListInternalOutput[],
    shapes: [] as ShapeListInternalOutput[],
  }),
  actions: {
    /************
     ** Colors **
     ************/

    async fetchColors() {
      try {
        this.colors = await performGet<ColorListInternalOutput[]>(
          internalUrls.products.colors.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getColors() {
      if (!this.colors || !this.colors.length) {
        await this.fetchColors()
        return this.colors
      }

      return this.colors
    },

    /************
     ** Shapes **
     ************/

    async fetchShapes() {
      try {
        this.shapes = await performGet<ShapeListInternalOutput[]>(
          internalUrls.products.shapes.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getShapes() {
      if (!this.shapes || !this.shapes.length) {
        await this.fetchShapes()
        return this.shapes
      }

      return this.shapes
    },

    /**************
     ** Variants **
     **************/

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
  getters: {
    getVariant:
      (state) =>
      (id: number): VariantListInternalOutput =>
        state.variants.find((variant) => variant.id === id),
  },
})

export default useProductAttributesStore
