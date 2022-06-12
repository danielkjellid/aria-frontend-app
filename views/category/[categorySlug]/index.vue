<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

/***************
 ** Page meta **
 ***************/

const route = useRoute()

const currentCategory = computed(() => {
  if (typeof route.params.categorySlug === 'string') {
    return route.params.categorySlug
  }
  return route.params.categorySlug[0]
})

const metaTitle = computed(
  () => currentCategory.value.charAt(0).toUpperCase() + currentCategory.value.slice(1)
)

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
  if (!store.getCategory(currentCategory.value)) {
    // Call api to populate pinia state.
    store.fetchCategory(currentCategory.value)
  }

  // Return pinia state.
  return store.getCategory(currentCategory.value)
})

const currentCategoryLoading = computed(() => !currentCategoryObj.value)

// Check if we have already fetched sub categories for this parent previously,
// and if so, retrieve it from pinia instead of calling the api on every site
// render.
const parentCategory = computed(() => {
  if (
    !store.getChildCategories(currentCategory.value) ||
    store.getChildCategories(currentCategory.value).length <= 0
  ) {
    // Call api to populate pinia state.
    store.fetchChildCategories(currentCategory.value)
  }

  // Return pinia state.
  return store.getChildCategories(currentCategory.value)
})

// Get child categories from parentCategory.
const childCategories = computed(() =>
  parentCategory.value !== undefined &&
  parentCategory.value.children !== undefined &&
  parentCategory.value.children.length > 0
    ? parentCategory.value.children
    : []
)

const childrenLoading = computed(() => childCategories.value.length <= 0)
</script>

<template>
  <div>
    <Head>
      <Title>Kjøp {{ metaTitle }}</Title>
      <Meta name="og:type" content="website" />
      <Meta
        name="og:description"
        :content="`Kjøp ${metaTitle}, og alt innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken på nett.`"
      />
    </Head>
    <main>
      <Image v-if="currentCategoryLoading" loading />
      <Image
        v-else
        :title="currentCategoryObj.name"
        :loading="false"
        :images="currentCategoryObj.images"
      />
      <Container>
        <Breadcrumbs>
          <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
          <BreadcrumbsItem :to="`/category/${currentCategory}/`" active>
            {{ metaTitle }}
          </BreadcrumbsItem>
        </Breadcrumbs>
      </Container>
      <CollectionList v-if="childrenLoading">
        <CollectionListItem
          v-for="(n, i) in 8"
          :key="n"
          title="Loading"
          description="Loading..."
          loading
          :reverse="i % 2 == 0"
          to="#"
          link-label="Loading"
        />
      </CollectionList>
      <CollectionList v-else>
        <CollectionListItem
          v-for="(child, index) in childCategories"
          :key="child.slug"
          :title="child.name"
          :description="child.description"
          :loading="childrenLoading"
          :images="child.listImages"
          :reverse="index % 2 == 0"
          :to="`/category/${currentCategory}/${child.slug}/`"
          link-label="Se produkter"
        />
      </CollectionList>
    </main>
  </div>
</template>
