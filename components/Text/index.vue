<script setup lang="ts">
interface TextProps {
  /**
   * Type of tag to be rendered.
   */
  as?: String
  /**
   * Text variant.
   */
  variant:
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'title5'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
  /**
   * Override the default color of the text.
   */
  color?: string
  /**
   * Will dim the text in a lighter color.
   */
  muted?: boolean
  /**
   * Aligns the text within parent. Align `justify` will fit the text
   * all the way to the edges of the parents width.
   */
  alignSelf?: 'center' | 'left' | 'right' | 'stretch'
  /**
   * Prose gives an element a max-width optimized for readability
   * and adapts based on the font size.
   */
  prose?: boolean
}

const props = defineProps<TextProps>()

const elem = props.as ? props.as : 'p'
</script>

<template>
  <component
    :is="elem"
    v-bind="$attrs"
    :class="[
      color ? color : 'text-gray-800',
      prose ? 'max-w-prose' : 'max-w-full',
      {
        'text-gray-500': muted,
      },
      {
        'text-3xl font-extrabold': variant === 'title1',
        'text-3xl font-medium': variant === 'title2',
        'text-2xl font-semibold': variant === 'title3',
        'text-xl font-medium': variant === 'title4',
        'text-lg font-medium': variant === 'title5',
        'text-base font-medium': variant === 'subtitle1',
        'text-sm font-medium': variant === 'subtitle2',
        'text-base': variant === 'body1',
        'text-sm': variant === 'body2',
      },
      {
        'self-start': alignSelf === 'left',
        'self-center': alignSelf === 'center',
        'self-end': alignSelf === 'right',
        'self-stretch': alignSelf === 'stretch',
      },
    ]"
  >
    <slot />
  </component>
</template>
