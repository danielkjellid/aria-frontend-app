<template>
  <div class="lg:top-full sm:text-sm lg:absolute lg:inset-x-0 lg:m-0 z-40 m-2 text-gray-600">
    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel 
    it pokes out the top, so we use this shorter element to hide the top of the shadow -->
    <div class="lg:block top-1/2 absolute inset-0 hidden bg-white shadow" aria-hidden="true" />

    <div class="relative bg-white">
      <Container as="div" :y-padding="null" class="sm:px-0 md:px-0 px-0">
        <div class="gap-y-10 lg:gap-x-8 lg:grid-cols-5 lg:pt-5 lg:pb-12 gap-x-6 grid grid-cols-1">
          <slot />
        </div>
      </Container>
    </div>
  </div>
</template>
