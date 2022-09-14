<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid'

/***********
 ** Props **
 ***********/

export interface ButtonProps {
  size?: 's' | 'm' | 'l'
  variant?:
    | 'primary'
    | 'primaryDanger'
    | 'secondary'
    | 'secondaryDanger'
    | 'tertiary'
    | 'outlined'
    | 'transparent'
  to?: string
  as?: string
  loadingState?: 'initial' | 'loading' | 'error' | 'success'
  fluid?: boolean
  alignSelf?: 'auto' | 'left' | 'right' | 'center' | 'stretch' | 'baseline'
  disabled?: boolean
}

const props = defineProps<ButtonProps>()

/***********
 ** Slots **
 ***********/

const slots = useSlots()
const rightIcon = computed(() => !!slots.rightIcon)
const leftIcon = computed(() => !!slots.leftIcon)

/**************
 ** Defaults **
 **************/

const size = computed(() => (props.size ? props.size : 'm'))
const variant = computed(() => (props.variant ? props.variant : 'primary'))
const alignSelf = computed(() => (props.alignSelf ? props.alignSelf : 'center'))

const elem = computed(() => {
  if (props.as) return props.as
  if (props.to) return resolveComponent('NuxtLink')

  return 'button'
})
</script>

<template>
  <component
    :is="elem"
    :to="to"
    :aria-disabled="disabled ? 'true' : 'false'"
    :disabled="disabled"
    class="focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center text-sm font-semibold leading-5 border rounded-md shadow-sm appearance-none cursor-pointer"
    :class="[
      fluid ? 'w-full' : 'w-auto',
      {
        'hover:bg-brand-900 focus:ring-brand-800 text-white bg-brand-800 border-brand-900':
          variant === 'primary' && !disabled,
        'hover:bg-red-800 focus:ring-red-800 text-white bg-red-700 border-red-800':
          variant === 'primaryDanger' && !disabled,
        'hover:bg-brand-100 focus:ring-brand-800 text-brand-800 bg-white border-brand-300':
          variant === 'secondary' && !disabled,
        'hover:bg-red-100 focus:ring-red-600 text-red-600 bg-white border-red-500':
          variant === 'secondaryDanger' && !disabled,
        'hover:bg-black hover:bg-opacity-25 focus:ring-white focus:bg-opacity-25 text-white bg-transparent border-white':
          variant === 'outlined' && !disabled,
        'hover:bg-gray-200 focus:ring-brand-800 text-gray-600 bg-gray-100 border-gray-200':
          variant === 'tertiary' && !disabled,
        'bg-white bg-opacity-20 hover:bg-opacity-10 border border-transparent focus:ring-transparent text-white focus:bg-opacity-10':
          variant === 'transparent' && !disabled,
        'px-3 py-1.5': size === 's',
        'px-4 py-2': size === 'm',
        'px-5 py-3': size === 'l',
        'self-auto': !alignSelf || alignSelf === 'auto',
        'self-start': alignSelf === 'left',
        'self-end': alignSelf === 'right',
        'self-center': alignSelf === 'center',
        'self-stretch': alignSelf === 'stretch',
        'self-baseline': alignSelf === 'baseline',
        'bg-white bg-opacity-5 border-transparent text-gray-100 cursor-not-allowed':
          variant === 'transparent' && disabled,
        'bg-gray-50 text-gray-400 cursor-not-allowed': disabled,
      },
    ]"
  >
    <div v-if="leftIcon" class="mr-2 -ml-1">
      <slot name="leftIcon" />
    </div>
    <slot>Button</slot>
    <div
      v-if="(loadingState && loadingState !== 'initial') || rightIcon"
      class="flex items-center ml-2 -mr-1"
    >
      <slot name="rightIcon" />
      <div v-if="loadingState === 'loading' && !rightIcon" class="flex items-center w-5 h-5">
        <svg
          :class="{
            'text-white':
              variant === 'primary' || variant === 'primaryDanger' || variant === 'outlined',
            'text-brand-700': variant === 'secondary',
            'text-red-600': variant === 'secondaryDanger',
          }"
          class="animate-spin w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <ExclamationCircleIcon
        v-else-if="loadingState === 'error' && !rightIcon"
        :class="{
          'text-white':
            variant === 'primary' || variant === 'primaryDanger' || variant === 'outlined',
          'text-brand-700': variant === 'secondary',
          'text-red-600': variant === 'secondaryDanger',
        }"
        class="w-5 h-5 text-white"
      />
      <CheckCircleIcon
        v-else-if="loadingState === 'success' && !rightIcon"
        :class="{
          'text-white':
            variant === 'primary' || variant === 'primaryDanger' || variant === 'outlined',
          'text-brand-700': variant === 'secondary',
          'text-red-600': variant === 'secondaryDanger',
        }"
        class="w-5 h-5 text-white"
      />
    </div>
  </component>
</template>
