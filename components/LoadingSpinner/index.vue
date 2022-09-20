<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface LoadingSpinnerProps {
  /**
   * Width of the spinner. Should be equal to height if set.
   */
  width?: string
  /**
   * Height of the spinner. Should be equal to width if set.
   */
  height?: string
}

const props = defineProps<LoadingSpinnerProps>()

/**************
 ** Defaults **
 **************/

const width = computed(() => (props.width ? props.width : 'w-12'))
const height = computed(() => (props.height ? props.height : 'h-12'))
</script>

<template>
  <svg
    class="spinner"
    :class="[width, height]"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      fill="none"
      stroke-width="6"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
</template>

<style scoped>
.spinner {
  animation: circle-rotator 1.4s linear infinite;
}

@keyframes circle-rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  line-height: 0;
  box-sizing: border-box;
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: #2d3748;
  animation: circle-dash 1.4s ease-in-out infinite;
}

@keyframes circle-dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
