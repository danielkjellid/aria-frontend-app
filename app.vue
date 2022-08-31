<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

const categoriesStore = useCategoriesStore()
categoriesStore.fetchNavbarCategories()

const isDevEnvironment = computed(() => {
  if (process.env.NODE_ENV !== 'production') return true

  return false
})
</script>

<template>
  <div>
    <NotificationHandler>
      <Notification
        title="Test notification asdasd asdas asd asdasd as"
        subtitle="testing asdasd asdasd asda asd asd as  asd asdasdasd a asdasasddasdasdasdasdasds"
      />
      <Notification
        title="Test notification asdasd asdas asd asdasd as"
        subtitle="testing asdasd asdasd asda asd asd as  asd asdasdasd a asdasasddasdasdasdasdasds"
      />
    </NotificationHandler>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div
      v-if="isDevEnvironment"
      class="dev-env-warning fixed bottom-0 left-0 right-0 z-50 py-1 text-center"
    >
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div>
  </div>
</template>

<style scoped>
.dev-env-warning {
  background: repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #f59e0b 10px, #f59e0b 20px);
}
</style>
