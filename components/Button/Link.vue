<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface LinkProps {
  as?: string
}

const props = defineProps<LinkProps>()

/***********
 ** State **
 ***********/

const elem = computed(() => (props.as ? props.as : resolveComponent('NuxtLink')))
</script>

<template>
  <component
    :is="elem"
    v-bind="$attrs"
    class="decoration-brand-900 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent hover:text-brand-800 inline-flex items-center flex-shrink-0 text-sm font-medium text-gray-900 rounded-sm appearance-none cursor-pointer"
  >
    <slot /> →
  </component>
</template>
