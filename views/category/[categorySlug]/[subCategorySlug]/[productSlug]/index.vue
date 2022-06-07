<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { ProductDetailOutput } from '~~/@types/generated/dist'

const product = ref<ProductDetailOutput>()

const fetchedProduct = async () => {
  product.value = await performGet<ProductDetailOutput>('products/product/panaria-memory-mood/')
}

const productLoaded = computed((): boolean => !!product.value)

fetchedProduct()

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

const variants = computed(() => aggregateOption('variant'))
const sizes = computed(() => aggregateOption('size'))
</script>

<template>
  <main>
    <ImageCarousel v-if="productLoaded" :images="product && product.images ? product.images : []" />
    <Image v-else loading />
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem to="#">FK-JKE Design</BreadcrumbsItem>
        <BreadcrumbsItem to="#">Fliser</BreadcrumbsItem>
        <BreadcrumbsItem to="#">Keramisk naturstein</BreadcrumbsItem>
        <BreadcrumbsItem to="#" active>Produkt</BreadcrumbsItem>
      </Breadcrumbs>

      <Spacer spacing="md" />

      <div class="mx-auto lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <Text v-if="productLoaded" variant="title2">{{ product.name }}</Text>
          <SkeletonLoader v-else loading width="w-60" height="h-12" />
        </div>

        <!-- Options -->
        <div class="lg:mt-0 lg:row-span-3 mt-4">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl text-gray-900">599 m2</p>

          <form class="mt-6">
            <!-- Colors -->
            <div>
              <h3 class="text-sm font-medium text-gray-900">Varianter</h3>

              <fieldset class="mt-4">
                <legend class="sr-only">Choose a color</legend>
                <div class="lg:grid-cols-6 xl:grid-cols-7 grid grid-cols-6 gap-5">
                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label
                    v-for="variant in variants"
                    :key="variant.id"
                    :for="`variant-choice-${variant.id}`"
                    class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-brand-800"
                  >
                    <input
                      :id="`variant-choice-${variant.id}`"
                      type="radio"
                      name="variant-choice"
                      :value="variant.id"
                      class="sr-only"
                      :aria-labelledby="`variant-choice-${variants.id}-label`"
                    />
                    <span :id="`variant-choice-${variants.id}-label`" class="sr-only">
                      {{ variant.name }}
                    </span>
                    <img
                      aria-hidden="true"
                      :src="variant.image"
                      alt=""
                      class="object-cover w-8 h-8 border-2 border-gray-300 rounded-full"
                    />
                  </label>
                </div>
              </fieldset>
            </div>

            <!-- Sizes -->
            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Størrelser</h3>

              <fieldset class="mt-4">
                <legend class="sr-only">Choose a size</legend>
                <div class="sm:grid-cols-4 lg:grid-cols-2 grid grid-cols-2 gap-4">
                  <!-- Active: "ring-2 ring-indigo-500" -->
                  <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
                  <label
                    v-for="size in sizes"
                    :key="size.id"
                    :for="`size-choice-${size.id}`"
                    class="group hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 relative flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-900 uppercase bg-white border rounded-md shadow-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="size-choice"
                      :value="size.name"
                      class="sr-only"
                      :aria-labelledby="`size-choice-${size.id}-label`"
                    />
                    <span :id="`size-choice-${size.id}-label`">{{ size.name }}</span>
                    <span
                      class="-inset-px absolute rounded-md pointer-events-none"
                      aria-hidden="true"
                    ></span>
                  </label>
                </div>
              </fieldset>
            </div>
            <Button type="submit" variant="primary" fluid class="w-full mt-3"
              >Legg til i kurven</Button
            >
            <!-- <button
              type="submit"
              class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md"
            >
              Add to bag
            </button> -->
          </form>
        </div>

        <div
          class="lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 py-10 space-y-12"
        >
          <!-- Description -->
          <div v-if="productLoaded">
            <section v-if="product.description">
              <h3 class="sr-only">Beskrivelse</h3>
              <article class="space-y-5 text-sm text-gray-900" v-html="product.description" />
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
</template>
