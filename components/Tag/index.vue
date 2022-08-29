<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface TagProps {
  /**
   * Size of tag. Can be sm, md or lg.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Shape of tag. Make it a full pill or just with rounded corners.
   */
  shape?: 'square' | 'circle'
}

const props = defineProps<TagProps>()

const size = computed(() => (props.size ? props.size : 'md'))
const shape = computed(() => (props.shape ? props.shape : 'square'))

/***********
 ** Emits **
 ***********/

interface TagEmits {
  (e: 'remove'): void
}

const emits = defineEmits<TagEmits>()

const onTagRemove = () => {
  emits('remove')
}
</script>

<template>
  <span
    class="inline-flex items-center font-medium text-blue-700 bg-indigo-100"
    :class="[
      {
        'rounded-md': shape === 'square',
        'rounded-full': shape === 'circle',
      },
      {
        'py-0.5 pl-2 pr-0.5 text-xs': size === 'sm',
        'py-0.5 pl-2.5 pr-1 text-sm': size === 'md',
        'py-1 pl-2.5 pr-1 text-sm': size === 'lg',
      },
    ]"
  >
    <slot>Tag</slot>
    <button
      type="button"
      class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
      @click="onTagRemove"
    >
      <span class="sr-only">Remove tag</span>
      <svg class="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </span>
</template>
