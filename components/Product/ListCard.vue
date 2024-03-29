<script setup lang="ts">
import image380x575 from '~~/assets/images/default_380x575.jpeg'
import image80x80 from '~~/assets/images/default_80x80.jpeg'
import { ProductVariantOutput, ProductDiscountOutput } from '~~/@types'
import breakpointData from '~~/utils/breakpoints'

/***********
 ** Props **
 ***********/

interface ProductListCardProps {
  loading?: boolean
  name: string
  slug: string
  thumbnail?: string
  discount?: ProductDiscountOutput
  displayPrice?: boolean
  fromPrice: number
  unit: string
  variants?: ProductVariantOutput[]
  supplierName: string
}

const props = defineProps<ProductListCardProps>()

/***********
 ** Routes **
 ***********/

const route = useRoute()

const currentParentCategorySlug = computed(() => {
  if (route.params.categorySlug) {
    if (typeof route.params.categorySlug === 'string') {
      return route.params.categorySlug
    }
    return route.params.categorySlug[0]
  }
  return null
})

const currentChildCategorySlug = computed(() => {
  if (route.params.subCategorySlug) {
    if (typeof route.params.subCategorySlug === 'string') {
      return route.params.subCategorySlug
    }
    return route.params.subCategorySlug[0]
  }
  return null
})

/**************
 ** Defaults **
 **************/

const displayPrice = computed(() => (props.displayPrice ? props.displayPrice : false))

const defaultThumbnailImage = image380x575
const defaultPreviewImage = image80x80

const baseImage = props.thumbnail ? props.thumbnail : defaultThumbnailImage

/*******************
 ** State: images **
 *******************/

const imageThumbnail = ref<string>(baseImage)
const setImageThumbnail = (image: string) => (imageThumbnail.value = image || defaultThumbnailImage)

/************************
 ** State: breakpoints **
 ************************/

const currentBreakpoint = breakpointData

const indexToShowBasedOnBreakpoint = computed(() => {
  if (currentBreakpoint.w <= 375) return 6
  if (currentBreakpoint.w <= 640) return 6
  if (currentBreakpoint.w <= 768) return 8
  if (currentBreakpoint.w <= 1024) return 6
  if (currentBreakpoint.w <= 1280) return 6
  if (currentBreakpoint.w <= 1536) return 7

  return 6
})

/*********************
 ** State: variants **
 *********************/

const showVariants = ref<boolean>(false)

// Get the count of remaining variants that are not currently being shown.
const variantsHiddenCount = computed(() =>
  props.variants && props.variants.length > 0
    ? props.variants.length - indexToShowBasedOnBreakpoint.value
    : null
)

// Slice the variants array based on indexes to show.
const slicedVariants = computed(() =>
  props.variants && props.variants.length > 0
    ? props.variants.slice(0, indexToShowBasedOnBreakpoint.value)
    : []
)
/**********************
 ** State: Discounts **
 **********************/

const currentlyDiscounted = computed(() => props.discount && props.discount.isDiscounted)

const canBePurchasedOnline = ref<boolean>(false)
</script>

<template>
  <article
    class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800"
    tabindex="0"
    @mouseenter="showVariants = true"
    @mouseleave="
      () => {
        showVariants = false
        setImageThumbnail(thumbnail)
      }
    "
    @focus="showVariants = true"
    @focusout="showVariants = false"
  >
    <NuxtLink
      :to="{
        name: 'products-productSlug',
        params: { productSlug: slug },
        state: {
          routeParentCategorySlug: currentParentCategorySlug ? currentParentCategorySlug : null,
          routeChildCategorySlug: currentChildCategorySlug ? currentChildCategorySlug : null,
        },
      }"
    >
      <div class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 relative w-full overflow-hidden rounded-md">
        <img
          :src="imageThumbnail"
          :alt="`Image of ${name}`"
          loading="lazy"
          class="object-cover w-full"
        />
        <div v-if="currentlyDiscounted || canBePurchasedOnline" class="absolute top-0 right-0 mt-6">
          <div
            v-if="canBePurchasedOnline"
            class="bg-brand-900 py-1 pl-3 pr-2 text-sm font-medium text-white bg-opacity-75 rounded-l-full"
          >
            Kan kjøpes på nett
          </div>
          <div
            v-if="currentlyDiscounted"
            class="inline-block float-right py-1 pl-3 pr-2 mt-2 text-sm font-medium text-right text-white bg-red-400 rounded-l-full"
          >
            <span v-if="discount.discountedGrossPercentage" class="flex items-center">
              - {{ 100 * discount.discountedGrossPercentage }}%
            </span>
          </div>
        </div>
      </div>
      <div v-if="!showVariants" class="mt-4">
        <div class="items-top flex justify-between text-base font-medium text-gray-900">
          <div>
            <h3 class="mr-2 truncate">{{ name }}</h3>
            <p class="mt-1 text-sm italic font-normal text-gray-500">{{ supplierName }}</p>
          </div>
          <template v-if="displayPrice || currentlyDiscounted">
            <div v-if="!currentlyDiscounted" class="shrink-0 font-normal text-right">
              <p>Fra kr {{ $formatPrice(fromPrice) }} <ProductUnitTag :unit="unit" /></p>
            </div>
            <div v-else class="shrink-0 font-normal text-right">
              <p class="text-red-600">
                Fra kr {{ discount.discountedGrossPrice }}
                <ProductUnitTag :unit="unit" />
              </p>
              <p class="mt-1 text-sm font-normal">
                <s> Fra kr {{ $formatPrice(fromPrice) }} <ProductUnitTag :unit="unit" /></s>
              </p>
            </div>
          </template>
        </div>
      </div>
      <div v-else class="mt-6">
        <div class="flex items-center space-x-3">
          <div v-for="(variant, index) in slicedVariants" :key="variant.id">
            <div
              v-if="index <= indexToShowBasedOnBreakpoint"
              class="w-8 h-8 overflow-hidden border-2 border-gray-300 rounded-full"
              @mouseover="setImageThumbnail(variant.image380x575Url)"
              @focus="setImageThumbnail(variant.image380x575Url)"
            >
              <img
                :src="variant.image80x80Url ? variant.image80x80Url : defaultPreviewImage"
                :alt="`Image of ${name} variant: ${variant.name}`"
                class="object-cover"
              />
            </div>
          </div>
          <div v-if="variantsHiddenCount > 0" class="text-sm text-gray-500">
            +{{ variantsHiddenCount }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
