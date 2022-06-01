<script setup lang="ts">
import { CategoryProductListOutput } from '~~/@types/generated/dist'

/***********
 ** Props **
 ***********/

interface ProductFiltersProps {
  products: CategoryProductListOutput[]
  loading?: boolean
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

const selectedColors = ref([])
const selectedShapes = ref([])
const selectedMaterials = ref([])
const selectedRooms = ref([])
const selectedSuppliers = ref([])

const aggregatedFilters = computed(() => [
  ...selectedColors.value,
  ...selectedShapes.value,
  ...selectedMaterials.value,
  ...selectedRooms.value,
  ...selectedSuppliers.value,
])

const colors = computed(() => availableFilters(props.products, 'colors'))
const shapes = computed(() => availableFilters(props.products, 'shapes'))
const materials = computed(() => availableFilters(props.products, 'materials'))
const rooms = computed(() => availableFilters(props.products, 'rooms'))
const suppliers = computed(() => availableFilters(props.products, 'supplier'))

/***********
 ** Emits **
 ***********/

interface ProductFiltersEmits {
  (e: 'on-change', value: typeof aggregatedFilters.value): void
}

const emits = defineEmits<ProductFiltersEmits>()

/**************
 ** Watchers **
 **************/

watch(
  () => aggregatedFilters,
  (_, filters) => {
    emits('on-change', filters.value)
  },
  { deep: true }
)
</script>

<template>
  <div v-if="loading" class="lg:flex items-center justify-start hidden space-x-4">
    <SkeletonLoader v-for="i in 5" :key="i" loading width="w-28" height="h-9" class="mt-1" />
  </div>
  <div v-else class="lg:flex items-center justify-start hidden space-x-4">
    <ListBox
      v-model="selectedColors"
      label="Farger"
      multiple
      :selected="selectedColors"
      :disabled="!colors.length"
    >
      <ListBoxItem
        v-for="color in colors"
        :key="color.id"
        :value="color"
        :disabled="color.count === 0"
      >
        <template #default="{ selected }">
          <div class="flex justify-between">
            <span>{{ color.name }}</span>
            <span
              :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
              class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
            >
              {{ color.count }}
            </span>
          </div>
        </template>
        <template #leftIcon>
          <div
            :style="`background-color: ${color.colorHex}`"
            class="w-6 h-6 mr-3 border border-gray-300 rounded-full"
          />
        </template>
      </ListBoxItem>
    </ListBox>
    <ListBox
      v-model="selectedShapes"
      label="Fasonger"
      multiple
      :selected="selectedShapes"
      :disabled="!shapes.length"
    >
      <ListBoxItem
        v-for="shape in shapes"
        :key="shape.id"
        :value="shape"
        :disabled="shape.count === 0"
      >
        <template #default="{ selected }">
          <div class="flex justify-between">
            <span>{{ shape.name }}</span>
            <span
              :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
              class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
            >
              {{ shape.count }}
            </span>
          </div>
        </template>
        <template #leftIcon>
          <img alt="" :src="shape.image" class="w-6 h-6" />
        </template>
      </ListBoxItem>
    </ListBox>
    <ListBox
      v-model="selectedMaterials"
      label="Materialer"
      multiple
      :selected="selectedMaterials"
      :disabled="!materials.length"
    >
      <ListBoxItem
        v-for="material in materials"
        v-slot="{ selected }"
        :key="material"
        :value="material"
        check-mark-alignment="right"
        :disabled="material.count === 0"
      >
        <div class="flex justify-between">
          <span>{{ material.name }}</span>
          <span
            :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
            class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
          >
            {{ material.count }}
          </span>
        </div>
      </ListBoxItem>
    </ListBox>
    <ListBox
      v-model="selectedRooms"
      label="Rom"
      multiple
      :selected="selectedRooms"
      :disabled="!rooms.length"
    >
      <ListBoxItem
        v-for="room in rooms"
        v-slot="{ selected }"
        :key="room"
        :value="room"
        check-mark-alignment="right"
        :disabled="room.count === 0"
      >
        <div class="flex justify-between">
          <span>{{ room.name }}</span>
          <span
            :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
            class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
          >
            {{ room.count }}
          </span>
        </div>
      </ListBoxItem>
    </ListBox>
    <ListBox
      v-model="selectedSuppliers"
      label="Leverandør"
      multiple
      :selected="selectedSuppliers"
      :disabled="!suppliers.length"
    >
      <ListBoxItem
        v-for="supplier in suppliers"
        v-slot="{ selected }"
        :key="supplier"
        :value="supplier"
        check-mark-alignment="right"
        :disabled="supplier.count === 0"
      >
        <div class="flex justify-between">
          <span>{{ supplier.originCountryFlag }} {{ supplier.name }}</span>
          <span
            :class="selected ? 'bg-brand-800 text-white' : 'bg-brand-300 text-brand-800'"
            class="shrink-0 flex items-center justify-center w-5 h-5 mr-6 text-xs rounded-full"
          >
            {{ supplier.count }}
          </span>
        </div>
      </ListBoxItem>
    </ListBox>
  </div>
</template>
