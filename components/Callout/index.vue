<script setup lang="ts">
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/solid'

/***********
 ** Props **
 ***********/

interface CalloutProps {
  /**
   * Initial heading message.
   */
  title: string
  /**
   * The callout variant.
   */
  variant?: 'success' | 'info' | 'warning' | 'danger'
  /**
   * Bullet points to provide additional context if needed.
   */
  context?: string[]
}

const props = defineProps<CalloutProps>()

/*********************
 ** Props: defaults **
 *********************/

const variant = computed(() => (props.variant ? props.variant : 'danger'))
</script>

<template>
  <div
    class="p-4 text-left rounded-md"
    :class="{
      'bg-red-50': variant === 'danger',
      'bg-yellow-50': variant === 'warning',
      'bg-blue-50': variant === 'info',
      'bg-green-50': variant === 'success',
    }"
  >
    <div class="flex">
      <div class="shrink-0">
        <XCircleIcon v-if="variant === 'danger'" class="w-5 h-5 text-red-400" />
        <ExclamationCircleIcon v-else-if="variant === 'warning'" class="w-5 h-5 text-yellow-400" />
        <InformationCircleIcon v-else-if="variant === 'info'" class="w-5 h-5 text-blue-400" />
        <CheckCircleIcon v-else-if="variant === 'success'" class="w-5 h-5 text-green-400" />
      </div>
      <div class="ml-3">
        <h3
          class="text-sm font-semibold leading-5 text-red-800"
          :class="{
            'text-red-800': variant === 'danger',
            'text-yellow-700': variant === 'warning',
            'text-blue-800': variant === 'info',
            'text-green-800': variant === 'success',
          }"
        >
          {{ title }}
        </h3>
        <div
          class="mt-2 text-sm leading-5"
          :class="{
            'text-red-700': variant === 'danger',
            'text-yellow-700': variant === 'warning',
            'text-blue-700': variant === 'info',
            'text-green-700': variant === 'success',
          }"
        >
          <slot />
          <ul v-if="context && context.length" class="pl-5 list-disc">
            <li v-for="c in context" :key="c" class="mt-1">
              <span>
                {{ c }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
