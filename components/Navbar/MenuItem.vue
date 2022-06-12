<script setup lang="ts">
/***********
 ** Props **
 ***********/

interface NavbarMenuItemProps {
  active?: boolean
  renderTransparent?: boolean
}

const props = defineProps<NavbarMenuItemProps>()

/**************
 ** Defaults **
 **************/

const active = computed(() => (props.active ? props.active : false))
const renderTransparent = computed(() =>
  props.renderTransparent ? props.renderTransparent : false
)
</script>

<template>
  <NuxtLink
    :aria-current="active ? 'page' : undefined"
    class="shrink-0 lg:z-10 lg:px-1 lg:py-1 lg:text-sm lg:border-b-2 lg:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center font-medium transition-colors duration-200 ease-out rounded-md"
    :class="[
      active && !renderTransparent ? 'lg:border-brand-800' : 'lg:border-transparent',
      active && renderTransparent ? 'lg:border-brand-100' : 'lg:border-transparent',
      renderTransparent
        ? 'lg:text-white lg:hover:text-gray-300 hover:text-brand-700 text-brand-900 focus:ring-transparent focus:ring-offset-white'
        : 'hover:text-brand-700 text-brand-900 focus:ring-offset-brand-800 focus:ring-transparent',
    ]"
  >
    <slot />
  </NuxtLink>
</template>
