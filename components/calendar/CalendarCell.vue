<template>
  <!-- Card wich represent day of the month -->
  <button
    class="md:h-18 flex h-14 cursor-pointer flex-col rounded-xl p-2 transition-transform duration-150 ease-in-out hover:scale-105 lg:h-16 lg:w-full lg:gap-1"
    :class="{
      'bg-accent': currentMonth && !selectedDay,
      'bg-calendar-outside-month': !currentMonth && !selectedDay,
      'bg-turquoise': selectedDay,
    }"
    @click="handleClickDay(props.currentDate)"
  >
    <p
      class="text-sm font-bold lg:text-base"
      :class="{
        'text-black': currentMonth,
        'text-light': !currentMonth,
      }"
    >
      {{ day }}
    </p>
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
import { useDateStore } from "~/store/dateStore";
import BadgeContainer from "~/components/badge/BadgeContainer.vue";
import dayjs from "dayjs";

const dateStore = useDateStore();
const subscriptionStore = useSubscriptionsStore();

const props = defineProps<{
  day: null | number;
  sourceDate: string | null;
  currentMonth: boolean;
  currentDate: string;
  selectedDay: boolean;
}>();

const subscriptionActive = computed(() => {
  return subscriptionStore.selectedDate
    ? subscriptionStore.getSubscriptionsByDay(dayjs(props.currentDate))
    : null;
});

// Select day
async function handleClickDay(day: string) {
  // Do nothing if a subscription is selected

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
