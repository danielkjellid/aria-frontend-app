<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
/***********
 ** Props **
 ***********/

interface ListBoxFilterProps {
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
   * The value of the input itself, usually set by v-model.
   */
  modelValue?: string | number
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
   * A list of options presented in the filterable dropdown.
   */
  options?: Object[]
  /**
   * Object property in the options array that should be used as value.
   */
  valueField?: string
  /**
   * Object property in the options array that should be used a display/searchable
   * text.
   */
  displayField?: string
  /**
   * Optional placeholder. Used as guidance for the user.
   */
  placeholder?: string
}

const props = defineProps<ListBoxFilterProps>()

/***********
 ** State **
 ***********/

const menuOpen = ref<boolean>(false)

const closeMenu = () => {
  menuOpen.value = false
}

/********************
 ** State: options **
 ********************/

interface FilterableOption {
  value: any
  display: any
}

// Map options passed down from props to a common object structure.
const mappedOptions = computed(() => {
  if (props.options && props.options.length && props.valueField && props.displayField) {
    return props.options.map((option) => {
      const mappedOption = {} as FilterableOption

      mappedOption.value = option[props.valueField]
      mappedOption.display = option[props.displayField]

      return mappedOption
    })
  }

  return []
})

/**********************
 ** State: filtering **
 **********************/

const filterQuery = ref<string>(
  props.modelValue
    ? mappedOptions.value.find((option) => option.value === props.modelValue).display
    : null
)

const filteredMappedOptions = computed(() =>
  mappedOptions.value.filter((option) => {
    if (filterQuery.value) {
      return option.display.includes(filterQuery.value)
    }
    return option
  })
)

const emits = defineEmits(['update:modelValue'])

const selected = ref<any>(props.modelValue ? props.modelValue : null)

const handleSelect = (option: FilterableOption) => {
  emits('update:modelValue', String(option.value))
  filterQuery.value = option.display
  selected.value = option.value
}
</script>

<template>
  <div v-click-outside="closeMenu">
    <FormElementBase
      :id="id"
      :label="label"
      :hidden-label="hiddenLabel"
      :error="error"
      :required="required"
      :help-text="helpText"
    >
      <div class="relative w-full" @keydown.esc="closeMenu">
        <input
          :id="id"
          v-model="filterQuery"
          :class="{
            'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
              error,
          }"
          :placeholder="placeholder"
          type="text"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent block w-full text-sm leading-5 border-gray-200 rounded-md"
          @focusin="menuOpen = true"
        />
        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ul
            v-show="menuOpen && filteredMappedOptions.length"
            class="max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10 w-full py-1 mt-3 overflow-auto text-base bg-white rounded-md shadow-lg"
            :aria-multiselectable="false"
            aria-labelledby="listbox-button"
            aria-orientation="vertical"
            role="listbox"
            tabindex="0"
            @click="closeMenu"
            @keypress.enter="closeMenu"
          >
            <ListBoxItem
              v-for="option in filteredMappedOptions"
              :key="option.value"
              :value="option.value"
              :selected="selected ? [selected] : []"
              check-mark-alignment="right"
              @select="() => handleSelect(option)"
            >
              {{ option.display }}
            </ListBoxItem>
          </ul>
        </Transition>
      </div>
    </FormElementBase>
  </div>
</template>
