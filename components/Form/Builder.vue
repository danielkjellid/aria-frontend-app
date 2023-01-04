<script setup lang="ts">
/* eslint-disable vue/no-v-for-template-key */

import { ApiError } from '~~/@types'

export interface BlockMeta {
  optionNameProperty?: string
  optionValueProperty?: string
  optionInitialValue?: string
  allowMultiple?: boolean
  allowSetPrimaryImage?: boolean
  displayWordCount?: boolean
  hiddenLabel?: boolean
  disabled?: boolean
  helpText?: string
  placeholder?: string
}

export interface Block {
  type: 'text' | 'number' | 'checkbox' | 'select' | 'multiselect' | 'editor' | 'action' | 'image' | 'file'
  label: string
  remoteProperty: string // Remote property must match whatever the api endpoint expects the value to be named.
  required?: boolean
  initialValue?: any | any[]
  
  options?: any[]
  
  meta?: BlockMeta
}

export interface BuilderBlock {
  name: string
  blocks: Block[]
}

interface FormBuilderProps {
  as?: string
  initialValuesFromObj?: Object
  form: BuilderBlock[]
  error?: ApiError
}

const props = defineProps<FormBuilderProps>()

const elem = computed(() => props.as ? props.as : 'form')

const blocksToFlatObject = (form: BuilderBlock[]) => {
  const flatObj = {}

  form.forEach((section) =>
    section.blocks.forEach((block) => {

      if (props.initialValuesFromObj) {
        Object.entries(props.initialValuesFromObj).forEach(([key, value]) => {
          if (block.remoteProperty === key) {
            flatObj[block.remoteProperty] = value
          }
        })
      } else if (block.initialValue) {
        flatObj[block.remoteProperty] = block.initialValue
      } else if (block.type === 'checkbox') {
        flatObj[block.remoteProperty] = false
      } else {
        flatObj[block.remoteProperty] = null
      }
    })
  )

  return flatObj
}

const formObject = reactive(blocksToFlatObject(props.form))

interface FormBuilderEmits {
  (e: 'edit', val: Object): void
  (e: 'clearError'): void
}

const emits = defineEmits<FormBuilderEmits>()

const test = () => {
  console.log(formObject)
}

const handleFileUpload = (formProperty: string, files: File[]) => {
  formObject[formProperty] = [...files]
}

const notifyPossibleErrors = () => {
  props.form.forEach((section) =>
    section.blocks.forEach((block) => {
      if (
        block.options &&
        (!block.meta || !block.meta.optionNameProperty || !block.meta.optionValueProperty)
      ) {
        console.warn(
          'meta, meta.optionNameProperty or meta.optionValueProperty is not present while options is passed. These values should probably be present as they have no defaults.'
        )
      }
    })
  )
}

notifyPossibleErrors()

// Watch for changes to formObject, and emit state whenever there are changes.
watch(() => formObject, (newValue, _oldValue) => {
  console.log(newValue)
  emits('edit', newValue)
}, {deep: true})

// We also want to populate state on form load.
onMounted(() => {
  console.log(formObject)
  emits('edit', formObject)
})
</script>

<template>
  <component :is="elem">
    <CollapsableSection v-for="section in form" :key="section.name" :title="section.name">
      <div class="space-y-5">
        <template v-for="block in section.blocks" :key="block.remoteProperty">
          <template v-if="block.type === 'text'">
            <Input
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              type="text"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :placeholder="block.meta && block.meta.placeholder"
              :required="block.required"
              :disabled="block.meta && block.meta.disabled"
              :display-word-count="block.meta && block.meta.displayWordCount"
              :error="$parseApiError(block.remoteProperty, error)"
              @input="clearError"
            />
          </template>
          <template v-if="block.type === 'number'">
            <Input
              :id="`id-${block.remoteProperty}`"
              v-model.number="formObject[block.remoteProperty]"
              type="number"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :placeholder="block.meta && block.meta.placeholder"
              :required="block.required"
              :disabled="block.meta && block.meta.disabled"
              :display-word-count="block.meta && block.meta.displayWordCount"
              :error="$parseApiError(block.remoteProperty, error)"
              @input="clearError"
            />
          </template>
          <template v-if="block.type === 'action'">
            <div class="flex space-x-3">
              <div class="w-full">
                <Input
                  :id="`id-${block.remoteProperty}`"
                  v-model="formObject[block.remoteProperty]"
                  type="text"
                  :label="block.label"
                  :hidden-label="block.meta && block.meta.hiddenLabel"
                  :help-text="block.meta && block.meta.helpText"
                  :placeholder="block.meta && block.meta.placeholder"
                  :required="block.required"
                  :disabled="block.meta && block.meta.disabled"
                  :display-word-count="block.meta && block.meta.displayWordCount"
                  :error="$parseApiError(block.remoteProperty, error)"
                  @input="clearError"
                />
              </div>
              <slot :name="block.remoteProperty" :form-object="formObject">
                <p class="text-sm">Slot <pre>{{ block.remoteProperty }}</pre> unused.</p>
              </slot>
            </div>
          </template>
          <template v-if="block.type === 'select'">
            <Select
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :required="block.required"
              :disabled="block.meta && block.meta.disabled"
              :initial-option="!initialValuesFromObj && block.meta ? block.meta.optionInitialValue : undefined"
              :error="$parseApiError(block.remoteProperty, error)"
              @select="clearError"
              >
              <option v-if="!block.options || block.options.length === 0" disabled>
                No options passed in form constructor. Please add the "options" property to block.
              </option>
              <option
                v-for="(option, i) in block.options"
                :key="i"
                  :selected="option[block!.meta!.optionValueProperty] === formObject[block.remoteProperty]"
                  :value="option[block!.meta!.optionValueProperty]"
                >
                  {{
                    block.meta &&
                    block.meta.optionNameProperty &&
                    option[block.meta.optionNameProperty]
                      ? option[block.meta.optionNameProperty]
                      : option
                  }}
              </option>
            </Select>
          </template>
          <template v-if="block.type === 'multiselect'">
            <MultiSelect 
              :id="`id-${block.remoteProperty}`" 
              v-model="formObject[block.remoteProperty]"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :required="block.required"
              :display-field="block.meta && block.meta.optionNameProperty"
              :value-field="block.meta && block.meta.optionValueProperty"
              :multiple="block.meta && block.meta.allowMultiple"
              :options="block.options"
              @select="(val) => formObject[block.remoteProperty] = val"
            />
          </template> 
          <template v-if="block.type === 'editor'">
            {{block.remoteProperty}}: {{  formObject[block.remoteProperty] }}
            <Editor
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              render-as-input
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :placeholder="block.meta && block.meta.placeholder"
              :required="block.required"
              :readonly="block.meta && block.meta.disabled"
              :display-word-count="block.meta && block.meta.displayWordCount"
              :error="$parseApiError(block.remoteProperty, error)"
            />
          </template>
          <template v-if="block.type === 'checkbox'">
            <Checkbox 
              :id="`id-${block.remoteProperty}`" 
              v-model="formObject[block.remoteProperty]"
              :label="block.label" 
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText" 
            />
          </template>
          <template v-if="block.type === 'image'">
            <FileUploadInput
              :id="`id-${block.remoteProperty}`"
              type="image"
              :multiple="block.meta && block.meta.allowMultiple"
              :allow-set-primary="block.meta && block.meta.allowSetPrimaryImage"
              :files="formObject[block.remoteProperty]"
              @upload="(images) => handleFileUpload(block.remoteProperty, images)"
            />
          </template>
          <template v-if="block.type === 'file'">
            <FileUploadInput 
              :id="`id-${block.remoteProperty}`"
              type="file"
              :multiple="block.meta && block.meta.allowMultiple"
              :files="formObject[block.remoteProperty]"
              @upload="(files) => handleFileUpload(block.remoteProperty, files)"
            />
          </template>
        </template>
      </div>
    </CollapsableSection>
    <button type="button" @click="test">test</button>
  </component>
</template>
