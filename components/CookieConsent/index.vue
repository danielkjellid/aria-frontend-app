<script setup lang="ts">
import { useState } from 'vue-gtag-next'

const { isEnabled } = useState()

const dialogActive = ref<boolean>(true)
const surveyCompleted = ref<boolean>(true)

const enableTracking = () => {
  if (process.client) {
    isEnabled.value = true
    localStorage.setItem('userHasGivenCookieConsent', 'true')
    dialogActive.value = false
    surveyCompleted.value = true
  }
}

const disableTracking = () => {
  if (process.client) {
    isEnabled.value = false
    localStorage.setItem('userHasGivenCookieConsent', 'false')
    dialogActive.value = false
    surveyCompleted.value = true
  }
}

// Set timeout to actually calculate survey state to avoid flickering behavior.
setTimeout(() => {
  surveyCompleted.value =
    process.client && localStorage.getItem('userHasGivenCookieConsent') !== undefined
}, 300)
</script>

<template>
  <div class="lg:m-4 fixed bottom-0 left-0 z-40 m-2">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="dialogActive && !surveyCompleted" class="w-80 p-4 bg-white rounded-md shadow">
        <div>
          <h1 class="text-sm font-medium text-gray-700">Kan vi lagre informasjonskapsler?</h1>
          <p class="mt-3 text-sm text-gray-700">
            Disse vil bli brukt til markedsføring og for å gjøre nettsidene våre bedre å bruke.
          </p>
        </div>
        <div class="flex items-center justify-start mt-4 space-x-2">
          <Button size="s" @click="disableTracking">Nei</Button>
          <Button size="s" @click="enableTracking">Ja</Button>
        </div>
      </div>
    </Transition>
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="sm:translate-y-0 sm:scale-95 translate-y-4 opacity-0"
      enter-to-class="sm:scale-100 translate-y-0 opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="sm:scale-100 translate-y-0 opacity-100"
      leave-to-class="sm:translate-y-0 sm:scale-95 translate-y-4 opacity-0"
    >
      <button
        v-show="!surveyCompleted"
        type="button"
        class="w-14 h-14 flex items-center justify-center mt-2 bg-white bg-opacity-50 rounded-full"
        @click="dialogActive = !dialogActive"
      >
        <div
          class="flex items-center justify-center w-12 h-12 mx-auto bg-white rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-800"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </button>
    </Transition>
  </div>
</template>
