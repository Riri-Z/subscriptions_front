<template>
  <!-- TODO : ADD icons for each subscriptions cdt = nextPayements.includes( selectedDay) -->
  <button
    class="flex h-16 w-16 flex-col rounded-xl p-2"
    :class="{
      'bg-green-700': isSelectedDay,
      'bg-slate-600': day !== null,
      'bg-slate-800': day === null,
    }"
    @click="handleClickDay"
  >
    <p>{{ day }}</p>
  </button>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentDate: Dayjs | null | 0;
}>();

// Logic to check if current day is the selected one
const isSelectedDay = computed(() => {
  if (props.sourceDate && props.day && subscriptionStore.selectedDate) {
    const currentDay = props.sourceDate
      .set("date", props.day)
      .format("YYYY-MM-DD");
    return currentDay === subscriptionStore.selectedDate;
  }
});
// Select day
function handleClickDay() {
  if (props.currentDate) {
    subscriptionStore.setSelectedDate(props.currentDate);
    subscriptionStore.openDetails();
  } else {
    return console.info("No date available");
  }
}
</script>
