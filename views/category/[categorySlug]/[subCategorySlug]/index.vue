<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'
import { FilterIcon } from '@heroicons/vue/outline'
import { CategoryProductListOutput } from '~~/@types/generated/dist'
import { ButtonProps } from '~~/components/Button/index.vue'

/************
 ** Routes **
 ************/

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

/*********************
 ** State: Category **
 *********************/

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

const currentCategoryLoading = computed(() => !currentCategoryObj.value)
const categoryProductsLoading = computed(() => !products.value)

const metaTitle = computed(() => (currentCategoryObj.value ? currentCategoryObj.value.name : ''))

/*********************
 ** State: Products **
 *********************/

const fetchedProducts = ref<CategoryProductListOutput[]>(null)

const fetchProducts = async () => {
  fetchedProducts.value = await performGet<CategoryProductListOutput[]>(
    `categories/category/${currentCategorySlug.value}/products/`
  )
}

fetchProducts()

const products = computed(() => (fetchedProducts.value ? fetchedProducts.value : null))
const productsLoading = computed(() => !products.value)

const query = ref('')
const searchLoadingState = ref<ButtonProps['loadingState']>('initial')

const searchEndpoint = async () => {
  searchLoadingState.value = 'loading'

  try {
    fetchedProducts.value = await performGet<CategoryProductListOutput[]>(
      `categories/category/${currentCategorySlug.value}/products/?search=${query.value}`
    )
    searchLoadingState.value = 'success'
  } catch (error) {
    searchLoadingState.value = 'error'
    console.log('error')
  } finally {
    searchLoadingState.value = 'initial'
  }
}

/**********************
 ** State: Filtering **
 *********************/

const aggregatedFilters = ref([])

const filteredProducts = computed(() => {
  if (fetchedProducts.value) {
    const matchedProducts = fetchedProducts.value.filter((product) =>
      aggregatedFilters.value.every(
        (filter) =>
          product.colors.find((color) => color.name === filter) ||
          product.shapes.find((shape) => shape.name === filter) ||
          product.materials.find((material) => material.name === filter) ||
          product.rooms.find((room) => room.name === filter) ||
          product.supplier.name === filter
      )
    )

    return matchedProducts
  }
  return []
})

const mobileFilterMenuActive = ref<boolean>(false)

const openMobileFilterMenu = () => {
  mobileFilterMenuActive.value = true
  document.body.classList.add('overflow-hidden')
}

const closeMobileFilterMenu = () => {
  mobileFilterMenuActive.value = false
  document.body.classList.remove('overflow-hidden')
}
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
        <BreadcrumbsItem to="/">{{ currentParentCategory }}</BreadcrumbsItem>
        <BreadcrumbsItem to="#" active>{{ metaTitle }}</BreadcrumbsItem>
      </Breadcrumbs>

      <Spacer spacing="xs" />

      <!-- Filtering and search on default -->
      <div class="lg:hidden flex-col py-3">
        <Button variant="secondary" fluid @click="openMobileFilterMenu">
          Filtrer
          <template #leftIcon>
            <FilterIcon class="w-5 h-5 text-gray-500" />
          </template>
        </Button>
        <form class="lg:flex items-center hidden mt-1 space-x-3" @submit.prevent="searchEndpoint">
          <Input
            id="search-1"
            label="Søk"
            :hidden-label="true"
            placeholder="Søk etter tusenvis av varer..."
            class="w-full"
          />
          <Button type="submit" primary :loading-state="searchLoadingState" @click="searchEndpoint">
            Søk
          </Button>
        </form>
      </div>

      <!-- Filtering and search on lg+ -->
      <div class="lg:py-3 flex items-center justify-between bg-white border-b border-gray-200">
        <ProductFilters
          :products="products"
          :filtered-products="filteredProducts"
          :loading="categoryProductsLoading"
          :mobile-menu-active="mobileFilterMenuActive"
          @change="(val) => (aggregatedFilters = val)"
          @modal-close="closeMobileFilterMenu"
        />
        <form class="lg:flex items-center hidden mt-1 space-x-3" @submit.prevent="searchEndpoint">
          <Input
            id="search-2"
            v-model.trim="query"
            label="Søk"
            :value="query"
            :hidden-label="true"
            placeholder="Søk etter tusenvis av varer..."
          />
          <Button type="submit" primary :loading-state="searchLoadingState"> Søk </Button>
        </form>
      </div>

      <Spacer spacing="sm" />

      <ProductList :loading="productsLoading" :products="filteredProducts" />

      <Spacer spacing="md" />

      <div class="border-t border-gray-200">
        <Spacer spacing="md" />
        <Callout variant="info" title="Finner du ikke det du leter etter?">
          Det hender at vi har varer som ikke ligger i nettbutikken, men vi har et bredt sortiment
          fra alle våre leverandører. Ta kontakt med oss på hei@flis.no så hjelper vi deg videre 😊
        </Callout>
      </div>
    </Container>
  </main>
</template>
