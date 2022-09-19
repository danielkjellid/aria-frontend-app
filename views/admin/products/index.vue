<script setup lang="ts">
import { PagedProductInternalListOutput } from '~~/@types/'
import { internalUrls } from '~~/endpoints'

definePageMeta({
  authRequired: true,
  staffRequired: true,
  permissionsRequired: ['has_users_export', 'has_users_list'],
  layout: false,
})

const data = ref<PagedProductInternalListOutput>(null)
const dataLoaded = computed(() => !!data.value)
const productData = computed(() => (data.value && data.value.data ? data.value.data : []))

const fetchProducts = async (url: string, noBase = false) => {
  data.value = await performGet<PagedProductInternalListOutput>(url, {}, noBase)
}

fetchProducts(internalUrls.products.list(), false)

const newPageLoading = ref<boolean>(false)

const nextPage = async () => {
  newPageLoading.value = true
  await fetchProducts(data.value.next, true)
  newPageLoading.value = false
}

const previousPage = async () => {
  newPageLoading.value = true
  await fetchProducts(data.value.previous, true)
  newPageLoading.value = false
}
</script>

<template>
  <div>
    <NuxtLayout name="admin-overview" test="Hey?">
      <template #title>
        <Text variant="title3">Produkter</Text>
      </template>
      <template #actions>
        <Button variant="secondary">Nytt produkt</Button>
      </template>
      <template #content>
        <Table
          :items-loading="dataLoaded && newPageLoading"
          :headers="[
            { label: '#', value: 'id' },
            { label: 'Name', value: 'name' },
            { label: 'Status', value: 'status' },
            { label: 'Leverandør', value: 'supplier' },
            { label: 'Enhet', value: 'unit' },
            { label: '', value: 'actions' },
          ]"
          :items="productData"
          show-search
          search-placeholder="Søk i produkter"
          show-pagination
          selectable
          :next-page-link="data.next"
          :previous-page-link="data.previous"
          :current-page="data.currentPage"
          :total-pages="data.totalPages"
          :total-objs="data.total"
          :current-range="data.currentRange"
          @next-page="nextPage"
          @previous-page="previousPage"
        >
          <template #status="{ row }">
            <Tag v-if="row.status === 'Available'" variant="green">{{ row.status }}</Tag>
            <Tag v-else-if="row.status === 'Draft'" variant="gray">{{ row.status }}</Tag>
            <Tag v-else-if="row.status === 'Hidden'" variant="blue">{{ row.status }}</Tag>
            <Tag v-else-if="row.status === 'Discontinued'" variant="red">{{ row.status }}</Tag>
          </template>
          <template #supplier="{ row }">
            {{ row.supplier.name }} {{ row.supplier.originCountryFlag }}
          </template>
          <template #unit="{ row }">
            <span v-if="row.unit === 'm2'">m<sup>2</sup></span>
          </template>
        </Table>
      </template>
    </NuxtLayout>
  </div>
</template>
