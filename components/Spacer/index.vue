<script setup lang="ts">
interface SpacerProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = defineProps<SpacerProps>()

const spacing = computed(() => (props.spacing ? props.spacing : 'md'))
</script>

<template>
  <div
    :class="{
      'py-2': spacing === 'xs',
      'py-4': spacing === 'sm',
      'py-5': spacing === 'md',
      'py-8': spacing === 'lg',
      'py-12': spacing === 'xl',
      'py-20': spacing === '2xl',
    }"
  />
</template>
