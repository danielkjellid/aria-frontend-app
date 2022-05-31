<script setup lang="ts">
const products = await performGet('categories/category/1-keramisk-naturstein/products/')
// const products = []

const availableFilters = (filteredProducts, arrKey, filterKey = 'name') => {
  let filters = []
  const arr = []

  filteredProducts.map((product) => {
    if (typeof product[arrKey] === 'object' && !Array.isArray(product[arrKey])) {
      arr.push(product[arrKey])
    } else if (Array.isArray(product[arrKey])) {
      product[arrKey].map((obj) => arr.push(obj))
    }

    return null
  })

  arr.map((element) => {
    const count = arr.filter((el) => el[filterKey] === element[filterKey]).length

    const uniqueObjs = arr.reduce((unique, object) => {
      // if the object is unique, push it to own unique array
      if (!unique.some((obj) => obj[filterKey] === object[filterKey])) {
        unique.push(object)
      }
      // return as an array of unique objects
      return unique
    }, [])

    // find index of element in mapping
    const objectIndex = uniqueObjs.findIndex((object) => object[filterKey] === element[filterKey])
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
const rooms = computed(() => availableFilters(products, 'rooms'))
const suppliers = computed(() => availableFilters(products, 'supplier'))

const selectedColors = ref([])
const selectedShapes = ref([])
const selectedMaterials = ref([])
const selectedRooms = ref([])
const selectedSuppliers = ref([])
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
      <div class="flex items-center justify-between py-3 bg-white border-b border-gray-200">
        <div class="lg:flex items-center justify-start hidden space-x-4">
          <ListBox v-model="selectedColors" label="Farger" multiple :selected="selectedColors">
            <ListBoxItem v-for="color in colors" :key="color.id" :value="color">
              {{ color.name }}
              <template #leftIcon>
                <div
                  :style="`background-color: ${color.colorHex}`"
                  class="w-6 h-6 mr-3 border border-gray-300 rounded-full"
                />
              </template>
            </ListBoxItem>
          </ListBox>
          <ListBox v-model="selectedShapes" label="Fasonger" multiple :selected="selectedShapes">
            <ListBoxItem v-for="shape in shapes" :key="shape.id" :value="shape">
              {{ shape.name }}
              <template #leftIcon>
                <img alt="" :src="shape.image" class="w-6 h-6" />
              </template>
            </ListBoxItem>
          </ListBox>
          <ListBox
            v-model="selectedMaterials"
            label="Materialer"
            multiple
            :selected="selectedMaterials"
          >
            <ListBoxItem
              v-for="material in materials"
              :key="material"
              :value="material"
              check-mark-alignment="right"
            >
              {{ material.name }}
            </ListBoxItem>
          </ListBox>
          <ListBox v-model="selectedRooms" label="Rom" multiple :selected="selectedRooms">
            <ListBoxItem
              v-for="room in rooms"
              :key="room"
              :value="room"
              check-mark-alignment="right"
            >
              {{ room.name }}
            </ListBoxItem>
          </ListBox>
          <ListBox
            v-model="selectedSuppliers"
            label="Leverandør"
            multiple
            :selected="selectedSuppliers"
          >
            <ListBoxItem
              v-for="supplier in suppliers"
              :key="supplier"
              :value="supplier"
              check-mark-alignment="right"
            >
              {{ supplier.originCountryFlag }} {{ supplier.name }}
            </ListBoxItem>
          </ListBox>
        </div>
        <div class="flex items-center mt-1 space-x-3">
          <Input
            id="test"
            label="test"
            :hidden-label="true"
            placeholder="Søk etter tusenvis av varer..."
          />
          <Button>Søk</Button>
        </div>
      </div>
      <Spacer spacing="md" />
      <div
        class="xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid w-full grid-cols-1 gap-5 bg-red-100"
      >
        <div
          style="min-height: 440px"
          class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 w-full overflow-hidden bg-blue-600 rounded-md"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
            alt="Model wearing women's black cotton crewneck tee."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <div
          style="min-height: 440px"
          class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 w-full overflow-hidden bg-blue-600 rounded-md"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
            alt="Model wearing women's black cotton crewneck tee."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <div
          style="min-height: 440px"
          class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 w-full overflow-hidden bg-blue-600 rounded-md"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
            alt="Model wearing women's black cotton crewneck tee."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <div
          style="min-height: 440px"
          class="sm:h-auto sm:aspect-w-2 sm:aspect-h-3 w-full overflow-hidden bg-blue-600 rounded-md"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
            alt="Model wearing women's black cotton crewneck tee."
            class="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </Container>
    <div class="min-h-screen"></div>
  </main>
</template>
