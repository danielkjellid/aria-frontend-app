<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <template #title>
        <slot name="title">
          <Text variant="title3">Overview template</Text>
        </slot>
      </template>
      <template #actions>
        <slot name="actions">
          <Button variant="secondary">Example action</Button>
        </slot>
      </template>
      <template #content>
        <slot name="content">
          <div class="h-screen border-4 border-gray-200 border-dashed rounded-lg" />
        </slot>
      </template>
    </NuxtLayout>
  </div>
</template>
