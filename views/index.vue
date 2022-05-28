<template>
  <section>
    <a-image title="Example" width="full" :loading="false" />
  </section>
  <section>
    <Container as="div">
      <div class="max-w-prose mx-auto text-center">
        <a-text variant="body2">
          I vår butikk på Lillestrøm finner du 30 år med ekspertise og erfaring innenfor flis og
          baderom. Vi samarbeider med spennende leverandører som tørr å bryte med normer og
          tradisjoner, men samtidig holder det enkelt og funksjonelt.
        </a-text>
        <br />
        <a-text variant="body2">
          En stor andel av våre kunder er “vanlige kunder” som ønsker fliser og baderommsprodukter
          fra våre anerkjente europeiske leverandører. En annen stor andel av kundene våre er
          arkitekter og interiørarkitekter.
        </a-text>
        <br />
        <a-text variant="body2">
          Vi leverer over hele landet, og kan bestille alle produkter fra våre leverandører, selv om
          det ikke ligger i nettbutikken.
        </a-text>
      </div>
    </Container>
  </section>
  <section>
    <a-image
      v-for="category in store.parentCategories"
      title="category.name"
      width="full"
      :loading="loading"
      :images="category.images"
    >
      <a-button tag="router-link" variant="outlined" :to="`/category/${category.slug}/`"
        >Test</a-button
      >
    </a-image>
  </section>
</template>

<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

const store = useCategoriesStore()
store.fetchParentCategories()

const loading = computed(() => !store.parentCategories)
</script>
