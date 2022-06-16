<script setup lang="ts"></script>

<template>
  <main>
    <Image />
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem>Test</BreadcrumbsItem>
        <BreadcrumbsItem active>Test 2</BreadcrumbsItem>
      </Breadcrumbs>

      <Spacer spacing="md" />

      <div
        class="mx-auto lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
      >
        <div class="lg:col-span-2 xl:col-span-3 lg:border-r lg:border-gray-200 lg:pr-8">
          <Text variant="title2">Test</Text>
        </div>

        <div class="lg:mt-0 lg:row-span-3 xl:col-span-2 lg:col-span-1 mt-4">
          <Calendar
            allow-detail-expand
            is-bookable
            :bookable-hour-start="10"
            :bookable-hour-end="17"
            is-compact
          />
        </div>
        <div
          class="lg:pt-6 lg:pb-16 lg:col-start-1 xl:col-span-3 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 py-10 space-y-12 bg-red-500"
        ></div>
      </div>
    </Container>
  </main>
</template>
