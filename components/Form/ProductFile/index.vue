<script setup lang="ts">
import { ProductFile } from './types'
import useNotificationsStore from '~~/store/notifications'

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

const reactiveProductFile = reactive({
  name: null,
  file: null,
})

const productFileFiles = computed(() =>
  reactiveProductFile.file ? [reactiveProductFile.file] : []
)

interface FormProductFileEmits {
  (e: 'close'): void
  (e: 'submit', val: ProductFile): void
}

const emits = defineEmits<FormProductFileEmits>()

const onClose = () => {
  emits('close')
}

const handleFileUpload = (files: File[]) => {
  const [file] = files
  reactiveProductFile.file = file
}

const handleSubmitAndClose = () => {
  emits('submit', reactiveProductFile)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  onClose()
}

const handleSubmitAndAddNew = () => {
  emits('submit', reactiveProductFile)
  notificationsStore.create({
    type: 'success',
    title: 'Filen ble lagt til!',
    text: 'Filen ble lagt til, og blir lagret samtidig som produktet.',
  })
  reactiveProductFile.name = null
  reactiveProductFile.file = null
}
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <ModalSlideOver title="Legg til ny fil" :active="active" :is-nested="isNested" @close="onClose">
      <CollapsableSection title="Generelt">
        <Input id="id_name" v-model="reactiveProductFile.name" label="Navn" required />
      </CollapsableSection>
      <CollapsableSection title="Fil">
        <FileUploadInput
          type="file"
          :files="productFileFiles"
          @upload="(files) => handleFileUpload(files)"
        />
      </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-5 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button variant="primary" class="col-span-2" type="submit" @click="handleSubmitAndClose">
            Lagre og gå tilbake
          </Button>
          <Button variant="primary" class="col-span-2" type="submit" @click="handleSubmitAndAddNew">
            Lagre og legg til ny
          </Button>
        </div>
      </template>
    </ModalSlideOver>
  </form>
</template>
