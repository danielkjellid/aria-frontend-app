<script setup lang="ts">
interface StackProps {
  as?: string
  direction?: 'vertical' | 'horizontal'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  justifyContent?: 'left' | 'right' | 'center' | 'between' | 'around' | 'evenly'
  alignItems?: 'top' | 'bottom' | 'center' | 'baseline' | 'stretch'
}

const props = defineProps<StackProps>()

const elem = computed(() => (props.as ? props.as : 'div'))
const direction = computed(() => (props.direction ? props.direction : 'vertical'))
const spacing = computed(() => (props.spacing ? props.spacing : 'md'))
const justifyContent = computed(() => (props.justifyContent ? props.justifyContent : 'left'))
const alignItems = computed(() => (props.alignItems ? props.alignItems : 'top'))
</script>

<template>
  <component
    :is="elem"
    class="flex w-full h-full"
    :class="[
      direction === 'vertical' ? 'flex-col' : 'flex-row',
      {
        'space-y-2': direction === 'vertical' && spacing === 'xs',
        'space-y-4': direction === 'vertical' && spacing === 'sm',
        'space-y-5': direction === 'vertical' && spacing === 'md',
        'space-y-8': direction === 'vertical' && spacing === 'lg',
        'space-y-12': direction === 'vertical' && spacing === 'xl',
        'space-x-2': direction === 'horizontal' && spacing === 'xs',
        'space-x-4': direction === 'horizontal' && spacing === 'sm',
        'space-x-5': direction === 'horizontal' && spacing === 'md',
        'space-x-8': direction === 'horizontal' && spacing === 'lg',
        'space-x-12': direction === 'horizontal' && spacing === 'xl',
      },
      {
        'justify-start': justifyContent === 'left',
        'justify-end': justifyContent === 'right',
        'justify-center': justifyContent === 'center',
        'justify-between': justifyContent === 'between',
        'justify-around': justifyContent === 'around',
        'justify-evenly': justifyContent === 'evenly',
      },
      {
        'items-start': alignItems === 'top',
        'items-end': alignItems === 'bottom',
        'items-center': alignItems === 'center',
        'items-baseline': alignItems === 'baseline',
        'items-stretch': alignItems === 'stretch',
      },
    ]"
  >
    <slot />
  </component>
</template>
