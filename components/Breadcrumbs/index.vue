<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/solid'

const config = useRuntimeConfig().public
</script>

<template>
  <div>
    <nav class="sm:hidden flex items-center" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <li class="sm:hidden block">
          <div class="flex items-center">
            <ChevronLeftIcon class="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
            <NuxtLink
              to="/"
              v-bind="$attrs"
              class="hover:text-brand-600 text-brand-800 ml-2 text-sm font-medium cursor-pointer"
            >
              {{ config.BRAND_NAME }}
            </NuxtLink>
          </div>
        </li>
      </ol>
    </nav>
    <nav class="sm:flex hidden" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-3">
        <slot />
      </ol>
    </nav>
  </div>
</template>
