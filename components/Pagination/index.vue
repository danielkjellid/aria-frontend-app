<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/outline'

interface PaginationProps {
  /**
   * Current page that's being displayed.
   */
  currentPage: number | string
  /**
   * Total number of pages.
   */
  totalPages: number | string

  /**
   * Current instance range. E.g showing 1 - 6.
   */
  currentRange: string
  /**
   * Total number of instances.
   */
  total: number | string
}

defineProps<PaginationProps>()

interface PaginationEmits {
  (e: 'previous'): void
  (e: 'next'): void
}

const emits = defineEmits<PaginationEmits>()
</script>

<template>
  <div class="flex items-center justify-between">
    <Text as="span" variant="body2">{{ currentRange }} av {{ total }}</Text>
    <div class="flex items-center space-x-5">
      <button
        v-if="currentPage !== 1 && currentPage !== '1'"
        type="button"
        class="hover:text-gray-900 text-gray-800"
        @click="emits('previous')"
      >
        <ArrowLeftIcon class="w-5 h-5" />
      </button>
      <Text as="span" variant="body2">{{ currentPage }} av {{ totalPages }}</Text>
      <button
        v-if="currentPage !== totalPages"
        type="button"
        class="hover:text-gray-900 text-gray-800"
        @click="emits('next')"
      >
        <ArrowRightIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
