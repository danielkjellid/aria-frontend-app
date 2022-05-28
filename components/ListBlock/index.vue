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
}

const { labelAs = 'p', loading = false } = defineProps<ListBlockProps>()
</script>

<template>
  <div>
    <component
      v-if="!loading"
      :is="labelAs"
      v-bind="$attrs"
      class="font-medium text-gray-900"
      :class="labelClass"
    >
      {{ label }}
    </component>
    <SkeletonLoader v-else :loading="loading" width="w-24" />

    <ul role="list" class="mt-6 space-y-6" :class="listClass">
      <slot />
    </ul>
  </div>
</template>
