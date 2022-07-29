<script setup lang="ts">
/* eslint-disable vue/no-v-for-template-key */
import { LocationMarkerIcon, PhoneIcon, AtSymbolIcon, ClockIcon } from '@heroicons/vue/outline'
import {
  OpeningHoursOutputSchema,
  EmployeeListOutput,
  SupplierListOutput,
} from '~~/@types/generated/dist'
import storeImg from '~~/assets/images/store.jpeg'

/************
 ** Config **
 ************/

const config = useRuntimeConfig().public

/**************************
 ** State: Opening hours **
 **************************/

const openingHours = ref<OpeningHoursOutputSchema>()
const openingHoursLoaded = computed(
  (): boolean =>
    !!openingHours.value &&
    !!openingHours.value.humanReadableTimeSlots &&
    !!openingHours.value.humanReadableTimeSlots.length
)

const fetchOpeningHours = async () => {
  openingHours.value = await performGet<OpeningHoursOutputSchema>(
    `front/opening-hours/${config.SITE_ID}/`
  )
}

fetchOpeningHours()

/**********************
 ** State: Employees **
 **********************/

const employeesList = ref<EmployeeListOutput[]>()
const employeesListLoaded = computed((): boolean => !!employeesList.value)

const fetchEmployeeList = async () => {
  employeesList.value = await performGet<EmployeeListOutput[]>(`employees/${config.SITE_ID}/`)
}

fetchEmployeeList()

/**********************
 ** State: Suppliers **
 **********************/

const supplierList = ref<SupplierListOutput[]>()
const supplierListLoaded = computed((): boolean => !!supplierList.value)

const fetchSupplierList = async () => {
  supplierList.value = await performGet<SupplierListOutput[]>(`suppliers/`)
}

fetchSupplierList()
</script>

<template>
  <div>
    <Head>
      <Title>Om oss</Title>
      <Meta name="og:type" content="website" />
    </Head>
    <main>
      <section>
        <article class="map-container relative overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://api.mapbox.com/styles/v1/dexento/cjujsu10w07p81fnz7vcdjvg3.html?title=false&access_token=pk.eyJ1IjoiZGV4ZW50byIsImEiOiJjanR4NTljcG4wNDlnNGNyM2duNms3cXo4In0.q4G3Zzgf1zQ8MQFZzwMPQA&zoomwheel=false#16.07/59.963386/11.064797"
            title="Mapbox Basic Template"
            style="border: none"
          ></iframe>
        </article>
      </section>
      <Container>
        <Breadcrumbs>
          <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
          <BreadcrumbsItem to="/about-us/" active>Om oss</BreadcrumbsItem>
        </Breadcrumbs>
      </Container>

      <Container y-padding="pt-2 pb-8 2xl:pb-12">
        <section
          v-if="openingHoursLoaded"
          class="md:grid-cols-2 lg:gap-12 lg:px-0 grid grid-cols-1 gap-8 px-4 mx-auto"
        >
          <div class="md:order-1 order-2">
            <Text variant="title3" class="mb-4">Om oss</Text>
            <div class="max-w-prose text-sm text-gray-800">
              <Text variant="body2">
                Flishuset og Kjøkkenhuset ble etablert i 1995 og har drevet to ulike selskaper under
                samme tak frem til 2018, hvor selskapene da ble slått sammen og driver nå under
                navnet FK-JKE Design (Flishuset Kjøkkenhuset JKE Design). Vi samarbeider med
                spennende leverandører fra hele verden innenfor flis, badrom og kjøkken.
              </Text>
              <br />
              <Text variant="body2">
                En stor andel av våre kunder er “vanlige kunder” som ønsker fliser i fra annerkjente
                leverandører. En annen stor andel av kundene våre er arkitekter og
                interiørarkitekter.
              </Text>
              <br />
              <Text variant="body2">
                Vår hovedvekt innenfor fliser er arkitektsbaserte serier som inneholder et stort
                utvalg av overflater, størrelser og formater.
              </Text>
              <br />
              <Text variant="body2">
                På kjøkkensiden samarbeider vi med JKE Design. JKE Design skaper kjøkken med fokus
                på nordisk designtradisjon og kvalitet. Alle kjøkken leveres med ferdigmonterte
                skrog.
              </Text>
            </div>
            <div class="mt-6 space-y-4">
              <div class="flex flex-row items-start gap-2">
                <ClockIcon class="w-6 h-6 text-gray-500" />
                <div>
                  <table class="w">
                    <tr class="sr-only">
                      <th>Dager</th>
                      <th>Åpningstider</th>
                    </tr>
                    <template v-if="openingHoursLoaded">
                      <tr
                        v-for="openingHour in openingHours.humanReadableTimeSlots"
                        :key="openingHour.days"
                      >
                        <td class="w-40">
                          <Text variant="body2" color="text-gray-600">{{ openingHour.days }}</Text>
                        </td>
                        <td class="text-right">
                          <Text variant="body2" color="text-gray-600">{{
                            !openingHour.isClosed ? openingHour.timeSlot : 'Stengt'
                          }}</Text>
                        </td>
                      </tr>
                    </template>
                  </table>
                </div>
              </div>
              <div class="flex flex-row items-center gap-2">
                <LocationMarkerIcon class="w-6 h-6 text-gray-500" />
                <Text variant="body2" color="text-gray-600">Åråssvingen 12, 2007 Kjeller</Text>
              </div>
              <div class="flex flex-row items-center gap-2">
                <PhoneIcon class="w-6 h-6 text-gray-500" />
                <Text variant="body2" color="text-gray-600">+47 64 84 10 40</Text>
              </div>
              <div class="flex flex-row items-center gap-2">
                <AtSymbolIcon class="w-6 h-6 text-gray-500" />
                <Text variant="body2" color="text-gray-600">hei@flis.no</Text>
              </div>
            </div>
          </div>
          <div class="md:flex-1 sm:h-80 md:h-96 md:order-2 relative order-1 w-full h-64">
            <img
              :src="storeImg"
              alt="Picture of our store in Åråssvingen 12"
              class="absolute inset-0 object-cover w-full h-full rounded-md"
            />
          </div>
        </section>

        <section
          v-else
          class="md:grid-cols-2 lg:gap-12 lg:px-0 grid grid-cols-1 gap-8 px-4 mx-auto"
        >
          <div class="md:order-1 order-2">
            <Text variant="title3" class="mb-4">Om oss</Text>
            <div class="max-w-prose text-sm text-gray-800">
              <div>
                <SkeletonLoader loading />
                <SkeletonLoader loading />
                <SkeletonLoader loading width="w-11/12" />
                <SkeletonLoader loading />
                <SkeletonLoader loading width="w-1/3" />
              </div>
              <br />
              <div>
                <SkeletonLoader loading width="w-11/12" />
                <SkeletonLoader loading />
                <SkeletonLoader loading width="w-1/3" />
              </div>
              <br />
              <div>
                <SkeletonLoader loading />
                <SkeletonLoader loading width="w-3/5" />
              </div>
              <br />
              <div>
                <SkeletonLoader loading />
                <SkeletonLoader loading width="w-11/12" />
                <SkeletonLoader loading width="w-2/5" />
              </div>
            </div>
            <div class="mt-6 space-y-4">
              <div class="flex flex-row items-start gap-2">
                <ClockIcon class="w-6 h-6 text-gray-500" />
                <div class="-mt-1">
                  <table class="w-full">
                    <tr class="sr-only">
                      <th>Dager</th>
                      <th>Åpningstider</th>
                    </tr>
                    <tr>
                      <td class="w-40">
                        <SkeletonLoader loading width="w-11/12" />
                      </td>
                      <td>
                        <SkeletonLoader loading />
                      </td>
                    </tr>
                    <tr>
                      <td class="w-40">
                        <SkeletonLoader loading width="w-1/2" />
                      </td>
                      <td class="w-20">
                        <SkeletonLoader loading width="w-full" />
                      </td>
                    </tr>
                    <tr>
                      <td class="w-40">
                        <SkeletonLoader loading width="w-1/2" />
                      </td>
                      <td class="w-20">
                        <SkeletonLoader loading width="w-full" />
                      </td>
                    </tr>
                    <tr>
                      <td class="w-40">
                        <SkeletonLoader loading width="w-1/2" />
                      </td>
                      <td class="w-20">
                        <SkeletonLoader loading width="w-full" />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="flex flex-row items-center gap-2">
                <LocationMarkerIcon class="w-6 h-6 text-gray-500" />
                <SkeletonLoader loading width="w-2/5" />
              </div>
              <div class="flex flex-row items-center gap-2">
                <PhoneIcon class="w-6 h-6 text-gray-500" />
                <SkeletonLoader loading width="w-1/4" />
              </div>
              <div class="flex flex-row items-center gap-2">
                <AtSymbolIcon class="w-6 h-6 text-gray-500" />
                <SkeletonLoader loading width="w-1/4" />
              </div>
            </div>
          </div>
          <div class="md:flex-1 sm:h-80 md:h-96 md:order-2 relative order-1 w-full h-64">
            <SkeletonLoader
              loading
              class="absolute inset-0 object-cover w-full h-full rounded-md"
            />
          </div>
        </section>
      </Container>

      <section class="py-16 mx-auto mt-24 text-center bg-gray-800">
        <div class="lg:px-0 container max-w-screen-lg px-4 mx-auto">
          <div>
            <h1 class="mt-3 mb-4 text-2xl font-medium text-white">Vårt team</h1>
          </div>
          <div
            v-if="employeesListLoaded"
            class="sm:grid-cols-2 lg:grid-cols-3 place-content-evenly justify-items-center grid grid-cols-1 gap-8 mx-auto mt-8"
          >
            <div
              v-for="employee in employeesList"
              :key="employee.companyEmail"
              class="w-80 relative flex flex-col items-center mx-auto"
            >
              <div class="w-72 h-72 sm:w-64 sm:h-64 relative mb-4">
                <img
                  :src="employee.profilePicture"
                  alt="image of avatar"
                  class="absolute inset-0 object-cover w-full h-full rounded-full"
                />
              </div>
              <p class="pb-1 font-semibold text-white">{{ employee.fullName }}</p>
              <div class="flex flex-row items-center gap-2">
                <AtSymbolIcon class="w-5 h-5 text-gray-300" />
                <p class="mb-px text-sm text-white">{{ employee.companyEmail }}</p>
              </div>
            </div>
          </div>
          <div
            v-else
            class="sm:grid-cols-2 lg:grid-cols-3 place-content-evenly justify-items-center grid grid-cols-1 gap-8 mx-auto mt-8"
          >
            <div v-for="i in 3" :key="i" class="w-80 relative flex flex-col items-center mx-auto">
              <div class="w-72 h-72 sm:w-64 sm:h-64 relative mb-4">
                <SkeletonLoader
                  loading
                  shape="circle"
                  class="absolute inset-0 object-cover w-full h-full rounded-full"
                />
              </div>
              <p class="pb-1 font-semibold text-white">
                <SkeletonLoader loading width="w-40" height="h-5" />
              </p>
              <div class="flex flex-row items-center gap-2 mt-3">
                <p class="mb-px text-sm text-white"><SkeletonLoader loading width="w-48" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container>
        <section class="lg:px-0 grid px-4 mx-auto my-12">
          <h1 class="mb-4 text-2xl font-medium text-gray-900">Våre samarbeidspartnere</h1>
          <div
            v-if="supplierListLoaded"
            class="mt-3 grid grid-cols-2 gap-0.5 sm:grid-cols-3 lg:grid-cols-4 lg:mt-5"
          >
            <a
              v-for="supplier in supplierList"
              :key="supplier.id"
              :href="supplier.websiteLink"
              class="bg-gray-50 hover:bg-gray-100 flex justify-center col-span-1 px-8 py-8 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img class="max-h-12 object-scale-down" :src="supplier.logo" :alt="supplier.name" />
            </a>
          </div>
          <div v-else class="mt-3 grid grid-cols-2 gap-0.5 sm:grid-cols-3 lg:grid-cols-4 lg:mt-5">
            <SkeletonLoader v-for="i in 16" :key="i" loading width="w-full" height="h-24" />
          </div>
        </section>
      </Container>
    </main>
  </div>
</template>

<style scoped>
.map-container {
  height: 375px;
  width: 100%;
}

@media (min-width: 640px) {
  .map-container {
    height: 330px;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .map-container {
    height: 370px;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .map-container {
    height: 575px;
    width: 100%;
  }
}

@media (min-width: 1536px) {
  .map-container {
    height: 860px;
    width: 100%;
  }
}
</style>
