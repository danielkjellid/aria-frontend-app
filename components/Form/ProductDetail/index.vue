<script setup lang="ts">
import useProductAttributesStore from '~~/store/product-attributes'
import useSuppliersStore from '~~/store/suppliers'
import useCategoriesStore from '~~/store/categories'
import slugify from '~~/utils/slugify'
import { FormBlock } from '../types'
import { ComputedRef } from 'vue'
import { productDetailImageForm, productDetailForm } from './forms'

/***********
 ** Props **
 ***********/

interface FormProductDetailProps {
  active: boolean
  existingProduct?: any // TODO: Change to actual type
}

defineProps<FormProductDetailProps>()

/***********
 ** Emits **
 ***********/

interface FormProductDetailEmits {
  (e: 'close'): void
}

const emits = defineEmits<FormProductDetailEmits>()

/***********
 ** Store **
 ***********/

const attributesStore = useProductAttributesStore()
const categoriesStore = useCategoriesStore()
const suppliersStore = useSuppliersStore()

/***********
 ** State **
 ***********/

const productDefaultValues = {
  name: null,
  supplier: null,
  status: '3',
  description: null,
  slug: null,
  categories: [],
  canBePurchasedOnline: false,
  canBePickedUp: false,
  displayPriceToCustomer: false,
  unit: 'stk',
  vatRate: '0.25',
  searchKeywords: null,
  colors: [],
  shapes: [],
  materials: [],
  rooms: [],
  absorption: null,
  availableInSpecialSizes: false,
}
const product = ref({ ...productDefaultValues })
const productFiles = ref([])
const productOptions = ref([])

const statuses = useProductStatus()

const colors = await attributesStore.getColorsInternal()
const shapes = await attributesStore.getShapesInternal()
const categories = await categoriesStore.getCategoriesInternal()
const suppliers = await suppliersStore.getSuppliersInternal()

// Materials and Rooms are temporary as they will be migrated to proper DB instances
// at some point. For now, they need to be kept in sync with the enum backend.
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

const { submissionState, setSubmissionState, formError, clearFormError, setFormError } =
  useFormState(product, productDefaultValues)

/*********************
 ** State: handlers **
 *********************/

const onClose = () => {
  emits('close')
}

const humanReadableSupplier = (supplierId: string) =>
  suppliers.find((supplier) => supplier.id === parseInt(supplierId, 10)).name

const handleSubmit = async () => {
  setSubmissionState('loading')
  await console.log(product)
  setFormError({ message: 'Testing', extra: { name: 'Yoooo' } })
  setSubmissionState('error')
}

/***********
 ** Forms **
 ***********/

const productForm: ComputedRef<FormBlock[]> = computed(() =>
  productDetailForm(suppliers, statuses, categories, colors, shapes, rooms, materials)
)
</script>

<template>
  <div>
    <ModalSlideOver title="Legg til nytt produkt" :active="active" @close="onClose">
      <form>
        <FormBuilder
          :form="productForm"
          :error="formError"
          @clear-error="clearFormError"
          @edit="(formData) => (product = formData)"
        >
          <template #slug="{ formObject }">
            <Button
              type="button"
              variant="secondary"
              align-self="bottom"
              :disabled="!formObject['name'] || !formObject['supplier']"
              @click="
                formObject['slug'] = slugify(`
                  ${humanReadableSupplier(formObject['supplier'])}
                  ${formObject['name']}`)
              "
            >
              Generer
            </Button>
          </template>
        </FormBuilder>
        <FormBuilder as="div" :form="productDetailImageForm" />
      </form>
      <CollapsableSection title="Filer">
        <FormProductFileBlock @update="(files) => (productFiles = files)" />
      </CollapsableSection>
      <CollapsableSection title="Alternativer">
        <FormProductOptionBlock @update="(options) => (productOptions = options)" />
      </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-5 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button
            variant="primary"
            class="col-span-4"
            :loading-state="submissionState"
            @click="handleSubmit"
          >
            Legg til produkt
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </div>
</template>
