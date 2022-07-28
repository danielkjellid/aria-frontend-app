<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { XIcon } from '@heroicons/vue/outline'

/*******************
 ** Generic types **
 *******************/

interface VariantType {
  id?: number
  name: string
  image?: string
  thumbnail?: string
  colorHex?: string
}

/***********
 ** Props **
 ***********/

interface ProductDetailBlockVariantsProps {
  title?: string
  loaded: boolean
  variants: VariantType[]
}

const props = defineProps<ProductDetailBlockVariantsProps>()

const title = computed(() => (props.title ? props.title : 'Varianter'))

/***********
 ** State **
 ***********/

const modalActive = ref<boolean>(false)
const selectedVariant = ref<VariantType | null>(null)

const activateModal = (variant: VariantType) => {
  if (variant.image) {
    selectedVariant.value = variant
  } else if (variant.colorHex) {
    selectedVariant.value = variant
  }

  modalActive.value = true
  document.body.classList.add('overflow-hidden')
}

const closeModal = () => {
  selectedVariant.value = null
  modalActive.value = false
  document.body.classList.remove('overflow-hidden')
}
</script>

<template>
  <div v-if="loaded">
    <div class="relative z-40">
      <!-- Background overlay, show/hide based on modal state -->
      <ModalBackDrop :active="modalActive" @close="closeModal" />
      <Transition
        enter-active-class="duration-500 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-500 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="modalActive"
          class="fixed inset-0 z-40 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          @click="closeModal"
        >
          <div
            class="sm:block sm:p-0 flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center"
          >
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="sm:inline-block sm:align-middle sm:h-screen hidden" aria-hidden="true"
              >&#8203;</span
            >

            <div
              class="sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 inline-flex items-start align-bottom transition-all transform"
            >
              <div
                v-if="selectedVariant && selectedVariant.colorHex"
                :style="`background-color: ${selectedVariant.colorHex}; height: 505px; width: 380px;`"
              />
              <img
                v-else-if="selectedVariant && selectedVariant.thumbnail"
                :src="selectedVariant.thumbnail"
                alt=""
              />
              <IconWrapper
                as="button"
                type="button"
                transparent-bg
                class="group ml-3"
                @click="closeModal"
              >
                <span class="sr-only">Close overlay</span>
                <XIcon class="group-hover:text-gray-300 w-6 h-6 text-white" />
              </IconWrapper>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div v-if="variants && variants.length">
      <CollapsableSection :title="title">
        <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
          <article v-for="variant in variants" :key="variant.name" class="group relative">
            <div class="group-hover:opacity-80 text-center">
              <button v-if="variant.colorHex" @click="activateModal(variant)">
                <div
                  :style="`background-color: ${variant.colorHex}`"
                  class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                />
              </button>
              <button v-else-if="variant.image" @click="activateModal(variant)">
                <img
                  class="object-cover w-20 h-20 mx-auto border-2 border-gray-300 rounded-full"
                  :src="variant.image"
                  alt=""
                />
              </button>
              <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
            </div>
          </article>
        </div>
      </CollapsableSection>
    </div>
  </div>
  <div v-else>
    <section>
      <SkeletonLoader loading width="w-full" height="h-10" />
      <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
        <article v-for="i in 12" :key="i" class="relative text-center">
          <SkeletonLoader loading shape="circle" height="h-20" width="w-20" />
          <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
        </article>
      </div>
    </section>
  </div>
  <!--

    <div v-if="productLoaded">
      <section v-if="variants && variants.length">
        <Text variant="title5">Varianter</Text>
        <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-6">
          <article v-for="variant in variants" :key="variant.id" class="relative">
            <div class="text-center">
              <img
                v-if="variant.image"
                class="object-cover w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
                :src="variant.image"
                alt=""
              />
              <div
                v-else-if="variant.colorHex"
                :style="`background-color: ${variant.color_hex}`"
                class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
              />
              <h3 class="mt-3 text-sm font-medium text-gray-900">{{ variant.name }}</h3>
            </div>
          </article>
        </div>
      </section>
    </div>
    <div v-else>
      <section>
        <SkeletonLoader loading width="w-28" height="h-6" />
        <div class="sm:grid-cols-5 md:grid-cols-6 grid grid-cols-3 gap-5 mt-4">
          <article v-for="i in 12" :key="i" class="relative text-center">
            <SkeletonLoader loading shape="circle" height="h-20" width="w-20" />
            <SkeletonLoader loading height="h-6" width="w-20" class="mt-3" />
          </article>
        </div>
      </section>
    </div>

  -->
</template>
