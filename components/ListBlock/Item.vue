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

const props = defineProps<ListBlockItemProps>()
const elem = computed(() => (props.as ? props.as : 'div'))
const loading = computed(() => (props.loading ? props.loading : false))
</script>

<template>
  <li class="flex">
    <component :is="elem" v-if="!loading" v-bind="$attrs">
      <slot />
    </component>
    <SkeletonLoader v-else :loading="loading" :count="6" />
  </li>
</template>
