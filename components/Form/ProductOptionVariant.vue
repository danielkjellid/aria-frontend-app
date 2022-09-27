<script setup lang="ts">
import { VariantCreateInternalOutput } from '~~/@types'

interface FormProductOptionVariantProps {
  active: boolean
  existingVariant?: VariantCreateInternalOutput
}

const reactiveVariant: VariantCreateInternalOutput = reactive({
  name: '',
  isStandard: false,
  thumbnail: '',
  image: '',
})

defineProps<FormProductOptionVariantProps>()
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <ModalSlideOver title="Legg til ny variant" :active="active">
      <CollapsableSection title="Generelt">
        <div class="space-y-5">
          <Input id="id_variant_name" v-model="reactiveVariant.name" label="Navn" />
          <Checkbox
            id="id_variant_is_standard"
            v-model="reactiveVariant.isStandard"
            label="Er standard variant"
            help-text="Standard varianter er en variant som ofte er planlagt å tilknyttes en mengde alternativer. Kan f.eks. være en typisk farge eller finish som tilbys på en større del av et leverandørsortiment."
          />
        </div>
      </CollapsableSection>
      <CollapsableSection title="Bilde">
        <FileUploadInput type="image" />
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
</template>
