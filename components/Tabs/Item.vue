<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

/***********
 ** Props **
 ***********/

interface TabItemProps {
  to: RouteLocationRaw
  active?: boolean
}

defineProps<TabItemProps>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="whitespace-nowrap flex px-1 py-4 text-sm font-medium border-b-2"
    :class="
      active
        ? 'text-brand-800 border-brand-700'
        : 'hover:text-gray-700 text-gray-500 hover:border-gray-300 border-transparent'
    "
    aria-current="active ? 'page' : undefined"
  >
    <slot />
  </NuxtLink>
</template>
