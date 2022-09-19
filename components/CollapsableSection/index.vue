<script setup lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
/***********
 ** Props **
 ***********/

interface CollapsableSectionProps {
  /**
   * Sets the title of the collapsable section.
   */
  title: string
  /**
   * Prevents the section from being collapsable.
   */
  disableCollapse?: boolean
}

defineProps<CollapsableSectionProps>()

/***********
 ** State **
 ***********/

const collapsed = ref<boolean>(false)
</script>

<template>
  <section>
    <div
      class="bg-gray-50 text-brand-900 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer"
      :class="{ 'flex items-center justify-between': !disableCollapse }"
      @click="collapsed = !collapsed"
    >
      <h1>{{ title }}</h1>
      <button v-if="!disableCollapse" type="button" class="hover:text-brand-900 text-brand-600">
        <ChevronUpIcon v-if="!collapsed" class="w-5 h-5" />
        <ChevronDownIcon v-else class="w-5 h-5" />
      </button>
    </div>
    <div class="px-4 my-6">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-show="!collapsed">
          <slot>Content</slot>
        </div>
      </Transition>
    </div>
  </section>
</template>
