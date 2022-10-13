<script setup lang="ts">
import { ApiError } from '~~/@types'
import { ButtonProps } from '~~/components/Button/index.vue'
import useProductAttributesStore from '~~/store/product-attributes'
import useSuppliersStore from '~~/store/suppliers'
import useCategoriesStore from '~~/store/categories'
import slugify from '~~/utils/slugify'

interface FormProductDetailProps {
  active: boolean
  existingProduct?: any // TODO: Change to actual type
}

const attributesStore = useProductAttributesStore()
const suppliersStore = useSuppliersStore()
const categoriesStore = useCategoriesStore()

const props = defineProps<FormProductDetailProps>()

const clonedProduct = { ...props.existingProduct }

const reactiveProduct = reactive({
  name: clonedProduct.name,
  supplier: clonedProduct.supplier,
  categories: clonedProduct.categories,
  status: clonedProduct.status ? clonedProduct.status : '3',
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

const suppliers = await suppliersStore.getSuppliersInternal()
const categories = await categoriesStore.getCategoriesInternal()

const createdFiles = ref([])
const createdOptions = ref([])
const createdImages = ref([])

const handleImageUpload = (files: File[]) => {
  createdImages.value = [...files]
}

const colors = await attributesStore.getColorsInternal()
const shapes = await attributesStore.getShapesInternal()

const statuses = useProductStatus()

const materials = [
  { name: 'Kompisitt', value: 'kompositt' },
  { name: 'DADOkvarts', value: 'dado kvarts' },
  { name: 'Rustfritt stål', value: 'rustfritt stål' },
  { name: 'Pusset stål', value: 'pusset stål' },
  { name: 'Metall', value: 'metall' },
  { name: 'Tre', value: 'tre' },
  { name: 'Laminat', value: 'laminat' },
  { name: 'Glass', value: 'glass' },
  { name: 'Marmor', value: 'marmor' },
]
const rooms = [
  { name: 'Bad', value: 'badrom' },
  { name: 'Kjøkken', value: 'kjøkken' },
  { name: 'Stue, gang og oppholdsrom', value: 'stue gang oppholdsrom' },
  { name: 'Uterom', value: 'uterom' },
]

// TODO: Fetch categories and suppliers through store

const slugifySupplierName = (supplierName: string, productName: string) => {
  const slug = slugify(`${supplierName} ${productName}`)
  reactiveProduct.slug = slug
}
const humanReadableSupplier = computed(() =>
  reactiveProduct.supplier && suppliers.value
    ? suppliers.value.find((obj) => obj.id === parseInt(reactiveProduct.supplier, 10)).name
    : null
)
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
            initial-option="Velg leverandør..."
            :error="$parseApiError('supplier', error)"
            @input="clearError"
          >
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
              {{ supplier.name }} {{ !supplier.isActive ? '(Inaktiv)' : '' }}
            </option>
          </Select>
          <Select id="id_status" v-model="reactiveProduct.status" label="Status">
            <option
              v-for="(value, key) in statuses"
              :key="key"
              :value="value"
              :selected="value.toString() === reactiveProduct.status"
            >
              {{ key }}
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
          <div class="flex space-x-3">
            <div class="w-full">
              <Input
                id="id_slug"
                v-model="reactiveProduct.slug"
                label="Slug"
                required
                :error="$parseApiError('slug', error)"
                @input="clearError"
              />
            </div>
            <Button
              variant="secondary"
              align-self="bottom"
              :disabled="!reactiveProduct.name || !reactiveProduct.supplier"
              @click="slugifySupplierName(humanReadableSupplier, reactiveProduct.name)"
            >
              Generer
            </Button>
          </div>
        </div>
      </CollapsableSection>
      <CollapsableSection title="Kategorier">
        <MultiSelect
          id="id_categories"
          label="Kategorier"
          help-text="Velg alle kategoriene some egner seg til produktet."
          display-field="displayName"
          value-field="id"
          :options="categories"
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
          <Input
            id="id_search_keywords"
            v-model="reactiveProduct.searchKeywords"
            label="Søkeord"
            help-text="Separer ord med mellomrom. Navn, leverandør og materiale er allerede inkludert."
            :error="$parseApiError('searchKeywords', error)"
            @input="clearError"
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Atributter">
        <div class="space-y-5">
          <MultiSelect
            id="id_colors"
            label="Farger"
            help-text="Velg alle fargene some egner seg til produktet."
            display-field="name"
            value-field="id"
            :options="colors"
            required
            multiple
          />
          <MultiSelect
            id="id_shapes"
            label="Fasonger"
            help-text="Velg alle fasongene some egner seg til produktet."
            display-field="name"
            value-field="id"
            :options="shapes"
            required
            multiple
          />
          <MultiSelect
            id="id_materials"
            label="Materialer"
            help-text="Velg alle materialene some egner seg til produktet."
            display-field="name"
            value-field="value"
            :options="materials"
            multiple
          />
          <MultiSelect
            id="id_rooms"
            label="Rom"
            help-text="Velg alle rommene some egner seg til produktet."
            display-field="name"
            value-field="value"
            :options="rooms"
            multiple
          />
          <Input
            id="id_absorption"
            v-model="reactiveProduct.absorption"
            label="Absorberingsevne"
            help-text="Gjelder kun fliser. Flisens absorberingsvene. Verdi i hele prosent - e.g. 0.5 for 0.5%"
            :error="$parseApiError('absorption', error)"
            @input="clearError"
          />
          <Checkbox
            id="id_available_in_special_sizes"
            v-model="reactiveProduct.availableInSpecialSizes"
            label="Tilgjengelig i spesialstørrelser"
            help-text="Prouktets størrelse kan tilpasses etter kundens behov."
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Bilder">
        <FileUploadInput
          type="image"
          multiple
          allow-set-primary
          :files="createdImages"
          @upload="(images) => handleImageUpload(images)"
        />
      </CollapsableSection>
      <CollapsableSection title="Filer">
        <FormProductFileBlock @update="(files) => (createdFiles = files)" />
      </CollapsableSection>
      <CollapsableSection title="Alternativer">
        <FormProductOptionBlock @update="(options) => (createdOptions = options)" />
      </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-5 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button variant="primary" class="col-span-4">Legg til produkt</Button>
        </div>
      </template>
    </ModalSlideOver>
  </div>
</template>
