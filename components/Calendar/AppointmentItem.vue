<script setup lang="ts">
import { DateTime } from 'luxon'

interface CalendarAppointmentItemProps {
  calendarBookableStartTime: DateTime
  appointmentStart?: string
  appointmentEnd?: string
  isBooked?: boolean
}

const props = defineProps<CalendarAppointmentItemProps>()

const appointmentStartToLuxon = DateTime.fromISO(props.appointmentStart)
const appointmentEndToLuxon = DateTime.fromISO(props.appointmentEnd)

const appointmentRowSpan = computed(
  () => appointmentEndToLuxon.diff(appointmentStartToLuxon, ['hours']).hours * 12
)

const bookableStartDiff = computed(
  () => appointmentStartToLuxon.diff(props.calendarBookableStartTime, ['hours']).hours
)
</script>

<template>
  <li
    class="relative flex mt-px cursor-pointer"
    :style="`grid-row: ${2 + bookableStartDiff * 12} / span ${appointmentRowSpan}`"
  >
    <div
      class="group inset-1 absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg"
      :class="
        isBooked
          ? 'bg-gray-100 hover:bg-gray-100 opacity-80 cursor-not-allowed'
          : 'bg-blue-50 hover:bg-blue-100'
      "
    >
      <p class="order-1 font-semibold" :class="isBooked ? 'text-gray-700' : 'text-blue-700'">
        Konsultasjon
      </p>
      <p
        class="order-1"
        :class="
          isBooked
            ? 'text-gray-700 group-hover:text-gray-700'
            : 'text-blue-500 group-hover:text-blue-700'
        "
      >
        Åråssvingen 12 2007 Kjeller
      </p>
      <p
        :class="
          isBooked
            ? 'text-gray-700 group-hover:text-gray-700'
            : 'text-blue-500 group-hover:text-blue-700'
        "
      >
        <time datetime="2022-01-22T11:00">
          {{ appointmentStartToLuxon.toFormat('HH:mm') }} -
          {{ appointmentEndToLuxon.toFormat('HH:mm') }}
        </time>
      </p>
    </div>
    <span
      v-if="isBooked"
      aria-hidden="true"
      class="absolute inset-0 m-1 border-2 border-gray-200 rounded-md pointer-events-none"
    >
      <svg
        class="absolute inset-0 w-full h-full text-gray-200 stroke-2"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        stroke="currentColor"
      >
        <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
      </svg>
    </span>
  </li>
</template>
