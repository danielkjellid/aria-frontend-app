<template>
  <section>
    <a-image
      name="Example"
      width="full"
      :loading="pending"
      :images="data[0].images"
      @on-navigate-to-content=""
    />
  </section>
</template>

<script setup lang="ts">

const { pending, data } = await useAsyncData('categories', () => performGet("categories/parents/"))
// console.log(data)

const images = {
  applyFilter: false,
  image512x512: 'https://source.unsplash.com/random',
  image640x275: 'https://source.unsplash.com/random',
  image1024x1024: 'https://source.unsplash.com/random',
  image1024x575: 'https://source.unsplash.com/random',
  image1536x860: 'https://source.unsplash.com/random',
  image2048x1150: 'https://source.unsplash.com/random',
}
</script>