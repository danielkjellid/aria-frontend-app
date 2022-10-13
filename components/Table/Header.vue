<script setup lang="ts">
export interface TableHeaderObj {
  label: string
  align?: 'left' | 'center' | 'right'
  value: string
}

interface TableHeaderProps {
  headers: TableHeaderObj[]
  selectable?: boolean
  selectedItems?: any[]
  items: any[]
}

defineProps<TableHeaderProps>()

interface TableHeaderEmits {
  (e: 'selectAll'): void
}

const emits = defineEmits<TableHeaderEmits>()

const selectAllItems = () => {
  emits('selectAll')
}
</script>

<template>
  <thead>
    <tr class="rounded-md">
      <th
        v-if="selectable"
        class="rounded-l-md bg-brand-50 px-6 py-3 text-sm font-normal text-gray-600"
      >
        <!-- <div class="w-4 h-4 bg-transparent border border-gray-400 rounded"></div> -->
        <input
          type="checkbox"
          :checked="selectedItems && items ? selectedItems.length === items.length : false"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent text-brand-800 w-4 h-4 rounded"
          @change="selectAllItems"
        />
      </th>
      <th
        v-for="(header, index) in headers"
        :key="index"
        :class="{
          'rounded-l-md': index === 0 && !selectable,
          'rounded-r-md': index === headers.length - 1,
          'text-left': header.align === undefined || 'left',
          'text-center': header.align === 'center',
          'text-right': header.align === 'right',
        }"
        class="bg-brand-50 px-6 py-3 text-sm font-normal text-gray-600"
      >
        {{ header.label }}
      </th>
    </tr>
  </thead>
</template>
