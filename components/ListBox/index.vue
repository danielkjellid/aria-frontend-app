<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/vue'
import { SelectorIcon } from '@heroicons/vue/solid'

interface ListBoxProps {
  as?: string
  label: string
  multiple?: boolean
  selected?: unknown[]
  disabled?: boolean
}

defineProps<ListBoxProps>()
</script>

<template>
  <Listbox class="max-w-72" :multiple="multiple" :as="as">
    <div class="relative mt-1">
      <ListboxButton
        :disabled="disabled"
        :class="[
          disabled
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-white text-brand-800 cursor-pointer hover:bg-brand-100',
          'focus:ring-brand-800 border-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold leading-5 border rounded-md shadow-sm appearance-none',
        ]"
      >
        {{ label }}
        <div class="flex items-center ml-2 -mr-1">
          <SelectorIcon
            v-if="selected.length == 0"
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
          <div
            v-else
            class="flex items-center justify-center w-5 h-5 text-xs text-white bg-gray-700 rounded-full"
          >
            {{ selected.length }}
          </div>
        </div>
      </ListboxButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10 w-64 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg"
        >
          <slot />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
