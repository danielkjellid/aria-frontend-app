<script setup lang="ts">
import { CategoryProductListOutput } from '~~/@types/generated/dist'

/***********
 ** Props **
 ***********/

interface ProductFiltersProps {
  products?: CategoryProductListOutput[]
  filteredProducts: CategoryProductListOutput[]
  loading?: boolean
  mobileMenuActive?: boolean
}

const props = defineProps<ProductFiltersProps>()

/***********
 ** State **
 ***********/

const availableFilters = (filteredProducts, arrKey, filterKey = 'name') => {
  let filters = []
  const arr = []
  filteredProducts.map((product) => {
    if (typeof product[arrKey] === 'object' && !Array.isArray(product[arrKey])) {
      arr.push(product[arrKey])
    } else if (Array.isArray(product[arrKey])) {
      product[arrKey].map((obj) => arr.push(obj))
    }

    return null
  })

  arr.map((element) => {
    const count = arr.filter((el) => el[filterKey] === element[filterKey]).length

    const uniqueObjs = arr.reduce((unique, object) => {
      // if the object is unique, push it to own unique array
      if (!unique.some((obj) => obj[filterKey] === object[filterKey])) {
        unique.push(object)
      }
      // return as an array of unique objects
      return unique
    }, [])

    // find index of element in mapping
    const objectIndex = uniqueObjs.findIndex((object) => object[filterKey] === element[filterKey])
    // append the count property and value
    uniqueObjs[objectIndex].count = count

    // set the desination list equal to unique list with added properties
    filters = uniqueObjs
    return filters
  })

  return filters
}

const filters = reactive([
  {
    label: 'Farger',
    key: 'colors',
    data: computed(() => availableFilters(props.filteredProducts, 'colors')),
    originalData: computed(() => availableFilters(props.products, 'colors')),
    selectedData: [],
  },
  {
    label: 'Fasonger',
    key: 'shapes',
    data: computed(() => availableFilters(props.filteredProducts, 'shapes')),
    originalData: computed(() => availableFilters(props.products, 'shapes')),
    selectedData: [],
  },
  {
    label: 'Materialer',
    key: 'materials',
    data: computed(() => availableFilters(props.filteredProducts, 'materials')),
    originalData: computed(() => availableFilters(props.products, 'materials')),
    selectedData: [],
  },
  {
    label: 'Rom',
    key: 'rooms',
    data: computed(() => availableFilters(props.filteredProducts, 'rooms')),
    originalData: computed(() => availableFilters(props.products, 'rooms')),
    selectedData: [],
  },
  {
    label: 'Leverandører',
    key: 'supplier',
    data: computed(() => availableFilters(props.filteredProducts, 'supplier')),
    originalData: computed(() => availableFilters(props.products, 'supplier')),
    selectedData: [],
  },
])

const aggregatedFilters = computed(() => filters.flatMap((filter) => filter.selectedData))

const handleFilterSelect = (val: string, arr: string[]) => {
  if (arr.includes(val)) {
    arr.splice(arr.indexOf(val), 1)
  } else {
    arr.push(val)
  }
}

/***********
 ** Emits **
 ***********/

interface ProductFiltersEmits {
  (e: 'change', value: typeof aggregatedFilters.value): void
  (e: 'modalClose'): void
}

const emits = defineEmits<ProductFiltersEmits>()

/**************
 ** Watchers **
 **************/

watch(
  () => aggregatedFilters,
  (_, newValue) => {
    emits('change', newValue.value)
  },
  { deep: true }
)
</script>

<template>
  <div v-if="loading" class="lg:flex items-center justify-start hidden space-x-4">
    <SkeletonLoader v-for="i in 5" :key="i" loading width="w-28" height="h-9" class="mt-1" />
  </div>
  <div v-else>
    <ModalSlideOver
      title="Filter"
      :active="mobileMenuActive"
      max-width="max-w-sm"
      @close="$emit('modalClose')"
    >
      <div v-for="filter in filters" :key="filter.label" class="mb-12">
        <div v-if="filter.originalData.length">
          <p class="mb-3 font-medium text-gray-900">{{ filter.label }}</p>
          <ul>
            <ListBoxItem
              v-for="data in filter.data"
              :key="data.name"
              :value="data.name"
              :selected="filter.selectedData"
              check-mark-alignment="right"
              class="rounded-md"
              @select="(e) => handleFilterSelect(e, filter.selectedData)"
            >
              <template #default="{ selected }">
                <div class="flex justify-between">
                  <span v-if="filter.key === 'supplier'">
                    {{ data.originCountryFlag }} {{ data.name }}
                  </span>
                  <span v-else>{{ data.name }}</span>
                  <span
                    :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
                    class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
                  >
                    {{ data.count }}
                  </span>
                </div>
              </template>
              <template v-if="filter.key === 'colors' || filter.key === 'shapes'" #leftIcon>
                <div
                  v-if="filter.key == 'colors'"
                  :style="`background-color: ${data.colorHex}`"
                  class="w-6 h-6 mr-3 border border-gray-300 rounded-full"
                />
                <img v-else-if="filter.key === 'shapes'" alt="" :src="data.image" class="w-6 h-6" />
              </template>
            </ListBoxItem>
          </ul>
        </div>
      </div>
    </ModalSlideOver>

    <div
      v-if="filters && products && filteredProducts"
      class="lg:flex items-center justify-start hidden space-x-4"
    >
      <template v-for="filter in filters">
        <ListBox
          v-if="filter.originalData.length"
          :key="filter.label"
          :button-label="filter.label"
          :selected="filter.selectedData"
          :disabled="!filter.data.length"
          multiple
        >
          <ListBoxItem
            v-for="data in filter.data"
            :key="data.name"
            :value="data.name"
            :selected="filter.selectedData"
            check-mark-alignment="right"
            @select="(e) => handleFilterSelect(e, filter.selectedData)"
          >
            <template #default="{ isSelected }">
              <div class="flex justify-between">
                <span v-if="filter.key === 'supplier'">
                  {{ data.originCountryFlag }} {{ data.name }}
                </span>
                <span v-else>{{ data.name }}</span>
                <span
                  :class="isSelected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
                  class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
                >
                  {{ data.count }}
                </span>
              </div>
            </template>
            <template v-if="filter.key === 'colors' || filter.key === 'shapes'" #leftIcon>
              <div
                v-if="filter.key == 'colors'"
                :style="`background-color: ${data.colorHex}`"
                class="w-6 h-6 mr-3 border border-gray-300 rounded-full"
              />
              <img v-else-if="filter.key === 'shapes'" alt="" :src="data.image" class="w-6 h-6" />
            </template>
          </ListBoxItem>
        </ListBox>
      </template>
    </div>
  </div>
</template>
