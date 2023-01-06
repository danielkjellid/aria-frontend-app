<script setup lang="ts">
import useProductAttributesStore from '~~/store/product-attributes'
import useSuppliersStore from '~~/store/suppliers'
import useNotificationsStore from '~~/store/notifications'
import useCategoriesStore from '~~/store/categories'
import {
  ProductCreateInternalOutput,
  ProductOptionCreateInBulkInternalInput,
  ProductOptionCreateInBulkInternalOutput,
} from '~~/@types'
import slugify from '~~/utils/slugify'
import { FormBlock } from '../types'
import { ComputedRef } from 'vue'
import { productDetailImageForm, productDetailForm } from './forms'
import { internalUrls } from '~~/endpoints'
import { ProductOption } from '../ProductOption/types'
import { ProductImage } from './types'

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
const notificationsStore = useNotificationsStore()

/***********
 ** State **
 ***********/

const productDefaultValues = {
  name: null,
  supplierId: null,
  status: '3',
  description: null,
  slug: null,
  categoryIds: [],
  canBePurchasedOnline: false,
  canBePickedUp: false,
  displayPrice: false,
  unit: 2,
  vatRate: '0.25',
  searchKeywords: null,
  colorIds: [],
  shapeIds: [],
  materials: [],
  rooms: [],
  absorption: null,
  availableInSpecialSizes: false,
}
const product = ref({ ...productDefaultValues })
const productFiles = ref([])
const productOptions = ref<ProductOption[]>([])
const productImages = ref<ProductImage[]>([])

const statuses = useProductStatus()

const colors = await attributesStore.getColorsInternal()
const materials = await attributesStore.getMaterialsInternal()
const rooms = await attributesStore.getRoomsInternal()
const shapes = await attributesStore.getShapesInternal()
const categories = await categoriesStore.getCategoriesInternal()
const suppliers = await suppliersStore.getSuppliersInternal()

const {
  submissionState: productFormSubmissionState,
  setSubmissionState: setProductFormSubmissionState,
  formError: productFormError,
  clearFormError: clearProductFormError,
  setFormError: setProductFormError,
  buildMultipartForm: productBuildMultipartForm,
} = useFormState(product, productDefaultValues)

const { buildMultipartForm: productImageBuildMultipartForm, canBeSubmitted: ccc } = useFormState(
  productImages,
  []
)

/*********************
 ** State: handlers **
 *********************/

const onClose = () => {
  emits('close')
}

const humanReadableSupplier = (supplierId: string) =>
  suppliers.find((supplier) => supplier.id === parseInt(supplierId, 10)).name

const handleSubmit = async () => {
  setProductFormSubmissionState('loading')
  await console.log(product)

  console.log(product.value)
  console.log(productFiles.value)
  console.log(productOptions.value)
  console.log(productImages.value)

  const productPayload = productBuildMultipartForm()

  console.log(...productPayload)

  await performPost<ProductCreateInternalOutput>(internalUrls.products.create(), productPayload)
    .then(async (productOutput) => {
      // Once product is created, create associated options in bulk.
      if (productOptions.value && productOptions.value.length) {
        const optionsPayload: ProductOptionCreateInBulkInternalInput[] = [...productOptions.value]
        await performPost<ProductOptionCreateInBulkInternalOutput[]>(
          internalUrls.products.createOptionsInBulk(productOutput.id),
          optionsPayload
        ).catch((err) => {
          console.log(err.data.message)
          notificationsStore.create({
            type: 'danger',
            title: 'Noe gikk galt!',
            text: 'Kunne ikke opprette alternativer, venligst last inn siden på nytt og prøv igjen.',
          })
        })
        setProductFormSubmissionState('error')
      }
    })
    .catch((err) => {
      setProductFormError(err.data)
      notificationsStore.create({
        type: 'danger',
        title: 'Noe gikk galt!',
        text: productFormError.value.message,
      })
      setProductFormSubmissionState('error')
    })
}

const testSubmitImage = async () => {
  const payload = await productImageBuildMultipartForm()
  console.log('fired')
  console.log(...payload)
}

watch(
  () => productImages.value,
  (n, _o) => {
    console.log(n)
  }
)

const handleProductImageUpload = (data: { images: ProductImage[] }) => {
  productImages.value = [
    ...data.images.filter((image) => {
      if (image.file !== null) {
        return { file: image.file }
      }

      return undefined
    }),
  ]
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
          :error="productFormError"
          @clear-error="clearProductFormError"
          @edit="(formData) => (product = formData)"
        >
          <template #slug="{ formObject }">
            <Button
              type="button"
              variant="secondary"
              :disabled="!formObject['name'] || !formObject['supplierId']"
              @click="
                formObject['slug'] = slugify(`
                  ${humanReadableSupplier(formObject['supplierId'])}
                  ${formObject['name']}`)
              "
            >
              Generer
            </Button>
          </template>
        </FormBuilder>
        {{ ccc }}
        <br />
        {{ productImages }}
        <FormBuilder
          :form="productDetailImageForm"
          @edit="(formData) => handleProductImageUpload(formData)"
        />
        <button type="button" @click="testSubmitImage">Test submit image</button>
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
            :loading-state="productFormSubmissionState"
            @click="handleSubmit"
          >
            Legg til produkt
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </div>
</template>
