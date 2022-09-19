<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
// import BubbleMenu from '@tiptap/extension-bubble-menu'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class:
        'p-3 focus:outline-none h-40 focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent block w-full text-sm leading-5 border border-gray-200 rounded-md',
    },
  },
})
</script>

<template>
  <div>
    <div>
      <!-- <BubbleMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }"> -->
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </button>
      <button
        type="button"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        Bullet List
      </button>
      <!-- </BubbleMenu> -->
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>
