<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useNotificationsStore from '~~/store/notifications'

/***********
 ** Store **
 ***********/

const store = useNotificationsStore()

/***********
 ** State **
 ***********/

const { unhandledNotifications } = storeToRefs(store)
</script>

<template>
  <div>
    <div
      class="sm:p-6 sm:items-start sm:justify-end absolute top-0 right-0 z-50 flex-1 max-w-md px-4 py-6 space-y-3 overflow-hidden pointer-events-none"
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
          v-for="(notification, index) in unhandledNotifications"
          :key="`${notification.title}-${index}`"
          :title="notification.title"
          :text="notification.text"
          :variant="notification.type"
          @dismiss="store.handle(notification.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
