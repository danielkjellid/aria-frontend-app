<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false,
})

defineProps<{ test?: string }>()
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <template #title>
        <div class="flex items-center space-x-5">
          <Bars3Icon class="w-6 h-6 mt-px text-gray-800" />
          <slot name="title">
            <Text variant="title3">Overview template</Text>
          </slot>
        </div>
      </template>
      <template #actions>
        <slot name="actions">
          <Button variant="secondary">Example action</Button>
        </slot>
      </template>
      <template #default>
        <slot>
          <div class="h-screen border-4 border-gray-200 border-dashed rounded-lg" />
        </slot>
      </template>
    </NuxtLayout>
  </div>
</template>
