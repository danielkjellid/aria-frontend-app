<script setup lang="ts">
import { DocumentPlusIcon, PhotoIcon } from '@heroicons/vue/24/outline'

interface FileUploadInputProps {
  /**
   * Determines aesthetic changes such as icons and text used.
   */
  type?: 'file' | 'image'
  /**
   * Allow multiple files to be uploaded simultaneously or just one.
   */
  multiple?: boolean
  /**
   * Additional help text bellow the input.
   */
  helpText?: string
  /**
   * Allow to set the primary image of image type input.
   */
  allowSetPrimary?: boolean
  /**
   * Field error as string.
   */
  error?: string
  files: File[]
}

const props = defineProps<FileUploadInputProps>()

const type = computed(() => (props.type ? props.type : 'file'))
const dragging = ref<boolean>(false)

const filesUploaded = ref(props.files ? [...props.files] : [])

const uploadFiles = (files: FileList) => {
  if (props.multiple) {
    filesUploaded.value = [...filesUploaded.value, ...files]
  } else if (files.length > 1) {
    filesUploaded.value = [files[0]]
  } else {
    filesUploaded.value = [...files]
  }
}

const onFileUpload = (e: any) => {
  uploadFiles(e.target.files)
}

const onDropUpload = (e: any) => {
  uploadFiles(e.dataTransfer.files)
}

const deleteFile = (file: File) => {
  filesUploaded.value = [...filesUploaded.value.filter((f) => f !== file)]
}

const setAsPrimary = (file: any) => {
  const index = filesUploaded.value.findIndex((f) => f === file)

  if (index !== -1) {
    filesUploaded.value.splice(index, 1)
    filesUploaded.value.unshift(file)
    emits('upload', filesUploaded.value)
  } else {
    filesUploaded.value.unshift(file)
    emits('upload', filesUploaded.value)
  }
}

interface FileUploadInputBaseEmits {
  (e: 'upload', val: any[]): void
}

const emits = defineEmits<FileUploadInputBaseEmits>()

watch(
  () => filesUploaded.value,
  (newValue, _oldValue) => {
    emits('upload', newValue)
  }
)
</script>

<template>
  <div
    class="max-w-xl"
    @dragover.prevent
    @drop.prevent="dragging = false"
    @dragenter="dragging = true"
    @dragend="dragging = false"
    @dragleave="dragging = false"
  >
    <label
      class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent h-36 hover:border-brand-800 hover:border-solid flex justify-center w-full bg-white border-2 rounded-lg appearance-none cursor-pointer"
      :class="
        dragging
          ? 'border-brand-800 border-solid'
          : error
          ? 'border-red-300 border-dashed'
          : 'border-gray-200 border-dashed'
      "
      @drop.prevent="(e) => onDropUpload(e)"
    >
      <div
        class="flex flex-col items-center justify-center w-full px-4 space-y-4 pointer-events-none"
      >
        <PhotoIcon
          v-if="type === 'image'"
          class="w-5 h-5"
          :class="error && !dragging ? 'text-red-400' : 'text-gray-800'"
        />
        <DocumentPlusIcon
          v-if="type === 'file'"
          class="w-5 h-5"
          :class="error && !dragging ? 'text-red-400' : 'text-gray-800'"
        />
        <span
          class="text-sm font-normal"
          :class="error && !dragging ? 'text-red-500' : 'text-gray-800'"
        >
          Slipp {{ type === 'file' ? 'filer' : 'bilder' }} her, eller klikk for å bla gjennom lokale
          filer
        </span>
      </div>
      <input
        type="file"
        name="file_upload"
        :multiple="multiple"
        class="hidden"
        @change="(e) => onFileUpload(e)"
      />
    </label>
    <p v-if="helpText" class="mt-2 text-sm font-light text-gray-500">{{ helpText }}</p>
    <p v-if="error" class="relative mt-1 text-sm text-red-600">{{ error }}</p>
    <FileUploadUploadedBlock class="mt-5">
      <div v-for="(file, index) in files" :key="index">
        <FileUploadUploadedBlockImageItem
          v-if="type === 'image'"
          :file="file"
          :selected="file === files[0] && files.length > 1"
          :allow-set-primary="allowSetPrimary"
          @set-primary="setAsPrimary(file)"
          @delete="deleteFile(file)"
        />
        <FileUploadUploadedBlockFileItem v-else :file="file" @delete="deleteFile(file)" />
      </div>
    </FileUploadUploadedBlock>
  </div>
</template>
