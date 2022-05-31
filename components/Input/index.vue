<script setup lang="ts">
/* eslint-disable vuejs-accessibility/label-has-for */
import { ExclamationCircleIcon } from '@heroicons/vue/solid'

interface InputProps {
  /**
   * The id for the element itself.
   */
  id: string
  /**
   * Sets the label to screen reader only.
   */
  hiddenLabel?: boolean
  /**
   * Sets the label itself.
   */
  label: string
  /**
   * Optional placeholder. Used as guidance for the user.
   */
  placeholder?: string
  /**
   * The value of the input itself, usually set by v-model.
   */
  value?: string
  /**
   * Type of input: https://www.w3schools.com/html/html_form_input_types.asp.
   */
  type?: string
  /**
   * Field error as string.
   */
  error?: string
  /**
   * Removes borders and most styling.
   */
  plain?: boolean
}

const props = defineProps<InputProps>()

const slots = useSlots()

const existingIcon = computed(() => !!slots.default)

const hiddenLabel = computed(() => (props.hiddenLabel ? props.hiddenLabel : false))
const type = computed(() => (props.type ? props.type : 'text'))
const plain = computed(() => (props.plain ? props.plain : false))
</script>

<template>
  <div :class="{ 'mb-8': error }">
    <label
      :for="id"
      :class="{ 'sr-only': hiddenLabel, 'mb-1': label }"
      class="block text-sm font-semibold leading-5 text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <div
        v-if="existingIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot />
      </div>
      <input
        :id="id"
        :value="value"
        :class="{
          'pl-10': existingIcon,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
            error,
          'border-0 focus:ring-transparent': plain,
        }"
        :placeholder="placeholder"
        :type="type"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent block w-full text-sm leading-5 border-gray-200 rounded-md"
        @input="$emit('input', ($event.target as HTMLTextAreaElement).value)"
      />
      <div
        v-if="error"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
      </div>
    </div>
    <p v-if="error" class="absolute mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
