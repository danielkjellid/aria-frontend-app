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
          <Text variant="title3">Detail template</Text>
        </slot>
      </template>
      <template #actions>
        <slot name="actions">
          <Button variant="secondary">Example action</Button>
        </slot>
      </template>
      <template #default>
        <div class="mx-4">
          <slot name="tabs">
            <Tabs>
              <TabsItem to="#" active>Subpage 1</TabsItem>
              <TabsItem to="#">Subpage 2</TabsItem>
              <TabsItem to="#">Subpage 3</TabsItem>
              <TabsItem to="#">Subpage 4</TabsItem>
            </Tabs>
          </slot>
        </div>
        <div class="mt-4">
          <slot>
            <div class="h-screen border-4 border-gray-200 border-dashed rounded-lg" />
          </slot>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
