<script setup lang="ts">
import { ProductFileOutput } from '~~/@types'
import { PaperClipIcon } from '@heroicons/vue/24/outline'

/***********
 ** Props **
 ***********/

interface ProductDetailBlockFilesProps {
  loaded: boolean
  files: ProductFileOutput[]
}

defineProps<ProductDetailBlockFilesProps>()
</script>

<template>
  <div v-if="loaded">
    <div v-if="files && files.length">
      <CollapsableSection title="Nedlastninger">
        <div class="border border-gray-200 rounded-md">
          <div
            v-for="(file, index) in files"
            :key="`${index}-${file.name}`"
            class="flex items-center justify-between p-4"
            :class="{
              'border-t border-gray-200': index <= files.length && index != 0,
            }"
          >
            <div class="flex items-center text-sm">
              <PaperClipIcon class="text-brand-500 w-5 h-5 mr-2" />
              {{ file.name }}
            </div>
            <NuxtLink
              :to="file.file"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:underline text-brand-800 text-sm"
            >
              Last ned
            </NuxtLink>
          </div>
        </div>
      </CollapsableSection>
    </div>
  </div>
  <div v-else>
    <section>
      <SkeletonLoader loading width="w-full" height="h-10" />
      <div class="mt-6 space-y-2">
        <SkeletonLoader loading width="w-full" height="h-12" />
        <SkeletonLoader loading width="w-full" height="h-12" />
        <SkeletonLoader loading width="w-full" height="h-12" />
      </div>
    </section>
  </div>
</template>
