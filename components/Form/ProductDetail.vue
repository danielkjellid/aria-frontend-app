<script setup lang="ts">
import { SupplierListInternalOutput, CategoryListInternalOutput, ApiError } from '~~/@types'
import { internalUrls } from '~~/endpoints'
import { ButtonProps } from '~~/components/Button/index.vue'
import { FormProductFileData } from '~~/components/Form/ProductFile.vue'

interface FormProductDetailProps {
  active: boolean
  existingProduct?: any // TODO: Change to actual type
}

const props = defineProps<FormProductDetailProps>()

const clonedProduct = { ...props.existingProduct }

const reactiveProduct = reactive({
  name: clonedProduct.name,
  supplier: clonedProduct.supplier,
  categories: clonedProduct.categories,
  status: clonedProduct.status,
  slug: clonedProduct.slug,
  searchKeywords: clonedProduct.searchKeywords,
  description: clonedProduct.description,
  unit: clonedProduct.unit,
  vatRate: clonedProduct.unit ? clonedProduct.unit : '0.25',
  availableInSpecialSizes: clonedProduct.availableInSpecialSizes,
  colors: clonedProduct.colors,
  shapes: clonedProduct.shapes,
  materials: clonedProduct.materials,
  rooms: clonedProduct.rooms,
  absorption: clonedProduct.absorption,
  displayPriceToCustomer: clonedProduct.displayPriceToCustomers,
  canBePurchasedOnline: clonedProduct.canBePurchasedOnline,
  canBePickedUp: clonedProduct.canBePickedUp,
})
const formSubmissionState = ref<ButtonProps['loadingState']>('initial')
const error = ref<ApiError | null>(null)

const clearError = () => {
  if (error.value) {
    error.value = null
    formSubmissionState.value = 'initial'
  }
}

interface FormProductDetailEmits {
  (e: 'close'): void
}

const emits = defineEmits<FormProductDetailEmits>()

const onClose = () => {
  emits('close')
}

const fileFormActive = ref<boolean>(false)
const filesData = ref<FormProductFileData[]>([])
const addNewFileData = (fileData: FormProductFileData) => {
  filesData.value.push(fileData)
}

const suppliers = ref<SupplierListInternalOutput[]>()
const fetchSuppliers = async () => {
  suppliers.value = await performGet<SupplierListInternalOutput[]>(internalUrls.suppliers.list())
}

fetchSuppliers()

const fetchedCategories = ref<CategoryListInternalOutput[]>()
const fetchCategories = async () => {
  fetchedCategories.value = await performGet<CategoryListInternalOutput[]>(
    internalUrls.categories.list()
  )
}

fetchCategories()
const comp = computed(() => (fetchedCategories.value ? fetchedCategories.value : []))

const optionFormActive = ref<boolean>(false)
</script>

<template>
  <div>
    <ModalSlideOver title="Legg til nytt produkt" :active="active" @close="onClose">
      <CollapsableSection title="Generelt">
        <div class="space-y-5">
          <Input
            id="id_product_name"
            v-model="reactiveProduct.name"
            label="Navn"
            required
            display-word-count
            :error="$parseApiError('name', error)"
            @input="clearError"
          />
          <Select
            id="id_supplier"
            v-model="reactiveProduct.supplier"
            label="Leverandør"
            required
            :error="$parseApiError('supplier', error)"
            @input="clearError"
          >
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
              {{ supplier.name }} {{ !supplier.isActive ? '(Inaktiv)' : '' }}
            </option>
          </Select>
          <Editor
            v-model="reactiveProduct.description"
            label="Beskrivelse"
            required
            render-as-input
            output="string"
            display-word-count
            :error="$parseApiError('description', error)"
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Kategorier">
        <MultiSelect
          id="id_categories"
          label="Kategorier"
          help-text="Velg alle kategoriene some egner seg til produktet."
          display-field="displayName"
          value-field="id"
          :options="comp"
          required
          multiple
        />
      </CollapsableSection>
      <CollapsableSection title="Kommersielt">
        <div class="space-y-5">
          <Checkbox
            id="id_can_be_purchased_online"
            v-model="reactiveProduct.canBePurchasedOnline"
            label="Kan kjøpes på nett"
            help-text="Kunder kan legge inn bestilling på produktet, og få prouktet sendt hjem."
          />
          <Checkbox
            id="id_can_be_picked_up"
            v-model="reactiveProduct.canBePickedUp"
            label="Kan hentes i butikk"
            help-text="Kunder kan legge inn klikk og hent ordre."
          />
          <Checkbox
            id="id_display_price_to_customer"
            v-model="reactiveProduct.displayPriceToCustomer"
            label="Vis pris til kunde"
            help-text="Prisen på produktet er tilgjengelig i nettbutikken."
          />
          <Select
            id="id_unit"
            v-model="reactiveProduct.unit"
            label="Enhet"
            required
            :error="$parseApiError('supplier', error)"
            @input="clearError"
          >
            <option>Stk</option>
            <option>m2</option>
          </Select>
          <Input
            id="id_vat_rate"
            v-model="reactiveProduct.vatRate"
            label="MVA sats"
            required
            help-text="Prosentvis sats for MVA i desimalform. E.g. 0.25 for 25%."
            :error="$parseApiError('vatRate', error)"
            @input="clearError"
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Bilder">
        <FileUploadInput type="image" multiple allow-set-primary />
      </CollapsableSection>
      <CollapsableSection title="Filer">
        <div class="space-y-6">
          <FileUploadUploadedBlock v-if="filesData.length">
            <FileUploadUploadedBlockFileItem
              v-for="fd in filesData"
              :key="fd.name"
              :name="fd.name"
              :file="fd.file"
              @delete="null"
            />
          </FileUploadUploadedBlock>
          <div>
            <Button variant="secondary" fluid @click="fileFormActive = true">Legg til filer</Button>
            <p class="mt-3 text-sm font-light text-gray-500">
              Legg til filer som kan hjelpe kunden å få en bedre oversikt over produktets
              egenskaper. For eksempel katalog, tekniske spesifikasjoner, bruksanvisninger osv.
            </p>
          </div>
        </div>
      </CollapsableSection>
      <CollapsableSection title="Alternativer">
        <div>
          <Button variant="secondary" fluid @click="optionFormActive = true">
            Legg til alternativer
          </Button>
          <p class="mt-3 text-sm font-light text-gray-500">
            Legg til filer som kan hjelpe kunden å få en bedre oversikt over produktets egenskaper.
            For eksempel katalog, tekniske spesifikasjoner, bruksanvisninger osv.
          </p>
        </div>
      </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-5 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button variant="primary" class="col-span-4">Legg til produkt</Button>
        </div>
      </template>
    </ModalSlideOver>

    <FormProductFile
      :active="fileFormActive"
      @close="fileFormActive = false"
      @submit="(fileData) => addNewFileData(fileData)"
    />

    <FormProductOption :active="optionFormActive" />
  </div>
</template>
