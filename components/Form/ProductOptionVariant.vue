<script setup lang="ts">
import { VariantCreateInternalOutput, ApiError } from '~~/@types'
import { ButtonProps } from '~~/components/Button/index.vue'
import useProductsStore from '~~/store/products'
import useNotificationsStore from '~~/store/notifications'
import { internalUrls } from '~~/endpoints'

/***********
 ** Props **
 ***********/

interface FormProductOptionVariantProps {
  active: boolean
  existingVariant?: VariantCreateInternalOutput
}

defineProps<FormProductOptionVariantProps>()

/***********
 ** Emits **
 ***********/

interface FormProductOptionVariantEmits {
  (e: 'close'): void
}

const emits = defineEmits<FormProductOptionVariantEmits>()

/***********
 ** Store **
 ***********/

const productsStore = useProductsStore()
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
  if (reactiveVariant.name) {
    formData.append('name', reactiveVariant.name)
  }
  if (reactiveVariant.thumbnail) {
    formData.append('file', reactiveVariant.thumbnail)
  }

  formData.append('is_standard', JSON.stringify(reactiveVariant.isStandard))

  return formData
}

// Reset all fields in the form.
const resetForm = () => {
  reactiveVariant.name = undefined
  reactiveVariant.isStandard = false
  reactiveVariant.thumbnail = undefined

  uploadedFiles.value = []

  submitAndCloseFormSubmissionState.value = 'initial'
  submitAndAddNewFormSubmissionState.value = 'initial'
}

/***********
 ** State **
 ***********/

const submitAndCloseFormSubmissionState = ref<ButtonProps['loadingState']>('initial')
const submitAndAddNewFormSubmissionState = ref<ButtonProps['loadingState']>('initial')

const reactiveVariant = reactive({
  name: undefined,
  isStandard: false,
  thumbnail: undefined,
})

const uploadedFiles = ref([])

/*********************
 ** State: handlers **
 *********************/

const handleFileUpload = (files: File[]) => {
  const [file] = files

  error.value = null
  uploadedFiles.value = files
  // @ts-ignore
  reactiveVariant.thumbnail = file
}

const handleSubmitAndClose = async () => {
  submitAndCloseFormSubmissionState.value = 'loading'

  const payload = buildForm()

  try {
    const createdVariant = await performPost<VariantCreateInternalOutput>(
      internalUrls.products.variants.create(),
      payload
    )

    productsStore.addVariantToState(createdVariant)

    notificationsStore.create({
      type: 'success',
      title: 'Variant opprettet!',
      text: 'Varianten ble opprettet.',
    })

    submitAndCloseFormSubmissionState.value = 'success'

    emits('close')

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

const handleSubmitAndAddNew = async () => {
  submitAndAddNewFormSubmissionState.value = 'loading'

  const payload = buildForm()

  try {
    const createdVariant = await performPost<VariantCreateInternalOutput>(
      internalUrls.products.variants.create(),
      payload
    )

    submitAndAddNewFormSubmissionState.value = 'success'

    productsStore.addVariantToState(createdVariant)

    notificationsStore.create({
      type: 'success',
      title: 'Variant opprettet!',
      text: 'Varianten ble opprettet.',
    })

    resetForm()
  } catch (e) {
    error.value = e.data

    notificationsStore.create({
      type: 'danger',
      title: 'Noe gikk galt!',
      text: error.value.message,
    })

    submitAndAddNewFormSubmissionState.value = 'error'
  }
}
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <ModalSlideOver title="Legg til ny variant" :active="active">
      <CollapsableSection title="Generelt">
        <div class="space-y-5">
          <Input
            id="id_variant_name"
            v-model="reactiveVariant.name"
            label="Navn"
            required
            :error="$parseApiError('name', error)"
            @input="clearError"
          />
          <Checkbox
            id="id_variant_is_standard"
            v-model="reactiveVariant.isStandard"
            label="Er standard variant"
            help-text="Standard varianter er en variant som ofte er planlagt å tilknyttes en mengde alternativer. Kan f.eks. være en typisk farge eller finish som tilbys på en større del av et leverandørsortiment."
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Bilde">
        <FileUploadInput
          type="image"
          :files="uploadedFiles"
          :error="$parseApiError('file', error)"
          @upload="(files) => handleFileUpload(files)"
        />
      </CollapsableSection>
      <template #actions>
        <div class="md:grid-cols-5 grid grid-cols-2 gap-5">
          <Button variant="secondary" class="md:col-span-1 md:order-1 order-2 col-span-2">
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
</template>
