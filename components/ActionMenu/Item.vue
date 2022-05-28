<script setup lang="ts">
interface ActionMenuItemProps {
  as?: string
}

const { as = 'router-link' } = defineProps<ActionMenuItemProps>()
</script>

<template>
  <component
    :is="as"
    class="hover:text-brand-800 hover:bg-gray-100 group flex items-center px-4 py-2 text-sm text-gray-700"
  >
    <slot />
  </component>
</template>
