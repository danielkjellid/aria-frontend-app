<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

const categoriesStore = useCategoriesStore()

categoriesStore.fetchNavbarCategories()

</script>