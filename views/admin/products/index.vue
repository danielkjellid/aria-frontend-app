<script setup lang="ts">
import { ButtonProps } from '~~/components/Button/index.vue'

import { PagedProductInternalListOutput, ApiError } from '~~/@types/'
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

const productToBeDeleted = ref<number>(null)

const productDeleteModalActive = ref<boolean>(false)

const prepareProductDelete = (id: number) => {
  productToBeDeleted.value = id
  productDeleteModalActive.value = true
}

/*****************
 ** State: forms **
 *****************/

const formSubmissionState = ref<ButtonProps['loadingState']>('initial')

const newProduct = reactive({
  name: null,
  supplier: null,
  categories: null,
  status: null,
  slug: null,
  searchKeywords: null,
  description: null,
  unit: null,
  vatRate: 0.25,
  availableInSpecialSizes: false,
  colors: null,
  shapes: null,
  materials: null,
  rooms: null,
  absorption: null,
  displayPriceToCustomer: false,
  canBePurchasedOnline: false,
  canBePickedUp: false,
})

const newProductImages = ref([])

const newProductFiles = ref([])

const newProductOptions = ref([])

/*******************
 ** State: errors **
 *******************/

const error = ref<ApiError | null>(null)
const errorMessage = computed(() => (error.value.message ? error.value.message : null))

const clearError = () => {
  if (error.value) {
    error.value = null
    formSubmissionState.value = 'initial'
  }
}

const newProductModalActive = ref<boolean>(false)
</script>

<template>
  <div>
    <NuxtLayout name="admin-overview" test="Hey?">
      <template #title>
        <Text variant="title3">Produkter</Text>
      </template>
      <template #actions>
        <Button variant="secondary" @click="newProductModalActive = true">Nytt produkt</Button>
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
          <template #actions="{ item }">
            <ActionMenuSection>
              <ActionMenuItem as="NuxtLink" to="#">Gå til produkt</ActionMenuItem>
              <ActionMenuItem as="NuxtLink" to="#">Rediger produkt</ActionMenuItem>
              <ActionMenuItem as="NuxtLink" to="#">Se i front</ActionMenuItem>
            </ActionMenuSection>
            <ActionMenuSection>
              <ActionMenuItem as="button" type="button" @click="prepareProductDelete(item.id)">
                Slett produkt
              </ActionMenuItem>
            </ActionMenuSection>
          </template>
        </Table>

        <ModalDialog
          title="Er du sikker på at du vil slette produktet?"
          :active="productDeleteModalActive"
          @close="productDeleteModalActive = false"
        >
          Sletting av et produkt sletter også all tilhørende data, inkludert bilder. Slettingen vil
          ikke fjerne produktet fra tidligere bestillinger.
          <template #actions>
            <Button variant="secondary">Avbryt</Button>
            <Button variant="primaryDanger">Slett</Button>
          </template>
        </ModalDialog>

        <ModalSlideOver
          title="Legg til nytt produkt"
          :active="newProductModalActive"
          @close="newProductModalActive = false"
        >
          <CollapsableSection title="Generelt">
            <div class="space-y-5">
              <Input
                id="id_product_name"
                v-model="newProduct.name"
                label="Navn"
                required
                display-word-count
                :error="$parseApiError('name', error)"
                @input="clearError"
              />
              <Select
                id="id_supplier"
                v-model="newProduct.supplier"
                label="Leverandør"
                required
                :error="$parseApiError('supplier', error)"
                @input="clearError"
              >
                <option>X</option>
              </Select>
              <Editor
                v-model="newProduct.description"
                label="Beskrivelse"
                required
                render-as-input
                output="string"
                display-word-count
                :error="$parseApiError('description', error)"
                @input="clearError"
              />
            </div>
          </CollapsableSection>
          <CollapsableSection title="Kommersielt">
            <div class="space-y-5">
              <Checkbox
                id="id_can_be_purchased_online"
                v-model="newProduct.canBePurchasedOnline"
                label="Kan kjøpes på nett"
                help-text="Kunder kan legge inn bestilling på produktet, og få prouktet sendt hjem."
              />
              <Checkbox
                id="id_can_be_picked_up"
                v-model="newProduct.canBePickedUp"
                label="Kan hentes i butikk"
                help-text="Kunder kan legge inn klikk og hent ordre."
              />
              <Checkbox
                id="id_display_price_to_customer"
                v-model="newProduct.displayPriceToCustomer"
                label="Vis pris til kunde"
                help-text="Prisen på produktet er tilgjengelig i nettbutikken."
              />
              <Input
                id="id_vat_rate"
                v-model="newProduct.vatRate"
                label="MVA sats"
                required
                help-text="Prosentvis sats for MVA i desimalform. E.g. 0.25 for 25%."
                :error="$parseApiError('vatRate', error)"
                @input="clearError"
              />
              <Select
                id="id_unit"
                v-model="newProduct.unit"
                label="Enhet"
                required
                :error="$parseApiError('supplier', error)"
                @input="clearError"
              >
                <option>Stk</option>
                <option>m2</option>
              </Select>
            </div>
          </CollapsableSection>
          <CollapsableSection title="Bilder"> </CollapsableSection>
          <CollapsableSection title="Filer"> </CollapsableSection>
          <CollapsableSection title="Alternativer"> </CollapsableSection>
          <template #actions>
            <div class="grid grid-cols-3 gap-5">
              <Button variant="secondary" class="col-span-1">Avbryt</Button>
              <Button variant="primary" class="col-span-2">Legg til produkt</Button>
            </div>
          </template>
        </ModalSlideOver>
      </template>
    </NuxtLayout>
  </div>
</template>
