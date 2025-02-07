<template>
  <!-- Card wich represent day of the month -->
  <button
    class="flex h-12 cursor-pointer flex-col rounded-xl p-2 sm:h-14 lg:h-16 lg:gap-1"
    :class="{
      'bg-[#40916C]': currentMonth && !selectedDay,
      'bg-deep-green-color': !currentMonth && !selectedDay,
      'bg-[#79ae1e]': selectedDay,
    }"
    @click="handleClickDay(props.currentDate)"
  >
    <p class="text-sm font-bold lg:text-base">{{ day }}</p>
    <section
      v-if="subscriptionActive && subscriptionActive.length > 0"
      class="flex w-full flex-row self-center"
    >
      <BadgeContainer :active-subscription="subscriptionActive" />
    </section>
  </button>
</template>

<script lang="ts" setup>
import { useSubscriptionsStore } from "~/store/subscriptionsStore";
import type { Dayjs } from "dayjs";
import { useDateStore } from "~/store/dateStore";
import BadgeContainer from "./badge/BadgeContainer.vue";

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: Dayjs | null;
  currentMonth: boolean;
  currentDate: Dayjs;
  selectedDay: boolean;
}>();

const subscriptionActive = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(props.currentDate)
    : null;
});

// Select day
async function handleClickDay(day: Dayjs) {
  // Do nothing if a subscription is selected
  if (subscriptionStore.selectedSubscription) return;
  try {
    if (props.currentDate) {
      subscriptionStore.setSelectedDate(day);
      if (props.currentMonth) {
        dateStore.setCurrentDate(day);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
