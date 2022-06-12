<script setup lang="ts">
import { EmojiSadIcon } from '@heroicons/vue/outline'

/***********
 ** Props **
 ***********/

interface NoDataProps {
  errorMessage?: string
}

const props = defineProps<NoDataProps>()

/**************
 ** Defaults **
 **************/

const errorMessage = computed(() =>
  props.errorMessage ? props.errorMessage : 'Her fant vi dessverre ingen ting...'
)
</script>

<template>
  <div
    class="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg"
  >
    <EmojiSadIcon class="w-12 h-12 mx-auto text-gray-400" />
    <span class="block mt-2 text-sm font-medium text-gray-900">
      {{ errorMessage }}
    </span>
  </div>
</template>
