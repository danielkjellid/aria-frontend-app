<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'
import { FilterIcon } from '@heroicons/vue/outline'
import { ProductListOutput } from '~~/@types/generated/dist'
import { ButtonProps } from '~~/components/Button/index.vue'

/************
 ** Layout **
 ************/

definePageMeta({
  layout: 'default',
})

/************
 ** Config **
 ************/

const config = useRuntimeConfig().public

/************
 ** Routes **
 ************/

const route = useRoute()
const router = useRouter()

const currentParentCategorySlug = computed(() => {
  if (route.params.categorySlug) {
    if (typeof route.params.categorySlug === 'string') {
      return route.params.categorySlug
    }
    return route.params.categorySlug[0]
  }
  return null
})

const currentCategorySlug = computed(() => {
  if (route.params.subCategorySlug) {
    if (typeof route.params.subCategorySlug === 'string') {
      return route.params.subCategorySlug
    }
    return route.params.subCategorySlug[0]
  }
  return null
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

const currentParentCategoryObj = computed(() => {
  if (!store.getCategory(currentParentCategorySlug.value)) {
    // Call api to populate pinia state.
    store.fetchCategory(currentParentCategorySlug.value)
  }

  // Return pinia state.
  return store.getCategory(currentParentCategorySlug.value)
})

const currentCategoryObj = computed(() => {
  if (!store.getCategory(currentCategorySlug.value)) {
    store.fetchCategory(currentCategorySlug.value)
  }

  return store.getCategory(currentCategorySlug.value)
})

const currentParentCategoryObjLoaded = computed(() => !!currentParentCategoryObj.value)
const currentCategoryObjLoaded = computed(() => !!currentCategoryObj.value)

const categoryProductsLoading = computed(() => !products.value)

/*********************
 ** State: Products **
 *********************/

const fetchedProducts = ref<ProductListOutput[]>(null)

const fetchProducts = async () => {
  fetchedProducts.value = await performGet<ProductListOutput[]>(
    `products/category/${currentCategorySlug.value}/`
  )
}

fetchProducts()

const products = computed(() => (fetchedProducts.value ? fetchedProducts.value : null))
const productsLoading = computed(() => !products.value)

/*********************
 ** State: Querying **
 *********************/

interface SearchQueryParamsObj {
  [x: string]: string
}

const query = ref('')
const showQueryTag = ref<boolean>(false)
const searchLoadingState = ref<ButtonProps['loadingState']>('initial')

const searchEndpoint = async () => {
  searchLoadingState.value = 'loading'

  try {
    fetchedProducts.value = await performGet<ProductListOutput[]>(
      `products/category/${currentCategorySlug.value}/?search=${query.value}`
    )
    searchLoadingState.value = 'success'

    // Update route with query params.
    router.push({ path: route.path, query: { search: query.value } })

    showQueryTag.value = true
  } catch (error) {
    searchLoadingState.value = 'error'
    console.log('error')
    showQueryTag.value = false
  } finally {
    searchLoadingState.value = 'initial'
  }
}

const clearSearch = async () => {
  query.value = undefined

  try {
    fetchedProducts.value = await performGet<ProductListOutput[]>(
      `products/category/${currentCategorySlug.value}/`
    )
    searchLoadingState.value = 'success'

    // Update route with query params.
    router.push({ path: route.path, query: { search: query.value } })

    showQueryTag.value = false
  } catch (error) {
    searchLoadingState.value = 'error'
    console.log('error')
  } finally {
    searchLoadingState.value = 'initial'
  }
}

// Function to set query based on existing query param.
const setQueryFromQueryParamsOnLoad = () => {
  const queryParams = route.query as SearchQueryParamsObj

  query.value = queryParams.search
}

setQueryFromQueryParamsOnLoad()

/**********************
 ** State: Filtering **
 **********************/

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

/**************
 ** Watchers **
 **************/

watch(
  () => productsLoading.value,
  (_oldValue, _newValue) => {
    if (query.value) {
      searchEndpoint()
    }
  }
)
</script>

<template>
  <div>
    <Head>
      <Title>
        Kjøp {{ currentCategoryObjLoaded ? currentCategoryObj.name : 'Loading...' }} innenfor
        {{ currentParentCategoryObjLoaded ? currentParentCategoryObj.name : 'Loading...' }} på nett
      </Title>
      <Meta name="og:type" content="website" />
      <Meta
        name="og:description"
        :content="`Kjøp ${
          currentCategoryObjLoaded ? currentCategoryObj.name : 'Loading...'
        }, og alt annet innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken på nett.`"
      />
    </Head>
    <main>
      <Image
        v-if="currentCategoryObjLoaded"
        :title="currentCategoryObj.name"
        :loading="false"
        :images="currentCategoryObj.images"
      />
      <Image v-else loading />
      <Container>
        <Breadcrumbs v-if="currentCategoryObjLoaded && currentParentCategoryObjLoaded">
          <BreadcrumbsItem to="/">{{ config.BRAND_NAME }}</BreadcrumbsItem>
          <BreadcrumbsItem to="/">{{ currentParentCategoryObj.name }}</BreadcrumbsItem>
          <BreadcrumbsItem to="#" active>{{ currentCategoryObj.name }}</BreadcrumbsItem>
        </Breadcrumbs>
        <Breadcrumbs v-else>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#" active>Loading...</BreadcrumbsItem>
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
          <form class="lg:hidden flex items-center mt-2 space-x-3" @submit.prevent="searchEndpoint">
            <Input
              id="search-1"
              v-model.trim="query"
              label="Søk"
              :value="query"
              :hidden-label="true"
              placeholder="Søk etter tusenvis av varer..."
              class="w-full"
            />
            <Button type="submit" primary :loading-state="searchLoadingState"> Søk </Button>
          </form>
          <div class="lg:hidden flex items-center mt-4 space-x-3">
            <Tag v-if="showQueryTag && query" size="lg" @remove="clearSearch">{{ query }}</Tag>
          </div>
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
            <Tag v-if="showQueryTag && query" size="lg" @remove="clearSearch">{{ query }}</Tag>
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
            fra alle våre leverandører. Ta kontakt med oss på hei@flis.no så hjelper vi deg videre
            😊
          </Callout>
        </div>
      </Container>
    </main>
  </div>
</template>
