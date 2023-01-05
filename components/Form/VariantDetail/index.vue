<script setup lang="ts">
import { VariantCreateInternalOutput, ApiError } from '~~/@types'
import { ButtonProps } from '~~/components/Button/index.vue'
import useProductAttributesStore from '~~/store/product-attributes'
import useNotificationsStore from '~~/store/notifications'
import { internalUrls } from '~~/endpoints'
import form from './form'
import checkObjectEquality from '~~/utils/checkObjectEquality'

/***********
 ** Props **
 ***********/

interface FormProductOptionVariantProps {
  active: boolean
  existingVariant?: VariantCreateInternalOutput
  /**
   * Render the black overlay transparent. Useful if you have multiple overlapping
   * slide overs.
   */
  isNested?: boolean
}

defineProps<FormProductOptionVariantProps>()

/***********
 ** Emits **
 ***********/

interface FormProductOptionVariantEmits {
  (e: 'close', variantId: number | undefined): void
}

const emits = defineEmits<FormProductOptionVariantEmits>()

/***********
 ** Store **
 ***********/

const attributesStore = useProductAttributesStore()
const notificationsStore = useNotificationsStore()

/************
 ** Errors **
 ************/

const error = ref<ApiError | null>(null)

const clearError = () => {
  if (error.value) {
    error.value = null
    submitAndCloseFormSubmissionState.value = 'initial'
    submitAndAddNewFormSubmissionState.value = 'initial'
  }
}

/*************
 ** Helpers **
 *************/

// Build form data for payload, using multipart as payload type.
const buildForm = () => {
  const formData = new FormData()

  // When appending to form data, it converts available types to string,
  // even undefined or null. Therefore we need to explicitly check if
  // the field has any value before appending it to make error flow good.
  if (variant.value.name) {
    formData.append('name', variant.value.name)
  }
  if (variant.value.file) {
    formData.append('file', variant.value.file)
  }

  formData.append('is_standard', JSON.stringify(variant.value.isStandard))

  return formData
}

// Reset all fields in the form.
const resetForm = () => {
  variant.value = { ...defaultVariantValues }

  submitAndCloseFormSubmissionState.value = 'initial'
  submitAndAddNewFormSubmissionState.value = 'initial'
}

/***********
 ** State **
 ***********/

const submitAndCloseFormSubmissionState = ref<ButtonProps['loadingState']>('initial')
const submitAndAddNewFormSubmissionState = ref<ButtonProps['loadingState']>('initial')
const formCanBeSubmitted = computed(() => !checkObjectEquality(variant.value, defaultVariantValues))

const defaultVariantValues = { name: null, isStandard: false, file: null }
const variant = ref({ ...defaultVariantValues })

/*********************
 ** State: handlers **
 *********************/

const handleSubmitAndClose = async () => {
  submitAndCloseFormSubmissionState.value = 'loading'

  const payload = buildForm()

  try {
    const createdVariant = await performPost<VariantCreateInternalOutput>(
      internalUrls.products.variants.create(),
      payload
    )

    attributesStore.addVariantToInternalState(createdVariant)

    notificationsStore.create({
      type: 'success',
      title: 'Variant opprettet!',
      text: 'Varianten ble opprettet.',
    })

    submitAndCloseFormSubmissionState.value = 'success'

    emits('close', createdVariant.id)

    resetForm()
  } catch (e) {
    error.value = e.data

    notificationsStore.create({
      type: 'danger',
      title: 'Noe gikk galt!',
      text: error.value.message,
    })

    submitAndCloseFormSubmissionState.value = 'error'
  }
}

const onClose = () => {
  emits('close', undefined)
}
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <ModalSlideOver
      title="Legg til ny variant"
      :active="active"
      :is-nested="isNested"
      @close="onClose"
    >
      {{ variant }}
      <FormBuilder
        :form="form"
        :error="error"
        @edit="(formData) => (variant = formData)"
        @clear-error="clearError"
      />
      <template #actions>
        <div class="md:grid-cols-5 grid grid-cols-3 gap-5">
          <Button variant="secondary" class="col-span-1" @click="onClose"> Avbryt </Button>
          <Button
            variant="primary"
            class="md:col-span-4 col-span-2"
            type="submit"
            :disabled="!formCanBeSubmitted"
            @click="handleSubmitAndClose"
          >
            Lagre og gå tilbake
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </form>
</template>
