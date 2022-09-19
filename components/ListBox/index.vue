<script setup lang="ts">
/* eslint-disable vuejs-accessibility/label-has-for */
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ButtonProps } from '~~/components/Button/index.vue'

/***********
 ** Props **
 ***********/

interface ListBoxProps {
  id?: string
  label?: string
  buttonLabel: string
  buttonVariant?: ButtonProps['variant']
  multiple?: boolean
  selected: string[]
  disabled?: boolean
}

const props = defineProps<ListBoxProps>()

/*********************
 ** Props: defaults **
 *********************/

const buttonVariant = computed(() => (props.buttonVariant ? props.buttonVariant : 'secondary'))

/***********
 ** State **
 ***********/

const menuOpen = ref<boolean>(false)

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <div v-click-outside="closeMenu">
    <label v-if="label" :for="id" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="max-w-72 relative mt-1">
      <Button :disabled="disabled" :variant="buttonVariant" @click="menuOpen = true">
        {{ buttonLabel }}
        <template #rightIcon>
          <ChevronUpDownIcon
            v-if="!selected || selected.length == 0"
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
          <div
            v-else
            class="flex items-center justify-center w-5 h-5 text-xs text-white bg-gray-700 rounded-full"
          >
            {{ selected.length }}
          </div>
        </template>
      </Button>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ul
          v-show="menuOpen"
          class="max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10 w-64 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg"
          :aria-multiselectable="multiple ? 'true' : 'false'"
          aria-labelledby="listbox-button"
          aria-orientation="vertical"
          role="listbox"
          tabindex="0"
          @click="!props.multiple ? closeMenu() : null"
          @keypress.enter="!props.multiple ? closeMenu() : null"
        >
          <slot />
        </ul>
      </transition>
    </div>
  </div>
</template>
