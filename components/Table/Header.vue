<script setup lang="ts">
export interface TableHeaderObj {
  label: string
  align?: 'left' | 'center' | 'right'
  value: string
}

interface TableHeaderProps {
  headers: TableHeaderObj[]
  selectable?: boolean
}

defineProps<TableHeaderProps>()
</script>

<template>
  <thead>
    <tr class="rounded-md">
      <th
        v-if="selectable"
        class="rounded-l-md px-6 py-3 text-sm font-normal text-gray-600 bg-gray-100"
      >
        <div class="w-4 h-4 bg-transparent border border-gray-400 rounded"></div>
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
        class="px-6 py-3 text-sm font-normal text-gray-600 bg-gray-100"
      >
        {{ header.label }}
      </th>
    </tr>
  </thead>
</template>
