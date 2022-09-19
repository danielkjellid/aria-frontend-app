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

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="actionMenuActive"
        class="ring-1 ring-black ring-opacity-5 focus:outline-none absolute z-20 mt-6 mr-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg"
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
    </Transition>
  </div>
</template>
