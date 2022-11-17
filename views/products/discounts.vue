<script setup lang="ts">
import { DiscountsActiveListOutput } from '~~/@types'
import { publicUrls } from '~~/endpoints'

/***************
 ** Page meta **
 ***************/

definePageMeta({
  layout: 'default',
})

/************
 ** Config **
 ************/

const config = useRuntimeConfig().public

/**********************
 ** State: Discounts **
 *********************/

const discounts = ref<DiscountsActiveListOutput[]>()
const discountsLoaded = computed((): boolean => !!discounts.value)

const fetchDiscounts = async () => {
  discounts.value = await performGet<DiscountsActiveListOutput[]>(publicUrls.discounts.list())
}

fetchDiscounts()
</script>

<template>
  <div>
    <Head>
      <Title>Tlilbudsvarer</Title>
    </Head>
    <main>
      <section>
        <Image
          title="Tilbudsvarer"
          :loading="false"
          :images="{
            isMainImage: true,
            applyFilter: false,
            image640x360Url:
              'https://bilder.flis.no/cz-E-YmeGhnLgzFQJtdHTTLbMXY=/640x360/smart/media/front/discounts.jpg',
            image768x432Url:
              'https://bilder.flis.no/I5uFkLLp-iFq40_0iEOXS1ynLqY=/768x432/smart/media/front/discounts.jpg',
            image960x540Url:
              'https://bilder.flis.no/PY-HjeywUBhIRQkyUxdPTb1rAmo=/960x540/smart/media/front/discounts.jpg',
            image1024x576Url:
              'https://bilder.flis.no/ldeCjovZoGaBwwNz5iP_J-84a24=/1024x576/smart/media/front/discounts.jpg',
            image1280x720Url:
              'https://bilder.flis.no/Yy5lyE9fv3DtQDvfTXDXK8HdFPI=/1280x720/smart/media/front/discounts.jpg',
            image1440x810Url:
              'https://bilder.flis.no/hcUPCRjKRGM-O1Xsx0NmKc5MzV8=/1440x810/smart/media/front/discounts.jpg',
            image1920x1080Url:
              'https://bilder.flis.no/3SL3VeD1qfm13z_PCkpN4vr-D3w=/1920x1080/smart/media/front/discounts.jpg',
          }"
        />
      </section>
      <section>
        <Container>
          <Breadcrumbs>
            <BreadcrumbsItem to="/">{{ config.BRAND_NAME }}</BreadcrumbsItem>
            <BreadcrumbsItem to="#" active>Tilbudsvarer</BreadcrumbsItem>
          </Breadcrumbs>
        </Container>
      </section>
      <section v-if="!discountsLoaded">
        <Container>
          <div class="py-3">
            <SkeletonLoader loading height="h-10" />
            <div class="px-4 my-6">
              <ProductList loading :products="[]" />
            </div>
          </div>
          <div class="py-3">
            <SkeletonLoader loading height="h-10" />
            <div class="px-4 my-6">
              <ProductList loading :products="[]" />
            </div>
          </div>
        </Container>
      </section>
      <section v-else-if="discountsLoaded && discounts.length">
        <Container :y-padding="null">
          <CollapsableSection
            v-for="discount in discounts"
            :key="discount.id"
            :title="discount.name"
          >
            <ProductList :loading="!discountsLoaded" :products="discount.products" />
          </CollapsableSection>
        </Container>
      </section>
      <section v-else class="lg:mb-12">
        <Container>
          <NoData
            class="h-96 mb-12"
            error-message="Vi har dessverre ingen tilbud for øyeblikket. Vennligst prøv igjen senere."
          />
        </Container>
      </section>
    </main>
  </div>
</template>
