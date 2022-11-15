<script setup lang="ts">
/* eslint-disable vuejs-accessibility/media-has-caption */
import useKitchensStore from '~~/store/kitchens'

/***************
 ** Page meta **
 ***************/

definePageMeta({
  layout: 'default',
})

/***********
 ** Store **
 ***********/

const store = useKitchensStore()

/***********
 ** State **
 ***********/

// Check if we have already fetched kitchens previously, and if so, retrieve it
// from pinia instead of calling the api on every site render.
const renderKitchens = computed(() => {
  if (!store.kitchens || store.kitchens.length <= 0) {
    // Call api to populate pinia state.
    store.fetchKitchens()
  }

  // Return pinia state.
  return store.kitchens
})

// To fire the computed property, we need to explicitly call it either here, or in
// the template. Because of the skeleton loader, the else condition never fires the
// computed value, therefore creating an infinite loading loop.
const kitchens = computed(() =>
  renderKitchens.value !== undefined && renderKitchens.value.length > 0 ? renderKitchens.value : []
)

const loading = computed(() => kitchens.value.length <= 0)
</script>

<template>
  <div>
    <Head>
      <Title>Kjøp kjøkken på nett</Title>
      <Meta
        name="og:description"
        content="Bli inspirert av kjøkken, og alt annet innenfor fliser, baderomsinnredning og tilbehør til bad på nett."
      />
      <Meta name="og:type" content="website" />
    </Head>
    <main>
      <Image
        title="Kjøkken"
        :loading="false"
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
        }"
      />
      <Container>
        <Breadcrumbs>
          <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
          <BreadcrumbsItem to="/kitchens/" active>Kjøkken</BreadcrumbsItem>
        </Breadcrumbs>
      </Container>
      <Container>
        <div class="bg-gray-50 relative w-full">
          <div class="sm:h-72 md:absolute md:right-0 md:h-full md:w-1/2 md:top-0 z-10 h-56">
            <video
              controls
              height="2000"
              src="https://fk-jke.s3.eu-north-1.amazonaws.com/media/kitchens/videos/JKE-Design-production.mp4"
              class="z-25 object-cover w-full h-full"
            >
              Sorry, your browser doesn't support embedded videos, but don't worry, you can
              <a
                href="https://fk-jke.s3.eu-north-1.amazonaws.com/media/kitchens/videos/JKE-Design-production.mp4"
                >download it</a
              >
              and watch it with your favorite video player!
            </video>
          </div>
          <div class="sm:px-6 lg:px-8 xl:px-20 lg:py-16 relative px-4 py-12 mx-auto">
            <div class="md:mr-auto md:w-1/2 md:pr-10 max-w-prose">
              <h2 class="text-base font-semibold tracking-wider text-gray-500 uppercase">
                Stilrene nordiske kjøkken
              </h2>
              <p class="sm:text-4xl mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                En verden av muligheter, skreddersydd for deg.
              </p>
              <p class="mt-3 text-lg text-gray-600">
                Vi er stolte samarbeidspartnere med Kjøkkenhuset Lillestrøm, som tilbyr et hav av
                mulige løsninger fra JKE Design, skreddersydd dine behov.
              </p>
              <div class="mt-2">
                <Button
                  as="a"
                  href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-8"
                >
                  Bestill tegnetime hos oss i dag!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <CollectionList v-if="loading">
        <CollectionListItem
          v-for="(n, i) in 8"
          :key="n"
          title="Loading"
          description="Loading..."
          loading
          :reverse="i % 2 == 0"
          to="#"
          link-label="Loading"
        />
      </CollectionList>
      <CollectionList v-else>
        <CollectionListItem
          v-for="(kitchen, index) in kitchens"
          :key="kitchen.slug"
          :title="kitchen.name"
          :description="kitchen.thumbnailDescription"
          :loading="loading"
          :images="kitchen.listImages"
          :reverse="index % 2 == 0"
          :to="`/kitchens/${kitchen.slug}/`"
          link-label="Les mer"
        />
      </CollectionList>
    </main>
  </div>
</template>
