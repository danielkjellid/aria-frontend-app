<script setup lang="ts">
import { DocumentPlusIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import { FileType } from './types'

interface FileUploadInputProps {
  /**
   * Sets the label itself.
   */
  id: string
  /**
   * Sets the label itself.
   */
  label?: string
  /**
   * Sets the label to screen reader only.
   */
  hiddenLabel?: boolean
  /**
   * Designates if the field is required or not. Note, this is purely aesthetic,
   * validation still has to be performed outside this component.
   */
  required?: boolean
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
   * Allow to set the a filter per image of image type input.
   */
  allowSetFilter?: boolean
  /**
   * Field error as string.
   */
  error?: string
  files?: FileType[]
}

const props = defineProps<FileUploadInputProps>()

const type = computed(() => (props.type ? props.type : 'file'))
const dragging = ref<boolean>(false)

const filesUploaded = ref(props.files ? [...props.files] : [])

const uploadFiles = (files: FileList) => {
  const constructFiles = []
  Array.from(files).forEach((f) => constructFiles.push({ file: f }))

  if (props.multiple) {
    filesUploaded.value = [...filesUploaded.value, ...constructFiles]
  } else if (files.length > 1) {
    filesUploaded.value = [constructFiles[0]]
  } else {
    filesUploaded.value = [...constructFiles]
  }

  emits('upload', filesUploaded.value)
}

const onFileUpload = (e: any) => {
  uploadFiles(e.target.files)
}

const onDropUpload = (e: any) => {
  uploadFiles(e.dataTransfer.files)
}

const deleteFile = (fileType: FileType) => {
  filesUploaded.value = [...filesUploaded.value.filter((f) => f.file !== fileType.file)]
  emits('upload', [...filesUploaded.value])
}

const setAsPrimary = (fileType: FileType) => {
  const index = filesUploaded.value.findIndex((f) => f.file === fileType.file)

  // Remove isMainImage from other candidate(s).
  filesUploaded.value.forEach((ft, i) => {
    if (ft.isMainImage) {
      filesUploaded.value[i] = { ...ft, isMainImage: false }
    }
  })

  if (index !== -1) {
    filesUploaded.value[index] = { ...fileType, isMainImage: true }
  } else {
    filesUploaded.value.push({ ...fileType, isMainImage: true })
  }
  emits('upload', filesUploaded.value)
}

const removeAsPrimary = (fileType: FileType) => {
  const index = filesUploaded.value.findIndex((f) => f.file === fileType.file)
  filesUploaded.value[index] = { ...fileType, isMainImage: false }
  emits('upload', filesUploaded.value)
}

const setAsApplyFilter = (fileType: FileType) => {
  const index = filesUploaded.value.findIndex((f) => f.file === fileType.file)
  filesUploaded.value[index] = { ...fileType, applyFilter: true }
  emits('upload', filesUploaded.value)
}

const removeAsApplyFilter = (fileType: FileType) => {
  const index = filesUploaded.value.findIndex((f) => f.file === fileType.file)
  filesUploaded.value[index] = { ...fileType, applyFilter: false }
  emits('upload', filesUploaded.value)
}

interface FileUploadInputBaseEmits {
  (e: 'upload', val: FileType[]): void
}

const emits = defineEmits<FileUploadInputBaseEmits>()
</script>

<template>
  <div>
    <FormElementBase
      :id="id"
      :label="label"
      :hidden-label="hiddenLabel"
      :error="error"
      :required="required"
      :help-text="helpText"
      :word-count="null"
      v-bind="$attrs"
    >
      <div
        v-show="multiple || (!multiple && !filesUploaded.length)"
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
              :class="error && !dragging ? 'text-red-400' : 'text-gray-500'"
            />
            <DocumentPlusIcon
              v-if="type === 'file'"
              class="w-5 h-5"
              :class="error && !dragging ? 'text-red-400' : 'text-gray-500'"
            />
            <span
              class="text-sm font-normal"
              :class="error && !dragging ? 'text-red-500' : 'text-gray-500'"
            >
              Slipp {{ type === 'file' ? 'filer' : 'bilder' }} her, eller klikk for å bla gjennom
              lokale filer
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
      </div>
    </FormElementBase>
    <FileUploadUploadedBlock v-if="files.length" class="mt-5">
      <div v-for="(fileType, index) in files" :key="index">
        <FileUploadUploadedBlockImageItem
          v-if="type === 'image'"
          :file="fileType.file"
          :is-primary-image="fileType.isMainImage"
          :has-applied-filter="fileType.applyFilter"
          :allow-set-primary="allowSetPrimary"
          :allow-set-filter="allowSetFilter"
          @set-primary="setAsPrimary(fileType)"
          @remove-primary="removeAsPrimary(fileType)"
          @add-filter="setAsApplyFilter(fileType)"
          @remove-filter="removeAsApplyFilter(fileType)"
          @delete="deleteFile(fileType)"
        />
        <FileUploadUploadedBlockFileItem
          v-else
          :file="fileType.file"
          @delete="deleteFile(fileType)"
        />
      </div>
    </FileUploadUploadedBlock>
  </div>
</template>
