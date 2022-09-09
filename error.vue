<script setup lang="ts">
import error2560x1440 from './assets/images/error_2560x1440.jpeg'
import error1920x1080 from '~~/assets/images/error_1920x1080.jpeg'
import error1280x720 from '~~/assets/images/error_1280x720.jpeg'
import error1024x576 from '~~/assets/images/error_1024x576.jpeg'

interface ErrorType {
  statusCode: string | number
  statusMessage: string
}

interface ErrorProps {
  error: ErrorType
}

defineProps<ErrorProps>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <Head>
      <Title v-if="error.statusCode === (404 || '404')">Siden finnes ikke (404)</Title>
      <Title v-else>Noe har gått galt!</Title>
    </Head>
    <main class="min-h-screen">
      <img
        :src="error2560x1440"
        alt=""
        :srcset="`${error1024x576} w1024, ${error1280x720} w1280, ${error1920x1080} w1920, ${error2560x1440} w2560`"
        class="absolute inset-0 object-cover min-h-screen"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="sm:px-6 sm:py-24 md:grid lg:px-8 px-4 py-16">
          <div class="max-w-max mx-auto">
            <div v-if="error.statusCode === (404 || '404')" class="sm:flex">
              <p class="sm:text-5xl text-4xl font-extrabold text-gray-200">404</p>
              <div class="sm:ml-6">
                <div class="sm:border-l-2 sm:border-gray-200 sm:pl-6">
                  <h1 class="sm:text-5xl text-4xl font-extrabold tracking-tight text-white">
                    Denne siden fant vi ikke
                  </h1>
                  <p class="mt-1 text-base text-gray-100">
                    Dobbelsjekk at du har oppgitt en gyldig adresse og prøv igjen.
                  </p>
                </div>
                <div class="sm:border-l sm:border-transparent sm:pl-6 flex mt-6 space-x-3">
                  <Button variant="secondary" @click="handleError">Gå tilbake til forsiden</Button>
                  <!-- <Button to="/contact-us/" variant="outlined">Kontakt oss</Button> -->
                  <Button as="a" href="mailto:hei@flis.no" variant="outlined">Kontakt oss</Button>
                </div>
              </div>
            </div>
            <div v-else class="sm:flex">
              <p class="sm:text-5xl text-4xl font-extrabold text-gray-200">
                {{ error.statusCode }}
              </p>
              <div class="sm:ml-6">
                <div class="sm:border-l-2 sm:border-gray-200 sm:pl-6">
                  <h1 class="sm:text-5xl text-4xl font-extrabold tracking-tight text-white">
                    Oops! Noe har gått galt
                  </h1>
                  <p class="mt-1 text-base text-gray-100">
                    Her har det skjedd en feil i maskineriet. Våre teknikere er informert.
                  </p>
                </div>
                <div class="sm:border-l sm:border-transparent sm:pl-6 flex mt-6 space-x-3">
                  <Button to="/" variant="secondary">Gå tilbake til forsiden</Button>
                  <!-- <Button to="/contact-us/" variant="outlined">Kontakt oss</Button> -->
                  <Button as="a" href="mailto:hei@flis.no" variant="outlined">Kontakt oss</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
