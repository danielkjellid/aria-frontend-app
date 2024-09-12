<script setup lang="ts">
import auth2560x1440 from '~~/assets/images/auth_2560x1440.jpeg'
import useUsersStore from '~~/store/users'
import useNotificationsStore from '~~/store/notifications'

import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'

/************
 ** Config **
 ************/

const config = useRuntimeConfig().public

/************
 ** Routes **
 ************/

const route = useRoute()
const router = useRouter()

const { next } = route.query

const metaDescription = ref(
  'FK-JKE Design er en totalleverandør av markedes mest spennende utvalg innenfor fliser, baderomsinnredning, tilbehør til bad og kjøkken fra noen av verdens mest spennende produsenter.'
)

/***********
 ** Store **
 ***********/

const notificationsStore = useNotificationsStore()
const usersStore = useUsersStore()

/***********
 ** State **
 ***********/

const { currentUser } = storeToRefs(usersStore)
const currentUserLoggedIn = computed(() => Object.keys(currentUser.value).length > 0)

const logOut = () => {
  usersStore.logOut()

  notificationsStore.create({
    title: 'Logget ut!',
    text: 'Du er nå logget ut.',
    type: 'success',
  })

  router.push({ name: 'index' })
}

/**************
 ** Watchers **
 **************/

// If currentUser is updated, and we have a next query parameter
// in the url, we want to redirect the use immediately. This is
// because users are redirected to log in if a route requires auth,
// and since currentUser is fetched async, we don't always have the
// updated state before the protected route renders (especially if
// the route is accessed directly)
watch(
  () => currentUserLoggedIn.value,
  (_oldValue, _newValue) => {
    if (next) {
      router.push(next as string)
    }
  }
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
        content="https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/eternity.jpeg"
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
    </Head>
    <main class="h-screen">
      <div
        :style="`background-image: url(${auth2560x1440});`"
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
                <slot v-if="!currentUserLoggedIn" name="heading" />
                <div v-else>
                  <Text variant="title4">Velkommen tilbake!</Text>
                  <div class="mt-1">
                    <Text variant="body2">
                      Du er allerede logget inn som {{ currentUser.profile.fullName }}.
                    </Text>
                    <ButtonLink is="button" type="button" class="block mt-1" @click="logOut">
                      Logg ut
                    </ButtonLink>
                  </div>
                </div>
              </div>
              <slot v-if="!currentUserLoggedIn" name="content" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
