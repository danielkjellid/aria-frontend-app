<script setup lang="ts">
import { ArrowLongRightIcon, ArrowLongLeftIcon } from '@heroicons/vue/20/solid'

/***********
 ** Props **
 ***********/

interface ImageCarouselControlsProps {
  indexRange: number
  currentShowingIndex: number
}

defineProps<ImageCarouselControlsProps>()

/***********
 ** Emits **
 ***********/

interface ImageCarouselControlsEmits {
  (e: 'previous'): void
  (e: 'next'): void
}

const emits = defineEmits<ImageCarouselControlsEmits>()

/***********
 ** State **
 ***********/

const next = () => {
  emits('next')
}

const previous = () => {
  emits('previous')
}
</script>

<template>
  <div v-if="indexRange > 1" class="flex items-center justify-center">
    <IconWrapper
      as="button"
      type="button"
      transparent-bg
      aria-label="previous image"
      class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full"
      @click="previous"
    >
      <ArrowLongLeftIcon class="w-5 h-5" />
    </IconWrapper>
    <div class="flex items-center mx-20 space-x-3">
      <div
        v-for="index in indexRange"
        :key="index"
        class="w-2.5 h-2.5 border border-white rounded-full"
        :class="{ 'bg-white': index - 1 === currentShowingIndex % indexRange }"
      />
    </div>
    <IconWrapper
      as="button"
      type="button"
      transparent-bg
      aria-label="next image"
      class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full"
      @click="next"
    >
      <ArrowLongRightIcon class="w-5 h-5" />
    </IconWrapper>
  </div>
</template>
