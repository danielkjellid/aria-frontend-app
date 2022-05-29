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

const props = defineProps<ListBlockProps>()

/**************
 ** Defaults **
 **************/

const labelAs = computed(() => (props.labelAs ? props.labelAs : 'p'))
const loading = computed(() => (props.loading ? props.loading : false))
</script>

<template>
  <div>
    <component
      :is="labelAs"
      v-if="!loading"
      v-bind="$attrs"
      class="font-medium text-gray-900"
      :class="labelClass"
    >
      {{ label }}
    </component>
    <SkeletonLoader v-else :loading="loading" width="w-24" />

    <ul class="mt-6 space-y-6" :class="listClass">
      <slot />
    </ul>
  </div>
</template>
