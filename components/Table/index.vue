<script setup lang="ts">
/* eslint-disable vue/v-slot-style */
/* eslint-disable vue/no-v-for-template-key */
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { TableHeaderObj } from './Header.vue'

interface TableProps {
  itemsLoading?: boolean
  headers: TableHeaderObj[]
  items: any[]
  showActions?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  showPagination?: boolean
  nextPageLink?: string
  previousPageLink?: string
  currentPage?: string | number
  totalPages?: string | number
  totalObjs?: string | number
  currentRange?: string
}

const props = defineProps<TableProps>()

const showSearch = computed(() => (props.showSearch ? props.showSearch : false))
const showPagination = computed(() => (props.showPagination ? props.showPagination : false))
const selectable = computed(() => (props.selectable ? props.selectable : false))
const showActions = computed(
  () => props.headers && props.headers.filter((header) => header.value === 'actions').length > 0
)

const emitQuery = (val: string) => {}

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

interface TableEmits {
  (e: 'nextPage'): void
  (e: 'previousPage'): void
}

const emits = defineEmits<TableEmits>()

const nextPage = () => {
  emits('nextPage')
}

const previousPage = () => {
  emits('previousPage')
}
</script>

<template>
  <div>
    <TableSearch
      v-if="showSearch"
      :placeholder="searchPlaceholder"
      @on-search="(e) => emitQuery(e)"
    />

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <TableHeader :headers="headers" :selectable="selectable" />
        <tbody v-if="itemsLoading">
          <tr>
            <td
              :colspan="selectable ? headers.length + 1 : headers.length"
              class="table-content-placeholder py-12 mx-auto"
            >
              <LoadingSpinner class="mx-auto" height="h-20" width="w-20" />
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="!itemsLoading && items && items.length" class="bg-white">
          <TableRow
            v-for="(item, index) in items"
            :key="index"
            :headers="headers"
            :item="item"
            :index="index"
            :show-actions="showActions"
            :selectable="selectable"
            :selected-items="selectedItems"
            @select="(obj) => selectItem(obj)"
          >
            <template v-for="(header, i) in headers" :key="i" v-slot:[header.value]="{ row }">
              <slot :name="header.value" :row="row" />
            </template>
            <template #action-menu-items="{ obj }">
              <slot name="actions" :item="obj" />
            </template>
          </TableRow>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="selectable ? headers.length + 1 : headers.length" class="px-6 pt-5">
              <NoData class="table-content-placeholder" />
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="showPagination"
        class="px-6 mt-8"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total="totalObjs"
        :current-range="currentRange"
        @next="nextPage"
        @previous="previousPage"
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
            <slot name="page-actions" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.table-content-placeholder {
  height: 864px;
}
</style>
