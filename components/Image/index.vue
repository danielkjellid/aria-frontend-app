<script setup lang="ts">
import { BaseHeaderImageRecord } from '~~/@types/generated/dist'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import image512x512 from '~~/assets/images/default_512x512.jpeg'
import image640x275 from '~~/assets/images/default_640x275.jpeg'
import image1024x1024 from '~~/assets/images/default_1024x1024.jpeg'
import image1024x575 from '~~/assets/images/default_1024x575.jpeg'
import image1536x860 from '~~/assets/images/default_1536x860.jpeg'
import image2048x1150 from '~~/assets/images/default_2048x1150.jpeg'

/***********
 ** Props **
 ***********/

interface ImageProps {
  /**
   * Title of the image to be displayed.
   */
  title?: string
  /**
   * Subtitle of the image to be displayed.
   */
  subtitle?: string
  /**
   * If the image is currently loading. True when a request is pending.
   */
  loading?: boolean
  /**
   * Images to display. Uses srcset to toggle between the sizes 2048x1150,
   * 1536x860, 1024x575, 1024x1024, 640x275 and 512x512.
   */
  images?: BaseHeaderImageRecord
}

const props = defineProps<ImageProps>()

/***********
 ** Emits **
 ***********/

interface ImageEmits {
  (e: 'navigate-to-content'): void
}

const emits = defineEmits<ImageEmits>()

const onNavigateToContent = () => {
  emits('navigate-to-content')
}

/***********
 ** State **
 ***********/

// Replace all missing image srcset sizes with defaults if missing.
const imageObj = computed(
  () =>
    replaceWithDefaults(
      {
        applyFilter: false,
        image512x512,
        image640x275,
        image1024x1024,
        image1024x575,
        image1536x860,
        image2048x1150,
      },
      props.images
    ) as BaseHeaderImageRecord
)
</script>

<template>
  <article class="image-full-container relative col-span-2 overflow-hidden">
    <!-- The image itself. -->
    <div v-if="!loading">
      <div class="table-cell align-middle">
        <img
          class="absolute inset-0 object-cover w-full h-full"
          :src="imageObj.image2048x1150"
          alt=""
          :srcset="`${imageObj.image512x512} 512w,
                  ${imageObj.image640x275} 640w,
                  ${imageObj.image1024x1024} 1024w,
                  ${imageObj.image1024x575} 1024w,
                  ${imageObj.image1536x860} 1536w,
                  ${imageObj.image2048x1150} 2048w`"
        />
      </div>
      <!-- Filter overlay -->
      <div v-if="imageObj.applyFilter" class="opacity-20 absolute inset-0 bg-black" />
      <!-- Vertically and horizontally centered text (name) -->
      <div
        v-if="title"
        class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4"
      >
        <div class="text-center">
          <h2 class="text-3xl font-medium text-white">{{ title }}</h2>
          <h3 v-if="subtitle" class="mt-3 text-xl text-white">
            {{ subtitle }}
          </h3>
        </div>
      </div>
      <!-- Action aligned horizontally centered towards the bottom of the image. -->
      <!-- Defaults to a chevron bouncing up and down that navigates to content on click. -->
      <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
        <slot>
          <IconWrapper as="button" transparent-bg @click="onNavigateToContent">
            <ChevronDownIcon class="hover:text-gray-300 animate-bounce-slow w-12 h-12 text-white" />
          </IconWrapper>
        </slot>
      </div>
    </div>
    <SkeletonLoader
      v-else
      loading
      class="image-full-container relative col-span-2 overflow-hidden"
      :count="1"
    />
  </article>
</template>

<style scoped>
.image-full-container {
  height: 375px;
  width: 100%;
}

@media (min-width: 640px) {
  .image-full-container {
    height: 330px;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .image-full-container {
    height: 370px;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .image-full-container {
    height: 575px;
    width: 100%;
  }
}

@media (min-width: 1536px) {
  .image-full-container {
    height: 860px;
    width: 100%;
  }
}

@media (min-width: 2048px) {
  .image-full-container {
    height: 1150px;
    width: 100%;
  }
}
</style>
