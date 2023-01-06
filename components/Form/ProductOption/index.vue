<script setup lang="ts">
import useProductAttributesStore from '~~/store/product-attributes'
import useNotificationsStore from '~~/store/notifications'
import { ProductOption } from './types'
import { FormBlock } from '../types'
import { ComputedRef } from 'vue'
import { productOptionGeneralForm, productOptionSizeForm, productOptionVariantForm } from './forms'

/***********
 ** Props **
 ***********/

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

/***********
 ** Emits **
 ***********/

interface FormProductOptionEmits {
  (e: 'close'): void
  (e: 'submit', val: any): void
}

const emits = defineEmits<FormProductOptionEmits>()

/***********
 ** Store **
 ***********/

const attributesStore = useProductAttributesStore()
const notificationsStore = useNotificationsStore()

/***********
 ** State **
 ***********/

const productOptionDefaultValues = {
  grossPrice: null,
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
const variants = await attributesStore.getVariantsInternal()
const variantFormActive = ref<boolean>(false)
const statuses = useProductStatus()

const disableCircumference = computed(
  () =>
    !!productOption.value.size.height ||
    !!productOption.value.size.width ||
    !!productOption.value.size.depth
)
const disableHeightWidthDepth = computed(() => !!productOption.value.size.circumference)

const { resetForm, formKey, canBeSubmitted } = useFormState(
  productOption,
  productOptionDefaultValues
)

/*********************
 ** State: handlers **
 *********************/

const onClose = () => {
  emits('close')
}

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

/***********
 ** Forms **
 ***********/

const generalForm: ComputedRef<FormBlock[]> = computed(() => productOptionGeneralForm(statuses))

const sizeForm: ComputedRef<FormBlock[]> = computed(() =>
  productOptionSizeForm(disableHeightWidthDepth.value, disableCircumference.value)
)

const variantForm: ComputedRef<FormBlock[]> = computed(() => productOptionVariantForm(variants))
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
        <div :key="formKey">
          <FormBuilder
            :form="generalForm"
            :initial-values-from-obj="existingProductOption"
            @edit="(formData) => (productOption = formData)"
          />
          <FormBuilder :form="sizeForm" @edit="(formData) => (productOption['size'] = formData)" />
          <FormBuilder
            :form="variantForm"
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
        </div>
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
              :disabled="!canBeSubmitted"
              @click="handleSubmitAndClose"
            >
              Lagre og gå tilbake
            </Button>
            <Button
              variant="primary"
              class="md:col-span-2 md:order-2 col-span-1"
              type="submit"
              :disabled="!canBeSubmitted"
              @click="handleSubmitAndAddNew"
            >
              Lagre og legg til ny
            </Button>
          </div>
        </template>
      </ModalSlideOver>
    </form>

    <FormVariantDetail :active="variantFormActive" is-nested @close="variantFormActive = false" />
  </div>
</template>
