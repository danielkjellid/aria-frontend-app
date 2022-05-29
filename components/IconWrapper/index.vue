<script setup lang="ts">
/**
 * The `IconWrapper` component is a wrapper component for icons. It add appropriate
 * focus state. Slot is reserved for an actual icon. Can be rendered as any tag, and
 * binds its attributes.
 */

/***********
 ** Props **
 ***********/

interface IconWrapperProps {
  /**
   * Type of tag to be rendered.
   */
  as?: string
  /**
   * Controls if the background is transparent, gives a white focus ring
   * instead of a brand-colored one.
   */
  transparentBg?: boolean
}

const props = defineProps<IconWrapperProps>()

/***********
 ** State **
 ***********/

const elem = computed(() => (props.as ? props.as : 'div'))
const transparentBg = computed(() => (props.transparentBg ? props.transparentBg : false))
</script>

<template>
  <component
    :is="elem"
    v-bind="$attrs"
    class="focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex rounded-md"
    :class="
      transparentBg
        ? 'bg-transparent focus:ring-transparent focus:ring-offset-white'
        : 'bg-inherit focus:ring-offset-brand-800 focus:ring-transparent'
    "
  >
    <slot />
  </component>
</template>
