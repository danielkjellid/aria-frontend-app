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
  discounts.value = await performGet<DiscountsActiveListOutput[]>(publicUrls.discounts.active())
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
            applyFilter: false,
            image640x275:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/a6d08a7c16a8804a6f2734b0f9afee60.jpeg',
            image1024x1024:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/57b6f1bfed9453523152940863a15f01.jpg',
            image512x512:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/baabc9e4bcab2b304bf0d81b9748a5d7.jpg',
            image1024x575:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/396c1e588ce59552518e9a6cc6e4f921.jpeg',
            image1536x860:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/0ab26a267b53ec54b107c69e4177b53c.jpeg',
            image2048x1150:
              'https://flishuset.s3.eu-north-1.amazonaws.com/media/front/flishuset/discounts/49820ff0e9922d95a6a200bed28c84de.jpg',
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
