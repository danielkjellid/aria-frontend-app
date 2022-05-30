<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/outline'
import { ListboxOption } from '@headlessui/vue'

interface ListBoxItemProps {
  active?: boolean
  selected?: boolean
}

const props = defineProps<ListBoxItemProps>()

const active = computed(() => (props.active ? props.active : false))
const selected = computed(() => (props.selected ? props.selected : false))
</script>

<template>
  <ListboxOption as="template">
    <li
      :class="[
        active ? 'bg-brand-100 text-brand-900' : 'text-gray-900',
        'relative cursor-default select-none py-2 pl-10 pr-4',
      ]"
    >
      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
        <slot />
      </span>
      <span v-if="active" class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
        <slot name="icon">
          <CheckIcon class="w-5 h-5" aria-hidden="true" />
        </slot>
      </span>
    </li>
  </ListboxOption>
</template>
