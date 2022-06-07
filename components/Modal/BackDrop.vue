<script setup lang="ts">
interface ModalBackDropProps {
  active: boolean
}

defineProps<ModalBackDropProps>()

/***********
 ** Emits **
 ***********/

const emit = defineEmits<{ (e: 'close'): void }>()

/********************
 ** State handling **
 ********************/

const close = () => {
  console.log('fired')
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
      class="bg-opacity-30 fixed inset-0 z-30 bg-black"
      aria-hidden="true"
      @click="close"
    />
  </transition>
</template>
