<script setup lang="ts">
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

/***********
 ** Props **
 ***********/

interface NotificationProps {
  /**
   * Title of the notification.
   */
  title: string
  /**
   * Subtitle of the notification.
   */
  text?: string
  /**
   * The notification variant.
   */
  variant?: 'success' | 'info' | 'warning' | 'danger'
}

const props = defineProps<NotificationProps>()

const variant = computed(() => (props.variant ? props.variant : 'success'))

/***********
 ** Emits **
 ***********/

interface NotificationEmits {
  (e: 'dismiss'): void
}

const emits = defineEmits<NotificationEmits>()

/***********
 ** State **
 ***********/

const dismissNotification = (): void => {
  emits('dismiss')
}

const dismissAutomatically = (): void => {
  setTimeout(() => {
    dismissNotification()
  }, 4000)
}

dismissAutomatically()
</script>

<template>
  <div class="relative w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto">
    <div class="overflow-hidden rounded-lg shadow-xs">
      <div class="p-4">
        <div class="flex" :class="text ? 'items-start' : 'items-center'">
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
            <Text v-if="text" variant="body2">{{ text }}</Text>
          </div>
          <div class="shrink-0 flex ml-4">
            <button
              type="button"
              class="focus:outline-none focus:text-gray-600 hover:bg-gray-200 inline-flex p-1 text-gray-500 transition duration-150 ease-in-out rounded-full"
              @click="dismissNotification"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
