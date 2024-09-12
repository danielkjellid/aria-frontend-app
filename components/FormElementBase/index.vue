<script setup lang="ts">
interface FormElementBaseProps {
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
   * Field error as string.
   */
  error?: string
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
  wordCount?: string | number
}

const props = defineProps<FormElementBaseProps>()

const hiddenLabel = computed(() => (props.hiddenLabel ? props.hiddenLabel : false))
</script>

<template>
  <div>
    <label
      :for="id"
      :class="[
        wordCount ? 'flex items-center justify-between' : 'block',
        { 'sr-only': hiddenLabel, 'mb-2': label, 'text-red-600': error },
      ]"
      class="text-sm font-medium leading-5 text-gray-700"
    >
      <div>{{ label }} <span v-if="required" class="font-normal text-red-600">*</span></div>
      <span v-if="wordCount" class="text-sm font-light text-gray-500">
        {{ wordCount ? wordCount : null }}
      </span>
    </label>
    <slot />
    <p v-if="helpText" class="mt-2 text-sm font-light text-gray-500">{{ helpText }}</p>
    <p v-if="error" class="relative mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
