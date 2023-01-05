<script setup lang="ts">
import { ApiError } from '~~/@types'
import { ButtonProps } from '~~/components/Button/index.vue'
import useProductAttributesStore from '~~/store/product-attributes'
import useSuppliersStore from '~~/store/suppliers'
import useCategoriesStore from '~~/store/categories'
import slugify from '~~/utils/slugify'
import { BuilderBlock } from '../Builder.vue'

interface FormProductDetailProps {
  active: boolean
  existingProduct?: any // TODO: Change to actual type
}

const attributesStore = useProductAttributesStore()
const suppliersStore = useSuppliersStore()
const categoriesStore = useCategoriesStore()

defineProps<FormProductDetailProps>()

const product = ref()

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

const humanReadableSupplier = (supplierId: string) =>
  suppliers.find((supplier) => supplier.id === parseInt(supplierId, 10)).name

const handleSubmit = async () => {
  await console.log(product)
}

const productForm: BuilderBlock[] = [
  {
    name: 'Generelt',
    blocks: [
      {
        type: 'textInput',
        label: 'Navn',
        initialValue: 'TEst',
        remoteProperty: 'name',
        required: true,
        meta: { displayWordCount: true },
      },
      {
        type: 'select',
        label: 'Leverandør',
        remoteProperty: 'supplier',
        required: true,
        options: suppliers,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          optionInitialValue: 'Velg leverandør...',
        },
      },
      {
        type: 'select',
        label: 'Status',
        initialValue: '3',
        remoteProperty: 'status',
        options: statuses,
        meta: { optionNameProperty: 'name', optionValueProperty: 'value' },
      },
      {
        type: 'editor',
        label: 'Beskrivelse',
        remoteProperty: 'description',
        required: true,
      },
      {
        type: 'action',
        label: 'Slug',
        remoteProperty: 'slug',
        required: true,
      },
    ],
  },
  {
    name: 'Kategorier',
    blocks: [
      {
        type: 'multiselect',
        label: 'Kategorier',
        remoteProperty: 'categories',
        required: true,
        // initialValue: [20, 22],
        options: categories,
        meta: {
          optionNameProperty: 'displayName',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle kategoriene some egner seg til produktet.',
        },
      },
    ],
  },
  {
    name: 'Kommersielt',
    blocks: [
      {
        type: 'checkbox',
        label: 'Kan kjøpes på nett',
        remoteProperty: 'canBePurchasedOnline',
        meta: {
          helpText: 'Kunder kan legge inn bestilling på produktet, og få prouktet sendt hjem.',
        },
      },
      {
        type: 'checkbox',
        label: 'Kan hentes i butikk',
        remoteProperty: 'canBePickedUp',
        meta: {
          helpText: 'Kunder kan legge inn klikk og hent ordre.',
        },
      },
      {
        type: 'checkbox',
        label: 'Vis pris til kunde',
        remoteProperty: 'displayPriceToCustomer',
        meta: {
          helpText: 'Prisen på produktet er tilgjengelig i nettbutikken.',
        },
      },
      {
        type: 'select',
        label: 'Enhet',
        remoteProperty: 'unit',
        required: true,
        initialValue: 'stk',
        options: [
          { name: 'Stk', value: 'stk' },
          { name: 'm2', value: 'm2' },
        ],
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
        },
      },
      {
        type: 'textInput',
        label: 'MVA Sats',
        remoteProperty: 'vatRate',
        required: true,
        initialValue: '0.25',
        meta: {
          helpText: 'Prosentvis sats for MVA i desimalform. E.g. 0.25 for 25%.',
        },
      },
      {
        type: 'textInput',
        label: 'Søkeord',
        remoteProperty: 'searchKeywords',
        meta: {
          helpText:
            'Separer ord med mellomrom. Navn, leverandør og materiale er allerede inkludert.',
        },
      },
    ],
  },
  {
    name: 'Atributter',
    blocks: [
      {
        type: 'multiselect',
        label: 'Farger',
        remoteProperty: 'colors',
        required: true,
        options: colors,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle fargene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Fasonger',
        remoteProperty: 'shapes',
        required: true,
        options: shapes,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle fasongene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Materialer',
        remoteProperty: 'materials',
        options: materials,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
          allowMultiple: true,
          helpText: 'Velg alle materialene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Rom',
        remoteProperty: 'rooms',
        options: rooms,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
          allowMultiple: true,
          helpText: 'Velg alle rommene some egner seg til produktet.',
        },
      },
      {
        type: 'textInput',
        label: 'Absorberingsevne',
        remoteProperty: 'absorption',
        meta: {
          helpText:
            'Gjelder kun fliser. Flisens absorberingsvene. Verdi i hele prosent - e.g. 0.5 for 0.5%.',
        },
      },
      {
        type: 'checkbox',
        label: 'Tilgjengelig i spesialstørrelser',
        remoteProperty: 'availableInSpecialSizes',
        meta: { helpText: 'Prouktets størrelse kan tilpasses etter kundens behov.' },
      },
    ],
  },
]

const productImageForm: BuilderBlock[] = [
  {
    name: 'Bilder',
    blocks: [
      {
        type: 'image',
        label: 'Bilder',
        remoteProperty: 'images',
        meta: { hiddenLabel: true, allowMultiple: true, allowSetPrimaryImage: true },
      },
    ],
  },
]

const t = {
  name: 'Testing 123',
  supplier: '64',
  status: '3',
  description: '<p>A populated with modifications desc</p><br/><p>Yoo</p>',
  slug: 'wooohooo',
  categories: [21, 24],
  canBePurchasedOnline: true,
  canBePickedUp: false,
  displayPriceToCustomer: true,
  unit: 'm2',
  vatRate: '0.25',
  searchKeywords: null,
  colors: [1],
  shapes: [8],
  materials: ['marmor'],
  rooms: ['uterom'],
  absorption: null,
  availableInSpecialSizes: false,
}
</script>

<template>
  <div>
    <ModalSlideOver title="Legg til nytt produkt" :active="active" @close="onClose">
      <form>
        <FormBuilder
          :form="productForm"
          :initial-values-from-obj="t"
          :error="error"
          @clear-error="clearError"
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
        <FormBuilder as="div" :form="productImageForm" />
      </form>
      <CollapsableSection title="Filer">
        <FormProductFileBlock @update="(files) => (createdFiles = files)" />
      </CollapsableSection>
      <CollapsableSection title="Alternativer">
        <FormProductOptionBlock @update="(options) => (createdOptions = options)" />
      </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-5 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button variant="primary" class="col-span-4" @click="handleSubmit">
            Legg til produkt
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </div>
</template>
