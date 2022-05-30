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
      'my-2': spacing === 'xs',
      'my-4': spacing === 'sm',
      'my-5': spacing === 'md',
      'my-8': spacing === 'lg',
      'my-12': spacing === 'xl',
      'my-20': spacing === '2xl',
    }"
  />
</template>
