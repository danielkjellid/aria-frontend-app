<script setup lang="ts">
/***********
 ** Emits **
 ***********/

const emit = defineEmits<{ (e: 'close'): void }>()

/********************
 ** State handling **
 ********************/

const close = () => {
  emit('close')
}
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-linear"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-linear"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" @click="close" />
  </transition>
</template>
