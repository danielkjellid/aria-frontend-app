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

    async fetchColorsInternal() {
      try {
        this.colors = await performGet<ColorListInternalOutput[]>(
          internalUrls.products.colors.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getColorsInternal() {
      if (!this.colors || !this.colors.length) {
        await this.fetchColors()
        return this.colors
      }

      return this.colors
    },

    /************
     ** Shapes **
     ************/

    async fetchShapesInternal() {
      try {
        this.shapes = await performGet<ShapeListInternalOutput[]>(
          internalUrls.products.shapes.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getShapesInternal() {
      if (!this.shapes || !this.shapes.length) {
        await this.fetchShapes()
        return this.shapes
      }

      return this.shapes
    },

    /**************
     ** Variants **
     **************/

    async fetchVariantsInternal() {
      try {
        this.variants = await performGet<VariantListInternalOutput[]>(
          internalUrls.products.variants.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    addVariantToInternalState(variant: VariantListInternalOutput) {
      this.variants.unshift(variant)
      return this.variants
    },
    async getVariantsInternal() {
      if (!this.variants || !this.variants.length) {
        await this.fetchVariants()
        return this.variants
      }

      return this.variants
    },
  },
  getters: {
    getVariantInternal:
      (state) =>
      (id: number): VariantListInternalOutput =>
        state.variants.find((variant) => variant.id === id),
  },
})

export default useProductAttributesStore
