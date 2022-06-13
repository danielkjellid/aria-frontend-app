<script setup lang="ts">
interface CalendarProps {
  allowDetailExpand: boolean
}

defineProps<CalendarProps>()

const selectedDate = ref<undefined | Date>(undefined)
</script>

<template>
  <div
    class="lg:gap-8 gap-y-8 grid grid-cols-1"
    :class="allowDetailExpand ? 'lg:grid-cols-3' : 'lg:grid-cols-1'"
  >
    <div
      class="order-2 col-span-2 overflow-hidden"
      :class="allowDetailExpand ? 'lg:order-1' : 'lg:order-2'"
    >
      <CalendarAppointments />
    </div>
    <div class="order-1 col-span-1" :class="allowDetailExpand ? 'lg:order-2' : 'lg:order-1'">
      <CalendarDatePicker :disabled-dates="[]" />
    </div>
  </div>
</template>
