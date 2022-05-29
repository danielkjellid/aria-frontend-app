<script setup lang="ts">
interface ActionMenuProps {
  alignment?: 'left' | 'center' | 'right'
  width?: string
  /**
   * Controls if the background is transparent, gives a white focus ring
   * to the icon-wrapper instead of a brand-colored one.
   */
  transparentBg?: boolean
}

const props = defineProps<ActionMenuProps>()

const transparentBg = computed(() => (props.transparentBg ? props.transparentBg : false))

const actionMenuActive = ref<boolean>(false)
const hideActionMenu = () => {
  actionMenuActive.value = false
}
</script>

<template>
  <div v-click-outside="hideActionMenu" class="inline-flex">
    <div class="relative inline-flex items-center">
      <IconWrapper
        as="button"
        type="button"
        class="relative"
        :transparent-bg="transparentBg"
        aria-haspopup="true"
        :aria-expanded="actionMenuActive ? 'true' : 'false'"
        @click="actionMenuActive = true"
      >
        <slot />
      </IconWrapper>
    </div>

    <TransformFade>
      <div
        v-show="actionMenuActive"
        class="ring-1 ring-black ring-opacity-5 focus:outline-none absolute mt-6 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg"
        :class="[
          {
            'right-0': alignment === 'right',
            'left-0': alignment === 'left',
            'left-0 right-0': alignment === 'center',
          },
          width ? width : 'w-48',
        ]"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <slot name="items" />
      </div>
    </TransformFade>
  </div>
</template>
