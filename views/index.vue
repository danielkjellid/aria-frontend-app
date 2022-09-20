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
            isMainImage: true,
            applyFilter: false,
            image640x360Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_640x360.webp',
            image768x432Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_768x432.webp',
            image960x540Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_960x540.webp',
            image1024x576Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_1024x576.webp',
            image1280x720Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_1280x720.webp',
            image1440x810Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_1440x810.webp',
            image1920x1080Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/header/header_1920x1080.webp',
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
            isMainImage: true,
            applyFilter: false,
            image640x360Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_640x360.webp',
            image768x432Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_768x432.webp',
            image960x540Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_960x540.webp',
            image1024x576Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_1024x576.webp',
            image1280x720Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_1280x720.webp',
            image1440x810Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_1440x810.webp',
            image1920x1080Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/kitchens/kitchens_1920x1080.webp',
          }"
        >
          <Button variant="outlined" to="/kitchens/"> Kjøkken </Button>
        </Image>
      </section>
    </main>
  </div>
</template>
