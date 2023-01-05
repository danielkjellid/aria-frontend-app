<script setup lang="ts">
import { ProductFile } from './types'
import useNotificationsStore from '~~/store/notifications'
import form from './form'

interface FormProductFileProps {
  active: boolean
  /**
   * Render the black overlay transparent. Useful if you have multiple overlapping
   * slide overs.
   */
  isNested?: boolean
}

defineProps<FormProductFileProps>()

const notificationsStore = useNotificationsStore()

const productFileDefaultValues = { name: null, file: null }
const productFile = ref({ ...productFileDefaultValues })

interface FormProductFileEmits {
  (e: 'close'): void
  (e: 'submit', val: ProductFile): void
}

const emits = defineEmits<FormProductFileEmits>()

const onClose = () => {
  emits('close')
}

const handleSubmitAndClose = () => {
  emits('submit', productFile.value)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  productFile.value = { ...productFileDefaultValues }
  onClose()
}

const handleSubmitAndAddNew = () => {
  emits('submit', productFile.value)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  productFile.value = { ...productFileDefaultValues }
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
        {{ productFile }}
        <FormBuilder :form="form" @edit="(formData) => (productFile = formData)" />
        <template #actions>
          <div class="grid grid-cols-5 gap-5">
            <Button variant="secondary" class="col-span-1">Avbryt</Button>
            <Button
              variant="primary"
              class="col-span-2"
              type="submit"
              @click="handleSubmitAndClose"
            >
              Lagre og gå tilbake
            </Button>
            <Button
              variant="primary"
              class="col-span-2"
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
