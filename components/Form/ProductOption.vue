<script setup lang="ts">
interface FormProductOptionProps {
  active: boolean
}

defineProps<FormProductOptionProps>()

const selectedVariant = ref()
</script>

<template>
  <form>
    <ModalSlideOver title="Legg til nytt alternativ" :active="active">
      <CollapsableSection title="Variant">
        {{ selectedVariant }}
        <ListBoxFilter
          id="id_variant"
          v-model="selectedVariant"
          label="Variant"
          value-field="id"
          display-field="name"
          :options="[
            { id: 1, name: 'Some variant 1' },
            { id: 2, name: 'Some variant 2' },
            { id: 6, name: 'Some variant 6' },
            { id: 3, name: 'Some variant 3' },
            { id: 4, name: 'Some variant 4' },
            { id: 5, name: 'Some variant 5' },
          ]"
        />
      </CollapsableSection>
      <CollapsableSection title="Størrelse">
        <p>Variant</p>
      </CollapsableSection>
      <CollapsableSection title="Pris">
        <p>Variant</p>
      </CollapsableSection>
    </ModalSlideOver>
  </form>
</template>
