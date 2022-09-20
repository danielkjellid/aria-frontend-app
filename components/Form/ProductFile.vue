<script setup lang="ts">
interface FormProductFileProps {
  active: boolean
}

defineProps<FormProductFileProps>()

interface FormProductFileEmits {
  (e: 'close'): void
}

const emits = defineEmits<FormProductFileEmits>()

const onClose = () => {
  emits('close')
}
</script>

<template>
  <ModalSlideOver title="Legg til ny fil" :active="active" @close="onClose">
    <p>Test</p>
  </ModalSlideOver>
</template>
