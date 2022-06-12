<script setup lang="ts">
/**********
 ** Props **
 ***********/
interface NavbarMenuItemFlyoutProps {
  active?: boolean
  renderTransparent?: boolean
}

const props = defineProps<NavbarMenuItemFlyoutProps>()

/**************
 ** Defaults **
 **************/

const active = computed(() => (props.active ? props.active : false))
const renderTransparent = computed(() =>
  props.renderTransparent ? props.renderTransparent : false
)

/**********
 ** Emits **
 ***********/

interface NavbarMenuItemFlyoutEmits {
  (e: 'toggle'): void
}

const emits = defineEmits<NavbarMenuItemFlyoutEmits>()

/*************************
 ** Menu state handling **
 *************************/

const toggleFlyoutMenu = () => {
  emits('toggle')
}
</script>

<template>
  <div
    class="lg:border-0 lg:p-0 lg:m-0 lg:pb-0 flex items-center p-2 pb-6 border-b border-gray-200"
  >
    <div class="relative flex">
      <button
        type="button"
        class="lg:flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-md relative z-10 items-center hidden p-1 -mb-px text-sm font-medium transition-colors duration-200 ease-out border-b-2 border-transparent"
        :class="[
          active && !renderTransparent ? 'border-brand-800' : 'border-transparent',
          active && renderTransparent ? 'border-brand-100' : 'border-transparent',
          renderTransparent
            ? 'text-white hover:text-gray-300 bg-transparent focus:ring-transparent focus:ring-offset-white'
            : 'hover:text-brand-800 text-brand-700 bg-inherit focus:ring-offset-brand-800 focus:ring-transparent',
        ]"
        :aria-expanded="active ? 'true' : 'false'"
        @click="toggleFlyoutMenu"
      >
        <slot />
      </button>
    </div>
    <div class="lg:block hidden">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="active">
          <NavbarFlyoutMenu>
            <slot name="items" />
          </NavbarFlyoutMenu>
        </div>
      </Transition>
    </div>
    <div class="lg:hidden block">
      <NavbarFlyoutMenu>
        <slot name="items" />
      </NavbarFlyoutMenu>
    </div>
  </div>
</template>
