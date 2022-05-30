<script setup lang="ts">
const products = await performGet('categories/category/1-keramisk-naturstein/products/')
// const products = []

const availableFilters = (filteredProducts, arrKey) => {
  let filters = []
  const arr = []

  filteredProducts.map((product) => product[arrKey].map((obj) => arr.push(obj)))

  arr.map((element) => {
    const count = arr.filter((el) => el.name === element.name).length

    const uniqueObjs = arr.reduce((unique, object) => {
      // if the object is unique, push it to own unique array
      if (!unique.some((obj) => obj.name === object.name)) {
        unique.push(object)
      }
      // return as an array of unique objects
      return unique
    }, [])

    // find index of element in mapping
    const objectIndex = uniqueObjs.findIndex((object) => object.name === element.name)
    // append the count property and value
    uniqueObjs[objectIndex].count = count

    // set the desination list equal to unique list with added properties
    filters = uniqueObjs
    return filters
  })

  return filters
}

const colors = computed(() => availableFilters(products, 'colors'))
const shapes = computed(() => availableFilters(products, 'shapes'))
const materials = computed(() => availableFilters(products, 'materials'))
</script>

<template>
  <main>
    <Image />
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem to="/">FK JKE Design</BreadcrumbsItem>
        <BreadcrumbsItem to="#">Main cat</BreadcrumbsItem>
        <BreadcrumbsItem to="#" active>Sub cat</BreadcrumbsItem>
      </Breadcrumbs>
      <Spacer spacing="md" />
      <div style="top: 90px" class="sticky top-0">
        <div class="flex items-center justify-between py-3 border-b border-gray-200">
          <ProductFilter :colors="colors" :materials="materials" :shapes="shapes" />
          <Button>Fjern filter</Button>
        </div>
      </div>
      <Spacer spacing="md" />
      <div
        class="xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid w-full grid-cols-1 gap-5 bg-red-100"
      >
        <div class="test">1</div>
        <div class="test">2</div>
        <div class="test">3</div>
        <div class="test">4</div>
      </div>
    </Container>
    <div class="min-h-screen"></div>
  </main>
</template>

<style scoped>
.test {
  /* 350x530 */
  width: 335px;
  height: 505px;
  background-color: blue;
}

@media (min-width: 640px) {
  .test {
    width: 290px;
    height: 440px;
  }
}

@media (min-width: 768px) {
  .test {
    width: 310px;
    height: 470px;
  }
}

@media (min-width: 1024px) {
  .test {
    width: 290px;
    height: 530px;
  }
}
</style>
