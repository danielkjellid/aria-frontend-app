<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */

/***********
 ** Props **
 ***********/

interface MultiSelectProps {
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
  modelValue?: string
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
   * Allow selection of multiple values.
   */
  multiple?: boolean
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
}

const props = defineProps<MultiSelectProps>()

/***********
 ** Emits **
 ***********/

interface MultiSelectEmits {
  (e: 'select', val: any[]): void
}

const emits = defineEmits<MultiSelectEmits>()

/***********
 ** State **
 ***********/

const menuOpen = ref<boolean>(true)
const containerFocused = ref<boolean>(false)

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

const filterQuery = ref<string>()

const filteredMappedOptions = computed(() =>
  mappedOptions.value.filter((option) => {
    if (filterQuery.value) {
      return option.display.includes(filterQuery.value)
    }
    return option
  })
)
/**********************
 ** State: selection **
 **********************/

const selected = ref([])

// Map back selected value to the original options array sent through props.
const mappedSelected = computed(() =>
  props.options.filter((option) => selected.value.includes(option[props.valueField]))
)

const handleSelect = (val: any) => {
  if (selected.value.includes(val)) {
    // If the selected array already contains clicked item, remove it.
    const index = selected.value.findIndex((item) => item === val)
    selected.value.splice(index, 1)
  } else if (props.multiple) {
    // If selected item does not contain clicked item and accepts multiple
    // values, add the clicked item to the list.
    selected.value.push(val)
  } else {
    // If we only accept single values, replace entire array.
    selected.value = [val]
  }
}

/**************
 ** Watchers **
 **************/

watch(
  () => mappedSelected,
  (_oldValue, newValue) => {
    emits('select', newValue.value)
  },
  { deep: true }
)
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
        <div
          class="relative flex flex-wrap items-center w-full h-full px-3 py-2 space-y-1 text-sm leading-5 border border-gray-200 rounded-md"
          :class="{
            'outline-none ring-2 ring-offset-2 ring-brand-800 border-transparent':
              containerFocused || menuOpen,
          }"
          @click="menuOpen = true"
        >
          <Tag
            v-for="mappedSelect in mappedSelected"
            :key="mappedSelect[valueField]"
            class="mr-2"
            dismissible
            @remove="handleSelect(mappedSelect[valueField])"
          >
            {{ mappedSelect[displayField] }}
          </Tag>
          <input
            v-model="filterQuery"
            type="text"
            class="focus:outline-none focus:border-transparent focus:ring-transparent grow w-20 h-5 px-0 py-2 border-transparent"
            @focusin="containerFocused = true"
            @focusout="containerFocused = false"
          />
        </div>

        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ul
            v-show="menuOpen && options.length"
            class="max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute z-10 w-full py-1 mt-3 overflow-auto text-base bg-white rounded-md shadow-lg"
            :aria-multiselectable="multiple ? 'true' : 'false'"
            aria-labelledby="listbox-button"
            aria-orientation="vertical"
            role="listbox"
            tabindex="0"
            @click="!multiple ? closeMenu() : null"
            @keypress.enter="!multiple ? closeMenu() : null"
          >
            <ListBoxItem
              v-for="option in filteredMappedOptions"
              :key="option.value"
              :value="option.value"
              :selected="selected"
              check-mark-alignment="right"
              @select="handleSelect(option.value)"
            >
              {{ option.display }}
            </ListBoxItem>
          </ul>
        </Transition>
      </div>
    </FormElementBase>
  </div>
</template>
