<template>
  <!-- TODO : ADD icons for each subscriptions cdt = nextPayements.includes( selectedDay) -->
  <button
    class="flex h-16 w-16 flex-col rounded-xl p-2"
    :class="{
      'bg-slate-600': day !== null,
      'bg-slate-800': day === null,
      'bg-cyan-700': isSelectedDay,
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
  day: number | null;
  sourceDate: Dayjs | null;
  currentDate: Dayjs | null | 0;
}>();

// Logic to check if current day is the selected one
const isSelectedDay = computed(
  () =>
    props.sourceDate &&
    props.day &&
    props.sourceDate.set("date", props.day).format("DD-MM-YYYY") ===
      subscriptionStore.selectedDate,
);

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
