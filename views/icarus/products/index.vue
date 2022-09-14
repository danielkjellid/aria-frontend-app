<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="admin-overview">
      <template #title>
        <Text variant="title3">Produkter</Text>
      </template>
      <template #actions>
        <Button variant="secondary">Nytt produkt</Button>
      </template>
      <template #content>
        <Table
          :headers="[
            { label: 'test1', value: 'test1' },
            { label: 'test2', value: 'test2' },
            { label: 'test3', value: 'test3' },
            { label: '', value: 'actions' },
          ]"
          :items="[
            { id: 1, q: 1, w: 2 },
            { id: 2, q: 5, w: 6 },
            { id: 3, q: 1, w: 2 },
          ]"
          show-search
          search-placeholder="Søk i produkter"
          show-pagination
          selectable
        />
      </template>
    </NuxtLayout>
  </div>
</template>
