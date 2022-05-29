<script setup lang="ts">
import image500x305 from '~~/assets/images/default_500x305.jpeg'
import image660x400 from '~~/assets/images/default_660x400.jpeg'
import image850x520 from '~~/assets/images/default_850x520.jpeg'

/*******************
 ** Generic types **
 *******************/

interface ImageType {
  image500x305: string
  image660x400: string
  image850x520: string
}

/***********
 ** Props **
 ***********/

interface CollectionListItemProps {
  /**
   * Title of the item.
   */
  title: string
  /**
   * Description of item, placed bellow title.
   */
  description: string
  /**
   * If the image is currently loading. Should be when an async request is pending.
   */
  loading?: boolean
  /**
   * Flips item block horizontally, putting text to the right and image to the left.
   */
  reverse?: boolean
  /**
   * Images to display. Uses srcset to toggle between the sizes 850x520,
   * 660x400 and 500x305.
   */
  images?: ImageType
  /**
   * Path to link to.
   */
  to: string
  /**
   * Label of link tag.
   */
  linkLabel: string
}

const props = defineProps<CollectionListItemProps>()

/***********
 ** State **
 ***********/

const defaultImageObj: ImageType = {
  image500x305,
  image660x400,
  image850x520,
}

const imageObj: ImageType = props.images ? props.images : defaultImageObj
</script>

<template>
  <div
    class="lg:grid-cols-5 lg:gap-16 xl:gap-0 grid content-center w-full grid-cols-1 gap-4 mx-auto"
  >
    <div
      class="image-container shrink-0 relative col-span-3 overflow-hidden rounded-md"
      :class="reverse ? 'lg:order-2 order-1 lg:justify-self-end' : 'order-1 lg:justify-self-start'"
    >
      <img
        v-if="!loading"
        :src="imageObj.image850x520"
        alt=""
        class="lg:self-end absolute inset-0 object-cover w-full h-full"
        :srcset="`${imageObj.image500x305} 500w,
                  ${imageObj.image660x400} 660w,
                  ${imageObj.image850x520} 850w`"
      />
      <SkeletonLoader :loading="loading" class="image-container" />
    </div>
    <div
      class="justify-self-center lg:col-span-2 lg:max-w-md self-center order-1 w-full col-span-1"
      :class="reverse ? 'order-2 lg:order-1' : 'order-2'"
    >
      <div class="flex items-center justify-between">
        <Text v-if="!loading" tag="h1" variant="title4">{{ title }}</Text>
        <SkeletonLoader v-else :loading="loading" height="h-6" />
        <slot>
          <Link v-if="!loading" :to="to" class="lg:hidden">{{ linkLabel }}</Link>
        </slot>
      </div>
      <div>
        <Text v-if="!loading" variant="body2" class="mt-2 mb-4" color="text-gray-700">
          {{ description }}.
        </Text>
        <div v-else class="mt-2 mb-4">
          <SkeletonLoader :loading="loading" />
          <SkeletonLoader :loading="loading" width="w-3/4" />
          <SkeletonLoader :loading="loading" />
          <SkeletonLoader :loading="loading" width="w-1/2" />
        </div>
      </div>
      <slot>
        <Link v-if="!loading" :to="to" class="lg:inline-flex hidden">{{ linkLabel }}</Link>
        <SkeletonLoader v-else :loading="loading" width="w-1/3" class="lg:inline-flex hidden" />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: 250px;
}

@media (min-width: 640px) {
  .image-container {
    height: 350px;
  }
}

@media (min-width: 768px) {
  .image-container {
    height: 440px;
  }
}

@media (min-width: 1024px) {
  .image-container {
    height: 380px;
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .image-container {
    height: 520px;
    width: 100%;
  }
}
</style>