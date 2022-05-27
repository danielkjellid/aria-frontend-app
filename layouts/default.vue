<template>
  <div class="content relative min-h-screen">
    <div v-if="isDevEnvironment" class="dev-env-warning z-50 py-1 text-center">
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div>
    <a-message display variant="info">
      <div class="md:hidden flex-col">Text</div>
      <div class="md:flex hidden">Test2</div>
    </a-message>
    <slot class="relative min-h-screen" />
  </div>
</template>

<script setup lang="ts">
const isDevEnvironment = computed(() => {
  if (process.env.NODE_ENV !== 'production') return true

  return false
})
</script>

<style scoped>
.dev-env-warning {
  background: repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #f59e0b 10px, #f59e0b 20px);
}
</style>