<script setup lang="ts"></script>

<template>
  <main>
    <Image />
    <Container class="bg-red-200">
      <Breadcrumbs class="bg-blue-200">
        <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
        <BreadcrumbsItem to="#">Main cat</BreadcrumbsItem>
        <BreadcrumbsItem to="#" active>Sub cat</BreadcrumbsItem>
      </Breadcrumbs>
    </Container>
    <Container class="min-h-screen">
      <div style="top: 90px" class="sticky">
        <Button variant="secondary" fluid class="sm:hidden block">Filtrer og sorter</Button>
        <div class="md:block hidden py-3 bg-green-800">Test</div>
      </div>
    </Container>
  </main>
</template>
