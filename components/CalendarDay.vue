<template>
  <!-- TODO : ADD icons for each subscriptions cdt = nextPayements.includes( selectedDay) -->
  <button
    class="flex h-16 w-16 flex-col rounded-xl p-2"
    :class="{
      'bg-green-color': isSelectedDay,
      'bg-slate-600': day !== null,
      'bg-slate-800': day === null,
    }"
    @click="handleClickDay"
  >
    <p>{{ day }}</p>
    <!-- TODO : COMPONENT DISPLAY ICON CURRENT SUBSCRIPTION -->
    <p v-if="subscriptionActive">xxXXX</p>
  </button>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { Subscription } from "~/types/store/subscriptionsStore";

const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentDate: Dayjs | null | 0;
}>();

const completeDate: Ref<string | null> = ref(null);

//TODO : Move this to calendar component, and in the store when we getSubscriptionsMonthly, update store state to save the date with their subscription , and pass them tby props to calendarDAY
onMounted(() => {
  if (props.sourceDate && props.day) {
    completeDate.value = props.sourceDate
      .set("date", props.day)
      .format("YYYY-MM-DD");
  } else {
    return;
  }
  if (completeDate.value) {
    const res = subscriptionStore.getSubscriptionsByDay(
      dayjs(completeDate.value),
    );
    if (res && res?.length > 0) {
      subscriptionActive.value = res;
    }
  }
});

// Logic to check if current day is the selected one
const isSelectedDay = computed(() => {
  if (
    props.sourceDate &&
    props.day &&
    subscriptionStore.selectedDate &&
    completeDate.value
  ) {
    return completeDate.value === subscriptionStore.selectedDate;
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

const subscriptionActive: Ref<Subscription[] | null> = ref(null);
</script>
