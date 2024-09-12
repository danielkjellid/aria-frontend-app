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
  dismissible?: boolean
  variant?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'
}

const props = defineProps<TagProps>()

const size = computed(() => (props.size ? props.size : 'md'))
const shape = computed(() => (props.shape ? props.shape : 'square'))
const dismissible = computed(() => (props.dismissible ? props.dismissible : false))
const variant = computed(() => (props.variant ? props.variant : 'blue'))

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
    class="shrink-0 inline-flex items-center font-medium"
    :class="[
      {
        'bg-gray-100 text-gray-800': variant === 'gray',
        'bg-red-100 text-red-800': variant === 'red',
        'bg-yellow-100 text-yellow-800': variant === 'yellow',
        'bg-green-100 text-green-800': variant === 'green',
        'bg-blue-100 text-blue-800': variant === 'blue',
        'bg-indigo-100 text-indigo-800': variant === 'indigo',
        'bg-purple-100 text-purple-800': variant === 'purple',
        'bg-pink-100 text-pink-800': variant === 'pink',
      },
      {
        'rounded-md': shape === 'square',
        'rounded-full': shape === 'circle',
      },
      {
        'py-0.5 pl-2 pr-0.5 text-xs': size === 'sm' && dismissible,
        'py-0.5 pl-2.5 pr-1 text-sm': size === 'md' && dismissible,
        'py-1.5 pl-2.5 pr-1 text-sm': size === 'lg' && dismissible,
        'py-0.5 px-2 text-xs': size === 'sm' && !dismissible,
        'py-0.5 px-2.5 text-sm': size === 'md' && !dismissible,
        'py-1.5 px-2.5 text-sm': size === 'lg' && !dismissible,
      },
    ]"
  >
    <slot>Tag</slot>
    <button
      v-if="dismissible"
      type="button"
      class="hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white inline-flex items-center justify-center flex-shrink-0 w-4 h-4 ml-1 text-blue-400 rounded-full"
      @click="onTagRemove"
    >
      <span class="sr-only">Remove tag</span>
      <svg class="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </span>
</template>
