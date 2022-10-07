<script setup lang="ts">
import useNotificationsStore from '~~/store/notifications'
import { ProductOption } from './types'

const notificationsStore = useNotificationsStore()

interface FormProductOptionFormBlockEmits {
  (e: 'update', val: ProductOption[]): void
}

const emits = defineEmits<FormProductOptionFormBlockEmits>()

const formActive = ref<boolean>(false)
const options = ref<ProductOption[]>([])
const addNewOption = (val: ProductOption) => {
  options.value.push(val)
  duplicatedOption.value = null
}

const duplicatedOption = ref<ProductOption>(null)

const setDuplicatedOption = (option: ProductOption) => {
  duplicatedOption.value = option
  formActive.value = true
  notificationsStore.create({
    type: 'success',
    title: 'Alternativ kopiert!',
    text: 'Alternativet ble kopiert.',
  })
}

const deleteOption = (option: ProductOption) => {
  options.value = [...options.value.filter((o) => o !== option)]
  notificationsStore.create({
    type: 'success',
    title: 'Alternativ slettet!',
    text: 'Alternativet ble fjernet, og vil ikke bli opprettet med produktet.',
  })
}

watch(
  () => options.value,
  (newValue, _oldValue) => {
    emits('update', newValue)
  }
)
</script>

<template>
  <div>
    <div class="space-y-6">
      <FileUploadUploadedBlock v-if="options.length">
        <FileUploadUploadedBlockGenericItem
          v-for="(option, index) in options"
          :key="index"
          :name="$formatOptionName(option)"
          :highlight="options.indexOf(option) + 1"
        >
          <template #default>
            {{ $formatPrice(option.price) }} kr &#8226; {{ $getStatusName(option.status) }}
          </template>
          <template #actions>
            <ActionMenuSection>
              <ActionMenuItem as="button" type="button" @click="deleteOption(option)">
                Slett alternativ
              </ActionMenuItem>
              <ActionMenuItem as="button" type="button" @click="setDuplicatedOption(option)">
                Kopier alternativ
              </ActionMenuItem>
            </ActionMenuSection>
          </template>
        </FileUploadUploadedBlockGenericItem>
      </FileUploadUploadedBlock>
      <div>
        <Button variant="secondary" fluid @click="formActive = true">
          Legg til alternativer
        </Button>
        <p class="mt-3 text-sm font-light text-gray-500">
          Alternativer er forskjellige kombinasjoner av varianter og størrelser som kunder kan
          handle. Det er viktig at alle mulige kombinasjoner legges til.
        </p>
      </div>
    </div>
    <FormProductOption
      :active="formActive"
      :existing-option="duplicatedOption"
      is-nested
      @close="formActive = false"
      @submit="(option) => addNewOption(option)"
    />
  </div>
</template>
