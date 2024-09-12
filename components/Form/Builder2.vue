<script setup lang="ts">
import { ApiError, FormOutput, FormSectionOutput } from '~~/@types'
import { Option } from './types2'

interface FormBuilderProps {
  form: FormOutput
  error?: ApiError
  options?: Option
}

const props = defineProps<FormBuilderProps>()

const getBlocksForSection = (section: FormSectionOutput) =>
  props.form.blocks.filter((block) => section.blocks.includes(block.id))

const formData = ref({})

const requiredFields = computed(() => props.form.required)

const testData = () => {
  console.log(formData.value)
}
</script>

<template>
  <div>
    <p>This loaded fine</p>
    <template v-if="form.sections && form.sections.length">
      <CollapsableSection
        v-for="section in form.sections"
        :key="section.name"
        :title="section.name"
      >
        <div :class="section.columns ? `grid grid-cols-${section.columns} gap-5` : 'space-y-5'">
          <FormBuilderBlocks
            v-for="block in getBlocksForSection(section)"
            :key="block.id"
            :block="block"
            :required="requiredFields"
            :options="options"
            :error="error"
          >
            <template #[block.id]>
              <slot :name="block.id" />
            </template>
          </FormBuilderBlocks>
        </div>
      </CollapsableSection>
    </template>
    <template v-else>
      <div class="space-y-5">
        <FormBuilderBlocks
          v-for="block in form.blocks"
          :key="block.id"
          :block="block"
          :required="requiredFields"
          :options="options"
          :error="error"
        />
      </div>
    </template>
    <button type="button" @click="testData">Test form data</button>
  </div>
</template>
