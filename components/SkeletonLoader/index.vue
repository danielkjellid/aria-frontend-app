<script setup lang="ts">
/**
 * The skeleton loader is used to give a visual feedback to
 * the user that content is loading.
 */

/***********
 ** Props **
 ***********/

interface SkeletonLoaderProps {
  /**
   * Loading state, will display the skeleton loader.
   */
  loading: boolean
  /**
   * Decides whether or not skeleton loader will pulsate.
   */
  height?: string
  /**
   * Css class deciding the width.
   */
  width?: string
  /**
   * Shape of the loader itself.
   */
  shape?: 'square' | 'circle'
  /**
   * Number of shapes to render.
   */
  count?: number
}

const props = defineProps<SkeletonLoaderProps>()

const loaderCount = props.count ? props.count : 1
const loaderShape = props.shape ? props.shape : 'square'
</script>

<template>
  <div
    v-if="loading"
    class="inline-flex flex-col space-y-2 align-middle"
    :class="[width ? width : 'w-full', height ? height : 'h-4']"
  >
    <div
      v-for="i in loaderCount"
      :key="i"
      class="skeleton animate-loading w-full h-full"
      :class="[
        {
          'rounded-full': loaderShape === 'circle',
          rounded: loaderShape === 'square',
        },
      ]"
    />
  </div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    rgb(156, 163, 175) 25%,
    rgba(156, 163, 175, 0.5) 50%,
    rgb(156, 163, 175) 75%
  );
  background-size: 400% 100%;
  width: 100%;
}
</style>
