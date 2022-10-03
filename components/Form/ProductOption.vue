<script setup lang="ts">
import useProductsStore from '~~/store/products'

const store = useProductsStore()

interface FormProductOptionProps {
  active: boolean
}

defineProps<FormProductOptionProps>()

const variants = await store.getVariants()
const variantFormActive = ref<boolean>(false)

const statuses = useProductStatus()

const reactiveOption = reactive({
  status: '3',
  price: 0,
  size: {
    height: null,
    width: null,
    depth: null,
    circumference: null,
  },
  variantId: null,
})

const disableCircumference = computed(
  () => !!reactiveOption.size.height || !!reactiveOption.size.width || !!reactiveOption.size.depth
)
const disableHeightWidthDepth = computed(() => !!reactiveOption.size.circumference)

interface FormProductOptionEmits {
  (e: 'close'): void
  (e: 'submit', val: any): void
}

const onClose = () => {
  emits('close')
}

const resetForm = () => {
  reactiveOption.status = '3'
  reactiveOption.price = 0
  reactiveOption.variantId = null

  reactiveOption.size.height = null
  reactiveOption.size.width = null
  reactiveOption.size.depth = null
  reactiveOption.size.circumference = null
}

const emits = defineEmits<FormProductOptionEmits>()

const handleSubmitAndClose = () => {
  emits('submit', { ...reactiveOption, size: { ...reactiveOption.size } })
  emits('close')
  resetForm()
}

const handleSubmitAndAddNew = () => {
  emits('submit', { ...reactiveOption, size: { ...reactiveOption.size } })
  resetForm()
}
</script>

<template>
  <div>
    <form @submit.prevent>
      <ModalSlideOver title="Legg til nytt alternativ" :active="active" @close="onClose">
        {{ reactiveOption }}
        <CollapsableSection title="Generelt">
          <div class="space-y-5">
            <Select id="id_status" v-model="reactiveOption.status" label="Status">
              <option
                v-for="(value, key) in statuses"
                :key="key"
                :value="value"
                :selected="value.toString() === reactiveOption.status"
              >
                {{ key }}
              </option>
            </Select>
            <Input
              id="id_gross_price"
              v-model.number="reactiveOption.price"
              label="Pris"
              type="number"
              help-text="Prisen for dette alternativet."
            />
          </div>
        </CollapsableSection>
        <CollapsableSection title="Størrelse">
          <div class="space-y-5">
            <div class="grid grid-cols-3 gap-5">
              <Input
                id="id_size_width"
                v-model="reactiveOption.size.width"
                label="Bredde i cm"
                type="number"
                :disabled="disableHeightWidthDepth"
              />
              <Input
                id="id_size_height"
                v-model="reactiveOption.size.height"
                label="Høyde i cm"
                type="number"
                :disabled="disableHeightWidthDepth"
              />
              <Input
                id="id_size_height"
                v-model="reactiveOption.size.depth"
                label="Dybde i cm"
                type="number"
                :disabled="disableHeightWidthDepth"
              />
            </div>
            <Input
              id="id_size_height"
              v-model="reactiveOption.size.circumference"
              label="Omkrets i cm"
              type="number"
              help-text="Omkrets kan brukes dersom alternativet har en sfærisk form fremfor en kvadratisk en. Feltet kan ikke benyttes når de andre størrelsesfeltene er fylt ut."
              :disabled="disableCircumference"
            />
          </div>
        </CollapsableSection>
        <CollapsableSection title="Variant">
          <div class="space-y-5">
            <ListBoxFilter
              id="id_variant"
              v-model.number="reactiveOption.variantId"
              label="Variant"
              value-field="id"
              display-field="name"
              :options="variants"
            />
            <div v-if="!reactiveOption.variantId">
              <Button variant="secondary" fluid @click="variantFormActive = true">
                Legg til ny variant
              </Button>
              <p class="mt-3 text-sm font-light text-gray-500">
                Dersom varianten du ønsker å legge til ikke allerede eksisterer kan du opprette en
                ny en.
              </p>
            </div>
          </div>
        </CollapsableSection>
        <template #actions>
          <div class="md:grid-cols-5 grid grid-cols-2 gap-5">
            <Button variant="secondary" class="md:col-span-1 md:order-1 order-2 col-span-2">
              Avbryt
            </Button>
            <Button
              variant="primary"
              class="md:col-span-2 md:order-2 col-span-1"
              type="submit"
              @click="handleSubmitAndClose"
            >
              Lagre og gå tilbake
            </Button>
            <Button
              variant="primary"
              class="md:col-span-2 md:order-2 col-span-1"
              type="submit"
              @click="handleSubmitAndAddNew"
            >
              Lagre og legg til ny
            </Button>
          </div>
        </template>
      </ModalSlideOver>
    </form>

    <FormProductOptionVariant :active="variantFormActive" @close="variantFormActive = false" />
  </div>
</template>
