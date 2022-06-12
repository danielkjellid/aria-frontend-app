<script setup lang="ts">
import { CategoryProductListOutput } from '~~/@types/generated/dist'

interface ProductListProps {
  products: CategoryProductListOutput[]
  loading?: boolean
}
defineProps<ProductListProps>()
</script>

<template>
  <section
    v-if="loading"
    class="xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 grid w-full grid-cols-1 gap-5"
  >
    <SkeletonLoader
      v-for="i in 18"
      :key="i"
      loading
      style="min-height: 530px"
      class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 relative w-full overflow-hidden rounded-md"
    />
  </section>
  <section
    v-else-if="!loading && products.length"
    class="xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 grid w-full grid-cols-1 gap-5"
  >
    <ProductListCard
      v-for="p in products"
      :key="p.id"
      :name="p.name"
      :slug="p.slug"
      :thumbnail="p.thumbnail"
      :display-price="p.displayPrice"
      :from-price="p.fromPrice"
      :unit="p.unit"
      :variants="p.variants"
      :supplier-name="p.supplier.name"
    />
  </section>
  <section v-else class="w-full grid-cols-1 gap-5">
    <NoData />
  </section>
</template>
