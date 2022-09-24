<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'

/***********
 ** Props **
 ***********/

interface ListBoxItemProps {
  checkMarkAlignment?: 'left' | 'right'
  selected?: any[]
  value: string
  disabled?: boolean
}

const props = defineProps<ListBoxItemProps>()

/***********
 ** Slots **
 ***********/

const slots = useSlots()

const rightIcon = computed(() => !!slots.rightIcon)
const leftIcon = computed(() => !!slots.leftIcon)

/***********
 ** State **
 ***********/

const selected = computed(() => (props.selected ? props.selected : []))
const isSelected = computed(() => selected.value.includes(props.value))
const isHovering = ref<boolean>(false)

/***********
 ** Emits **
 ***********/

interface ListBoxItemEmits {
  (e: 'select', value: string): void
}

const emits = defineEmits<ListBoxItemEmits>()
const onSelect = () => {
  emits('select', props.value)
}
</script>

<template>
  <li
    class="hover:bg-brand-100 z-10"
    aria-selected="false"
    role="option"
    tabindex="-1"
    @click="onSelect"
    @keypress.enter="onSelect"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @focus="isHovering = true"
    @focusout="isHovering = false"
  >
    <div
      class="cursor-pointer"
      :class="[
        isSelected ? 'bg-brand-100 text-brand-900' : 'text-gray-900',
        leftIcon || checkMarkAlignment === 'left' ? 'pl-12' : 'pl-3',
        'relative select-none py-2 pr-4',
      ]"
    >
      <span :class="[isSelected ? 'font-medium' : 'font-normal', 'block truncate']">
        <slot :is-selected="isSelected" />
      </span>
      <template v-if="leftIcon || rightIcon">
        <template v-if="leftIcon">
          <span class="text-brand-600 absolute inset-y-0 left-0 flex items-center pl-3">
            <slot name="leftIcon">
              <CheckIcon class="w-5 h-5" aria-hidden="true" />
            </slot>
          </span>
          <span
            v-if="isHovering || isSelected"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
        <template v-if="rightIcon">
          <span
            v-if="isHovering || isSelected"
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
            v-if="isHovering || isSelected"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
        <template v-if="checkMarkAlignment === 'left'">
          <span
            v-if="isHovering || isSelected"
            class="text-green-400-600 absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <CheckIcon class="w-5 h-5" aria-hidden="true" />
          </span>
        </template>
      </template>
    </div>
  </li>
</template>
