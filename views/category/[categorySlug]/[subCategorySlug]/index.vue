<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

/***************
 ** Page meta **
 ***************/

const route = useRoute()

const currentParentCategory = computed(() => {
  let slug: string
  if (typeof route.params.categorySlug === 'string') {
    slug = route.params.categorySlug
  } else {
    // eslint-disable-next-line prefer-destructuring
    slug = route.params.categorySlug[0]
  }

  return slug.charAt(0).toUpperCase() + slug.slice(1)
})

const currentCategorySlug = computed(() => {
  if (typeof route.params.subCategorySlug === 'string') {
    return route.params.subCategorySlug
  }
  return route.params.subCategorySlug[0]
})

/***********
 ** Store **
 ***********/

const store = useCategoriesStore()

/***********
 ** State **
 ***********/

// Get current visited category, and check if we already have fetched it
// at some point. if so, retrieve it from pinia instead of calling the api
// on every site render.
const currentCategoryObj = computed(() => {
  if (!store.getCategory(currentCategorySlug.value)) {
    // Call api to populate pinia state.
    store.fetchCategory(currentCategorySlug.value)
  }

  // Return pinia state.
  return store.getCategory(currentCategorySlug.value)
})

const categoryProducts = computed(() => {
  if (!store.getCategoryProducts(currentCategorySlug.value)) {
    store.fetchCategoryProducts(currentCategorySlug.value)
  }

  return store.getCategoryProducts(currentCategorySlug.value)
})

const products = computed(() =>
  categoryProducts.value !== undefined &&
  categoryProducts.value.products !== undefined &&
  categoryProducts.value.products.length > 0
    ? categoryProducts.value.products
    : null
)

const currentCategoryLoading = computed(() => !currentCategoryObj.value)
const categoryProductsLoading = computed(() => !products.value)

const metaTitle = computed(() => (currentCategoryObj.value ? currentCategoryObj.value.name : ''))
// const products = []

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

const filteredProducts = computed(() => {
  if (products.value) {
    const matchedProducts = products.value.filter(
      (product) =>
        aggregatedFilters.value.every(
          (filter) =>
            product.colors.find((color) => color.name === filter.name) ||
            product.shapes.find((shape) => shape.name === filter.name) ||
            product.materials.find((material) => material.name === filter.name) ||
            product.rooms.find((room) => room.name === filter.name) ||
            product.supplier.name === filter.name
        )

      // aggregatedFilters.value.every((filter) => )
    )

    return matchedProducts
  }

  // product.colors.some((color) => color === filter))

  return []
})
const colors = computed(() => availableFilters(filteredProducts.value, 'colors'))
const shapes = computed(() => availableFilters(filteredProducts.value, 'shapes'))
const materials = computed(() => availableFilters(filteredProducts.value, 'materials'))
const rooms = computed(() => availableFilters(filteredProducts.value, 'rooms'))
const suppliers = computed(() => availableFilters(filteredProducts.value, 'supplier'))
</script>

<template>
  <main>
    <Image v-if="currentCategoryLoading" loading />
    <Image
      v-else
      :title="currentCategoryObj.name"
      :loading="false"
      :images="currentCategoryObj.images"
    />
    <Container>
      <Breadcrumbs v-if="currentCategoryLoading">
        <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
        <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
        <BreadcrumbsItem loading to="#" active>Loading...</BreadcrumbsItem>
      </Breadcrumbs>
      <Breadcrumbs v-else>
        <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
        <BreadcrumbsItem to="#">{{ currentParentCategory }}</BreadcrumbsItem>
        <BreadcrumbsItem to="#" active>{{ metaTitle }}</BreadcrumbsItem>
      </Breadcrumbs>
      <Spacer spacing="md" />
      <div class="flex items-center justify-between py-3 bg-white border-b border-gray-200">
        <div class="lg:flex items-center justify-start hidden space-x-4">
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
        <div class="flex items-center mt-1 space-x-3">
          <Input
            id="test"
            label="test"
            :hidden-label="true"
            placeholder="Søk etter tusenvis av varer..."
          />
          <Button>Søk</Button>
        </div>
      </div>
      <!-- {{ aggregatedFilters }}
      <hr /> -->
      {{ filteredProducts && filteredProducts.length ? filteredProducts.length : 'N' }} |
      {{ !categoryProductsLoading ? products.length : 'N' }}

      <Spacer spacing="md" />
      <ProductList :loading="categoryProductsLoading" :products="filteredProducts" />
    </Container>
  </main>
</template>
