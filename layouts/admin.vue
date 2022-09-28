<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <main class="relative flex min-h-screen">
      <Sidebar />
      <div class="max-w-screen-2xl flex flex-col flex-1 w-0 px-12 py-8 mx-auto">
        <div class="focus:outline-none relative flex-1" tabindex="0">
          <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
              <slot name="title">
                <Text variant="title3">Detail</Text>
              </slot>
            </div>
            <div class="flex items-center">
              <slot name="actions" />
            </div>
          </div>
          <div class="mt-10">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
