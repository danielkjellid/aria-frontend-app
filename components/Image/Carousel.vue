<script setup lang="ts">
import { BaseHeaderImageRecord } from '~~/@types/generated/dist'

interface ImageCarouselProps {
  images?: BaseHeaderImageRecord[]
}

const props = defineProps<ImageCarouselProps>()

const showingIndex = ref<number>(0)

const next = () => {
  // show the next image if the current index is within the array
  if (showingIndex.value < props.images.length - 1) {
    showingIndex.value += 1

    // if not, reset the count
  } else {
    showingIndex.value = 0
  }
}

const previous = () => {
  // if the first image is displayed, set the index to the last
  // this is to prevent a negative index
  if (showingIndex.value === 0) {
    showingIndex.value = props.images.length - 1

    // if not, show the previous image
  } else {
    showingIndex.value -= 1
  }
}
</script>

<template>
  <section v-if="images">
    <Image
      v-for="(image, index) in images"
      :key="`carousel-image-${index}`"
      :images="image"
      :class="showingIndex === index ? 'block' : 'hidden'"
    >
      <ImageCarouselControls
        :index-range="images.length"
        :current-showing-index="showingIndex"
        @next="next"
        @previous="previous"
      />
    </Image>
  </section>
</template>
