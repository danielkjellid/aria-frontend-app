<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { KitchenDetailOutput } from '~~/@types/generated/dist'

const config = useRuntimeConfig().public

const kitchenSlug = useSlug('kitchenSlug')

const currentKitchenSlug = computed(() => kitchenSlug)

const kitchen = ref<KitchenDetailOutput>()
const kitchenLoaded = computed((): boolean => !!kitchen.value)

const fetchKitchen = async () => {
  kitchen.value = await performGet<KitchenDetailOutput>(
    `kitchens/kitchen/${currentKitchenSlug.value}/`
  )
}

fetchKitchen()

const metaTitle = computed(() => (kitchenLoaded.value ? kitchen.value.name : undefined))
</script>

<template>
  <div>
    <Head>
      <Title>Kjøp {{ metaTitle }} på nett</Title>
      <Meta name="og:type" content="product" />
      <Meta
        name="og:image"
        :content="kitchen && kitchen.images ? kitchen.images.image1536x860 : ''"
      />
      <Meta
        name="og:description"
        :content="`Kjøp kjøkkenserien ${metaTitle}, og alt innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken på nett.`"
      />
    </Head>
    <main>
      <Image v-if="kitchenLoaded" :title="kitchen.name" :loading="false" :images="kitchen.images" />
      <Image v-else loading />
      <Container>
        <Breadcrumbs v-if="kitchenLoaded">
          <BreadcrumbsItem to="/">{{ config.BRAND_NAME }}</BreadcrumbsItem>
          <BreadcrumbsItem to="/kitchens/">Kjøkken</BreadcrumbsItem>
          <BreadcrumbsItem active>{{ kitchen.name }}</BreadcrumbsItem>
        </Breadcrumbs>
        <Breadcrumbs v-else>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#">Loading...</BreadcrumbsItem>
          <BreadcrumbsItem loading to="#" active>Loading...</BreadcrumbsItem>
        </Breadcrumbs>

        <Spacer spacing="md" />

        <div
          class="mx-auto grid lg:grid-cols-3 xl:grid-cols-5 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 min-h-screen"
        >
          <div
            class="lg:mt-0 xl:col-span-2 lg:col-span-1 lg:border-t-0 lg:pt-0 order-2 pt-6 mt-4 border-t border-gray-200"
          >
            <div class="mb-6">
              <Text v-if="kitchenLoaded" variant="title2" class="font-normal">
                Book en tegnetime
              </Text>
              <SkeletonLoader v-else loading width="w-60" height="h-10" />
            </div>
            <Calendar
              allow-detail-expand
              is-bookable
              :bookable-hour-start="10"
              :bookable-hour-end="17"
              is-compact
            />
          </div>
          <div
            class="lg:pb-16 lg:col-start-1 xl:col-span-3 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 order-1 pb-10"
          >
            <Text v-if="kitchenLoaded" variant="title2">{{ kitchen.name }}</Text>
            <SkeletonLoader v-else loading width="w-60" height="h-12" />
            <div class="pt-6 space-y-12">
              <div v-if="kitchenLoaded">
                <section v-if="kitchen.description">
                  <h3 class="sr-only">Beskrivelse</h3>
                  <article class="text-sm text-gray-900" v-html="kitchen.description" />
                  <div v-if="kitchen.exampleFromPrice" class="mt-8">
                    <div class="bg-gray-50 rounded-md">
                      <div class="xl:grid-cols-2 grid grid-cols-1">
                        <div>
                          <img
                            class="example-image-container rounded-tr-md rounded-tl-md xl:rounded-tr-none xl:rounded-l-md object-cover"
                            src="https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/example/example_550x300.jpg"
                            alt="Image of example set up"
                            srcset="
                              https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/example/example_460x250.jpg 460w,
                              https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/example/example_550x300.jpg 550w
                            "
                          />
                        </div>
                        <div class="sm:px-6 xl:px-8 px-5 py-6">
                          <div>
                            <div class="flex items-center justify-between">
                              <h2 class="text-xl font-medium text-gray-900">Priseksempel</h2>
                              <p class="text-sm font-medium text-gray-800">
                                kr {{ $formatPrice(kitchen.exampleFromPrice) }}
                              </p>
                            </div>
                            <p class="mt-3 text-sm text-gray-700">
                              Priseksempel for oppsett ekskludert benkeplater, armatur og
                              hvitevarer. Få et konkret tilbud gjennom en tegnetime.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <article class="mt-8 text-sm text-gray-900" v-html="kitchen.extraDescription" />
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
              <ProductDetailBlockVariants
                title="Dekor"
                :loaded="kitchenLoaded"
                :variants="kitchen ? kitchen.decorVariants : []"
              />
              <ProductDetailBlockVariants
                title="Finér"
                :loaded="kitchenLoaded"
                :variants="kitchen ? kitchen.plywoodVariants : []"
              />
              <ProductDetailBlockVariants
                title="Laminat"
                :loaded="kitchenLoaded"
                :variants="kitchen ? kitchen.laminateVariants : []"
              />
              <ProductDetailBlockVariants
                title="Eksklusive farger"
                :loaded="kitchenLoaded"
                :variants="kitchen ? kitchen.exclusiveVariants : []"
              />
              <ProductDetailBlockVariants
                title="Trend farger"
                :loaded="kitchenLoaded"
                :variants="kitchen ? kitchen.trendVariants : []"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  </div>
</template>

<style scoped>
.example-image-container {
  height: 200px;
  width: 100%;
}

@media (min-width: 640px) {
  .example-image-container {
    height: 250px;
  }
}

@media (min-width: 768px) {
  .example-image-container {
    height: 300px;
  }
}

@media (min-width: 1280px) {
  .example-image-container {
    height: 250px;
  }
}
</style>
