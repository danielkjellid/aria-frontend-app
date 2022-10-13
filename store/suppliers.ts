import { SupplierListInternalOutput } from '~~/@types'
import { defineStore } from 'pinia'
import { internalUrls } from '~~/endpoints'

const useSuppliersStore = defineStore('suppliersStore', {
  state: () => ({
    suppliers: [] as SupplierListInternalOutput[],
  }),
  actions: {
    async fetchSuppliersInternal() {
      try {
        this.suppliers = await performGet<SupplierListInternalOutput[]>(
          internalUrls.suppliers.list()
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getSuppliersInternal() {
      if (!this.suppliers || !this.suppliers.length) {
        await this.fetchSuppliers()
        return this.suppliers
      }

      return this.suppliers
    },
  },
})

export default useSuppliersStore
