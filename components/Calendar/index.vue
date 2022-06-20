<script setup lang="ts">
/* eslint-disable vue/no-v-for-template-key */
import { DateTime } from 'luxon'

interface CalendarProps {
  isBookable: boolean
  bookableHourStart: number
  bookableHourEnd: number
  isCompact?: boolean
}

const props = defineProps<CalendarProps>()

const today = ref(DateTime.now())

const bookableHourStart = computed(() => (props.bookableHourStart ? props.bookableHourStart : 10))
const bookableIntervalStart = DateTime.fromObject(
  { day: today.value.day, hour: bookableHourStart.value },
  { zone: 'UTC+2' }
)

const bookableHourEnd = computed(() => (props.bookableHourEnd ? props.bookableHourEnd : 17))
const bookableIntervalEnd = DateTime.fromObject(
  { day: today.value.day, hour: bookableHourEnd.value },
  { zone: 'UTC+2' }
)

const bookableInterval = bookableIntervalEnd.diff(bookableIntervalStart, ['hours']).hours

const selectedDate = ref<undefined | Date>(undefined)
const selectedDateToLuxon = computed(() =>
  selectedDate.value ? DateTime.fromJSDate(selectedDate.value) : today.value
)
</script>

<template>
  <div class="flex flex-col" :class="{ 'border border-gray-200 rounded-lg': !isCompact }">
    <header
      class="bg-gray-50 relative z-20 flex items-center justify-between flex-none"
      :class="
        isCompact
          ? 'hidden'
          : 'block px-6 py-4 border-b border-gray-200 rounded-tl-lg rounded-tr-lg'
      "
    >
      <div>
        <h1 class="text-lg font-semibold leading-6 text-gray-900">
          <time datetime="2022-01-22" class="sm:hidden">
            {{ selectedDateToLuxon.setLocale('no').toFormat('d. LLL yyyy') }}
          </time>
          <time datetime="2022-01-22" class="sm:inline hidden">
            {{ selectedDateToLuxon.setLocale('no').toFormat('d. LLLL yyyy') }}
          </time>
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          {{ $capitalize(selectedDateToLuxon.setLocale('no').toFormat('EEEE')) }}
        </p>
      </div>
    </header>
    <div
      :class="isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'"
      class="grid overflow-hidden bg-white rounded-bl-lg rounded-br-lg"
    >
      <div class="md:col-span-2 flex flex-col order-2 overflow-auto">
        <div
          class="flex flex-auto w-full"
          :class="
            isCompact
              ? 'border border-gray-200 rounded-lg mt-4'
              : 'border-t border-gray-200 md:border-0'
          "
        >
          <div
            class="w-14 ring-1 ring-gray-200 flex-none bg-white"
            :class="isCompact ? 'rounded-bl-lg rounded-tl-lg' : ''"
          ></div>
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div
              class="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
              :style="`grid-template-rows: repeat(${bookableInterval * 2}, minmax(3.5rem, 1fr))`"
            >
              <div class="h-7 row-end-1"></div>
              <template v-for="hour in bookableInterval" :key="hour">
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    {{ bookableIntervalStart.plus({ hour: hour - 1 }).toFormat('HH:mm') }}
                  </div>
                </div>
                <div></div>
              </template>
            </div>

            <!-- Events -->
            <ol
              class="grid grid-cols-1 col-start-1 col-end-2 row-start-1"
              :style="`grid-template-rows: 1.75rem repeat(${
                bookableInterval * 12
              }, minmax(0, 1fr)) auto`"
            >
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T10:00:00"
                appointment-end="2022-06-17T11:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T11:00:00"
                appointment-end="2022-06-17T12:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T12:00:00"
                appointment-end="2022-06-17T13:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T13:00:00"
                appointment-end="2022-06-17T14:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T14:00:00"
                appointment-end="2022-06-17T15:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T15:00:00"
                appointment-end="2022-06-17T16:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-17T16:00:00"
                appointment-end="2022-06-17T17:00:00"
              />
            </ol>
          </div>
        </div>
      </div>
      <div
        class="col-span-1"
        :class="
          isCompact
            ? 'block order-1 px-px'
            : 'md:order-2 px-8 py-6 order-1 border-l border-gray-100'
        "
      >
        <CalendarDatePicker
          :disabled-dates="[]"
          @select="(dateObj) => (selectedDate = dateObj.date)"
        />
      </div>
    </div>
  </div>
</template>
