<script setup lang="ts">
import useProductAttributesStore from '~~/store/product-attributes'
import useNotificationsStore from '~~/store/notifications'
import { ProductOption } from './types'
import { FormBlock } from '../types'
import { ProductStatusEnum } from '~~/@types'
import { ComputedRef } from 'vue'

const attributesStore = useProductAttributesStore()
const notificationsStore = useNotificationsStore()

interface FormProductOptionProps {
  active: boolean
  existingProductOption?: ProductOption
  /**
   * Render the black overlay transparent. Useful if you have multiple overlapping
   * slide overs.
   */
  isNested?: boolean
}

defineProps<FormProductOptionProps>()

const variants = await attributesStore.getVariantsInternal()
const variantFormActive = ref<boolean>(false)

const statuses = useProductStatus()

const productOptionDefaultValues = {
  price: null,
  variantId: null,
  status: '3',
  size: {
    height: null,
    width: null,
    depth: null,
    circumference: null,
  },
}
const productOption = ref({ ...productOptionDefaultValues })

const disableCircumference = computed(
  () =>
    !!productOption.value.size.height ||
    !!productOption.value.size.width ||
    !!productOption.value.size.depth
)
const disableHeightWidthDepth = computed(() => !!productOption.value.size.circumference)

interface FormProductOptionEmits {
  (e: 'close'): void
  (e: 'submit', val: any): void
}

const onClose = () => {
  emits('close')
}

const resetForm = () => {
  productOption.value = { ...productOptionDefaultValues }
}

const emits = defineEmits<FormProductOptionEmits>()

const selectedVariantId = computed(() => productOption.value.variantId)

const handleSubmit = () => {
  emits('submit', { ...productOption.value, size: { ...productOption.value.size } })
  notificationsStore.create({
    type: 'success',
    title: 'Alternativ lagt til!',
    text: 'Alternativet ble lagt til, og blir lagret samtidig som produktet.',
  })
}

const handleSubmitAndClose = () => {
  handleSubmit()
  emits('close')
  resetForm()
}

const handleSubmitAndAddNew = () => {
  handleSubmit()
  resetForm()
}

const productOptionGeneralForm: ComputedRef<FormBlock[]> = computed(() => [
  {
    name: 'Generelt',
    blocks: [
      {
        type: 'select',
        label: 'Status',
        remoteProperty: 'status',
        options: statuses,
        initialValue: ProductStatusEnum.Available.toString(),
        meta: { optionNameProperty: 'name', optionValueProperty: 'value' },
      },
      {
        type: 'numberInput',
        label: 'Pris',
        remoteProperty: 'price',
        meta: { helpText: 'Prisen for dette alternativet.' },
      },
    ],
  },
])

const productOptionSizeForm: ComputedRef<FormBlock[]> = computed(() => [
  {
    name: 'Størrelse',
    columns: 3,
    remoteProperty: 'size',
    blocks: [
      {
        type: 'numberInput',
        label: 'Bredde i cm',
        remoteProperty: 'width',
        meta: { disabled: disableHeightWidthDepth.value },
      },
      {
        type: 'numberInput',
        label: 'Høyde i cm',
        remoteProperty: 'height',
        meta: { disabled: disableHeightWidthDepth.value },
      },
      {
        type: 'numberInput',
        label: 'Dybde i cm',
        remoteProperty: 'depth',
        meta: { disabled: disableHeightWidthDepth.value },
      },
      {
        type: 'numberInput',
        label: 'Omkrets i cm',
        remoteProperty: 'circumference',
        meta: {
          colSpan: 3,
          disabled: disableCircumference.value,
          helpText:
            'Omkrets kan brukes dersom alternativet har en sfærisk form fremfor en kvadratisk en. Feltet kan ikke benyttes når de andre størrelsesfeltene er fylt ut.',
        },
      },
    ],
  },
])

const productOptionVariantForm: ComputedRef<FormBlock[]> = computed(() => [
  {
    name: 'Variant',
    blocks: [
      {
        type: 'listBoxFilterNumber',
        label: 'Variant',
        remoteProperty: 'variantId',
        initialValue: selectedVariantId.value,
        options: variants,
        meta: { optionNameProperty: 'name', optionValueProperty: 'id' },
      },
    ],
  },
])

const closeVariantFormAndPrepopulateId = (variantId: number | undefined) => {
  variantFormActive.value = false
  productOption.value.variantId = variantId
}
</script>

<template>
  <div>
    <form @submit.prevent>
      <ModalSlideOver
        title="Legg til nytt alternativ"
        :active="active"
        :is-nested="isNested"
        @close="onClose"
      >
        {{ productOption }}
        <FormBuilder
          :form="productOptionGeneralForm"
          :initial-values-from-obj="existingProductOption"
          @edit="(formData) => (productOption = formData)"
        />
        <FormBuilder
          :form="productOptionSizeForm"
          @edit="(formData) => (productOption['size'] = formData)"
        />
        <FormBuilder
          :form="productOptionVariantForm"
          @edit="(formData) => (productOption.variantId = formData.variantId)"
        >
          <template #variantId>
            <div v-if="!productOption.variantId">
              <Button variant="secondary" fluid @click="variantFormActive = true">
                Legg til ny variant
              </Button>
              <p class="mt-3 text-sm font-light text-gray-500">
                Dersom varianten du ønsker å legge til ikke allerede eksisterer kan du opprette en
                ny en.
              </p>
            </div>
          </template>
        </FormBuilder>
        <template #actions>
          <div class="md:grid-cols-5 grid grid-cols-2 gap-5">
            <Button
              variant="secondary"
              class="md:col-span-1 md:order-1 order-2 col-span-2"
              @click="onClose"
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              class="md:col-span-2 md:order-2 col-span-1"
              type="submit"
              @click="handleSubmitAndClose"
            >
              Lagre og gå tilbake
            </Button>
            <Button
              variant="primary"
              class="md:col-span-2 md:order-2 col-span-1"
              type="submit"
              @click="handleSubmitAndAddNew"
            >
              Lagre og legg til ny
            </Button>
          </div>
        </template>
      </ModalSlideOver>
    </form>

    <FormVariantDetail
      :active="variantFormActive"
      is-nested
      @close="closeVariantFormAndPrepopulateId"
    />
  </div>
</template>
