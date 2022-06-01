<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/solid' // eslint-disable-line

/***********
 ** Props **
 ***********/

interface BreadcrumbsItemProps {
  as?: string
  active?: boolean
  loading?: boolean
}

const props = defineProps<BreadcrumbsItemProps>()

/***********
 ** State **
 ***********/

const elem = computed(() => (props.as ? props.as : 'router-link'))
</script>

<template>
  <li>
    <div class="flex items-center">
      <SkeletonLoader v-if="loading" width="w-24" loading />
      <component
        :is="elem"
        v-else
        v-bind="$attrs"
        :aria-current="active ? 'page' : undefined"
        class="mr-2 text-sm font-medium"
        :class="
          active
            ? 'text-brand-600 cursor-not-allowed'
            : 'hover:text-brand-600 text-brand-800 cursor-pointer'
        "
      >
        <slot />
      </component>
      <ChevronRightIcon
        v-if="!active"
        class="flex-shrink-0 w-5 h-5 text-gray-400"
        aria-hidden="true"
      />
    </div>
  </li>
</template>
