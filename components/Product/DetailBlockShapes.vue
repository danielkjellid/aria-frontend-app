<script setup lang="ts">
import { ProductShapeOutput } from '~~/@types'

/***********
 ** Props **
 ***********/

interface ProductDetailBlockShapesProps {
  loaded: boolean
  shapes: ProductShapeOutput[]
}

defineProps<ProductDetailBlockShapesProps>()
</script>

<template>
  <div v-if="loaded">
    <div v-if="shapes && shapes.length">
      <CollapsableSection title="Fasonger">
        <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
          <article v-for="shape in shapes" :key="shape.name" class="relative">
            <div class="text-center">
              <div class="relative w-20 h-20 p-1 mx-auto rounded-md">
                <img :src="shape.image" alt="" class="object-cover mx-auto" />
              </div>
              <h3 class="mt-3 text-sm font-medium text-gray-900">{{ shape.name }}</h3>
            </div>
          </article>
        </div>
      </CollapsableSection>
    </div>
  </div>
  <div v-else>
    <section>
      <SkeletonLoader loading width="w-full" height="h-10" />
      <div class="sm:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
        <div v-for="i in 6" :key="i" class="relative text-center">
          <SkeletonLoader loading height="h-20" width="w-20" />
          <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
        </div>
      </div>
    </section>
  </div>

  <!--

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

  -->
</template>
