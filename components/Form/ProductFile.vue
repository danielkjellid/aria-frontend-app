<script setup lang="ts">
import { ProductFileCreateInternalOutput } from '~~/@types'

export interface FormProductFileData {
  name: string
  file: File
}

interface FormProductFileProps {
  active: boolean
  existingProductFile?: ProductFileCreateInternalOutput
}

const props = defineProps<FormProductFileProps>()

const clonedFile = { ...props.existingProductFile }

const reactiveProductFile = reactive({
  name: clonedFile.name,
  file: clonedFile.file,
})

interface FormProductFileEmits {
  (e: 'close'): void
  (e: 'submit', val: FormProductFileData): void
}

const emits = defineEmits<FormProductFileEmits>()

const onClose = () => {
  emits('close')
}

const handleFileUpload = (files: File[]) => {
  const [file] = files
  // @ts-ignore
  reactiveProductFile.file = file
}

const handleSubmitAndClose = () => {
  // @ts-ignore
  emits('submit', reactiveProductFile)
  onClose()
}

const handleSubmitAndAddNew = () => {
  // @ts-ignore
  emits('submit', reactiveProductFile)
  reactiveProductFile.name = null
  reactiveProductFile.file = null
}

// TODO: actually update if there is an existing file sent in
// TODO: clean data and add new
// TODO: Fix @ts-ignores
// TODO: Add notifications
// TODO: Fix sync between file input and parent component
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <ModalSlideOver title="Legg til ny fil" :active="active" @close="onClose">
      <CollapsableSection title="Generelt">
        <Input id="id_name" v-model="reactiveProductFile.name" label="Navn" required />
      </CollapsableSection>
      <CollapsableSection title="Fil">
        <FileUploadInput type="file" @upload="(files) => handleFileUpload(files)" />
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
