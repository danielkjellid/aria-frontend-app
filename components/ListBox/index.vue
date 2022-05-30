<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { SelectorIcon, CheckIcon } from '@heroicons/vue/solid'

interface ListBoxProps {
  as?: string
  label: string
  multiple?: boolean
}

defineProps<ListBoxProps>()

const test = ref([])
</script>

<template>
  <Listbox v-model="test" class="max-w-72" :multiple="multiple">
    <div class="relative mt-1">
      <ListboxButton
        class="hover:bg-brand-100 focus:ring-brand-800 text-brand-800 border-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold leading-5 bg-white border rounded-md shadow-sm appearance-none cursor-pointer"
      >
        {{ label }}
        <div class="flex items-center ml-2 -mr-1">
          <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
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
          class="max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute w-64 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg"
        >
          <ListboxOption v-for="i in 8" v-slot="{ active, selected }" :key="i" as="template">
            <li
              :class="[
                active ? 'bg-brand-100 text-brand-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                TEst
              </span>
              <span
                v-if="active"
                class="text-brand-600 absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
