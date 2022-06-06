<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface NavbarMenuItemProps {
  as?: string
  active?: boolean
  renderTransparent?: boolean
}

const props = defineProps<NavbarMenuItemProps>()

/**************
 ** Defaults **
 **************/

const elem = computed(() => (props.as ? props.as : resolveComponent('NuxtLink')))
const active = computed(() => (props.active ? props.active : false))
const renderTransparent = computed(() =>
  props.renderTransparent ? props.renderTransparent : false
)
</script>

<template>
  <component
    :is="elem"
    v-bind="$attrs"
    :aria-current="active ? 'page' : undefined"
    class="shrink-0 lg:relative lg:z-10 lg:pt-px lg:-mb-px lg:text-sm lg:border-b-2 lg:border-transparent flex items-center p-2 m-2 font-medium transition-colors duration-200 ease-out"
    :class="[
      active && !renderTransparent ? 'lg:border-brand-800' : 'lg:border-transparent',
      active && renderTransparent ? 'lg:border-brand-100' : 'lg:border-transparent',
      renderTransparent
        ? 'lg:text-white lg:hover:text-gray-300 hover:text-brand-700 text-brand-900'
        : 'hover:text-brand-700 text-brand-900',
    ]"
  >
    <slot />
  </component>
</template>
