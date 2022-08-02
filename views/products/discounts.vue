<script setup lang="ts">
/************
 ** Config **
 ************/

const config = useRuntimeConfig().public
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

          <Spacer spacing="md" />

          <CollapsableSection title="20% på blandebatterier">
            <p>Inside section</p>
          </CollapsableSection>
        </Container>
      </section>
    </main>
  </div>
</template>
