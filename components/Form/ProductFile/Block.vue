<script setup lang="ts">
import { ProductFile } from './types'

interface FormProductOptionFormBlockEmits {
  (e: 'update', val: ProductFile[]): void
}

const emits = defineEmits<FormProductOptionFormBlockEmits>()

const formActive = ref<boolean>(false)
const filesData = ref<ProductFile[]>([])

const addNewFileData = (fileData: ProductFile) => {
  filesData.value.push(fileData)
}

const deleteFile = (fileData: ProductFile) => {
  filesData.value = [...filesData.value.filter((fd) => fd !== fileData)]
}

watch(
  () => filesData.value,
  (newValue, _oldValue) => {
    emits('update', newValue)
  }
)
</script>

<template>
  <div>
    <div class="space-y-6">
      <FileUploadUploadedBlock v-if="filesData.length">
        <FileUploadUploadedBlockFileItem
          v-for="fd in filesData"
          :key="fd.name"
          :name="fd.name"
          :file="fd.file"
          @delete="deleteFile(fd)"
        />
      </FileUploadUploadedBlock>
      <div>
        <Button variant="secondary" fluid @click="formActive = true">Legg til filer</Button>
        <p class="mt-3 text-sm font-light text-gray-500">
          Legg til filer som kan hjelpe kunden å få en bedre oversikt over produktets egenskaper.
          For eksempel katalog, tekniske spesifikasjoner, bruksanvisninger osv.
        </p>
      </div>
    </div>
    <FormProductFile
      :active="formActive"
      is-nested
      @close="formActive = false"
      @submit="(fileData) => addNewFileData(fileData)"
    />
  </div>
</template>
