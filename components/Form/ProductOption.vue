<script setup lang="ts">
import useProductsStore from '~~/store/products'

const store = useProductsStore()

interface FormProductOptionProps {
  active: boolean
}

defineProps<FormProductOptionProps>()

const variants = await store.getVariants()
const selectedVariant = ref()

const variantFormActive = ref<boolean>(false)

// TODO: add store for product status and fetch from there
</script>

<template>
  <div>
    <form @submit.prevent>
      <ModalSlideOver title="Legg til nytt alternativ" :active="active">
        <CollapsableSection title="Generelt">
          <div class="space-y-5">
            <Select id="id_status" label="Status">
              <option>Somethign</option>
            </Select>
            <Input
              id="id_gross_price"
              label="Pris"
              type="number"
              help-text="Prisen for dette alternativet."
            />
          </div>
        </CollapsableSection>
        <CollapsableSection title="Størrelse">
          <div class="space-y-5">
            <div class="grid grid-cols-3 gap-5">
              <Input id="id_size_width" label="Bredde" type="number" />
              <Input id="id_size_height" label="Høyde" type="number" />
              <Input id="id_size_height" label="Dybde" type="number" />
            </div>
            <Input
              id="id_size_height"
              label="Omkrets"
              type="number"
              help-text="Omkrets kan brukes dersom alternativet har en sfærisk form fremfor en kvadratisk en. Omkrets kan ikke benyttes når de andre feltene er fylt ut."
            />
          </div>
        </CollapsableSection>
        <CollapsableSection title="Variant">
          <div class="space-y-5">
            <ListBoxFilter
              id="id_variant"
              v-model="selectedVariant"
              label="Variant"
              value-field="id"
              display-field="name"
              :options="variants"
            />
            <Button variant="secondary" fluid @click="variantFormActive = true">
              Legg til ny variant
            </Button>
            <p class="mt-3 text-sm font-light text-gray-500">
              Dersom varianten du ønsker å legge til ikke allerede eksisterer kan du opprette en ny
              en.
            </p>
          </div>
        </CollapsableSection>
        <template #actions>
          <div class="grid grid-cols-5 gap-5">
            <Button variant="secondary" class="col-span-1">Avbryt</Button>
            <Button variant="primary" class="col-span-2" type="submit" @click="null">
              Lagre og gå tilbake
            </Button>
            <Button variant="primary" class="col-span-2" type="submit" @click="null">
              Lagre og legg til ny
            </Button>
          </div>
        </template>
      </ModalSlideOver>
    </form>

    <FormProductOptionVariant :active="variantFormActive" @close="variantFormActive = false" />
  </div>
</template>
