<script setup lang="ts">
interface ActionMenuItemProps {
  as?: string
}

const props = defineProps<ActionMenuItemProps>()

const elem = computed(() => (props.as ? props.as : 'router-link'))
</script>

<template>
  <component
    :is="elem"
    class="hover:text-brand-800 hover:bg-gray-100 group flex items-center px-4 py-2 text-sm text-gray-700"
  >
    <slot />
  </component>
</template>
