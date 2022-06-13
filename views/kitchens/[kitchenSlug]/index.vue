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

      <Calendar allow-detail-expand />
    </Container>
  </main>
</template>
