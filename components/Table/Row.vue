<script setup lang="ts">
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { TableHeaderObj } from '~~/components/Table/index.vue'

interface TableRowProps {
  headers: TableHeaderObj[]
  index: number
  item: any
  selectable?: boolean
  selectedItems?: any[]
  showActions?: boolean
}

const props = defineProps<TableRowProps>()

const selectable = computed(() => (props.selectable ? props.selectable : false))
const showActions = computed(() => (props.showActions ? props.showActions : false))

const getNestedValue = (obj: any, path: (string | number)[], fallback?: any): any => {
  const last = path.length - 1

  if (last < 0) return obj === undefined ? fallback : obj

  let fetchedObj = {}

  for (let i = 0; i < last; i += 1) {
    if (obj == null) {
      return fallback
    }
    fetchedObj = obj[path[i]]
  }

  if (fetchedObj == null) return fallback

  return fetchedObj[path[last]] === undefined ? fallback : fetchedObj[path[last]]
}

const getObjectValueByPath = (obj: any, path: string, fallback?: any): any => {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback
  if (obj[path] !== undefined) return obj[path]
  let convertedPath = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  convertedPath = convertedPath.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, convertedPath.split('.'), fallback)
}

const sortedItemValues = computed(() =>
  props.headers
    .filter((header) => header.value !== 'actions') // Actions are handed explicitly bellow.
    .map((header) => {
      const value = getObjectValueByPath(props.item, header.value)
      const slot = header.value
      const align = header.align ? header.align : undefined

      return {
        value,
        slot,
        align,
      }
    })
)

interface TableRowEmits {
  (e: 'select', val: any): void
}

const emits = defineEmits<TableRowEmits>()

const selectItem = (item: any) => {
  emits('select', item)
}
</script>

<template>
  <tr class="group">
    <td
      v-if="selectable"
      class="whitespace-nowrap rounded-l-md group-hover:bg-gray-50 px-6 py-3 text-sm leading-5 text-gray-900"
    >
      <input
        type="checkbox"
        :checked="selectedItems.includes(item)"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent text-brand-800 w-4 h-4 rounded"
        @change="selectItem(item)"
      />
    </td>
    <td
      v-for="(obj, i) in sortedItemValues"
      :key="i"
      class="whitespace-nowrap group-hover:bg-gray-50 px-6 py-3 text-sm leading-5 text-gray-900"
      :class="{
        'rounded-l-md': i === 0 && !selectable,
        'rounded-r-md': i === headers.length - 1 && !showActions,
        'text-left': obj.align === undefined || obj.align === 'left',
        'text-center': obj.align === 'center',
        'text-right': obj.align === 'right',
      }"
    >
      <!-- add slot to be able to style/edit each column according to content presented -->
      <slot :name="obj.slot" :row="item">
        {{ obj.value }}
      </slot>
    </td>
    <td
      v-if="showActions"
      class="whitespace-nowrap rounded-r-md group-hover:bg-gray-50 relative px-6 py-3 text-right"
    >
      <div class="flex items-center justify-center">
        <ActionMenu :transparent-bg="false" alignment="right">
          <EllipsisHorizontalIcon class="w-5 h-5 text-gray-800" />
          <template #items>
            <slot name="action-menu-items" :obj="item" />
          </template>
        </ActionMenu>
      </div>
    </td>
  </tr>
</template>
