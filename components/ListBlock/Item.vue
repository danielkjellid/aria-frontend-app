<script setup lang="ts">
/**
* `ListBlockItem` is a simple component which basically just renders items  of 
an unordered list.
*/

/***********
 ** Props **
 ***********/

interface ListBlockItemProps {
  as?: string
  loading?: boolean
}

const { as = 'div', loading = false } = defineProps<ListBlockItemProps>()
</script>

<template>
  <li class="flex">
    <component v-if="!loading" :is="as" v-bind="$attrs">
      <slot />
    </component>
    <SkeletonLoader v-else :loading="loading" :count="6" />
  </li>
</template>
