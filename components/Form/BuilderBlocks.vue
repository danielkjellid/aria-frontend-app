<script setup lang="ts">
import { ApiError, FormBlockOutput, FrontendFormElements } from '~~/@types'
import { FileType } from '../FileUpload/types';
import {Option} from './types2'

interface FormBuilderBlocksProps {
  block: FormBlockOutput
  error?: ApiError
  required?: string[]
  disabled?: string[]
  options?: Option
}



const props = defineProps<FormBuilderBlocksProps>()

interface FormBuilderBlocksEmits {
  (e: 'clearError'): void
}

const emits = defineEmits<FormBuilderBlocksEmits>()

const value = ref<any | any[]>(props.block.defaultValue ? props.block.defaultValue : undefined)

const isRequired = (id: string) => props.required && props.required.includes(id)

const isDisabled = (id: string) => props.disabled && props.disabled.includes(id)

const clearError = () => {
  emits('clearError')
}

const computedOptions = computed(() => props.options)

const handleFileUpload = (files: FileType[], allowMultiple = false) => {
  emits('clearError')
  if (allowMultiple) {
    value.value = [...files]
    return
  }

  const [file] = files
  value.value = file || []
}
</script>

<template>
  <div class="space-y-5" :class="block.colSpan ? `col-span-${block.colSpan}` : 'col-span-1'">
    <template v-if="block.element === FrontendFormElements.TEXT_INPUT">
        <Input
          :id="`id-${block.id}`"
          v-model="value"
          type="text"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :placeholder="block.placeholder"
          :required="isRequired(block.id)"
          :disabled="isDisabled(block.id)"
          :display-word-count="block.displayWordCount"
          :error="$parseApiError(block.id, error)"
          @input="clearError"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.NUMBER_INPUT">
        <Input
          :id="`id-${block.id}`"
          v-model.number="value"
          type="number"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :placeholder="block.placeholder"
          :required="isRequired(block.id)"
          :disabled="isDisabled(block.id)"
          :display-word-count="block.displayWordCount"
          :error="$parseApiError(block.id, error)"
          @input="clearError"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.ACTION">
        <div class="flex justify-between w-full space-x-3" :class="$parseApiError(block.id, error) ? 'items-center' : 'items-end'">
          <Input
            :id="`id-${block.id}`"
            v-model="value"
            class="w-full"
            type="text"
            :label="block.title"
            :hidden-label="block.hiddenLabel"
            :help-text="block.helpText"
            :placeholder="block.placeholder"
            :required="isRequired(block.id)"
            :disabled="isDisabled(block.id)"
            :display-word-count="block.displayWordCount"
            :error="$parseApiError(block.id, error)"
            @input="clearError"
          />
          <div class="h-full mt-1">
            <slot :name="block.id">
              <p class="text-sm">Slot <pre>{{ block.id }}</pre> unused.</p>
            </slot>
          </div>
        </div>
      </template>
      <template v-if="block.element === FrontendFormElements.SELECT">
        <Select
          :id="`id-${block.id}`"
          v-model="value"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :disabled="isDisabled(block.id)"
          :error="$parseApiError(block.id, error)"
          @select="clearError"
          >
          <template v-if="block.enum && block.enum.length">
            <option v-for="(enumObj, i) in block.enum" :key="i" :selected="enumObj.value === value" :value="enumObj.value">
              {{  enumObj.name }}
            </option>
          </template>
          <template v-else>
            <option v-if="!computedOptions[block.id] || computedOptions[block.id].options.length === 0" disabled>
              No options passed in form constructor. Please add the "options" property to block.
            </option>
            <option 
              v-for="(option, i) in computedOptions[block.id].options" 
              :key="i" 
              :selected="option[computedOptions[block.id].valueProperty] === value" 
              :value="option[computedOptions[block.id].valueProperty]"
            >
                {{ option[computedOptions[block.id].nameProperty] }}
            </option>
          </template>
        </Select>
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.MULTISELECT">
        <MultiSelect 
          :id="`id-${block.id}`" 
          v-model="value"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :display-field="computedOptions[block.id].nameProperty"
          :value-field="computedOptions[block.id].valueProperty"
          :options="computedOptions[block.id].options"
          :multiple="block.type === 'array'"
          @select="(val) => value = val"
        />
        <slot :name="block.id" />
      </template> 
      <template v-if="block.element === FrontendFormElements.LIST_BOX_FILTER">
        <p>Here</p>
        <ListBoxFilter 
          :id="`id-${block.id}`"
          v-model="value"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :disabled="isDisabled(block.id)"
          :display-field="computedOptions[block.id].nameProperty"
          :value-field="computedOptions[block.id].valueProperty"
          :options="computedOptions[block.id].options"
          :placeholder="block.placeholder"
          :error="$parseApiError(block.id, error)"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.LIST_BOX_FILTER_NUMBER">
        <ListBoxFilter 
          :id="`id-${block.id}`"
          v-model.number="value"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :disabled="isDisabled(block.id)"
          :display-field="computedOptions[block.id].nameProperty"
          :value-field="computedOptions[block.id].valueProperty"
          :options="computedOptions[block.id].options"
          :error="$parseApiError(block.id, error)"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.EDITOR">
        <Editor
          :id="`id-${block.id}`"
          v-model="value"
          render-as-input
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :placeholder="block.placeholder"
          :required="isRequired(block.id)"
          :readonly="isDisabled(block.id)"
          :display-word-count="block.displayWordCount"
          :error="$parseApiError(block.id, error)"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.CHECKBOX">
        <Checkbox 
          :id="`id-${block.id}`"
          v-model="value"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText" 
        />
      </template>
      <template v-if="block.element === FrontendFormElements.IMAGE">
        <FileUploadInput
          :id="`id-${block.id}`"
          type="image"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :multiple="block.type === 'array'"
          :allow-set-primary="block.allowSetPrimaryImage"
          :allow-set-filter="block.allowSetFilterImage"
          :files="Array.isArray(value) ? value : value !== null ? [value] : []"
          :error="$parseApiError(block.id, error)"
          @upload="(images) => handleFileUpload(images, (block.type === 'array'))"
        />
        <slot :name="block.id" />
      </template>
      <template v-if="block.element === FrontendFormElements.FILE">
        <FileUploadInput 
          :id="`id-${block.id}`"
          type="file"
          :label="block.title"
          :hidden-label="block.hiddenLabel"
          :help-text="block.helpText"
          :required="isRequired(block.id)"
          :multiple="block.type === 'array'"
          :allow-set-primary="false"
          :allow-set-filter="false"
          :files="Array.isArray(value) ? value : value !== null ? [value] : []"
          :error="$parseApiError(block.id, error)"
          @upload="(files) => handleFileUpload(files, (block.type === 'array'))"
        />
        <slot :name="block.id" />
      </template>
  </div>
</template>
