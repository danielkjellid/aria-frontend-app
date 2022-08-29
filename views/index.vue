<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'

/***********
 ** Store **
 ***********/

const store = useCategoriesStore()
store.fetchParentCategories()

/***********
 ** State **
 ***********/

const loading = computed(() => {
  if (store.parentCategories !== null && store.parentCategories.length > 0) {
    return false
  }

  return true
})
</script>

<template>
  <div>
    <Head>
      <Title>Velkommen</Title>
      <Meta
        name="og:title"
        content="FK-JKE Design: Din totalleverandør av fliser, kjøkken og baderomsinnredning!"
      />
      <Meta
        name="og:description"
        content="FK-JKE Design er en totalleverandør av markedes mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter."
      />
      <Meta name="og:type" content="website" />
    </Head>
    <main>
      <section>
        <Image
          title="Velkommen til FK-JKE Design!"
          subtitle="En verden av ro, ærlige materialer, naturlige farger og bærekraftige design"
          :loading="false"
          :images="{
            applyFilter: false,
            image512x512:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/56907ef7444c4d9247701daa8ad6d7bd.jpg',
            image640x275:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/cd1b1f21acec4310f7aff8f58051883c.jpg',
            image1024x1024:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/21ca50d417c21f02c7ac2a249f2e9677.jpg',
            image1024x575:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/81d7cb9e64359daa2651afaceb2825d4.jpg',
            image1536x860:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/0045e186de084d7433692793c5043d96.jpg',
            image2048x1150:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/616b755311cbdcf2b4910b1c0e685d3a.jpg',
          }"
        />
      </section>
      <section>
        <Container as="div">
          <div class="max-w-prose mx-auto text-center">
            <Text variant="body2">
              I vår butikk på Lillestrøm finner du 30 år med ekspertise og erfaring innenfor flis og
              baderom. Vi samarbeider med spennende leverandører som tørr å bryte med normer og
              tradisjoner, men samtidig holder det enkelt og funksjonelt.
            </Text>
            <br />
            <Text variant="body2">
              En stor andel av våre kunder er “vanlige kunder” som ønsker fliser og
              baderommsprodukter fra våre anerkjente europeiske leverandører. En annen stor andel av
              kundene våre er arkitekter og interiørarkitekter.
            </Text>
            <br />
            <Text variant="body2">
              Vi leverer over hele landet, og kan bestille alle produkter fra våre leverandører,
              selv om det ikke ligger i nettbutikken.
            </Text>
          </div>
        </Container>
      </section>
      <!-- Skeleton loading while content is loading -->
      <section v-if="loading">
        <Image v-for="i in 8" :key="i" loading />
      </section>
      <!-- Actual content -->
      <section v-else>
        <Image
          v-for="category in store.parentCategories"
          :key="category.slug"
          :title="category.name"
          :loading="false"
          :images="category.images"
        >
          <Button variant="outlined" :to="`/categories/${category.slug}/`">
            {{ category.name }}
          </Button>
        </Image>
        <Image
          title="Kjøkken"
          :loading="loading"
          :images="{
            applyFilter: false,
            image512x512:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/44c441195fec67c72481d59e8fb17b68.jpg',
            image640x275:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/3bd3b415689c965a5aae95326eb2a22a.jpg',
            image1024x1024:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/c6d75419f77d3fe4be3abe618a582e3c.jpg',
            image1024x575:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/ce52d86d04f4892ac44e17e84bbc3de8.jpg',
            image1536x860:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/33f60cee61b7d55b9696b2fd766408ee.jpg',
            image2048x1150:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/kitchens/05bdb43cc6feca8bebfd06f0a147062e.jpg',
          }"
        >
          <Button variant="outlined" to="/kitchens/"> Kjøkken </Button>
        </Image>
      </section>
    </main>
  </div>
</template>
