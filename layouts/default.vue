<script setup lang="ts">
const config = useRuntimeConfig().public

const isDevEnvironment = computed(() => {
  if (process.env.NODE_ENV !== 'production') return true

  return false
})
</script>

<template>
  <div class="content relative min-h-screen">
    <!-- <div
      v-if="isDevEnvironment"
      class="dev-env-warning absolute top-0 left-0 right-0 z-50 py-1 text-center"
    >
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div> -->
    <div class="relative min-h-screen">
      <Navbar />
      <slot class="relative" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.dev-env-warning {
  background: repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #f59e0b 10px, #f59e0b 20px);
}
</style>
