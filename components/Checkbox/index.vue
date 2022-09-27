<script setup lang="ts">
interface CheckboxProps {
  /**
   * Checkbox id.
   */
  id: string
  /**
   * Label that shows next to the checkbox.
   */
  label: string
  /**
   * Additional help text bellow checkbox.
   */
  helpText?: string
  /**
   * Controls if the checkbox is checked or not.
   */
  modelValue?: boolean
  /**
   * Sets label as screen reader only.
   */
  hiddenLabel?: boolean
}

const props = defineProps<CheckboxProps>()

const hiddenLabel = computed(() => (props.hiddenLabel ? props.hiddenLabel : false))
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center" :class="{ 'mr-3': hiddenLabel }">
    <label class="inline-flex">
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="modelValue"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent text-brand-800 w-5 h-5 border border-gray-300 rounded"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <div v-if="!hiddenLabel" class="ml-3 -mt-px text-sm">
        <span class="block font-medium text-gray-700">{{ label }}</span>
        <span v-if="helpText" class="block mt-1 font-light text-gray-500">{{ helpText }}</span>
      </div>
    </label>
  </div>
</template>
