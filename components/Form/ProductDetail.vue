<script setup lang="ts">
interface FormProductDetailProps {
  active: boolean
  existingProduct?: any // TODO: Change to actual type
}

const props = defineProps<FormProductDetailProps>()

const clonedProduct = { ...props.existingProduct }

const reactiveProduct = reactive({
  name: clonedProduct.name,
  supplier: clonedProduct.supplier,
  categories: clonedProduct.categories,
  status: clonedProduct.status,
  slug: clonedProduct.slug,
  searchKeywords: clonedProduct.searchKeywords,
  description: clonedProduct.description,
  unit: clonedProduct.unit,
  vatRate: clonedProduct.unit ? clonedProduct.unit : '0.25',
  availableInSpecialSizes: clonedProduct.availableInSpecialSizes,
  colors: clonedProduct.colors,
  shapes: clonedProduct.shapes,
  materials: clonedProduct.materials,
  rooms: clonedProduct.rooms,
  absorption: clonedProduct.absorption,
  displayPriceToCustomer: clonedProduct.displayPriceToCustomers,
  canBePurchasedOnline: clonedProduct.canBePurchasedOnline,
  canBePickedUp: clonedProduct.canBePickedUp,
})

interface FormProductDetailEmits {
  (e: 'close'): void
}

const emits = defineEmits<FormProductDetailEmits>()

const onClose = () => {
  emits('close')
}

const fileFormActive = ref<boolean>(false)
</script>

<template>
  <div>
    <ModalSlideOver title="Legg til nytt produkt" :active="active" @close="onClose">
      <CollapsableSection title="Generelt">
        <div class="space-y-5">
          <Input
            id="id_product_name"
            v-model="reactiveProduct.name"
            label="Navn"
            required
            display-word-count
            :error="$parseApiError('name', error)"
            @input="clearError"
          />
          <Select
            id="id_supplier"
            v-model="reactiveProduct.supplier"
            label="Leverandør"
            required
            :error="$parseApiError('supplier', error)"
            @input="clearError"
          >
            <option>X</option>
          </Select>
          <Editor
            v-model="reactiveProduct.description"
            label="Beskrivelse"
            required
            render-as-input
            output="string"
            display-word-count
            :error="$parseApiError('description', error)"
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Kommersielt">
        <div class="space-y-5">
          <Checkbox
            id="id_can_be_purchased_online"
            v-model="reactiveProduct.canBePurchasedOnline"
            label="Kan kjøpes på nett"
            help-text="Kunder kan legge inn bestilling på produktet, og få prouktet sendt hjem."
          />
          <Checkbox
            id="id_can_be_picked_up"
            v-model="reactiveProduct.canBePickedUp"
            label="Kan hentes i butikk"
            help-text="Kunder kan legge inn klikk og hent ordre."
          />
          <Checkbox
            id="id_display_price_to_customer"
            v-model="reactiveProduct.displayPriceToCustomer"
            label="Vis pris til kunde"
            help-text="Prisen på produktet er tilgjengelig i nettbutikken."
          />
          <Input
            id="id_vat_rate"
            v-model="reactiveProduct.vatRate"
            label="MVA sats"
            required
            help-text="Prosentvis sats for MVA i desimalform. E.g. 0.25 for 25%."
            :error="$parseApiError('vatRate', error)"
            @input="clearError"
          />
          <Select
            id="id_unit"
            v-model="reactiveProduct.unit"
            label="Enhet"
            required
            :error="$parseApiError('supplier', error)"
            @input="clearError"
          >
            <option>Stk</option>
            <option>m2</option>
          </Select>
        </div>
      </CollapsableSection>
      <CollapsableSection title="Bilder">
        <FileUploadInput type="image" multiple />
      </CollapsableSection>
      <CollapsableSection title="Filer">
        <button type="button" @click="fileFormActive = true">Files</button>
      </CollapsableSection>
      <CollapsableSection title="Alternativer"> </CollapsableSection>
      <template #actions>
        <div class="grid grid-cols-3 gap-5">
          <Button variant="secondary" class="col-span-1">Avbryt</Button>
          <Button variant="primary" class="col-span-2">Legg til produkt</Button>
        </div>
      </template>
    </ModalSlideOver>

    <FormProductFile :active="fileFormActive" @close="fileFormActive = false" />
  </div>
</template>
