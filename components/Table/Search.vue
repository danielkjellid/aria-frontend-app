<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { placeholder } from '@babel/types'

interface TableSearchProps {
  placeholder?: string
}

defineProps<TableSearchProps>()

interface TableSearchEmits {
  (e: 'onSearch', val: string)
}

const emits = defineEmits<TableSearchEmits>()

const query = ref<string>('')
const search = () => {
  emits('onSearch', query.value)
}
</script>

<template>
  <form class="flex items-center w-full pl-2 pr-4 mb-4 space-x-5" @submit.prevent="search">
    <Input
      id="table-search"
      v-model="query"
      label="search"
      hidden-label
      :placeholder="placeholder"
      plain
      class="w-full"
    >
      <MagnifyingGlassIcon class="w-5 h-5 text-gray-800" />
    </Input>
    <Button variant="secondary" size="s" type="submit">Søk</Button>
  </form>
</template>
