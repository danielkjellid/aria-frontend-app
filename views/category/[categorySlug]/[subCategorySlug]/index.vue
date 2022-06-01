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

const aggregatedFilters = ref([])

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
        <ProductFilters
          :products="filteredProducts"
          :loading="categoryProductsLoading"
          @on-change="(val) => (aggregatedFilters = val)"
        />
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
      <Spacer spacing="md" />
      <ProductList :loading="categoryProductsLoading" :products="filteredProducts" />
    </Container>
  </main>
</template>
