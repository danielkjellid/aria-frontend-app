<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface ContainerProps {
  /**
   * Sets element of container. Defaults to `div`.
   */
  as?: string
  /**
   * In some cases padding needs to be controlled outside the component (for example if needed to align items
   * differently based on active state)
   */
  xPadding?: string
  /**
   * In some cases padding needs to be controlled outside the component (for example if needed to align items
   * differently based on active state)
   */
  yPadding?: string
  /**
   * Set a new max width for content. Should not be more than 2xl breakpoint (1536px)
   */
  maxWidth?: 'none' | 'prose' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = defineProps<ContainerProps>()

/***********
 ** State **
 ***********/

const elem = props.as ? props.as : 'div'
</script>

<template>
  <component
    :is="elem"
    class="mx-auto"
    :class="[
      xPadding || xPadding === null ? xPadding : '2xl:px-8 md:px-6 lg:px-8 px-5',
      yPadding || yPadding === null ? yPadding : '2xl:py-12 py-8',
      maxWidth
        ? {
            'max-w-none': maxWidth === 'none',
            'max-w-prose': maxWidth === 'prose',
            'max-w-xs': maxWidth === 'xs',
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl',
          }
        : 'container',
    ]"
  >
    <slot />
  </component>
</template>
