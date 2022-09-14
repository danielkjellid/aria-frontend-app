<script setup lang="ts">
import { SearchIcon, DotsHorizontalIcon } from '@heroicons/vue/outline'

export interface TableHeaderObj {
  label: string
  align?: 'left' | 'center' | 'right'
  value: string
}

interface TableProps {
  headers: TableHeaderObj[]
  items: any[]
  showActions?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  showPagination?: boolean
  selectable?: boolean
}

const props = defineProps<TableProps>()

const showSearch = computed(() => (props.showSearch ? props.showSearch : false))
const showPagination = computed(() => (props.showPagination ? props.showPagination : false))
const selectable = computed(() => (props.selectable ? props.selectable : false))
const showActions = computed(
  () => props.headers && props.headers.filter((header) => header.value === 'actions').length > 0
)

const query = ref<string>('')

const emitQuery = () => {}

const selectedItems = ref([])
const selectItem = (item: any) => {
  if (selectedItems.value.includes(item)) {
    console.log('here')
    const index = selectedItems.value.indexOf(item)

    if (index !== -1) {
      selectedItems.value.splice(index, 1)
      console.log(selectedItems.value)
    }
  } else {
    selectedItems.value.push(item)
  }
}
</script>

<template>
  <div>
    <form
      v-if="showSearch"
      class="flex items-center w-full px-2 mb-4 space-x-5"
      @submit.prevent="emitQuery"
    >
      <Input
        id="table-search"
        v-model="query"
        label="search"
        hidden-label
        :placeholder="searchPlaceholder"
        plain
        class="w-full"
      >
        <SearchIcon class="w-5 h-5 text-gray-800" />
      </Input>
      <Button variant="primary" size="s">Søk</Button>
    </form>

    <div class="overflow-x-auto">
      <table class="min-w-full">
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
        <tbody v-if="items && items.length" class="bg-white">
          <tr v-for="(item, index) in items" :key="index" class="group">
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
              v-for="(value, property, i) in item"
              :key="i"
              class="whitespace-nowrap group-hover:bg-gray-50 px-6 py-3 text-sm leading-5 text-gray-900"
              :class="{
                'rounded-l-md': i === 0 && !selectable,
                'rounded-r-md': i === headers.length - 1 && !showActions,
              }"
            >
              <!-- add slot to be able to style/edit each column according to content presented -->
              <slot :name="property" :item="item">
                {{ value }}
              </slot>
            </td>

            <td
              v-if="showActions"
              class="whitespace-nowrap rounded-r-md group-hover:bg-gray-50 relative flex items-center justify-end px-6 py-3 text-right"
            >
              <button type="button">
                <DotsHorizontalIcon class="w-5 h-5 text-gray-800" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length" class="px-5">
              <NoData />
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="showPagination"
        class="px-6 mt-8"
        current-page="2"
        total-pages="10"
        current-range="1 - 6"
        total="60"
      />

      <Transition
        enter-active-class="sm:duration-300 transition duration-500 ease-in-out transform"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="sm:duration-300 transition duration-500 ease-in-out transform"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
      >
        <div
          v-if="selectedItems.length"
          class="bg-brand-800 fixed bottom-0 left-0 right-0 px-10 py-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <p class="text-sm font-normal text-gray-300">
                <span class="font-extrabold text-white">{{ selectedItems.length }}</span> valgt
              </p>
              <Button variant="transparent" size="s" @click="selectedItems = []">Fjern valg</Button>
            </div>
            <slot name="actions" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
