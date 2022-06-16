<script setup lang="ts">
/* eslint-disable vue/no-v-for-template-key */
import { DateTime } from 'luxon'

interface CalendarProps {
  isBookable: boolean
  bookableHourStart: number
  bookableHourEnd: number
  isCompact: boolean
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
  <div class="flex flex-col border border-gray-200 rounded-lg">
    <header
      class="bg-gray-50 relative z-20 flex items-center justify-between flex-none px-6 py-4 border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
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
    <div class="flex flex-auto overflow-hidden bg-white rounded-bl-lg rounded-br-lg">
      <div class="flex flex-col flex-auto overflow-auto">
        <div
          class="ring-1 ring-black ring-opacity-5 top-0 z-10 flex-none p-6 text-xs text-gray-500 bg-white shadow"
          :class="isCompact ? 'sticky' : 'md:hidden sticky'"
        >
          <CalendarDatePicker
            :disabled-dates="[]"
            @select="(dateObj) => (selectedDate = dateObj.date)"
          />
        </div>
        <div class="flex flex-auto w-full">
          <div class="w-14 ring-1 ring-gray-100 flex-none bg-white"></div>
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
                appointment-start="2022-06-16T10:00:00"
                appointment-end="2022-06-16T11:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T11:00:00"
                appointment-end="2022-06-16T12:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T12:00:00"
                appointment-end="2022-06-16T13:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T13:00:00"
                appointment-end="2022-06-16T14:00:00"
              />
              <CalendarAppointmentItem
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T14:00:00"
                appointment-end="2022-06-16T15:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T15:00:00"
                appointment-end="2022-06-16T16:00:00"
              />
              <CalendarAppointmentItem
                is-booked
                :calendar-bookable-start-time="bookableIntervalStart"
                appointment-start="2022-06-16T16:00:00"
                appointment-end="2022-06-16T17:00:00"
              />
            </ol>
          </div>
        </div>
      </div>
      <div
        class="flex-none w-1/2 max-w-md px-8 py-6 border-l border-gray-100"
        :class="isCompact ? 'hidden' : 'hidden md:block'"
      >
        <CalendarDatePicker
          :disabled-dates="[]"
          @select="(dateObj) => (selectedDate = dateObj.date)"
        />
      </div>
    </div>
  </div>
</template>
