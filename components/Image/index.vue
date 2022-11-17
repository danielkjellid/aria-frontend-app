<script setup lang="ts">
import { BaseHeaderImageRecord } from '~~/@types'
import image640x360Url from '~~/assets/images/default_640x360.jpeg'
import image768x432Url from '~~/assets/images/default_768x432.jpeg'
import image960x540Url from '~~/assets/images/default_960x540.jpeg'
import image1024x576Url from '~~/assets/images/default_1024x576.jpeg'
import image1280x720Url from '~~/assets/images/default_1280x720.jpeg'
import image1440x810Url from '~~/assets/images/default_1440x810.jpeg'
import image1920x1080Url from '~~/assets/images/default_1920x1080.jpeg'

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
   * Images to display. Uses srcset to toggle between the sizes of the BaseHeaderImageRecord.
   */
  images?: BaseHeaderImageRecord
}

const props = defineProps<ImageProps>()

/***********
 ** State **
 ***********/

// Replace all missing image srcset sizes with defaults if missing.
const imageObj = computed(
  () =>
    replaceWithDefaults(
      {
        isMainImage: true,
        applyFilter: false,
        image640x360Url,
        image768x432Url,
        image960x540Url,
        image1024x576Url,
        image1280x720Url,
        image1440x810Url,
        image1920x1080Url,
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
          :src="imageObj.image1440x810Url"
          alt=""
          :srcset="`${imageObj.image640x360Url} 640w,
                  ${imageObj.image768x432Url} 768w,
                  ${imageObj.image960x540Url} 960w,
                  ${imageObj.image1024x576Url} 1024w,
                  ${imageObj.image1280x720Url} 1280w,
                  ${imageObj.image1440x810Url} 1440w,
                  ${imageObj.image1920x1080Url} 1920w`"
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
          <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="54" viewBox="0 0 32 54">
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                <rect width="30" height="52" stroke="#fff" rx="15"></rect>
                <circle class="animate-mouse-scroll" cx="15" cy="15" r="4" fill="#fff"></circle>
              </g>
            </svg>
          </div>
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
  height: 360px;
  width: 100%;
}

@media (min-width: 768px) {
  .image-full-container {
    height: 432px;
    width: 100%;
  }
}

@media (min-width: 960px) {
  .image-full-container {
    height: 540px;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .image-full-container {
    height: 576px;
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .image-full-container {
    height: 720px;
    width: 100%;
  }
}
</style>
