<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

/***********
 ** Props **
 ***********/

interface SelectProps {
  /**
   * Id field of the element.
   */
  id: string
  /**
   * Sets label to screen reader only.
   */
  hiddenLabel?: boolean
  /**
   * Sets the label itself.
   */
  label: string
  /**
   * Field error as string.
   */
  error?: string
  /**
   * Designates if the field is required or not. Note, this is purely aesthetic,
   * validation still has to be performed outside this component.
   */
  required?: boolean
  /**
   * Additional help text bellow the select.
   */
  helpText?: string
}

const props = defineProps<SelectProps>()

/*******************
 ** Prop defaults **
 *******************/

const hiddenLabel = computed(() => (props.hiddenLabel ? props.hiddenLabel : false))

/***********
 ** Slots **
 ***********/

const slots = useSlots()
const existingIcon = computed(() => !!slots.icon)

/***********
 ** Emits **
 ***********/

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
    :word-count="null"
  >
    <div class="relative rounded-md">
      <div
        v-if="existingIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot name="icon" />
      </div>
      <select
        :id="id"
        :class="{
          'pl-10': existingIcon,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
            error,
        }"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:border-transparent block w-full text-sm leading-5 border-gray-200 rounded-md"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      >
        <slot />
      </select>
      <div
        v-if="error"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <div class="absolute top-0 bottom-0 right-0 w-5 h-5 mt-2 mr-3 bg-white rounded-full" />
        <ExclamationCircleIcon class="z-10 w-5 h-5 text-red-500" />
      </div>
    </div>
  </FormElementBase>
</template>
