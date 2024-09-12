import {
  ColorListInternalOutput,
  MaterialListInternalOutput,
  RoomListInternalOutput,
  ShapeListInternalOutput,
  VariantListInternalOutput,
} from '~~/@types'

import { defineStore } from 'pinia'
import { internalUrls } from '~~/endpoints'

const useProductAttributesStore = defineStore('productAttributes', {
  state: () => ({
    colors: [] as ColorListInternalOutput[],
    materials: [] as MaterialListInternalOutput[],
    rooms: [] as RoomListInternalOutput[],
    shapes: [] as ShapeListInternalOutput[],
    variants: [] as VariantListInternalOutput[],
  }),
  actions: {
    /************
     ** Colors **
     ************/

    async fetchColorsInternal() {
      this.colors = await performGet<ColorListInternalOutput[]>(
        internalUrls.productAttributes.colors.list()
      )
    },
    async getColorsInternal() {
      if (!this.colors || !this.colors.length) {
        await this.fetchColorsInternal()
        return this.colors
      }

      return this.colors
    },

    /***************
     ** Materials **
     ***************/

    async fetchMaterialsInternal() {
      this.materials = await performGet<MaterialListInternalOutput[]>(
        internalUrls.productAttributes.materials.list()
      )
    },
    async getMaterialsInternal() {
      if (!this.materials || !this.materials.length) {
        await this.fetchMaterialsInternal()
        return this.materials
      }

      return this.materials
    },

    /***********
     ** Rooms **
     ***********/

    async fetchRoomsInternal() {
      this.rooms = await performGet<RoomListInternalOutput[]>(
        internalUrls.productAttributes.rooms.list()
      )
    },
    async getRoomsInternal() {
      if (!this.rooms || !this.rooms.length) {
        await this.fetchRoomsInternal()
        return this.rooms
      }

      return this.rooms
    },

    /************
     ** Shapes **
     ************/

    async fetchShapesInternal() {
      this.shapes = await performGet<ShapeListInternalOutput[]>(
        internalUrls.productAttributes.shapes.list()
      )
    },
    async getShapesInternal() {
      if (!this.shapes || !this.shapes.length) {
        await this.fetchShapesInternal()
        return this.shapes
      }

      return this.shapes
    },

    /**************
     ** Variants **
     **************/

    async fetchVariantsInternal() {
      this.variants = await performGet<VariantListInternalOutput[]>(
        internalUrls.productAttributes.variants.list()
      )
    },
    addVariantToInternalState(variant: VariantListInternalOutput) {
      this.variants.unshift(variant)
      return this.variants
    },
    async getVariantsInternal() {
      if (!this.variants || !this.variants.length) {
        await this.fetchVariantsInternal()
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
