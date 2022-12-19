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
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_640x360.webp',
            image768x432Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_768x432.webp',
            image960x540Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_940x540.webp',
            image1024x576Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_1024x576.webp',
            image1280x720Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_1280x720.webp',
            image1440x810Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_1440x810.webp',
            image1920x1080Url:
              'https://fk-jke.s3.eu-north-1.amazonaws.com/media/front/discounts/discounts_1920x1080.webp',
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
