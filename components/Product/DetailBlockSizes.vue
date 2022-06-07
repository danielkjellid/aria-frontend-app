<script setup lang="ts">
import { ProductSizeOutput } from '~~/@types/generated/dist'

/***********
 ** Props **
 ***********/

interface ProductDetailBlockSizesProps {
  loaded: boolean
  sizes: ProductSizeOutput[]
  specialSizesAvailable?: boolean
}

defineProps<ProductDetailBlockSizesProps>()
</script>

<template>
  <div v-if="loaded">
    <div v-if="sizes && sizes.length">
      <CollapsableSection title="Størrelser oppgitt i cm">
        <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-6">
          <span v-for="size in sizes" :key="size.id" class="text-sm font-medium text-gray-900">
            {{ size.name }}
          </span>
        </div>
        <p v-if="specialSizesAvailable" class="max-w-prose mt-6 text-sm text-gray-700">
          * Produktet finnes i størrelser utover det som er standard, eller kan tilpasses dine
          behov. Ta kontakt med oss for mer informasjon!
        </p>
      </CollapsableSection>
    </div>
  </div>
  <div v-else>
    <section>
      <SkeletonLoader loading width="w-full" height="h-10" />
      <div class="sm:grid-cols-5 grid grid-cols-3 gap-5 mt-4">
        <SkeletonLoader v-for="i in 5" :key="i" loading height="h-5" width="w-24" />
      </div>
    </section>
  </div>

  <!--

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

  -->
</template>
