<script setup lang="ts">
import { ShoppingBagIcon, UserCircleIcon, SearchIcon } from '@heroicons/vue/outline'
import useCategoriesStore from '~~/store/categories'

const flyoutActive = ref<boolean>(false)

const store = useCategoriesStore()

if (store.navbarCategories === null) {
  store.fetchNavbarCategories()
}

const loading = computed(() => store.navbarCategories === null)
</script>

<template>
  <NavbarMenu :flyout-menu-active="flyoutActive" @close="flyoutActive = false">
    <template #logo="{ isTransparent }">
      <Logo :color="isTransparent ? 'text-white' : 'text-brand-800'" height="h-8" />
    </template>

    <template #start="{ isTransparent }">
      <NavbarMenuItemFlyout
        :active="flyoutActive"
        :render-transparent="isTransparent"
        @toggle="flyoutActive = !flyoutActive"
      >
        Produkter
        <template #items>
          <ListBlock
            v-for="menuItem in store.navbarCategories"
            :key="menuItem.id"
            :to="`/categories/${menuItem.slug}/`"
            :label="menuItem.name"
            label-class="hover:text-brand-700"
            :loading="loading"
            @click="flyoutActive = false"
          >
            <ListBlockItem
              v-for="childItem in menuItem.children"
              :key="childItem.slug"
              :to="`/categories/${menuItem.slug}/${childItem.slug}/`"
              :loading="loading"
              class="hover:text-brand-900"
              @click="flyoutActive = false"
            >
              {{ childItem.name }}
            </ListBlockItem>
          </ListBlock>
        </template>
      </NavbarMenuItemFlyout>
      <NavbarMenuItem to="/kitchens/" :render-transparent="isTransparent"> Kjøkken </NavbarMenuItem>
      <NavbarMenuItem to="/about-us/" :render-transparent="isTransparent"> Om oss </NavbarMenuItem>
      <NavbarMenuItem to="/contact-us/" :render-transparent="isTransparent">
        Kontakt
      </NavbarMenuItem>
    </template>

    <template #end="{ isTransparent }">
      <div class="lg:space-x-8 flex space-x-4">
        <div class="lg:flex hidden">
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

        <div class="relative flex">
          <ActionMenu :transparent-bg="isTransparent" alignment="right">
            <span class="sr-only">Your account, view account options</span>
            <UserCircleIcon
              class="w-6 h-6"
              :class="
                isTransparent
                  ? 'text-white group-hover:text-gray-300'
                  : 'text-gray-400 group-hover:text-brand-800'
              "
            />
            <template #items>
              <ActionMenuSection>
                <ActionMenuItem as="NuxtLink" to="#">Your profile</ActionMenuItem>
                <ActionMenuItem as="NuxtLink" to="#">Settings</ActionMenuItem>
                <ActionMenuItem as="NuxtLink" to="#">Sign out</ActionMenuItem>
              </ActionMenuSection>
            </template>
          </ActionMenu>
        </div>
      </div>

      <span class="lg:mx-6 sm:mx-4 w-px h-6 mx-2 bg-gray-200" aria-hidden="true" />

      <div class="inline-flex items-center">
        <IconWrapper
          as="button"
          type="button"
          :transparent-bg="isTransparent"
          aria-expanded="false"
          class="relative"
        >
          <span class="sr-only"> items in cart, view bag </span>
          <ShoppingBagIcon
            class="z-10 w-6 h-6"
            :class="
              isTransparent
                ? 'text-white group-hover:text-gray-300'
                : 'text-gray-400 group-hover:text-brand-800'
            "
          />
          <span
            class="absolute bottom-0 right-0 z-20 flex items-center justify-center w-4 h-4 -mb-1.5 -mr-1 text-xs font-light rounded-full"
            :class="isTransparent ? 'text-brand-900 bg-white' : 'text-white bg-brand-800'"
          >
            0
          </span>
        </IconWrapper>
      </div>
    </template>
  </NavbarMenu>
</template>
