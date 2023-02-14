<script setup lang="ts">
import { ProductFile } from './types'
import useNotificationsStore from '~~/store/notifications'
import { productFileForm } from './forms'

/***********
 ** Props **
 ***********/

interface FormProductFileProps {
  active: boolean
  /**
   * Render the black overlay transparent. Useful if you have multiple overlapping
   * slide overs.
   */
  isNested?: boolean
}

defineProps<FormProductFileProps>()

/***********
 ** Emits **
 ***********/

interface FormProductFileEmits {
  (e: 'close'): void
  (e: 'submit', val: ProductFile): void
}

const emits = defineEmits<FormProductFileEmits>()

/***********
 ** Store **
 ***********/
const notificationsStore = useNotificationsStore()

/***********
 ** State **
 ***********/

const productFileDefaultValues = { name: null, file: null }
const productFile = ref({ ...productFileDefaultValues })

const { resetForm, formKey, canBeSubmitted } = useFormState(productFile, productFileDefaultValues)

/*********************
 ** State: handlers **
 *********************/

const handleSubmitAndClose = () => {
  emits('submit', productFile.value)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  resetForm()
  onClose()
}

const handleSubmitAndAddNew = () => {
  emits('submit', productFile.value)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  resetForm()
}

const onClose = () => {
  emits('close')
}
</script>

<template>
  <div>
    <form enctype="multipart/form-data" @submit.prevent>
      <ModalSlideOver
        title="Legg til ny fil"
        :active="active"
        :is-nested="isNested"
        @close="onClose"
      >
        <div :key="formKey">
          <FormBuilder
            :form="productFileForm"
            @edit="(formData) => (productFile = { ...formData, file: formData.file.file })"
          />
        </div>
        <template #actions>
          <div class="grid grid-cols-5 gap-5">
            <Button variant="secondary" class="col-span-1" @click="onClose">Avbryt</Button>
            <Button
              variant="primary"
              class="col-span-2"
              :disabled="!canBeSubmitted"
              type="submit"
              @click="handleSubmitAndClose"
            >
              Lagre og gå tilbake
            </Button>
            <Button
              variant="primary"
              class="col-span-2"
              :disabled="!canBeSubmitted"
              type="submit"
              @click="handleSubmitAndAddNew"
            >
              Lagre og legg til ny
            </Button>
          </div>
        </template>
      </ModalSlideOver>
    </form>
  </div>
</template>
