<script setup lang="ts">
const dummyNotifications = ref([])

const t = () => {
  dummyNotifications.value.push({ text: 'Test 789', subtitle: 'asdasdas' })
  console.log('click')
}
</script>

<template>
  <div>
    <div
      class="sm:p-6 sm:items-start sm:justify-end absolute top-0 right-0 z-50 flex-1 max-w-md px-4 py-6 space-y-3 overflow-hidden bg-red-400 pointer-events-none"
    >
      <TransitionGroup
        enter-active-class="transition duration-500 ease-in-out transform"
        enter-from-class="sm:translate-y-0 sm:translate-x-2 translate-y-2 opacity-0"
        enter-to-class="sm:translate-x-0 translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in-out transform"
        leave-from-class="sm:translate-x-0 translate-y-0 opacity-100"
        leave-to-class="sm:translate-y-0 sm:translate-x-2 translate-y-2 opacity-0"
      >
        <Notification
          v-for="n in dummyNotifications"
          :key="n.text"
          :title="n.text"
          :subtitle="n.subtitle"
        />
      </TransitionGroup>
    </div>
    <button type="button" class="absolute z-50 bg-red-900" @click="t">TEST</button>
  </div>
</template>
