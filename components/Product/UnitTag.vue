<script setup lang="ts">
interface ProductUnitTagProps {
  unit: string
}

defineProps<ProductUnitTagProps>()
</script>

<template>
  <span v-if="unit === 'm2'" class="text-gray-500">m<sup>2</sup></span>
  <span v-else class="text-gray-500">{{ unit }}</span>
</template>
