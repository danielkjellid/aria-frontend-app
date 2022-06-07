<script setup lang="ts">
import { XIcon } from '@heroicons/vue/outline'

interface ModalSlideOverProps {
  /**
   * Title of slide over.
   */
  title: string
  /**
   * Active state - controlled by parent.
   */
  active: boolean
  /**
   * Apply custom x-axis padding in the form of css class(es).
   */
  paddingX?: string
  /**
   * Apply custom max width if needed, in the form of css class(es).
   */
  maxWidth?: string
}

defineProps<ModalSlideOverProps>()

const slots = useSlots()
const actionsSlot = computed(() => !!slots.actions)

interface ModalSlideOverEmits {
  (e: 'close'): void
}

const emits = defineEmits<ModalSlideOverEmits>()

const onClose = () => {
  emits('close')
}
</script>

<template>
  <div class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <ModalBackDrop :active="active" @close="onClose" />
    <div class="absolute inset-0 overflow-hidden">
      <div class="fixed inset-y-0 right-0 flex max-w-full">
        <Transition
          enter-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-show="active"
            class="w-screen"
            :class="maxWidth ? maxWidth : 'md:max-w-lg lg:max-w-xl max-w-md'"
          >
            <div class="flex flex-col h-full pt-6 overflow-y-auto bg-white shadow-xl">
              <div :class="paddingX ? paddingX : 'sm:px-6 px-4'">
                <div class="flex items-start justify-between">
                  <slot name="head">
                    <Text tag="h1" variant="title5">{{ title }}</Text>
                  </slot>
                  <div class="h-7 flex items-center ml-3">
                    <IconWrapper as="button" type="button" @click="onClose">
                      <span class="sr-only">Close panel</span>
                      <XIcon class="hover:text-gray-900 w-6 h-6 text-gray-600" />
                    </IconWrapper>
                  </div>
                </div>
              </div>
              <div :class="paddingX ? paddingX : 'sm:px-6 px-4'" class="relative flex-1 my-6">
                <slot>
                  <div :class="paddingX ? paddingX : 'sm:px-6 px-4'" class="absolute inset-0">
                    <div class="h-full border-2 border-gray-200 border-dashed" aria-hidden="true" />
                  </div>
                </slot>
              </div>
              <div
                v-if="actionsSlot"
                :class="paddingX ? paddingX : 'sm:px-6 px-4'"
                class="bg-gray-50 relative bottom-0 left-0 right-0 py-5"
              >
                <slot name="actions" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
