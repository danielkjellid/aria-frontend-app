<script setup lang="ts">
import {
  DocumentPlusIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'
import { HeartIcon } from '@heroicons/vue/20/solid'

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
}

const props = defineProps<FileUploadInputProps>()

const type = computed(() => (props.type ? props.type : 'file'))
const dragging = ref<boolean>(false)

const filesUploaded = ref([])

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
const createPreviewSrc = (file: File) => URL.createObjectURL(file)

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

const deleteFile = (file: File) => {
  filesUploaded.value = [...filesUploaded.value.filter((f) => f !== file)]
}

const setAsPrimary = (file: any) => {
  const index = filesUploaded.value.findIndex((f) => f === file)

  if (index !== -1) {
    filesUploaded.value.splice(index, 1)
    filesUploaded.value.unshift(file)
  } else {
    filesUploaded.value.unshift(file)
  }
}

interface FileUploadInputBaseEmits {
  (e: 'upload', val: any[]): void
}

const emits = defineEmits<FileUploadInputBaseEmits>()

watch(
  () => filesUploaded.value,
  (_oldValue, _newValue) => {
    emits('upload', filesUploaded.value)
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
      :class="dragging ? 'border-brand-800 border-solid' : 'border-gray-200 border-dashed'"
      @drop.prevent="(e) => onDropUpload(e)"
    >
      <div
        class="flex flex-col items-center justify-center w-full px-4 space-y-4 pointer-events-none"
      >
        <PhotoIcon v-if="type === 'image'" class="w-5 h-5 text-gray-800" />
        <DocumentPlusIcon v-if="type === 'file'" class="w-5 h-5 text-gray-800" />
        <span class="text-sm font-normal text-gray-900">
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

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="filesUploaded && filesUploaded.length" class="mt-4 space-y-5">
        <Text variant="body2" class="font-medium">Opplastinger:</Text>
        <div v-for="file in filesUploaded" :key="file" class="flex flex-col space-y-5">
          <div class="relative flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div v-if="type === 'image'" class="relative">
                <div
                  v-if="file === filesUploaded[0]"
                  class="absolute top-0 right-0 flex items-center justify-center w-6 h-6 -mt-1.5 -mr-1.5 bg-blue-500 rounded-full"
                >
                  <HeartIcon class="w-4 h-4 text-white" />
                </div>
                <img :src="createPreviewSrc(file)" alt="" class="h-14 w-20 rounded-md" />
              </div>
              <div v-else class="h-14 flex items-center justify-center w-20 bg-gray-200 rounded-md">
                <DocumentIcon class="w-5 h-5 text-gray-500" />
              </div>
              <div class="flex flex-col space-y-2">
                <Text variant="body2" class="font-medium">{{ file.name }}</Text>
                <Text variant="body2" muted class="font-light">{{ formatBytes(file.size) }}</Text>
              </div>
            </div>
            <slot />
            <ActionMenu alignment="right">
              <EllipsisHorizontalIcon class="w-5 h-5 text-gray-800" />
              <template #items>
                <ActionMenuSection>
                  <ActionMenuItem
                    v-if="file !== filesUploaded[0] && type === 'image'"
                    as="button"
                    type="button"
                    @click="setAsPrimary(file)"
                  >
                    Sett som forsidebilde
                  </ActionMenuItem>
                  <ActionMenuItem as="button" type="button" @click="deleteFile(file)">
                    Slett
                  </ActionMenuItem>
                </ActionMenuSection>
              </template>
            </ActionMenu>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
