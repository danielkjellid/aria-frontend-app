<script setup lang="ts">
import auth2560x1440 from '~~/assets/images/auth_2560x1440.jpeg'
import auth1920x1080 from '~~/assets/images/auth_1920x1080.jpeg'

import { ChevronLeftIcon } from '@heroicons/vue/solid'

/************
 ** Config **
 ************/

const config = useRuntimeConfig().public

/************
 ** Routes **
 ************/

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
      <Meta name="og:type" content="website" />
      <Meta
        name="og:title"
        content="FK-JKE Design: Din totalleverandør av fliser, kjøkken og baderomsinnredning!"
      />
      <Meta
        name="og:description"
        content="FK-JKE Design er en totalleverandør av markedes mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter."
      />

      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js" />
      <Link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />
    </Head>
    <main class="h-screen">
      <div
        :style="`background-image: image-set(
            url(${auth1920x1080}) 1x,
            url(${auth2560x1440}) 2x
          );`"
        class="bg-center bg-no-repeat bg-cover"
      >
        <div class="md:bg-transparent bg-white">
          <div class="md:m-0 lg:max-w-md max-w-sm min-h-screen px-5 py-6 m-auto bg-white">
            <nav class="absolute top-0 left-0 mt-5 ml-4">
              <div class="flex items-center">
                <ChevronLeftIcon class="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                <NuxtLink
                  to="/"
                  v-bind="$attrs"
                  class="hover:text-brand-600 text-brand-800 ml-2 text-sm font-medium cursor-pointer"
                >
                  Tilbake til {{ config.BRAND_NAME }}
                </NuxtLink>
              </div>
            </nav>
            <div class="pt-20">
              <div class="flex items-center justify-center mb-8">
                <slot name="tabs" />
              </div>
              <div class="mb-8 text-center">
                <slot name="heading" />
              </div>
              <slot name="content" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
