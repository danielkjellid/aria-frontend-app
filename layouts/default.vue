<script setup lang="ts">
const route = useRoute()

const metaDescription = ref(
  'FK-JKE Design er en totalleverandør av markedes mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter.'
)
</script>

<template>
  <div>
    <Head>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta name="description" hid="description" :content="metaDescription" />
      <Meta name="format-detection" content="telephone=no" />
      <Meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <Meta name="twitter:card" content="summary" />
      <Meta
        name="twitter:title"
        content="FK-JKE Design: Din totalleverandør av fliser, kjøkken og baderomsinnredning!"
      />
      <Meta name="twitter:description" :content="metaDescription" />
      <Meta
        name="twitter:image"
        content="https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/eternity.jpeg"
      />
      <Meta name="og:site_name" content="FK-JKE Design" />
      <Meta name="og:locale" content="no_NO" />
      <Meta name="og:url" :content="route.fullPath" />

      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js" />
      <Link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />
    </Head>
    <div class="content relative min-h-screen">
      <div class="relative min-h-screen">
        <Navbar />
        <slot class="relative" />
      </div>
      <Footer />
    </div>
  </div>
</template>
