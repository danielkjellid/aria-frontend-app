<script setup lang="ts">
import { XIcon } from '@heroicons/vue/outline'

interface NavbarMobileMenuProps {
  active: boolean
}

defineProps<NavbarMobileMenuProps>()

/***********
 ** Emits **
 ***********/

const emit = defineEmits<{ (e: 'close'): void }>()

/************************
 ** Menu state handling **
 *************************/

const closeMenu = () => {
  emit('close')
}
</script>

<template>
  <div class="relative z-50">
    <ModalBackDrop :active="active" @close="closeMenu" />
    <div class="absolute inset-0 overflow-hidden">
      <div class="lg:hidden fixed inset-y-0 z-40 flex" role="dialog" aria-modal="true">
        <TransformSlideInRight>
          <div
            v-show="active"
            class="relative flex flex-col w-screen max-w-xs pb-12 overflow-y-auto bg-white shadow-xl"
          >
            <div class="flex items-center justify-between px-4 pt-5 pb-2">
              <h1 class="font-medium text-gray-900">Meny</h1>
              <div>
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                  @click="closeMenu"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="w-6 h-6" />
                </button>
              </div>
            </div>
            <div class="mt-2">
              <slot />
            </div>
          </div>
        </TransformSlideInRight>
      </div>
    </div>
  </div>
</template>
