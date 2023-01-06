<script setup lang="ts">
/* eslint-disable vue/no-v-for-template-key */

import { ApiError } from '~~/@types'
import { FormBlock } from './types'

interface FormBuilderProps {
  initialValuesFromObj?: Object
  form: FormBlock[]
  error?: ApiError
}

const props = defineProps<FormBuilderProps>()

const blocksToFlatObject = (form: FormBlock[]) => {
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
  (e: 'edit', val: any): void
  (e: 'clearError'): void
}

const emits = defineEmits<FormBuilderEmits>()

const test = () => {
  console.log(formObject)
}

const handleFileUpload = (formProperty: string, files: File[], allowMultiple = false) => {
  emits('clearError')
  if (allowMultiple) {
    formObject[formProperty] = [...files]
    return
  }

  const [file] = files
  formObject[formProperty] = file
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
  emits('clearError')
  emits('edit', newValue)
}, {deep: true})

// We also want to populate state on form load.
onMounted(() => {
  emits('edit', formObject)
})
</script>

<template>
  <div>
    <CollapsableSection v-for="section in form" :key="section.name" :title="section.name">
      <div :class="section.columns ? `grid grid-cols-${section.columns} gap-5` : 'space-y-5'">
        <template v-for="block in section.blocks" :key="block.remoteProperty">
          <template v-if="block.type === 'textInput'">
            <Input
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'numberInput'">
            <Input
              :id="`id-${block.remoteProperty}`"
              v-model.number="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'action'">
            <div class="flex justify-between w-full space-x-3" :class="$parseApiError(block.remoteProperty, error) ? 'items-center' : 'items-end'">
              <Input
                :id="`id-${block.remoteProperty}`"
                v-model="formObject[block.remoteProperty]"
                class="w-full"
                :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
              <div class="h-full mt-1">
                <slot :name="block.remoteProperty" :form-object="formObject">
                  <p class="text-sm">Slot <pre>{{ block.remoteProperty }}</pre> unused.</p>
                </slot>
              </div>
            </div>
          </template>
          <template v-if="block.type === 'select'">
            <Select
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'multiselect'">
            <MultiSelect 
              :id="`id-${block.remoteProperty}`" 
              v-model="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template> 
          <template v-if="block.type === 'listBoxFilter'">
            <ListBoxFilter 
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :display-field="block.meta && block.meta.optionNameProperty"
              :placeholder="block.meta && block.meta.placeholder"
              :value-field="block.meta && block.meta.optionValueProperty" 
              :options="block.options"
              :required="block.required"
              :error="$parseApiError(block.remoteProperty, error)"
            />
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'listBoxFilterNumber'">
            p: {{ formObject[block.remoteProperty] }}
            <ListBoxFilter 
              :id="`id-${block.remoteProperty}`"
              v-model.number="formObject[block.remoteProperty]"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :display-field="block.meta && block.meta.optionNameProperty"
              :placeholder="block.meta && block.meta.placeholder"
              :value-field="block.meta && block.meta.optionValueProperty" 
              :options="block.options"
              :required="block.required"
              :error="$parseApiError(block.remoteProperty, error)"
            />
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'editor'">
            <Editor
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
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
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'checkbox'">
            <Checkbox 
              :id="`id-${block.remoteProperty}`"
              v-model="formObject[block.remoteProperty]"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`" 
              :label="block.label" 
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText" 
            />
          </template>
          <template v-if="block.type === 'image'">
            <FileUploadInput
              :id="`id-${block.remoteProperty}`"
              type="image"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :required="block.required"
              :multiple="block.meta && block.meta.allowMultiple"
              :allow-set-primary="block.meta && block.meta.allowSetPrimaryImage"
              :files="Array.isArray(formObject[block.remoteProperty]) ? formObject[block.remoteProperty] : formObject[block.remoteProperty] !== null ? [formObject[block.remoteProperty]] : []"
              :error="$parseApiError(block.remoteProperty, error)"
              @upload="(images) => handleFileUpload(block.remoteProperty, images, (block.meta && block.meta.allowMultiple))"
            />
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
          <template v-if="block.type === 'file'">
            <FileUploadInput 
              :id="`id-${block.remoteProperty}`"
              type="file"
              :class="block.meta && block.meta.colSpan && `col-span-${block.meta.colSpan}`"
              :label="block.label"
              :hidden-label="block.meta && block.meta.hiddenLabel"
              :help-text="block.meta && block.meta.helpText"
              :required="block.required"
              :multiple="block.meta && block.meta.allowMultiple"
              :files="Array.isArray(formObject[block.remoteProperty]) ? formObject[block.remoteProperty] : formObject[block.remoteProperty] !== null ? [formObject[block.remoteProperty]] : []"
              :error="$parseApiError(block.remoteProperty, error)"
              @upload="(files) => handleFileUpload(block.remoteProperty, files, (block.meta && block.meta.allowMultiple))"
            />
            <slot :name="block.remoteProperty" :form-object="formObject" />
          </template>
        </template>
      </div>
    </CollapsableSection>
    <button type="button" @click="test">test</button>
  </div>
</template>
