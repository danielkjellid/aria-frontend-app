<script setup lang="ts">
/* eslint-disable vuejs-accessibility/label-has-for */
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

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
  modelValue?: string | number
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
  /**
   * Designates if the field is required or not. Note, this is purely aesthetic,
   * validation still has to be performed outside this component.
   */
  required?: boolean
  /**
   * Additional help text bellow the input.
   */
  helpText?: string
  /**
   * Display the work count adjacent to the label.
   */
  displayWordCount?: boolean
  disabled?: boolean
}

const props = defineProps<InputProps>()

const slots = useSlots()

const existingIcon = computed(() => !!slots.default)

const hiddenLabel = computed(() => (props.hiddenLabel ? props.hiddenLabel : false))
const type = computed(() => (props.type ? props.type : 'text'))
const plain = computed(() => (props.plain ? props.plain : false))

defineEmits(['update:modelValue'])
</script>

<template>
  <FormElementBase
    :id="id"
    :label="label"
    :hidden-label="hiddenLabel"
    :error="error"
    :required="required"
    :help-text="helpText"
    :word-count="
      displayWordCount && modelValue && typeof modelValue === 'string' ? modelValue.length : null
    "
  >
    <div class="relative rounded-md">
      <div
        v-if="existingIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot />
      </div>
      <input
        :id="id"
        v-bind="$attrs"
        :value="modelValue"
        :class="[
          disabled
            ? 'focus:outline-none focus:ring-0 border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent border-gray-200',
          {
            'pl-10': existingIcon,
            'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
              error,
            'border-0 focus:ring-transparent': plain,
          },
        ]"
        :aria-disabled="disabled"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type"
        class="block w-full text-sm leading-5 border rounded-md"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <div
        v-if="error"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
      </div>
    </div>
  </FormElementBase>
</template>
