<script setup lang="ts">
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/vue/outline'

interface NotificationProps {
  /**
   * Title of the notification.
   */
  title: string
  /**
   * Subtitle of the notification.
   */
  subtitle?: string
  /**
   * The notification variant.
   */
  variant?: 'success' | 'info' | 'warning' | 'danger'
}

const props = defineProps<NotificationProps>()

const variant = computed(() => (props.variant ? props.variant : 'success'))

const onCloseNotification = (): void => {}

const closeAfterThreeSeconds = (): void => {
  setTimeout(() => {
    onCloseNotification()
  }, 3000)
}

const displayNotification = ref<boolean>(true)

// setTimeout(() => {
//   displayNotification.value = true
// }, 500)
</script>

<template>
  <div
    v-if="displayNotification"
    class="w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto"
  >
    <div class="overflow-hidden rounded-lg shadow-xs">
      <div class="p-4">
        <div class="flex" :class="subtitle ? 'items-start' : 'items-center'">
          <div class="shrink-0">
            <XCircleIcon v-if="variant === 'danger'" class="w-6 h-6 text-red-400" />
            <ExclamationCircleIcon
              v-else-if="variant === 'warning'"
              class="w-6 h-6 text-yellow-400"
            />
            <InformationCircleIcon v-else-if="variant === 'info'" class="w-6 h-6 text-blue-400" />
            <CheckCircleIcon v-else-if="variant === 'success'" class="w-6 h-6 text-green-400" />
          </div>
          <div class="flex-1 ml-3">
            <Text variant="subtitle1" class="w-64 truncate">{{ title }}</Text>
            <Text v-if="subtitle" variant="body2">{{ subtitle }}</Text>
          </div>
          <div class="shrink-0 flex ml-4">
            <button
              type="button"
              class="focus:outline-none focus:text-gray-600 hover:bg-gray-200 inline-flex p-1 text-gray-500 transition duration-150 ease-in-out rounded-full"
              @click="displayNotification = false"
            >
              <XIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
