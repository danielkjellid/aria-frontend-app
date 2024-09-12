<script setup lang="ts">
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

interface FileUploadUploadedBlockGenericItemProps {
  name?: string
  highlight?: any
}

defineProps<FileUploadUploadedBlockGenericItemProps>()
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
        <div
          class="h-14 flex items-center justify-center w-20 text-base font-medium text-gray-600 bg-gray-100 rounded-md"
        >
          {{ highlight }}
        </div>
        <div class="flex flex-col space-y-2">
          <Text variant="body2" class="font-medium">{{ name }}</Text>
          <Text variant="body2" muted class="font-light"><slot /></Text>
        </div>
      </div>
      <ActionMenu alignment="right">
        <EllipsisHorizontalIcon class="w-5 h-5 text-gray-800" />
        <template #items>
          <slot name="actions" />
        </template>
      </ActionMenu>
    </div>
  </Transition>
</template>
