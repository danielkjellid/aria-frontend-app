<script setup lang="ts">
import useCategoriesStore from '~~/store/categories'
import useUsersStore from './store/users'

/***********************
 ** Store: categories **
 ***********************/

const categoriesStore = useCategoriesStore()
categoriesStore.fetchNavbarCategories()

/******************
 ** Store: users **
 ******************/

const usersStore = useUsersStore()
usersStore.fetchCurrentUser()

/***********
 ** State **
 ***********/

const siteLoaded = ref<boolean>(false)
const isDevEnvironment = computed(() => {
  if (process.env.NODE_ENV !== 'production') return true

  return false
})

/***********
 ** Hooks **
 ***********/

onMounted(() => {
  siteLoaded.value = true
})
</script>

<template>
  <div>
    <NotificationHandler />
    <Transition
      enter-active-class="transition-opacity duration-200 ease-linear"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-linear"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="siteLoaded">
        <NuxtLayout>
          <NuxtPage />
          <CookieConsent />
        </NuxtLayout>
      </div>
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center overflow-hidden bg-white"
      >
        <LoadingSpinner width="w-20" height="h-20" />
      </div>
    </Transition>
    <div
      v-if="isDevEnvironment"
      class="dev-env-warning fixed bottom-0 left-0 right-0 z-50 py-1 text-center"
    >
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div>
  </div>
</template>

<style scoped>
.dev-env-warning {
  background: repeating-linear-gradient(45deg, #fbbf24, #fbbf24 10px, #f59e0b 10px, #f59e0b 20px);
}
</style>
