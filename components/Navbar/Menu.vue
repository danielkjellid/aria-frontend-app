<script setup lang="ts">
import { CubeTransparentIcon, MenuAlt2Icon, SearchIcon } from '@heroicons/vue/outline'

/***********
 ** Props **
 ***********/

interface NavbarProps {
  flyoutMenuActive: boolean
}

const props = defineProps<NavbarProps>()

/***********
 ** Emits **
 ***********/

interface NavbarEmits {
  (e: 'close'): void
}

const emits = defineEmits<NavbarEmits>()

/***************************
 ** Environment variables **
 ***************************/

const config = useRuntimeConfig().public

/****************
 ** Menu state **
 ****************/

const mobileMenuActive = ref<boolean>(false)

const openMobileMenu = () => {
  mobileMenuActive.value = true
  document.body.style.overflow = 'hidden'
}

const closeMobileMenu = () => {
  mobileMenuActive.value = false
  document.body.style.overflow = ''
}

const cleanupMenus = () => {
  mobileMenuActive.value = false
  document.body.style.overflow = ''
  emits('close')
}

/*********************
 ** Scroll handling **
 *********************/

const currentScrollValue = ref<number>(0)
const handleScroll = () => {
  currentScrollValue.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

/****************************
 ** Dynamic class handling **
 ****************************/

const isTransparent = computed(() => !props.flyoutMenuActive && currentScrollValue.value < 10)

const renderBgClass = computed(() => {
  if (!props.flyoutMenuActive) {
    if (isTransparent.value) {
      return 'bg-transparent-blur transition ease-in-out delay-75'
    }
    return 'bg-transparent-white transition ease-in-out delay-75'
  }

  return 'bg-white'
})
</script>

<template>
  <div v-click-outside="cleanupMenus" class="fixed top-0 left-0 right-0 z-40">
    <!-- Mobile menu -->
    <NavbarMobileMenu :active="mobileMenuActive" @close="closeMobileMenu">
      <slot name="start" />
    </NavbarMobileMenu>

    <!-- Header -->
    <header class="relative">
      <nav aria-label="Top">
        <div :class="renderBgClass">
          <Container as="div" :y-padding="null">
            <div
              class="border-b"
              :class="flyoutMenuActive ? 'border-gray-200' : 'border-transparent'"
            >
              <div class="flex items-center justify-between h-20">
                <!-- Logo (lg+) -->
                <div class="lg:flex lg:items-center hidden">
                  <NuxtLink to="/">
                    <span class="sr-only">{{ config.BRAND_NAME }}</span>
                    <slot name="logo" :is-transparent="isTransparent">
                      <CubeTransparentIcon
                        class="w-8 h-8 text-white"
                        :class="isTransparent ? 'text-white' : 'text-brand-800'"
                      />
                    </slot>
                  </NuxtLink>
                </div>

                <div class="lg:flex items-center hidden h-full">
                  <div class="ml-8">
                    <div class="flex items-center justify-center space-x-8">
                      <slot name="start" :is-transparent="isTransparent" />
                    </div>
                  </div>
                </div>

                <div class="lg:hidden flex items-center flex-1 space-x-4">
                  <div class="lg:hidden flex">
                    <IconWrapper
                      as="button"
                      type="button"
                      :transparent-bg="isTransparent"
                      @click="openMobileMenu"
                    >
                      <span class="sr-only">Open menu</span>
                      <MenuAlt2Icon
                        class="w-6 h-6"
                        :class="
                          isTransparent
                            ? 'text-white hover:text-gray-300'
                            : 'text-gray-400 hover:text-brand-800'
                        "
                      />
                    </IconWrapper>
                  </div>
                  <div class="lg:hidden flex">
                    <IconWrapper
                      as="button"
                      type="button"
                      :transparent-bg="isTransparent"
                      aria-expanded="false"
                      class="relative"
                    >
                      <span class="sr-only">Search</span>
                      <SearchIcon
                        class="w-6 h-6"
                        :class="
                          isTransparent
                            ? 'text-white group-hover:text-gray-300'
                            : 'text-gray-400 group-hover:text-brand-800'
                        "
                      />
                    </IconWrapper>
                  </div>
                </div>

                <!-- Logo (lg-) -->
                <NuxtLink to="/" class="lg:hidden">
                  <span class="sr-only">{{ config.BRAND_NAME }}</span>
                  <slot name="logo" :is-transparent="isTransparent">
                    <CubeTransparentIcon
                      class="w-8 h-8"
                      :class="isTransparent ? 'text-white' : 'text-brand-800'"
                    />
                  </slot>
                </NuxtLink>

                <div class="flex items-center justify-end flex-1">
                  <div class="lg:ml-8 flex items-center">
                    <slot name="end" :is-transparent="isTransparent" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.bg-transparent-blur {
  background-color: rgba(145, 146, 140, 0.3);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.bg-transparent-white {
  background-color: hsla(0, 0%, 100%, 0.92);
}
</style>
