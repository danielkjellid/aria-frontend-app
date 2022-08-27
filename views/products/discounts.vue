<script setup lang="ts">
import { DiscountsActiveListOutput } from '~~/@types/generated/dist'

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
  discounts.value = await performGet<DiscountsActiveListOutput[]>('discounts/active/')
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
        <Image title="Tilbudsvarer" :loading="false" />
      </section>
      <section>
        <Container>
          <Breadcrumbs>
            <BreadcrumbsItem to="/">{{ config.BRAND_NAME }}</BreadcrumbsItem>
            <BreadcrumbsItem to="#" active>Tilbudsvarer</BreadcrumbsItem>
          </Breadcrumbs>
        </Container>
      </section>
      <section>
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
    </main>
  </div>
</template>
