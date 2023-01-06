<script setup lang="ts">
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { EyeIcon, PlusCircleIcon } from '@heroicons/vue/20/solid'
import formatBytes from './utils'

interface FileUploadUploadedBlockImageItemProps {
  name?: string
  file: File
  isPrimaryImage?: boolean
  hasAppliedFilter?: boolean
}

defineProps<FileUploadUploadedBlockImageItemProps>()

const createPreviewSrc = (file: File) => URL.createObjectURL(file)

interface FileUploadUploadedBlockEmits {
  (e: 'delete'): void
  (e: 'setPrimary'): void
  (e: 'removePrimary'): void
  (e: 'addFilter'): void
  (e: 'removeFilter'): void
}

const emits = defineEmits<FileUploadUploadedBlockEmits>()

const setAsPrimary = () => {
  emits('setPrimary')
}

const removeAsPrimary = () => {
  emits('removePrimary')
}

const applyFilter = () => {
  emits('addFilter')
}

const removeFilter = () => {
  emits('removeFilter')
}

const deleteFile = () => {
  emits('delete')
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div class="relative flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="relative">
          <div
            v-if="isPrimaryImage || hasAppliedFilter"
            class="absolute top-0 right-0 flex-col -mt-1.5 -mr-1.5 space-y-1"
          >
            <span
              v-if="isPrimaryImage"
              class="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
              <PlusCircleIcon class="w-4 h-4 text-white" />
            </span>
            <span
              v-if="hasAppliedFilter"
              class="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
              <EyeIcon class="w-4 h-4 text-white" />
            </span>
          </div>
          <img :src="createPreviewSrc(file)" alt="" class="h-14 object-cover w-20 rounded-md" />
        </div>
        <div class="flex flex-col space-y-2">
          <Text variant="body2" class="font-medium">{{ name ? name : file.name }}</Text>
          <Text variant="body2" muted class="font-light">{{ formatBytes(file.size) }}</Text>
        </div>
      </div>
      <ActionMenu alignment="right">
        <EllipsisHorizontalIcon class="w-5 h-5 text-gray-800" />
        <template #items>
          <ActionMenuSection>
            <ActionMenuItem v-if="!isPrimaryImage" as="button" type="button" @click="setAsPrimary">
              Sett som forsidebilde
            </ActionMenuItem>
            <ActionMenuItem
              v-if="isPrimaryImage"
              as="button"
              type="button"
              @click="removeAsPrimary"
            >
              Fjern forsidebilde
            </ActionMenuItem>
            <ActionMenuItem v-if="!hasAppliedFilter" as="button" type="button" @click="applyFilter">
              Legg til filter
            </ActionMenuItem>
            <ActionMenuItem v-if="hasAppliedFilter" as="button" type="button" @click="removeFilter">
              Fjern filter
            </ActionMenuItem>
          </ActionMenuSection>
          <ActionMenuSection>
            <ActionMenuItem as="button" type="button" @click="deleteFile"> Slett </ActionMenuItem>
          </ActionMenuSection>
        </template>
      </ActionMenu>
    </div>
  </Transition>
</template>
