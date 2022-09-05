<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import {
  ProductDetailOutput,
  ProductSizeOutput,
  ProductVariantOutput,
  ProductCategoryOutput,
} from '~~/@types'
import image80x80 from '~~/assets/images/default_80x80.jpeg'
import image380x575 from '~~/assets/images/default_380x575.jpeg'
import { publicUrls } from '~~/endpoints'

/***************
 ** Page meta **
 ***************/

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
const { history } = useRouter().options

const currentParentCategorySlug = computed(() => {
  if (history.state.routeParentCategorySlug) {
    if (typeof history.state.routeParentCategorySlug === 'string') {
      return history.state.routeParentCategorySlug
    }
    return history.state.routeParentCategorySlug[0]
  }

  return null
})

const currentChildCategorySlug = computed(() => {
  if (history.state.routeChildCategorySlug) {
    if (typeof history.state.routeChildCategorySlug === 'string') {
      return history.state.routeChildCategorySlug
    }
    return history.state.routeChildCategorySlug[0]
  }
  return null
})

const currentProductSlug = computed(() => {
  if (typeof route.params.productSlug === 'string') {
    return route.params.productSlug
  }
  return route.params.productSlug[0]
})

/*********************
 ** State: Products **
 *********************/

const product = ref<ProductDetailOutput>()
const productLoaded = computed((): boolean => !!product.value)

const fetchedProduct = async () => {
  product.value = await performGet<ProductDetailOutput>(
    publicUrls.products.detail(currentProductSlug.value)
  )
}

fetchedProduct()

/***********************
 ** State: Categories **
 ***********************/

const foundCategories = computed(() => {
  // A product can be connected to multiple categories, and
  // therefore multiple of the same parent categories.
  let foundParent
  // We're only interested in 1 particular child, even though
  // the product may be connected to multiple.
  let foundChild

  if (productLoaded.value) {
    // Check if we have a previous route to find and append.
    if (
      currentParentCategorySlug.value &&
      currentChildCategorySlug.value &&
      product.value.categories &&
      product.value.categories.length
    ) {
      foundChild = product.value.categories.find(
        (category: ProductCategoryOutput) => category.slug === currentChildCategorySlug.value
      )

      if (foundChild.parents.length) {
        foundParent = foundChild.parents.find(
          (parent: ProductCategoryOutput) => parent.slug === currentParentCategorySlug.value
        )
      }
      // If we don't have any previous route params to append from,
      // just chose the first option if available.
    } else if (product.value.categories && product.value.categories.length) {
      ;[foundChild] = product.value.categories

      if (foundChild.parents.length) {
        ;[foundParent] = foundChild.parents
      }
      // If there are no categories connected to the product, give up.
    } else {
      return null
    }

    return {
      parent: { name: foundParent.name, slug: foundParent.slug },
      child: { name: foundChild.name, slug: foundChild.slug },
    }
  }
  return null
})

const foundParentCategory = computed(() =>
  foundCategories.value && foundCategories.value.parent ? foundCategories.value.parent : null
)
const foundChildCategory = computed(() =>
  foundCategories.value && foundCategories.value.child ? foundCategories.value.child : null
)

/****************************
 ** State: Product options **
 ****************************/

// Utility function to find unique values in a set of options.
const aggregateOption = (key: string) => {
  if (product.value && product.value.options && product.value.options.length) {
    const aggregatedOptionKey = product.value.options
      .map((option) => option[key])
      .filter((obj) => obj)
      .reduce((prev, curr) => prev.concat(prev.find((obj) => obj.id === curr.id) ? [] : [curr]), [])

    if (aggregatedOptionKey && aggregatedOptionKey.length) {
      return aggregatedOptionKey
    }

    return []
  }

  return []
}

const mergedVariants = computed(() => aggregateOption('variant'))
const selectedVariant = ref<ProductVariantOutput>(null)

// Replace all missing images sizes with defaults if missing.
const variants = computed(
  () =>
    replaceWithDefaults(
      {
        id: null,
        name: null,
        image: image80x80,
        thumbnail: image380x575,
        colorHex: null,
      },
      mergedVariants.value
    ) as ProductVariantOutput[]
)

const sizes = computed(() => aggregateOption('size'))
const selectedSize = ref<ProductSizeOutput>(null)

// Find related option based on selected variant and size.
const selectedOption = computed(() => {
  if (
    product.value &&
    product.value.options &&
    product.value.options.length &&
    selectedVariant.value !== null &&
    selectedOption.value !== null
  ) {
    return product.value.options.find((option) => {
      // An option does not necessarily need to have both a
      // variant and size, and we have cases where only one
      // of them is present. In that case, the missing key will
      // be returned from endpoint with value null.
      if (selectedVariant.value === null) {
        return option.variant === null && option.size.id === selectedSize.value.id
      }
      if (selectedSize.value === null) {
        return option.size === null && option.variant.id === selectedVariant.value.id
      }
      return (
        option.variant.id === selectedVariant.value.id && option.size.id === selectedSize.value.id
      )
    })
  }

  return undefined
})

// Function for selecting an option when the page loads.
const selectOptionOnLoad = () => {
  if (
    product.value &&
    productLoaded.value &&
    product.value.options &&
    product.value.options.length
  ) {
    let foundOption
    const discountedOptions = product.value.options.filter(
      (option) => option.discount && option.discount.isDiscounted
    )

    if (discountedOptions.length) {
      foundOption = discountedOptions.reduce((prev, curr) =>
        curr.discount.discountedGrossPrice < prev.discount.discountedGrossPrice ? curr : prev
      )
    } else {
      foundOption = product.value.options.reduce((prev, curr) =>
        curr.grossPrice < prev.grossPrice ? curr : prev
      )
    }

    selectedVariant.value = foundOption.variant
    selectedSize.value = foundOption.size
  }
}

// Select appropriate option on page load.
watch(
  () => product.value,
  (_oldValue, _newValue) => {
    selectOptionOnLoad()
  },
  { deep: true }
)

/******************************
 ** State: Product discounts **
 ******************************/

interface FromPriceObj {
  grossDisplayPrice: number
  isDiscounted: boolean
  grossDiscountedPrice?: number
}

const renderFromPrice = computed((): FromPriceObj => {
  if (productLoaded.value) {
    if (selectedOption.value) {
      return {
        grossDisplayPrice: selectedOption.value.grossPrice,
        isDiscounted: !!selectedOption.value.discount,
        grossDiscountedPrice: selectedOption.value.discount
          ? selectedOption.value.discount.discountedGrossPrice
          : null,
      }
    }

    if (product.value.displayPrice) {
      return {
        grossDisplayPrice: product.value.fromPrice,
        isDiscounted: false,
        grossDiscountedPrice: null,
      }
    }
  }

  return null
})

const showPrice = computed(
  (): boolean =>
    !!(
      product.value &&
      productLoaded.value &&
      renderFromPrice.value &&
      (renderFromPrice.value.isDiscounted || product.value.displayPrice)
    )
)

/***************
 ** Page meta **
 ***************/

const metaTitle = computed(() => (productLoaded.value ? product.value.name : undefined))
</script>

<template>
  <div>
    <Head>
      <Title>Kjøp {{ metaTitle }} på nett</Title>
      <Meta name="og:type" content="product" />
      <Meta
        name="og:image"
        :content="product && product.images ? product.images[0].image1536x860 : ''"
      />
      <Meta
        name="og:description"
        :content="`Kjøp serien ${metaTitle}, og alt innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken på nett.`"
      />
    </Head>
    <main>
      <ImageCarousel
        v-if="productLoaded"
        :images="product && product.images ? product.images : []"
      />
      <Image v-else loading />
      <Container>
        <Breadcrumbs v-if="productLoaded">
          <BreadcrumbsItem to="/">{{ config.BRAND_NAME }}</BreadcrumbsItem>
          <template v-if="foundParentCategory && foundChildCategory">
            <BreadcrumbsItem
              :to="{
                name: 'categories-categorySlug',
                params: { categorySlug: foundParentCategory.slug },
              }"
            >
              {{ foundParentCategory.name }}
            </BreadcrumbsItem>
            <BreadcrumbsItem
              :to="{
                name: 'categories-categorySlug-subCategorySlug',
                params: {
                  categorySlug: foundParentCategory.slug,
                  subCategorySlug: foundChildCategory.slug,
                },
              }"
            >
              {{ foundChildCategory.name }}
            </BreadcrumbsItem>
          </template>
          <BreadcrumbsItem to="#" active>{{ product.name }}</BreadcrumbsItem>
        </Breadcrumbs>
        <Breadcrumbs v-else>
          <BreadcrumbsItem loading to="/">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#" active>Loading...</BreadcrumbsItem>
        </Breadcrumbs>

        <Spacer spacing="md" />

        <div
          class="mx-auto lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
        >
          <div class="lg:col-span-2 xl:col-span-3 lg:border-r lg:border-gray-200 lg:pr-8">
            <Text v-if="productLoaded" variant="title2">{{ product.name }}</Text>
            <SkeletonLoader v-else loading width="w-60" height="h-12" />
          </div>

          <!-- Options -->
          <div class="lg:mt-0 lg:row-span-3 xl:col-span-2 lg:col-span-1 mt-4">
            <h2 class="sr-only">Produktinformasjon</h2>
            <Callout
              v-if="product && (!product.canBePurchasedOnline || !product.displayPrice)"
              class="mb-6"
              variant="info"
              title="Kan ikke kjøpes på nett"
            >
              Dette produktet kan ikke kjøpes på nett direkte, men du kan ta kontakt med oss på
              hei@flis.no, så hjepler vi deg mer enn gjerne. Konsultasjonen er ikke forpliktende.
            </Callout>
            <div v-if="showPrice">
              <div v-if="productLoaded">
                <div v-if="renderFromPrice.isDiscounted">
                  <Text variant="title2" color="text-red-600" class="font-normal">
                    Fra kr {{ $formatPrice(renderFromPrice.grossDiscountedPrice) }}
                    <span class="text-gray-500">{{ product.unit }}</span>
                  </Text>
                  <Text variant="title3" class="mt-1 font-normal">
                    <s>
                      Fra kr {{ $formatPrice(renderFromPrice.grossDisplayPrice) }}
                      <span class="text-gray-500">{{ product.unit }}</span>
                    </s>
                  </Text>
                </div>
                <div v-else>
                  <Text variant="title2" class="font-normal">
                    Fra kr {{ $formatPrice(renderFromPrice.grossDisplayPrice) }}
                    <span class="text-gray-500">{{ product.unit }}</span>
                  </Text>
                </div>
              </div>
              <SkeletonLoader v-else loading width="w-60" height="h-10" />
            </div>
            <form :class="showPrice ? 'mt-6' : 'mt-0'">
              <!-- Colors -->
              <div>
                <h3 v-if="productLoaded" class="text-sm font-medium text-gray-900">Varianter</h3>
                <SkeletonLoader v-else loading width="w-16" height="h-5" />
                <fieldset class="mt-4">
                  <legend class="sr-only">Velg en variant</legend>
                  <div
                    v-if="productLoaded"
                    class="lg:grid-cols-5 xl:grid-cols-7 sm:grid-cols-7 md:grid-cols-9 grid grid-cols-6 gap-5"
                  >
                    <label
                      v-for="variant in variants"
                      :key="variant.id"
                      :for="`variant-choice-${variant.id}`"
                      class="focus:outline-none ring-brand-800 relative flex items-center justify-center mx-auto rounded-full cursor-pointer"
                      :class="{
                        ring: variant && selectedVariant && variant.id === selectedVariant.id,
                      }"
                    >
                      <input
                        :id="`variant-choice-${variant.id}`"
                        type="radio"
                        name="variant-choice"
                        :value="variant.id"
                        class="sr-only"
                        :aria-labelledby="`variant-choice-${variant.id}-label`"
                        @input="selectedVariant = variant"
                      />
                      <span :id="`variant-choice-${variant.id}-label`" class="sr-only">
                        {{ variant.name }}
                      </span>
                      <img
                        aria-hidden="true"
                        :src="variant.image"
                        alt=""
                        class="sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 object-cover w-10 h-10 border-2 border-gray-300 rounded-full"
                      />
                    </label>
                  </div>
                  <div
                    v-else
                    class="lg:grid-cols-5 xl:grid-cols-7 sm:grid-cols-7 md:grid-cols-9 grid grid-cols-6 gap-5"
                  >
                    <SkeletonLoader
                      v-for="i in 14"
                      :key="i"
                      loading
                      shape="circle"
                      class="sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 w-10 h-10"
                    />
                  </div>
                </fieldset>
              </div>

              <!-- Sizes -->
              <div class="mt-10">
                <h3 v-if="productLoaded" class="text-sm font-medium text-gray-900">Størrelser</h3>
                <SkeletonLoader v-else loading width="w-16" height="h-5" />
                <fieldset class="mt-4">
                  <legend class="sr-only">Choose a size</legend>
                  <div
                    v-if="productLoaded"
                    class="sm:grid-cols-4 lg:grid-cols-2 grid grid-cols-2 gap-4"
                  >
                    <label
                      v-for="size in sizes"
                      :key="size.id"
                      :for="`size-choice-${size.id}`"
                      class="group hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 relative flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-900 uppercase bg-white border rounded-md shadow-sm cursor-pointer"
                      :class="{
                        'border-brand-800 border-2':
                          size && selectedSize && size.id === selectedSize.id,
                      }"
                    >
                      <input
                        :id="`size-choice-${size.id}`"
                        type="radio"
                        name="size-choice"
                        :value="size.name"
                        class="sr-only"
                        :aria-labelledby="`size-choice-${size.id}-label`"
                        @input="selectedSize = size"
                      />
                      <span :id="`size-choice-${size.id}-label`" class="shrink-0">
                        {{ size.name }}
                      </span>
                      <span
                        class="-inset-px absolute rounded-md pointer-events-none"
                        aria-hidden="true"
                      />
                    </label>
                  </div>
                  <div v-else class="sm:grid-cols-4 lg:grid-cols-2 grid grid-cols-2 gap-4 mt-1">
                    <SkeletonLoader
                      v-for="i in 4"
                      :key="i"
                      loading
                      class="sm:h-16 h-12 rounded-md"
                    />
                  </div>
                </fieldset>
              </div>

              <!-- <Callout
                v-if="product && !product.canBePurchasedOnline"
                class="mt-6 mb-3"
                variant="info"
                title="Kan ikke kjøpes på nett"
              >
                Dette produktet kan ikke kjøpes på nett direkte, men du kan fortsatt legge det til i
                handlekurven og starte en online konsultasjon, så hjepler vi deg mer enn gjerne.
                Konsultasjonen er ikke forpliktende.
              </Callout> -->
              <!-- <Button
                v-if="productLoaded"
                type="submit"
                variant="primary"
                size="l"
                fluid
                class="w-full mt-3"
                :disabled="!selectedOption"
              >
                {{
                  !selectedOption ? 'Gjør tilvalg før du legger til i kurven' : 'Legg til i kurven'
                }}
              </Button>
              <SkeletonLoader v-else loading height="h-12 mt-3" /> -->
            </form>
          </div>

          <div
            class="lg:pt-6 lg:pb-16 lg:col-start-1 xl:col-span-3 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 py-10 space-y-12"
          >
            <!-- Description -->
            <div v-if="productLoaded">
              <section v-if="product.description">
                <h3 class="sr-only">Beskrivelse</h3>
                <article class="text-sm text-gray-900" v-html="product.description" />
              </section>
            </div>
            <div v-else>
              <section class="space-y-2">
                <SkeletonLoader loading height="h-6" width="w-full" />
                <SkeletonLoader loading height="h-6" width="w-5/6" />
                <SkeletonLoader loading height="h-6" width="w-full" />
                <SkeletonLoader loading height="h-6" width="w-5/6" />
                <SkeletonLoader loading height="h-6" width="w-5/6" />
                <SkeletonLoader loading height="h-6" width="w-full" />
                <SkeletonLoader loading height="h-6" width="w-4/6" />
              </section>
            </div>

            <!-- Variants -->
            <ProductDetailBlockVariants :loaded="productLoaded" :variants="variants" />

            <!-- Sizes -->
            <ProductDetailBlockSizes
              :loaded="productLoaded"
              :sizes="sizes"
              :special-sizes-available="product && product.availableInSpecialSizes"
            />

            <!-- Shapes -->
            <ProductDetailBlockShapes
              :loaded="productLoaded"
              :shapes="product && product.shapes ? product.shapes : []"
            />

            <!-- Specifications -->
            <div v-if="productLoaded">
              <CollapsableSection title="Spesifikasjoner">
                <table class="w-full">
                  <tr class="sr-only">
                    <th class="">Spesifikasjon</th>
                    <th class="">Verdi</th>
                  </tr>
                  <tr v-if="product.colors && product.colors.length">
                    <td class="w-32 text-sm text-gray-700">Farger</td>
                    <td class="w-auto text-sm text-gray-900">
                      <span v-for="(item, index) in product.colors" :key="item.name">
                        <span v-if="index !== 0">, </span>
                        <span>{{ item.name }}</span>
                      </span>
                    </td>
                  </tr>
                  <tr v-if="product.materials && product.materials.length">
                    <td class="w-32 text-sm text-gray-700">Materialer</td>
                    <td class="w-auto text-sm text-gray-900">
                      <span v-for="(item, index) in product.materials" :key="item.name">
                        <span v-if="index !== 0">, </span>
                        <span>{{ item.name }}</span>
                      </span>
                    </td>
                  </tr>
                  <tr v-if="product.rooms && product.rooms.length">
                    <td class="w-32 text-sm text-gray-700">Egnede rom</td>
                    <td class="w-auto text-sm text-gray-900">
                      <span v-for="(item, index) in product.rooms" :key="item.name">
                        <span v-if="index !== 0">, </span>
                        <span>{{ item.name }}</span>
                      </span>
                    </td>
                  </tr>
                  <tr v-if="product.absorption">
                    <td class="w-32 text-sm text-gray-700">Vannoppsug</td>
                    <td class="w-auto text-sm text-gray-900">Under {{ product.absorption }}%</td>
                  </tr>
                  <tr>
                    <td class="w-32 text-sm text-gray-700">Opprinnelse</td>
                    <td class="w-auto text-sm text-gray-900">
                      {{ product.supplier.originCountry }}
                    </td>
                  </tr>
                </table>
              </CollapsableSection>
            </div>
            <div v-else>
              <section>
                <SkeletonLoader loading width="w-full" height="h-10" />
                <div class="flex items-center mt-6 space-x-8">
                  <SkeletonLoader loading width="w-32" height="h-4" />
                  <SkeletonLoader loading height="h-4" width="w-48" />
                </div>
                <div class="flex items-center mt-6 space-x-8">
                  <SkeletonLoader loading width="w-32" height="h-4" />
                  <SkeletonLoader loading height="h-4" width="w-48" />
                </div>
                <div class="flex items-center mt-6 space-x-8">
                  <SkeletonLoader loading width="w-32" height="h-4" />
                  <SkeletonLoader loading height="h-4" width="w-48" />
                </div>
              </section>
            </div>

            <!-- Files -->
            <ProductDetailBlockFiles
              :loaded="productLoaded"
              :files="product && product.files ? product.files : []"
            />
          </div>
        </div>
      </Container>
    </main>
  </div>
</template>
