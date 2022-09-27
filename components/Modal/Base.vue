<script setup lang="ts">
interface ModalDialogProps {
  title: string
  active: boolean
}

const props = defineProps<ModalDialogProps>()

interface ModalDialogEmits {
  (e: 'close'): void
}

const emits = defineEmits<ModalDialogEmits>()

const onClose = () => {
  document.body.style.overflow = ''
  emits('close')
}

watch(
  () => props.active,
  (_oldValue, newValue) => {
    if (newValue === false) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
</script>

<template>
  <div class="relative z-50" :aria-labelledby="title" role="dialog" aria-modal="true" tabindex="0">
    <ModalBackDrop :active="active" @close="onClose" />
    <slot />
  </div>
</template>
