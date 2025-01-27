<template>
  <button
    class="flex h-12 cursor-pointer flex-col rounded-xl p-2 sm:h-14 lg:h-16 lg:gap-1 xl:h-20"
    :class="{
      'bg-slate-500': currentMonth && !selectedDay,
      'bg-slate-800': !currentMonth && !selectedDay,
      'bg-green-800': selectedDay,
    }"
    @click="handleClickDay(props.currentDate)"
  >
    <p class="text-sm lg:text-base">{{ day }}</p>
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
import { Dayjs } from "dayjs";
import { useDateStore } from "~/store/dateStore";
import BadgeContainer from "./badge/BadgeContainer.vue";

const dateStore = useDateStore();
const emit = defineEmits(["onNextMonth", "onPreviousMonth"]);
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
