<script setup lang="ts">
/**
* `ListBlock` is a simple component which basically just renders an unordered 
list with a label, and WCAG appropriate attributes. The `ListBlockItem` blocks 
can be anything.
*/

/***********
 ** Props **
 ***********/

interface ListBlockProps {
  labelAs?: string
  label: string
  labelClass?: string
  loading?: boolean
  listClass?: string
  to?: string
}

const props = defineProps<ListBlockProps>()

/**************
 ** Defaults **
 **************/

const loading = computed(() => (props.loading ? props.loading : false))
const elem = computed(() => (props.to ? resolveComponent('NuxtLink') : 'p'))
</script>

<template>
  <div>
    <component
      :is="elem"
      v-if="!loading"
      class="font-medium text-gray-900"
      :class="labelClass"
      :to="to"
    >
      {{ label }}
    </component>
    <SkeletonLoader v-else :loading="loading" width="w-24" />

    <ul class="mt-6 space-y-6" :class="listClass">
      <slot />
    </ul>
  </div>
</template>
