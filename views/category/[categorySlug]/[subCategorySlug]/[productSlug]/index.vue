<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { ProductDetailOutput } from '~~/@types/generated/dist'
import { PaperClipIcon } from '@heroicons/vue/solid'

const images = [
  {
    applyFilter: false,
    image640x275:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/5c8b149f350392a79975d755db674ca9.jpg',
    image1024x1024:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/b6d0ab141f0b16476e2111d7487b2e43.jpg',
    image512x512:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/96607925f8880bd225a450183699da4b.jpg',
    image1024x575:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/a4f604d46008136ab288b50f832388df.jpg',
    image1536x860:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/1cdb69e8cb148dcfe16a4f161560ef20.jpg',
    image2048x1150:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/dbd374abf133257c25b8dc5a921bcdd4.jpg',
  },
  {
    applyFilter: false,
    image640x275: null,
    image1024x1024: null,
    image512x512: null,
    image1024x575: null,
    image1536x860: null,
    image2048x1150:
      'http://127.0.0.1:8000/media/CACHE/images/media/products/gigacer/made-20/images/concrete-ice-4/dbd374abf133257c25b8dc5a921bcdd4.jpg',
  },
]

const product = ref<ProductDetailOutput>()

const fetchedProduct = async () => {
  product.value = await performGet<ProductDetailOutput>('products/product/panaria-memory-mood/')
}

const productLoaded = computed(() => product.value)

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
    <ImageCarousel :images="images" />
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
          <div v-if="productLoaded">
            <div v-if="variants && variants.length">
              <CollapsableSection title="Varianter">
                <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                  <article v-for="variant in variants" :key="variant.id" class="relative">
                    <div class="text-center">
                      <img
                        v-if="variant.image"
                        class="object-cover w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                        :src="variant.image"
                        alt=""
                      />
                      <div
                        v-else-if="variant.colorHex"
                        :style="`background-color: ${variant.color_hex}`"
                        class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                      />
                      <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
                    </div>
                  </article>
                </div>
              </CollapsableSection>
            </div>
            <div v-else>
              <section>
                <SkeletonLoader loading width="w-full" height="h-10" />
                <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                  <article v-for="i in 12" :key="i" class="relative text-center">
                    <SkeletonLoader loading shape="circle" height="h-20" width="w-20" />
                    <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
                  </article>
                </div>
              </section>
            </div>
          </div>

          <!-- Sizes -->
          <div v-if="productLoaded">
            <div v-if="sizes && sizes.length">
              <CollapsableSection title="Størrelser oppgitt i cm">
                <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-6">
                  <span
                    v-for="size in sizes"
                    :key="size.id"
                    class="text-sm font-medium text-gray-900"
                  >
                    {{ size.name }}
                  </span>
                </div>
                <p class="max-w-prose mt-6 text-sm text-gray-700">
                  * Produktet finnes i størrelser utover det som er standard, eller kan tilpasses
                  dine behov. Ta kontakt med oss for mer informasjon!
                </p>
              </CollapsableSection>
            </div>
            <div v-else>
              <section>
                <SkeletonLoader loading width="w-full" height="h-10" />
                <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-4">
                  <SkeletonLoader v-for="i in 5" :key="i" loading height="h-5" width="w-28" />
                </div>
              </section>
            </div>
          </div>

          <!-- Shapes -->
          <div v-if="productLoaded">
            <div v-if="product.shapes && product.shapes.length">
              <CollapsableSection title="Fasonger">
                <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                  <article v-for="shape in product.shapes" :key="shape.name" class="relative">
                    <div class="text-center">
                      <img
                        :src="shape.image"
                        alt=""
                        class="object-cover w-20 h-20 p-2 mx-auto rounded-md"
                      />
                      <h3 class="mt-3 text-sm font-medium text-gray-900">{{ shape.name }}</h3>
                    </div>
                  </article>
                </div>
              </CollapsableSection>
            </div>
            <div v-else>
              <SkeletonLoader loading width="w-full" height="h-10" />
              <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                <div v-for="i in 6" :key="i" class="relative text-center">
                  <SkeletonLoader loading height="h-20" width="w-20" />
                  <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
                </div>
              </div>
            </div>
          </div>

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
              <div class="mt-6">
                <table class="w-full">
                  <tr v-for="i in 5" :key="i">
                    <td class="w-32">
                      <SkeletonLoader loading height="h-4" width="w-24" />
                    </td>
                    <td class="w-auto">
                      <SkeletonLoader loading width="w-48" height="h-4" />
                    </td>
                  </tr>
                </table>
              </div>
            </section>
          </div>

          <!-- Files -->
          <div v-if="productLoaded">
            <div v-if="product.files && product.files.length">
              <CollapsableSection title="Nedlastninger">
                <div class="border border-gray-200 rounded-md">
                  <div
                    v-for="(file, index) in product.files"
                    :key="`${index}-${file.name}`"
                    class="flex items-center justify-between p-4"
                    :class="{
                      'border-t border-gray-200': index <= product.files.length && index != 0,
                    }"
                  >
                    <div class="flex items-center text-sm">
                      <PaperClipIcon class="text-brand-500 w-5 h-5 mr-2" />
                      {{ file.name }}
                    </div>
                    <NuxtLink
                      :to="file.file"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline text-brand-800 text-sm"
                    >
                      Last ned
                    </NuxtLink>
                  </div>
                </div>
              </CollapsableSection>
            </div>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-full" height="h-10" />
              <div class="space-y-2">
                <SkeletonLoader loading width="w-full" height="h-12" />
                <SkeletonLoader loading width="w-full" height="h-12" />
                <SkeletonLoader loading width="w-full" height="h-12" />
              </div>
            </section>
          </div>
        </div>

        <!-- <div
          class="lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 py-10 space-y-12"
        >

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

          <div v-if="productLoaded">
            <section v-if="variants && variants.length">
              <Text variant="title5">Varianter</Text>
              <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                <article v-for="variant in variants" :key="variant.id" class="relative">
                  <div class="text-center">
                    <img
                      v-if="variant.image"
                      class="object-cover w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                      :src="variant.image"
                      alt=""
                    />
                    <div
                      v-else-if="variant.colorHex"
                      :style="`background-color: ${variant.color_hex}`"
                      class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                    />
                    <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
                  </div>
                </article>
              </div>
            </section>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-28" height="h-6" />
              <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-4">
                <article v-for="i in 12" :key="i" class="relative text-center">
                  <SkeletonLoader loading shape="circle" height="h-20" width="w-20" />
                  <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
                </article>
              </div>
            </section>
          </div>

          <div v-if="productLoaded">
            <section v-if="sizes && sizes.length">
              <Text variant="title5">
                Størrelser <span class="text-gray-600">oppgitt i cm</span>
              </Text>
              <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-6">
                <span
                  v-for="size in sizes"
                  :key="size.id"
                  class="text-sm font-medium text-gray-900"
                >
                  {{ size.name }}
                </span>
              </div>
              <p class="max-w-prose mt-6 text-sm text-gray-700">
                * Produktet finnes i størrelser utover det som er standard, eller kan tilpasses dine
                behov. Ta kontakt med oss for mer informasjon!
              </p>
            </section>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-28" height="h-6" />
              <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-4">
                <SkeletonLoader v-for="i in 5" :key="i" loading height="h-5" width="w-28" />
              </div>
            </section>
          </div>

          <div v-if="productLoaded">
            <section v-if="product.shapes && product.shapes.length">
              <Text variant="title5">Fasonger</Text>
              <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                <article v-for="shape in product.shapes" :key="shape.name" class="relative">
                  <div class="text-center">
                    <img
                      :src="shape.image"
                      alt=""
                      class="object-cover w-20 h-20 p-2 mx-auto rounded-md"
                    />
                    <h3 class="mt-3 text-sm font-medium text-gray-900">{{ shape.name }}</h3>
                  </div>
                </article>
              </div>
            </section>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-28" height="h-6" />
              <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
                <div v-for="i in 6" :key="i" class="relative text-center">
                  <SkeletonLoader loading height="h-20" width="w-20" />
                  <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
                </div>
              </div>
            </section>
          </div>

          <div v-if="productLoaded">
            <section>
              <Text variant="title5">Spesifikasjoner</Text>
              <div class="mt-6">
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
              </div>
            </section>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-28" height="h-6" />
              <div class="mt-6">
                <table class="w-full">
                  <tr v-for="i in 5" :key="i">
                    <td class="w-32">
                      <SkeletonLoader loading height="h-4" width="w-24" />
                    </td>
                    <td class="w-auto">
                      <SkeletonLoader loading width="w-48" height="h-4" />
                    </td>
                  </tr>
                </table>
              </div>
            </section>
          </div>

          <div v-if="productLoaded">
            <section v-if="product.files && product.files.length">
              <Text variant="title5">Nedlastninger</Text>
              <div class="mt-6 border border-gray-200 rounded-md">
                <div
                  v-for="(file, index) in product.files"
                  :key="`${index}-${file.name}`"
                  class="flex items-center justify-between p-4"
                  :class="{
                    'border-t border-gray-200': index <= product.files.length && index != 0,
                  }"
                >
                  <div class="flex items-center text-sm">
                    <PaperClipIcon class="text-brand-500 w-5 h-5 mr-2" />
                    {{ file.name }}
                  </div>
                  <NuxtLink
                    :to="file.file"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline text-brand-800 text-sm"
                  >
                    Last ned
                  </NuxtLink>
                </div>
              </div>
            </section>
          </div>
          <div v-else>
            <section>
              <SkeletonLoader loading width="w-28" height="h-6" />
              <div class="mt-6 space-y-2">
                <SkeletonLoader loading width="w-full" height="h-12" />
                <SkeletonLoader loading width="w-full" height="h-12" />
                <SkeletonLoader loading width="w-full" height="h-12" />
              </div>
            </section>
          </div>
        </div> -->
      </div>
    </Container>
  </main>
</template>
