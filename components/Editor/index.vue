<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OutputBlockData, OutputData } from '@editorjs/editorjs'
import edjsHTML from 'editorjs-html'

/***********
 ** Props **
 ***********/

interface EditorProps {
  /**
   * Sets the label itself.
   */
  label?: string
  /**
   * Sets the label to screen reader only.
   */
  hiddenLabel?: boolean
  /**
   * Sets the editor in read only mode.
   */
  readonly?: boolean
  /**
   * Make the editor looks like another form element.
   */
  renderAsInput?: boolean
  /**
   * Optional placeholder. Used as guidance for the user.
   */
  placeholder?: string
  /**
   * Designates if the field is required or not. Note, this is purely aesthetic,
   * validation still has to be performed outside this component.
   */
  required?: boolean
  /**
   * Field error as string.
   */
  error?: string
  /**
   * Additional help text bellow the input.
   */
  helpText?: string
  /**
   * Display the work count adjacent to the label.
   */
  displayWordCount?: boolean
  /**
   * The value of the editor itself, usually set by v-model.
   */
  modelValue?: OutputData
  /**
   * Output of v-model value. Blocks is OutputBlockData[], array is an array containing
   * the different html elements, e.g. ['<p>Text</p>', <p>More text</p>], and string is
   * the array concatenated, e.g. '<p>Text</p><br /><p>More text</p>'.
   */
  output?: 'blocks' | 'array' | 'string'
}

const props = defineProps<EditorProps>()

/**************
 ** Defaults **
 **************/

const readonly = computed(() => (props.readonly ? props.readonly : false))
const renderAsInput = computed(() => (props.renderAsInput ? props.renderAsInput : false))
const output = computed(() => (props.output ? props.output : 'blocks'))

/***********
 ** Emits **
 ***********/

interface EditorEmits {
  (e: 'update:modelValue', val: OutputBlockData[] | string[] | string)
}

const emits = defineEmits<EditorEmits>()

/******************
 ** Data parsing **
 ******************/

const edjsParser = edjsHTML()

const parseOutputToHTMLArray = (data: OutputData) => {
  const parsedData = edjsParser.parse(data)

  return parsedData
}

const parseOutputToHTMLString = (data: OutputData) => {
  const parsedData = edjsParser.parse(data)
  const parsedDataWithBreak = [].concat(...parsedData.map((d) => [d, '<br />'])).slice(0, -1)

  return parsedDataWithBreak.join('')
}

/*********************
 ** Hooks and state **
 *********************/

onMounted(async () => {
  if (process.client) {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const List = (await import('@editorjs/list')).default
    const Embed = (await import('@editorjs/embed')).default

    const editor = new EditorJS({
      holder: 'editor',
      minHeight: 0,
      placeholder: props.placeholder ? props.placeholder : 'Begynn å skrive...',
      readOnly: readonly.value,
      tools: {
        header: Header,
        list: List,
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
      },
      onChange: (api, _event) => {
        api.saver.save().then(async (data: OutputData) => {
          if (output.value === 'blocks') {
            await emits('update:modelValue', data.blocks)
          } else if (output.value === 'array') {
            await emits('update:modelValue', parseOutputToHTMLArray(data))
          } else if (output.value === 'string') {
            await emits('update:modelValue', parseOutputToHTMLString(data))
          }
        })
      },
      data: props.modelValue,
    })
  }
})
</script>
<template>
  <ClientOnly>
    <FormElementBase
      v-if="renderAsInput"
      id="editor"
      :label="label"
      :hidden-label="hiddenLabel"
      :error="error"
      :required="required"
      :help-text="helpText"
      :word-count="null"
    >
      <div
        id="editor"
        class="w-full min-h-full overflow-y-auto text-sm focus:outline-none mt-1 focus:ring-2 h-40 border px-3 py-0.5 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent block leading-5 border-gray-200 rounded-md"
        :class="{
          'cursor-not-allowed': readonly,
        }"
      />
    </FormElementBase>
    <div v-else>
      <div
        id="editor"
        class="w-full min-h-full overflow-y-auto text-sm"
        :class="{
          'cursor-not-allowed': readonly,
        }"
      />
    </div>
  </ClientOnly>
</template>
