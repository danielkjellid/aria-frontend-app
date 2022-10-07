<script setup lang="ts">
interface ModalBackDropProps {
  active: boolean
  /**
   * Render the black overlay transparent. Useful if you have multiple overlapping
   * modals.
   */
  isNested?: boolean
}

defineProps<ModalBackDropProps>()

/***********
 ** Emits **
 ***********/

const emit = defineEmits<{ (e: 'close'): void }>()

/********************
 ** State handling **
 ********************/

const onClose = () => {
  emit('close')
}
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-linear"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-linear"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="active"
      class="fixed inset-0 z-30"
      :class="isNested ? 'bg-transparent' : 'bg-black bg-opacity-30'"
      aria-hidden="true"
      @click="onClose"
    />
  </transition>
</template>
