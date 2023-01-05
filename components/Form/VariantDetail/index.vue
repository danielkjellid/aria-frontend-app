<script setup lang="ts">
import { VariantCreateInternalOutput } from '~~/@types'
import useProductAttributesStore from '~~/store/product-attributes'
import useNotificationsStore from '~~/store/notifications'
import { internalUrls } from '~~/endpoints'
import { variantForm } from './forms'

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

/***********
 ** State **
 ***********/

const defaultVariantValues = { name: null, isStandard: false, file: null }
const variant = ref({ ...defaultVariantValues })

const {
  formError,
  clearFormError,
  setFormError,
  canBeSubmitted,
  buildMultipartForm,
  submissionState,
  setSubmissionState,
  resetForm,
} = useFormState(variant, defaultVariantValues)

/*********************
 ** State: handlers **
 *********************/

const handleSubmitAndClose = async () => {
  setSubmissionState('loading')

  const payload = buildMultipartForm()

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

    setSubmissionState('success')
    emits('close', createdVariant.id)
    resetForm()
  } catch (e) {
    setFormError(e.data)

    notificationsStore.create({
      type: 'danger',
      title: 'Noe gikk galt!',
      text: formError.value.message,
    })

    setSubmissionState('error')
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
        :form="variantForm"
        :error="formError"
        @edit="(formData) => (variant = formData)"
        @clear-error="clearFormError"
      />
      <template #actions>
        <div class="md:grid-cols-5 grid grid-cols-3 gap-5">
          <Button variant="secondary" class="col-span-1" @click="onClose">Avbryt</Button>
          <Button
            variant="primary"
            class="md:col-span-4 col-span-2"
            type="submit"
            :disabled="!canBeSubmitted"
            :loading-state="submissionState"
            @click="handleSubmitAndClose"
          >
            Lagre og gå tilbake
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </form>
</template>
