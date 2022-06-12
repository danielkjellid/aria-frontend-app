<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface LinkProps {
  as?: string
  variant?: 'primary' | 'secondary'
}

const props = defineProps<LinkProps>()

/***********
 ** State **
 ***********/

const elem = computed(() => (props.as ? props.as : resolveComponent('NuxtLink')))
const variant = computed(() => (props.variant ? props.variant : 'primary'))
</script>

<template>
  <component
    :is="elem"
    v-bind="$attrs"
    class="underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-transparent inline-flex items-center flex-shrink-0 text-sm font-medium rounded-sm appearance-none cursor-pointer"
    :class="[
      {
        'decoration-brand-900 focus:ring-brand-800 hover:text-brand-800 text-gray-900':
          variant === 'primary',
      },
      {
        'decoration-white focus:ring-gray-200 hover:ring-gray-200 text-gray-100':
          variant === 'secondary',
      },
    ]"
  >
    <slot /> →
  </component>
</template>
