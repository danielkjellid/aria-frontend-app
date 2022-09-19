<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { DateTime } from 'luxon'

interface DateObjEventType {
  isTrusted: boolean
}

interface DateObjType {
  id: string
  label: string
  ariaLabel: string
  day: number
  dayFromEnd: number
  weekday: number
  weekdayPosition: number
  weekdayPositionFromEnd: number
  weekdayOrdinal: number
  weekdayOrdinalFromEnd: number
  week: number
  weekFromEnd: number
  weeknumber: number
  isoWeeknumber: number
  month: number
  year: number
  date: Date
  isToday: boolean
  isFirstDay: boolean
  isLastDay: boolean
  inMonth: boolean
  inPrevMonth: boolean
  inNextMonth: boolean
  onTop: boolean
  onLeft: boolean
  onRight: boolean
  isDisabled: boolean
  isFocusable: boolean
  shouldRefresh: boolean
  el: HTMLElement
  event: DateObjEventType
}

interface CalendarDatePickerProps {
  disabledDates: string[]
}

defineProps<CalendarDatePickerProps>()

interface CalendarDatePickerEmits {
  (e: 'select', val: DateObjType): void
}

const emits = defineEmits<CalendarDatePickerEmits>()

const date = ref(new Date())
const today = new Date()

const maxDate = DateTime.now().plus({ months: 2 }).toISO()

const onSelect = (dateObj: DateObjType) => {
  emits('select', dateObj)
}
</script>

<template>
  <div class="block">
    <ClientOnly>
      <DatePicker
        v-model="date"
        locale="no"
        :min-date="today"
        :max-date="maxDate"
        @dayclick="(dateObj) => onSelect(dateObj)"
      >
        <template #header-left-button>
          <button
            type="button"
            class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Forrige måned</span>
            <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </template>
        <template #header-right-button>
          <button
            type="button"
            class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Neste måned</span>
            <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </template>
      </DatePicker>
    </ClientOnly>
  </div>
</template>
