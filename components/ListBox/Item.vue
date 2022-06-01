<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/outline'
import { ListboxOption } from '@headlessui/vue'

interface ListBoxItemProps {
  checkMarkAlignment?: 'left' | 'right'
  value: unknown
}

defineProps<ListBoxItemProps>()

const slots = useSlots()

const rightIcon = computed(() => !!slots.rightIcon)
const leftIcon = computed(() => !!slots.leftIcon)
</script>

<template>
  <ListboxOption v-slot="{ active, selected }" :value="value" class="z-10">
    <li
      :class="[
        active || selected ? 'bg-brand-100 text-brand-900' : 'text-gray-900',
        leftIcon || checkMarkAlignment === 'left' ? 'pl-12' : 'pl-3',
        'relative cursor-default select-none py-2 pr-4',
      ]"
    >
      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
        <slot :selected="selected" />
      </span>
      <template v-if="leftIcon || rightIcon">
        <template v-if="leftIcon">
          <span class="text-brand-600 absolute inset-y-0 left-0 flex items-center pl-3">
            <slot name="leftIcon">
              <CheckIcon class="w-5 h-5" aria-hidden="true" />
            </slot>
          </span>
          <span
            v-if="active || selected"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
        <template v-if="rightIcon">
          <span
            v-if="active || selected"
            class="text-brand-600 absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400">
            <slot name="rightIcon">
              <CheckIcon class="w-5 h-5" aria-hidden="true" />
            </slot>
          </span>
        </template>
      </template>
      <template v-else>
        <template v-if="checkMarkAlignment === 'right'">
          <span
            v-if="active || selected"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
        <template v-if="checkMarkAlignment === 'left'">
          <span
            v-if="active || selected"
            class="text-green-400-600 absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
      </template>
    </li>
  </ListboxOption>
</template>
