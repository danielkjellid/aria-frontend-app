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
              'https://bilder.flis.no/WI_uXX7NzcZFonXloRYd0-PyR_s=/640x360/smart/media/front/header.jpg',
            image768x432Url:
              'https://bilder.flis.no/NoPlURb7DRSgGxeYdj5jzOL9QSI=/768x432/smart/media/front/header.jpg',
            image960x540Url:
              'https://bilder.flis.no/tMvF8a-M4FgPZV_VSXv6pUJvRl8=/960x540/smart/media/front/header.jpg',
            image1024x576Url:
              'https://bilder.flis.no/idJrxG2x-anN6rLxTqtEuklR0O4=/1024x576/smart/media/front/header.jpg',
            image1280x720Url:
              'https://bilder.flis.no/Zxz160XmvqOTPDKm9qE7vb58Kkg=/1280x720/smart/media/front/header.jpg',
            image1440x810Url:
              'https://bilder.flis.no/C2bRgBcretT2WidW9VlMMW_i1Tw=/1440x810/smart/media/front/header.jpg',
            image1920x1080Url:
              'https://bilder.flis.no/3MZRr9qDntAU3QgbB6V3TVx9vFw=/1920x1080/smart/media/front/header.jpg',
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
              'https://bilder.flis.no/xRQBS5wvYS_uw2n8Prr8paaGQhI=/640x360/smart/media/front/kitchens.jpg',
            image768x432Url:
              'https://bilder.flis.no/HZ-Nywe1ekBVARnrHa83msEB640=/768x432/smart/media/front/kitchens.jpg',
            image960x540Url:
              'https://bilder.flis.no/DbJIc60AdJjVWXjlriP6RtObqcE=/960x540/smart/media/front/kitchens.jpg',
            image1024x576Url:
              'https://bilder.flis.no/pzaYRyk0_Bo6M7-ZvMqBPvdx04I=/1024x576/smart/media/front/kitchens.jpg',
            image1280x720Url:
              'https://bilder.flis.no/iX0LJwQXkvW8OIs2iNwzogzA1t4=/1280x720/smart/media/front/kitchens.jpg',
            image1440x810Url:
              'https://bilder.flis.no/cCO0ZAcE1ORhEVzuBh1pY42bGVA=/1440x810/smart/media/front/kitchens.jpg',
            image1920x1080Url:
              'https://bilder.flis.no/TcLuC8iWP4vpg6851l_1jjSNYmw=/1920x1080/smart/media/front/kitchens.jpg',
          }"
        >
          <Button variant="outlined" to="/kitchens/"> Kjøkken </Button>
        </Image>
      </section>
    </main>
  </div>
</template>
