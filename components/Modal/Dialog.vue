<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
interface ModalDialogProps {
  title: string
  active: boolean
}

defineProps<ModalDialogProps>()

interface ModalDialogEmits {
  (e: 'close'): void
}

const emits = defineEmits<ModalDialogEmits>()

const onClose = () => {
  emits('close')
}
</script>

<template>
  <ModalBase :title="title" :active="active" @close="onClose">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="sm:translate-y-0 sm:scale-95 translate-y-4 opacity-0"
      enter-to-class="sm:scale-100 translate-y-0 opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="sm:scale-100 translate-y-0 opacity-100"
      leave-to-class="sm:translate-y-0 sm:scale-95 translate-y-4 opacity-0"
    >
      <div v-if="active" class="fixed inset-0 z-30 overflow-y-auto" @click="onClose">
        <div
          class="sm:items-center sm:p-0 flex items-end justify-center min-h-full p-4 text-center"
        >
          <div
            class="sm:my-8 sm:w-full sm:max-w-md sm:p-6 relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl"
          >
            <div class="text-center">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </h3>
              <div class="mt-3">
                <Text variant="body2" color="text-gray-700">
                  <slot />
                </Text>
              </div>
            </div>
            <div class="sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-3 mt-5">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </ModalBase>
</template>
